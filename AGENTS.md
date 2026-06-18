# AGENTS.md

## Cursor Cloud specific instructions

This is a frontend-only single-page app (Vite + React 18 + TypeScript, shadcn/ui + Tailwind). There is **no backend in this repo**; the only service to run is the Vite dev server. External SaaS (Firebase Firestore for the Message Wall, EmailJS for the contact form) are optional and require `VITE_*` env vars — the app boots and is testable without them.

### Running / building / testing

Standard scripts are defined in `package.json`:

- Dev server: `npm run dev` — serves on **http://localhost:8080** (set in `vite.config.ts`; note the README's mention of 5173 is outdated).
- Lint: `npm run lint`
- Tests: `npm test` (Jest + React Testing Library). The contact-form test logs React `act(...)` warnings to stderr — these are noise, not failures.
- Build: `npm run build` (production) or `npm run build:dev`. The build prints a >500 kB chunk-size warning and a sonner dynamic-import warning; both are benign.
- Format check (as in CI): `npx prettier --check .`. There is **no** `npm run format` script despite the README; use `npx prettier --write .`.

### Gotchas

- Package manager is **npm** (CI uses `npm ci`, `package-lock.json` is the source of truth). A stray `bun.lockb` also exists — ignore it and use npm to stay consistent with CI.
- No `.env` / `.env.example` exists despite the README. To exercise the Message Wall (Firebase) or contact-form email delivery (EmailJS), provide the `VITE_FIREBASE_*` and `VITE_EMAILJS_*` env vars; otherwise those two features fail gracefully (e.g. the contact form shows a "Could not send your message" toast on submit).
- Pre-commit hook (`.husky/pre-commit`) runs `lint-staged` + `npm test`.
