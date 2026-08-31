import type { CharsetKey, Config } from '../types';

// LocalStorage keys
export const STORAGE_KEY = 'password-generator:history';
export const CONFIG_KEY = 'password-generator:config';
export const THEME_KEY = 'password-generator:theme';

export const MIN_LENGTH = 4;
export const MAX_LENGTH = 64;

export const DEFAULT_CONFIG: Config = {
  useUppercase: true,
  useLowercase: true,
  useNumbers: true,
  useSymbols: true,
  length: 10,
};

export const CHARSET_OPTIONS: { key: CharsetKey; label: string }[] = [
  { key: 'useUppercase', label: 'Uppercase (A–Z)' },
  { key: 'useLowercase', label: 'Lowercase (a–z)' },
  { key: 'useNumbers', label: 'Numbers (0–9)' },
  { key: 'useSymbols', label: 'Symbols (!@#$...)' },
];

export const REPO_URL = 'https://github.com/arturguimaraes/password-generator';
