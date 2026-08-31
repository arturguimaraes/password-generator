import { CHARSET_OPTIONS, MAX_LENGTH, MIN_LENGTH } from '../constants';
import type { CharsetKey, Config } from '../types';
import { GeneratedPassword } from './GeneratedPassword';

type OptionsCardProps = {
  config: Config;
  onCharsetChange: (key: CharsetKey, value: boolean) => void;
  onLengthChange: (value: number) => void;
  onGenerate: () => void;
  error: string | null;
  generated: string;
};

export function OptionsCard({
  config,
  onCharsetChange,
  onLengthChange,
  onGenerate,
  error,
  generated,
}: OptionsCardProps) {
  const handleLengthChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    onLengthChange(Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, value)));
  };

  return (
    <section className='card'>
      <h2 className='card__title'>Options</h2>

      <div className='options-grid'>
        {CHARSET_OPTIONS.map(({ key, label }) => (
          <label className='checkbox' key={key}>
            <input
              type='checkbox'
              checked={config[key]}
              onChange={(e) => onCharsetChange(key, e.target.checked)}
            />
            <span>{label}</span>
          </label>
        ))}

        <label className='length-input'>
          <span>Password length</span>
          <input
            type='number'
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            step={1}
            value={config.length}
            onChange={handleLengthChange}
          />
        </label>
      </div>

      <button className='btn' onClick={onGenerate}>
        Generate password
      </button>

      {error && <p className='error'>{error}</p>}

      <GeneratedPassword value={generated} />
    </section>
  );
}
