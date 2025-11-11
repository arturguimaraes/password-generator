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

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (React + TS template)
- Plain CSS (no UI framework)
