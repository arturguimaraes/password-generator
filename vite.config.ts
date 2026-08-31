import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

const gitShort = (): string => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
};

const commitSha = (process.env.GITHUB_SHA ?? gitShort()).slice(0, 7);

const now = new Date();
const buildDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
const buildTime = now.toISOString().slice(11, 19); // HH:MM:SS

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/password-generator/',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __COMMIT_SHA__: JSON.stringify(commitSha),
    __BUILD_DATE__: JSON.stringify(buildDate),
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
});
