import { useRef, useState } from 'react';
import { NOTE_MAX_LENGTH } from '../constants';

type NoteCellProps = {
  note?: string;
  onChange: (note: string) => void;
};

export function NoteCell({ note, onChange }: NoteCellProps) {
  const [editing, setEditing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [draft, setDraft] = useState('');
  // Set on Escape so the blur fired while closing the input doesn't save
  const cancelledRef = useRef(false);

  const startEditing = () => {
    cancelledRef.current = false;
    setDraft(note ?? '');
    setEditing(true);
  };

  const commit = () => {
    if (cancelledRef.current) return;
    onChange(draft.trim());
    setEditing(false);
    setRevealed(false);
  };

  const cancel = () => {
    cancelledRef.current = true;
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        className='note__input'
        value={draft}
        maxLength={NOTE_MAX_LENGTH}
        placeholder='Short note'
        aria-label='Note'
        autoFocus
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') cancel();
        }}
      />
    );
  }

  if (!note) {
    return (
      <button className='btn btn--icon note__btn note__add' onClick={startEditing}>
        + Add note
      </button>
    );
  }

  return (
    <div className='note'>
      <span className={`note__text${revealed ? '' : ' note__text--hidden'}`}>
        {revealed ? note : '••••••'}
      </span>
      <button
        className='btn btn--icon note__btn'
        onClick={() => setRevealed((prev) => !prev)}
        aria-label={revealed ? 'Hide note' : 'Show note'}
        title={revealed ? 'Hide note' : 'Show note'}
      >
        {revealed ? '🙈' : '👁️'}
      </button>
      <button
        className='btn btn--icon note__btn'
        onClick={startEditing}
        aria-label='Edit note'
        title='Edit note'
      >
        ✎
      </button>
    </div>
  );
}
