# Password Generator 🔐

A tiny single-page password generator built with React + TypeScript.

You can customize which character sets to use (uppercase, lowercase, numbers, symbols), choose the password length, and generate random passwords. Every generated password is stored in `localStorage` with a timestamp and displayed in a history table. Entries older than 30 days are automatically removed.

---

## Features

- ✅ Generate random passwords with:
  - Uppercase letters (A–Z)
  - Lowercase letters (a–z)
  - Numbers (0–9)
  - Symbols (!@#$…)
- ✅ Adjustable password length (default: 16, configurable)
- ✅ Uses `window.crypto.getRandomValues` when available for better randomness
- ✅ Each generated password is stored with its creation date/time
- ✅ History table:
  - Newest passwords first
  - Shows password and generated date/time
  - Delete button for each entry
- ✅ Auto-cleanup:
  - Passwords older than 30 days are removed automatically
- ✅ 100% client-side, no backend, no tracking

---

## CI / CD

- **Auto PR** (`.github/workflows/auto-pr.yml`): every push to `development` opens or refreshes
  a PR into `main`, titled with a running release number + commit count and with the commit
  list in the body.
- **Deploy** (`.github/workflows/deploy.yml`): every push to `main` (i.e. when the release PR
  is merged) builds the app and publishes `dist/` to the `gh-pages` branch. Can also be run
  manually from the Actions tab.
- **Version footer**: the build injects `__APP_VERSION__` (from `package.json`),
  `__COMMIT_SHA__`, `__BUILD_DATE__` and `__BUILD_TIME__` (see `vite.config.ts`), shown in the
  page footer with a link to the exact commit.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (React + TS template)
- Plain CSS (no UI framework)
