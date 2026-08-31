import type { CharsetKey, Config } from '../types';

const POOLS: Record<CharsetKey, string> = {
  useUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  useLowercase: 'abcdefghijklmnopqrstuvwxyz',
  useNumbers: '0123456789',
  useSymbols: '!@#$%^&*()_+[]{}|;:,.<>?',
};

const getRandomInt = (max: number): number => {
  if (window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
};

export const generatePassword = (config: Config): string => {
  const pools = (Object.keys(POOLS) as CharsetKey[])
    .filter((key) => config[key])
    .map((key) => POOLS[key]);

  if (pools.length === 0) {
    throw new Error('Select at least one character type.');
  }

  const all = pools.join('');
  let password = '';

  for (let i = 0; i < config.length; i++) {
    password += all[getRandomInt(all.length)];
  }

  return password;
};
