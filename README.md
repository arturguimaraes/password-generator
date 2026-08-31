# Password Generator 🔐

A tiny single-page password generator built with React + TypeScript.

You can customize which character sets to use (uppercase, lowercase, numbers, symbols), choose the password length, and generate random passwords. Every generated password is stored in `localStorage` with a timestamp and displayed in a history table. Your chosen options are also persisted and restored on the next visit.

---

## Features

- ✅ Generate random passwords with:
  - Uppercase letters (A–Z)
  - Lowercase letters (a–z)
  - Numbers (0–9)
  - Symbols (!@#$…)
- ✅ Adjustable password length (default: 10, configurable)
- ✅ Uses `window.crypto.getRandomValues` when available for better randomness
- ✅ Generation options (character sets + length) are saved to `localStorage` and restored next visit
- ✅ Each generated password is stored with its creation date/time
- ✅ History table:
  - Newest passwords first
  - Shows password and generated date/time
  - Copy and delete buttons for each entry
  - "Clear all" button to wipe the whole history at once
- ✅ 100% client-side, no backend, no tracking

---

## CI / CD

- **Auto PR** (`.github/workflows/auto-pr.yml`): every push to `development` opens or refreshes
  a PR into `main`, titled with a running release number + commit count and with the commit
  list in the body.
- **Deploy** (`.github/workflows/deploy.yml`): every push to `main` (i.e. when the release PR
  is merged) builds the app and publishes it via GitHub Pages (Pages "Source" must be set to
  "GitHub Actions"). Can also be run manually from the Actions tab.
- **Version footer**: the build injects `__APP_VERSION__` (`package.json` version + an
  auto-incrementing build number — `GITHUB_RUN_NUMBER` in CI, local commit count otherwise),
  `__COMMIT_SHA__`, `__BUILD_DATE__` and `__BUILD_TIME__` (see `vite.config.ts`), shown in the
  page footer with a link to the exact commit.

## Project structure

```
src/
  main.tsx            – entry point
  App.tsx             – state + wiring only
  types/              – shared types
  constants/          – storage keys, defaults, charset option list
  lib/
    password.ts       – password generation (crypto RNG + char pools)
    storage.ts        – localStorage load/save for history and config
  components/
    OptionsCard.tsx     – charset toggles, length, generate button
    GeneratedPassword.tsx
    HistoryCard.tsx     – history table, copy/delete/clear-all
    CopyButton.tsx      – self-contained copy-to-clipboard button
    Footer.tsx          – version / commit / build-time line
  styles/index.css
```

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (React + TS template)
- Plain CSS (no UI framework)
