import type { PasswordEntry } from '../types';
import { CopyButton } from './CopyButton';

type HistoryCardProps = {
  entries: PasswordEntry[];
  onDelete: (id: string) => void;
  onClear: () => void;
};

export function HistoryCard({ entries, onDelete, onClear }: HistoryCardProps) {
  return (
    <section className='card'>
      <div className='card__header'>
        <h2 className='card__title'>History</h2>
        {entries.length > 0 && (
          <button className='btn btn--danger btn--sm' onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className='empty'>No passwords generated yet.</p>
      ) : (
        <div className='table-wrapper'>
          <table className='table'>
            <thead>
              <tr>
                <th>Password</th>
                <th>Generated at</th>
                <th className='table__actions'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <code>{entry.value}</code>
                  </td>
                  <td>{new Date(entry.createdAt).toLocaleString()}</td>
                  <td className='table__actions'>
                    <div className='table__row-actions'>
                      <CopyButton value={entry.value} className='table__copy-btn' />
                      <button
                        className='btn btn--icon'
                        onClick={() => onDelete(entry.id)}
                        aria-label='Delete password'
                        title='Delete password'
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
