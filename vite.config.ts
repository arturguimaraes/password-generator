import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

const git = (cmd: string, fallback: string): string => {
  try {
    return execSync(`git ${cmd}`).toString().trim();
  } catch {
    return fallback;
  }
};

const commitSha = (process.env.GITHUB_SHA ?? git('rev-parse HEAD', 'unknown')).slice(0, 7);

// Increments on every CI run; falls back to the local commit count.
const buildNumber = process.env.GITHUB_RUN_NUMBER ?? git('rev-list --count HEAD', '0');

const appVersion = `${pkg.version}+${buildNumber}`;

const now = new Date();
const buildDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
const buildTime = now.toISOString().slice(11, 19); // HH:MM:SS

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/password-generator/',
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __COMMIT_SHA__: JSON.stringify(commitSha),
    __BUILD_DATE__: JSON.stringify(buildDate),
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
});
