import { useEffect, useState } from 'react';

type CopyButtonProps = {
  value: string;
  className?: string;
};

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // ignore errors silently
    }
  };

  return (
    <button
      className={`btn btn--icon${className ? ` ${className}` : ''}`}
      onClick={handleCopy}
      aria-label='Copy password'
      title={copied ? 'Copied!' : 'Copy password'}
    >
      {copied ? '✅' : '📋'}
    </button>
  );
}
