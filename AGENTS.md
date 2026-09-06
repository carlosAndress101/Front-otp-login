# AGENTS.md

## Stack

- **Language:** TypeScript (strict mode)
- **Framework:** React 19.2.8 + Vite 8.2.2
- **Package manager:** `pnpm` (lockfile: `pnpm-lock.yaml`)
- **CSS:** Tailwind CSS 4.3.3 + CSS custom properties for design tokens
- **State:** Zustand 5 (`src/store/store.ts`)
- **Forms:** Formik
- **HTTP:** Axios (base URL from env)
- **Routing:** react-router-dom v7 `createBrowserRouter`
- **Auth:** JWT stored in `localStorage` (key `"token"`), decoded via `jwt-decode` v4
- **Testing:** Vitest + React Testing Library + jest-dom
- **Linting:** oxlint (Oxc)
- **Formatting:** oxfmt (Oxc)

## Required Environment

`VITE_SERVER_DOMAIN` — backend API base URL. Set in `.env` (gitignored). See `.env.example`.

## Commands

| Action            | Command             |
| ----------------- | ------------------- |
| Install           | `pnpm install`      |
| Dev server        | `pnpm dev`          |
| Build             | `pnpm build`        |
| Preview           | `pnpm preview`      |
| Typecheck         | `pnpm typecheck`    |
| Lint              | `pnpm lint`         |
| Lint fix          | `pnpm lint:fix`     |
| Format            | `pnpm format`       |
| Format check      | `pnpm format:check` |
| Test              | `pnpm test`         |
| Test (single run) | `pnpm test:run`     |

## Project Structure

```
src/
  main.tsx              → entry (createRoot)
  App.tsx               → routes (createBrowserRouter)
  vite-env.d.ts         → Vite env type declarations
  types/index.ts        → shared TypeScript interfaces
  types/assets.d.ts     → module declarations for images/CSS
  Components/
    ui/                 → reusable UI components (Button, Input, FormField, Card, Alert, Spinner)
    auth/               → auth layout components (AuthLayout, AuthHeader)
    Username.tsx        → login step 1
    Password.tsx        → login step 2
    Profile.tsx         → user profile (protected)
    Register.tsx        → registration
    Recovery.tsx        → OTP recovery (shell)
    Reset.tsx           → password reset (shell)
    PageNotFound.tsx    → 404
  helper/helper.ts      → ALL API calls (axios), centralized here
  helper/validate.ts    → Formik validation functions (async, calls API)
  helper/convert.ts     → File-to-base64 utility
  Hooks/fetch.hook.ts   → useFetch custom hook (GET requests)
  middleware/auth.tsx    → Route guards: AuthorizeUser (checks localStorage token), ProtectRoute (checks Zustand username)
  store/store.ts        → Zustand store (auth.username, auth.active)
  test-setup.ts         → Vitest setup (jest-dom matchers)
  App.test.tsx          → Example test
```

## Routing

| Path        | Component    | Guard                                        |
| ----------- | ------------ | -------------------------------------------- |
| `/`         | Username     | —                                            |
| `/register` | Register     | —                                            |
| `/password` | Password     | ProtectRoute (requires username in Zustand)  |
| `/profile`  | Profile      | AuthorizeUser (requires JWT in localStorage) |
| `/recovery` | Recovery     | —                                            |
| `/reset`    | Reset        | —                                            |
| `*`         | PageNotFound | —                                            |

## API Endpoints (relative to VITE_SERVER_DOMAIN)

- `POST /api/authenticate` — check username exists
- `POST /api/login` — verify password, returns JWT
- `POST /api/register` — register user
- `POST /api/registerMail` — send email
- `GET /api/generateOTP` — generate OTP
- `GET /api/verifyOTP` — verify OTP code
- `PUT /api/resetPassword` — reset password
- `PUT /api/updateuser` — update profile (auth required)
- `GET /api/user/:username` — get user details

## Incomplete Features

- **Recovery page:** OTP input UI exists but no form submission wired.
- **Reset page:** Form exists but submit handler only `console.log(values)`.
- Both are functional shells awaiting backend integration.

## Design System

CSS custom properties defined in `src/index.css` for:

- Colors: `--color-background`, `--color-foreground`, `--color-muted`, `--color-border`, `--color-primary`, `--color-destructive`, `--color-success`, `--color-warning`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Transitions: `--transition-fast`, `--transition-normal`, `--transition-slow`

Dark mode via `.dark` class or `prefers-color-scheme: dark`.

## Gotchas

- Tailwind v4 CSS Modules require `@reference "tailwindcss"` at the top of any `.module.css` file that uses `@apply`.
- Axios `baseURL` is set in two places (`helper/helper.ts` and `Hooks/fetch.hook.ts`) — keep them in sync.
- JWT is read from `localStorage` on every protected route check — no refresh logic.
- `ProtectRoute` depends on Zustand state (ephemeral), not localStorage — refreshing the page loses this guard's protection.
- `pnpm approve-builds esbuild` may be needed after fresh install.
- Use `oxlint` and `oxfmt` for linting and formatting — no Prettier or ESLint.
