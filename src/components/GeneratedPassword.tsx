import { CopyButton } from './CopyButton';

type GeneratedPasswordProps = {
  value: string;
};

export function GeneratedPassword({ value }: GeneratedPasswordProps) {
  if (!value) return null;

  return (
    <div className='current-password'>
      <span>Last generated:</span>
      <code>{value}</code>
      <CopyButton value={value} />
    </div>
  );
}
