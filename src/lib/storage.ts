import { CONFIG_KEY, DEFAULT_CONFIG, MAX_LENGTH, MIN_LENGTH, STORAGE_KEY } from '../constants';
import type { Config, PasswordEntry } from '../types';

export const sortByNewest = (entries: PasswordEntry[]): PasswordEntry[] =>
  [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export const loadHistory = (): PasswordEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PasswordEntry[];
    return sortByNewest(parsed);
  } catch {
    return [];
  }
};

export const saveHistory = (entries: PasswordEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const loadConfig = (): Config => {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as Partial<Config>;
    return {
      useUppercase:
        typeof parsed.useUppercase === 'boolean' ? parsed.useUppercase : DEFAULT_CONFIG.useUppercase,
      useLowercase:
        typeof parsed.useLowercase === 'boolean' ? parsed.useLowercase : DEFAULT_CONFIG.useLowercase,
      useNumbers:
        typeof parsed.useNumbers === 'boolean' ? parsed.useNumbers : DEFAULT_CONFIG.useNumbers,
      useSymbols:
        typeof parsed.useSymbols === 'boolean' ? parsed.useSymbols : DEFAULT_CONFIG.useSymbols,
      length:
        typeof parsed.length === 'number' &&
        parsed.length >= MIN_LENGTH &&
        parsed.length <= MAX_LENGTH
          ? parsed.length
          : DEFAULT_CONFIG.length,
    };
  } catch {
    return DEFAULT_CONFIG;
  }
};

export const saveConfig = (config: Config): void => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};
