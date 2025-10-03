# Repository Guidelines

## Project Structure & Module Organization
- `src/` houses the TypeScript React application. Route-level flows live in `src/app`, shared UI in `src/components`, and cross-cutting utilities in `src/lib` (each utility keeps a sibling `*.spec.ts` when needed).
- `src/assets` stores icons and theme resources; `src/context`, `src/hooks`, and `src/data` encapsulate state, reusable hooks, and static datasets, respectively.
- `public/` serves static files referenced by Vite; update `index.html` cautiously because it wires global providers.
- API contract helpers are generated via `scripts/types.js` (`pnpm generate:types`). End-to-end stories live in `e2e-tests/` alongside `playwright.config.ts`.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies; use `pnpm` to stay aligned with the lockfile.
- `pnpm dev` — run the Vite dev server (default http://localhost:5173) with hot module reload.
- `pnpm build` — run `tsc` type-checking then `vite build` to emit production assets into `dist/`.
- `pnpm preview` — serve the built bundle for smoke testing.
- `pnpm test:unit` — execute Vitest suites headlessly; add `-- --watch` while developing.
- `pnpm test:e2e` — launch Playwright specs in `e2e-tests/`; configure browsers via `playwright.config.ts`.
- `pnpm lint` / `pnpm format` — enforce ESLint rules and Prettier formatting; both run in pre-commit hooks.

## Coding Style & Naming Conventions
- Prettier is canonical: tabs for indentation, double quotes, `printWidth` 100, and no trailing commas (`.prettierrc`).
- Author React components in PascalCase (`PipelineTimeline.tsx`), hooks in camelCase prefixed with `use`, and utility modules in lower-case dash-separated folders.
- Prefer TypeScript types/interfaces near usage in `src/types` or co-located; flag unused variables with a leading `_` to satisfy ESLint.
- Tailwind classes are auto-sorted by `prettier-plugin-tailwindcss`; favor design tokens provided by `@zenml-io/react-component-library`.

## Testing Guidelines
- Unit tests follow `*.spec.ts[x]` naming and sit beside the code under test. Cover parsing helpers, timeline services, and form logic before merging.
- Snapshot-heavy UI tests belong to Vitest with `@testing-library/react`; reserve Playwright for multi-step user journeys.
- Maintain deterministic data by reusing factories in `src/lib` or exported mocks; reset timers and query caches in test `beforeEach`.

## Commit & Pull Request Guidelines
- Match the existing Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) and include succinct summaries (≤72 characters) with context in the body.
- Reference GitHub issues (`#123`) when applicable and note breaking changes explicitly under a `BREAKING CHANGE:` paragraph.
- Pull requests must describe the change, list verification steps, and attach screenshots or Loom links for UI tweaks. Confirm `pnpm lint`, `pnpm test:unit`, and relevant Playwright runs before requesting review.
- Add reviewers from the owning squad and ensure the target branch aligns with the staging workflow.

## Environment & Configuration
- Copy `.env.example` to `.env.local` before running locally; set `VITE_API_BASE_URL` to your backend instance and keep keys out of version control.
- Regenerate API types after backend schema updates via `pnpm generate:types` so `src/lib/server.ts` stays in sync.
