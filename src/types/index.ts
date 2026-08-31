export type PasswordEntry = {
  id: string;
  value: string;
  createdAt: string; // ISO string
};

export type CharsetKey = 'useUppercase' | 'useLowercase' | 'useNumbers' | 'useSymbols';

export type Config = Record<CharsetKey, boolean> & {
  length: number;
};
