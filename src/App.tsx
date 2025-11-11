import { useEffect, useState } from 'react';

type PasswordEntry = {
  id: string;
  value: string;
  createdAt: string; // ISO string
};

const STORAGE_KEY = 'password-generator:history';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+[]{}|;:,.<>?';

const pruneOldPasswords = (entries: PasswordEntry[]): PasswordEntry[] => {
  const now = Date.now();
  return entries.filter((entry) => {
    const ts = new Date(entry.createdAt).getTime();
    if (Number.isNaN(ts)) return false;
    return now - ts <= MAX_AGE_MS;
  });
};

const sortByNewest = (entries: PasswordEntry[]): PasswordEntry[] =>
  [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const loadHistory = (): PasswordEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PasswordEntry[];
    return sortByNewest(pruneOldPasswords(parsed));
  } catch {
    return [];
  }
};

const saveHistory = (entries: PasswordEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

const getRandomInt = (max: number): number => {
  if (window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
};

const generatePassword = (opts: {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
}): string => {
  const pools: string[] = [];

  if (opts.useUppercase) pools.push(UPPERCASE);
  if (opts.useLowercase) pools.push(LOWERCASE);
  if (opts.useNumbers) pools.push(NUMBERS);
  if (opts.useSymbols) pools.push(SYMBOLS);

  if (pools.length === 0) {
    throw new Error('Select at least one character type.');
  }

  const all = pools.join('');
  let password = '';

  for (let i = 0; i < opts.length; i++) {
    const idx = getRandomInt(all.length);
    password += all[idx];
  }

  return password;
};

const App = () => {
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [length, setLength] = useState(16);

  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [history, setHistory] = useState<PasswordEntry[]>(() => {
    // Guard for SSR / tests (harmless in Vite SPA)
    if (typeof window === 'undefined') return [];

    return loadHistory();
  });

  // Persist to localStorage whenever history changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    saveHistory(history);
  }, [history]);

  const handleGenerate = () => {
    setError(null);
    try {
      const pwd = generatePassword({
        length,
        useUppercase,
        useLowercase,
        useNumbers,
        useSymbols,
      });

      const now = new Date().toISOString();
      const newEntry: PasswordEntry = {
        id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
        value: pwd,
        createdAt: now,
      };

      const next = sortByNewest(pruneOldPasswords([newEntry, ...history]));

      setCurrentPassword(pwd);
      setHistory(next);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unexpected error generating password.');
      }
    }
  };

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleLengthChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    const clamped = Math.min(64, Math.max(4, value));
    setLength(clamped);
  };

  return (
    <div className='app'>
      <h1 className='app__title'>Password Generator</h1>

      <section className='card'>
        <h2 className='card__title'>Options</h2>

        <div className='options-grid'>
          <label className='checkbox'>
            <input
              type='checkbox'
              checked={useUppercase}
              onChange={(e) => setUseUppercase(e.target.checked)}
            />
            <span>Uppercase (A–Z)</span>
          </label>

          <label className='checkbox'>
            <input
              type='checkbox'
              checked={useLowercase}
              onChange={(e) => setUseLowercase(e.target.checked)}
            />
            <span>Lowercase (a–z)</span>
          </label>

          <label className='checkbox'>
            <input
              type='checkbox'
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
            />
            <span>Numbers (0–9)</span>
          </label>

          <label className='checkbox'>
            <input
              type='checkbox'
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
            />
            <span>Symbols (!@#$...)</span>
          </label>

          <label className='length-input'>
            <span>Password length</span>
            <input type='number' min={4} max={64} value={length} onChange={handleLengthChange} />
          </label>
        </div>

        <button className='btn' onClick={handleGenerate}>
          Generate password
        </button>

        {error && <p className='error'>{error}</p>}

        {currentPassword && (
          <div className='current-password'>
            <span>Last generated:</span>
            <code>{currentPassword}</code>
          </div>
        )}
      </section>

      <section className='card'>
        <h2 className='card__title'>History (last 30 days)</h2>

        {history.length === 0 ? (
          <p className='empty'>No passwords generated yet.</p>
        ) : (
          <div className='table-wrapper'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Password</th>
                  <th>Generated at</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <code>{entry.value}</code>
                    </td>
                    <td>{new Date(entry.createdAt).toLocaleString()}</td>
                    <td className='table__actions'>
                      <button
                        className='btn btn--icon'
                        onClick={() => handleDelete(entry.id)}
                        aria-label='Delete password'
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
