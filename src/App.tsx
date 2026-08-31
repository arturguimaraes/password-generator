import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { HistoryCard } from './components/HistoryCard';
import { OptionsCard } from './components/OptionsCard';
import { ThemeToggle } from './components/ThemeToggle';
import { DEFAULT_CONFIG } from './constants';
import { generatePassword } from './lib/password';
import { loadConfig, loadHistory, saveConfig, saveHistory, sortByNewest } from './lib/storage';
import type { CharsetKey, Config, PasswordEntry } from './types';

const isBrowser = typeof window !== 'undefined';

const App = () => {
  const [config, setConfig] = useState<Config>(() => (isBrowser ? loadConfig() : DEFAULT_CONFIG));
  const [currentPassword, setCurrentPassword] = useState('');
  const [history, setHistory] = useState<PasswordEntry[]>(() => (isBrowser ? loadHistory() : []));
  const [error, setError] = useState<string | null>(null);

  // Persist history to localStorage
  useEffect(() => {
    if (isBrowser) saveHistory(history);
  }, [history]);

  // Persist the generation config so it is reused on the next visit
  useEffect(() => {
    if (isBrowser) saveConfig(config);
  }, [config]);

  const handleCharsetChange = (key: CharsetKey, value: boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleLengthChange = (value: number) => {
    setConfig((prev) => ({ ...prev, length: value }));
  };

  const handleGenerate = () => {
    setError(null);
    try {
      const pwd = generatePassword(config);
      const now = new Date().toISOString();
      const newEntry: PasswordEntry = {
        id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
        value: pwd,
        createdAt: now,
      };

      setCurrentPassword(pwd);
      setHistory((prev) => sortByNewest([newEntry, ...prev]));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unexpected error generating password.');
    }
  };

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleClearHistory = () => {
    if (history.length === 0) return;
    if (window.confirm('Delete all password history? This cannot be undone.')) {
      setHistory([]);
    }
  };

  return (
    <div className='app'>
      <ThemeToggle />
      <h1 className='app__title'>Password Generator</h1>

      <OptionsCard
        config={config}
        onCharsetChange={handleCharsetChange}
        onLengthChange={handleLengthChange}
        onGenerate={handleGenerate}
        error={error}
        generated={currentPassword}
      />

      <HistoryCard entries={history} onDelete={handleDelete} onClear={handleClearHistory} />

      <Footer />
    </div>
  );
};

export default App;
