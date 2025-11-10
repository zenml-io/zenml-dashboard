# Repository Guidelines

## Project Structure & Module Organization

- Application code lives in `src/`: flows under `src/app`, shared UI in `src/components`, and utilities with co-located specs in `src/lib`.
- Providers (`src/context`), reusable hooks (`src/hooks`), assets (`src/assets`), and seed data (`src/data`) support features; static files ship from `public/`, Playwright suites reside in `e2e-tests/`, and API typings regenerate with `pnpm generate:types`.

## Build, Test, and Development Commands

- `pnpm install` — install dependencies; always use pnpm to respect the lockfile.
- `pnpm dev` — start the Vite dev server (http://localhost:5173) with hot reload.
- `pnpm build` — run `tsc` and `vite build` into `dist/`; follow with `pnpm preview` for production smoke tests.
- `pnpm test:unit` — execute Vitest suites; add `-- --watch` during local development.
- `pnpm test:e2e` — run Playwright journeys from `e2e-tests/`; tweak device coverage in `playwright.config.ts`.
- `pnpm lint` / `pnpm format` — enforce ESLint and Prettier; both run automatically via Husky pre-commit hooks.

## Coding Style & Naming Conventions

- Prettier governs formatting: tabs, double quotes, `printWidth` 100, and no trailing commas. The prettier configuration can be found in `.prettierrc`
- Use PascalCase components, camelCase hooks prefixed with `use`, and kebab-case shared folders; keep types in `src/types` or beside usage, prefixing unused args with `_`.
- Tailwind classes auto-sort through `prettier-plugin-tailwindcss`; prefer primitives from `@zenml-io/react-component-library` before writing custom CSS.

## Testing Guidelines

- Place unit specs alongside code as `*.spec.ts[x]`; run them with `pnpm test:unit`. Reuse helpers in `src/lib` so fixtures stay deterministic and reset timers, TanStack Query caches, and mocks in `beforeEach`.
- Reserve Playwright (`pnpm test:e2e`) for end-to-end flows and smoke coverage; keep component snapshots and accessibility assertions in Vitest using `@testing-library/react`.

## Scope Guardrails

- **Personal API Keys (PATs) are Pro-only** and belong in the Cloud UI. Do **not** add PAT functionality to this OSS dashboard.
- Focus on **workspace-level service accounts** for this repo.
- **Icons:** Reuse existing icon components; **do not** import from `lucide-react` (AI tools default to this incorrectly).

## Common Implementation Patterns

- Reference similar existing features when implementing new ones (check zenml-cloud-ui repo for shared patterns)
- **One-time secrets**: Display token/key once after creation in a dialog, never persist in UI state
- **Query invalidation**: After mutations (create/update/delete), invalidate TanStack Query cache to refetch data
- **Component reuse**: Check `src/components/` for existing patterns before creating new components
- **Type safety**: Use generated types from `src/types/core.ts`, avoid `type any`

## Commit & Pull Request Guidelines

- Follow Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) with ≤72-character subjects and include issue references (`#123`) when relevant.
- Flag breaking changes under a `BREAKING CHANGE:` paragraph and describe behavioural impacts in the body.
- PRs must outline scope, list verification (`pnpm lint`, `pnpm test:unit`, targeted Playwright runs), and attach screenshots or Looms for UI updates; request reviewers from the owning squad and target the staging branch.

## Environment & Configuration

- Copy `.env.example` to `.env.local`, set `VITE_API_BASE_URL` and related keys, and keep secrets out of git.
- After backend schema updates, rerun `pnpm generate:types` to refresh helpers consumed in `src/lib/server.ts`.
