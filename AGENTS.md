# Repository Guidelines

## General Context

- This is a Vite-powered SPA that runs entirely client-side—no SSR considerations.
- Routing is handled via `react-router-dom`; keep navigation centralized in `src/router` helpers.
- The dashboard ships bundled with the FastAPI-based ZenML server, so API calls always target the paired backend instance with shared credentials.
- Avoid duplicating code: inspect existing implementations (including `zenml-cloud-ui`) before adding new abstractions.

## Project Structure & Module Organization

- Application code lives in `src/`: flows under `src/app`, shared UI in `src/components`, and utilities with co-located specs in `src/lib`.
- Route folders mirror URL paths; dynamic segments use square-bracket names (e.g., `src/app/stacks/[stackId]/page.tsx`). Page-specific components live next to their page files.
- Pages always live inside a `page.tsx` file and must default export the page component.
- Providers (`src/context`), reusable hooks (`src/hooks`), assets (`src/assets`), and seed data (`src/data`) support features; static files ship from `public/`, Playwright suites reside in `e2e-tests/`, and API typings regenerate with `pnpm generate:types`.
- Layouts live in `src/layouts`, always render `<Outlet />`, and are wired through the lazy `src/router/Router.tsx`. Route definitions must be registered in `src/router/routes.tsx`—never hard-code href strings.
- Contexts that are reused belong in `src/context`; page-locked contexts/components can stay beside their usage.
- Global helpers sit in `src/lib` (organized by concern like `src/lib/strings`) and should have matching `*.spec.ts` coverage.

## Build, Test, and Development Commands

- `pnpm install` — install dependencies; always use pnpm to respect the lockfile.
- `pnpm dev` — start the Vite dev server (http://localhost:5173) with hot reload.
- `pnpm build` — run `tsc` and `vite build` into `dist/`; follow with `pnpm preview` for production smoke tests.
- `pnpm test:unit` — execute Vitest suites; add `-- --watch` during local development.
- `pnpm test:e2e` — run Playwright journeys from `e2e-tests/`; tweak device coverage in `playwright.config.ts`.
- `pnpm lint` / `pnpm format` — enforce ESLint and Prettier; both run automatically via Husky pre-commit hooks.
- `pnpm generate:types -- http://localhost:8237` — regenerate OpenAPI-derived types after backend schema changes; ensure the ZenML server is running locally first.

## Coding Style & Naming Conventions

- Prettier governs formatting per the repository's `.prettierrc`; do not override these settings in local editor configurations.
- Define React components with `function` declarations (avoid arrow components) and clean up stray `console.log` statements.
- Use PascalCase components, camelCase hooks prefixed with `use`, and kebab-case shared folders; keep types in `src/types` or beside usage, prefixing unused args with `_`.
- Favor purpose-built components over overly generic abstractions; reuse existing implementations before adding new ones.
- Use transient/`HTMLAttributes` props to forward native attributes when exposing building-block components.
- Add memoization with `useMemo`/`useCallback` when expensive calculations or prop stability matter.
- Tailwind classes auto-sort through `prettier-plugin-tailwindcss`; prefer primitives from `@zenml-io/react-component-library` before writing custom CSS.

## Testing Guidelines

- Place unit specs alongside code as `*.spec.ts[x]`; run them with `pnpm test:unit`. Reuse helpers in `src/lib` so fixtures stay deterministic and reset timers, TanStack Query caches, and mocks in `beforeEach`.
- Only test TypeScript modules—avoid standalone component test harnesses and instead abstract business logic into `.ts` helpers with Vitest coverage.
- Focus Vitest coverage on TS business logic—component-specific behavior should be exercised via page-level integration tests rather than standalone component harnesses.
- Reserve Playwright (`pnpm test:e2e`) for end-to-end flows and smoke coverage; keep component snapshots and accessibility assertions in Vitest using `@testing-library/react`.

## Data Fetching & Mutations

- Use TanStack Query (React Query) v5 for all data access. Requests live in `src/data/<resource>/` and export query key factories, fetchers (using the shared `fetcher`), and hooks.
- Never duplicate API calls—one file per endpoint, with directory `index.ts` files re-exporting all query options for the resource.
- Match query keys to API paths: list keys look like `["stacks", params]`, detail keys like `["stacks", stackId, params?]`. Pass query params as optional typed objects defined under `src/types`.
- Mutations are exported from their module, should invalidate related queries, and must leverage shared API path helpers from `src/data/api.ts`.

## Layouts, Routing & Components

- `src/router/Router.tsx` lazily imports every page. All paths originate from `src/router/routes.tsx`; never inline literal hrefs.
- Layout components in `src/layouts` must wrap children via `<Outlet />` so nested routes render correctly.
- Components reused across flows belong in `src/components/<context>/`. Keep page-only pieces beside the page. Use the `@zenml-io/react-component-library` before reinventing primitives, and prefer icons from `src/assets` (SVGR allows direct React imports).
- Avoid ultra-generic component abstractions; duplicating two focused components is preferable to an unreadable catch-all.
- It's fine to colocate component-specific TypeScript helpers or contexts under `src/components` alongside the component; reserve `src/lib` for global/shared helpers.

## Error Handling & Analytics

- Lean on the `isError` state returned from queries for lightweight error UI, and wrap failure-prone visualizations or flows with `react-error-boundary` components when broader protection is needed.
- Throw a `not-found` error and enable `throwOnError` on queries for 404 scenarios so React Router boundaries can intercept them.
- Analytics events flow through the ZenML Analytics Server. Coordinate new events with the backend team and guard emission behind `serverInfo.analytics_enabled`.

## Assets, Contents & Console Hygiene

- All icons/images live under `src/assets` and can be imported as React components (SVGR setup). Reuse existing assets before adding new ones.
- `src/contents` stores legacy static copy; prefer deriving text from components and avoid growing this folder unless required.
- Remove debug `console` statements before committing.

## Scope Guardrails

- **Workspace-level resources only:** This repo implements workspace-level service accounts. User-level API keys are out of scope.
- **Icons:** Reuse existing icon components; **do not** import from `lucide-react` (AI tools default to this incorrectly).
- **OSS vs Pro:** The OSS dashboard omits list filtering, tagging, models/artifacts, and UI-triggered snapshots, but uniquely supports user/server activation flows and in-workspace user management. Never promise Pro-only abilities here.
- **Backend coupling:** The dashboard is bundled with the FastAPI-based ZenML server—API calls always hit the paired backend domain.

## Common Implementation Patterns

- Reference similar existing features when implementing new ones (check zenml-cloud-ui repo for shared patterns)
- **One-time secrets**: Display token/key once after creation in a dialog, never persist in UI state
- **Query invalidation**: After mutations (create/update/delete), invalidate TanStack Query cache to refetch data
- **Component reuse**: Check `src/components/` for existing patterns before creating new components
- **Type safety**: Use generated types from `src/types/core.ts`, avoid `type any`
- **React Router discipline**: Keep navigation hooked into `src/router/routes.tsx` helpers; lazy routes reside under `src/router/Router.tsx`.
- **Transient props**: Accept and forward `HTMLAttributes` when building primitives so downstream consumers can extend them.
- **Memoization**: Use `useCallback`/`useMemo` where prop stability or expensive derived data matters.

## Commit & Pull Request Guidelines

- Follow Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) with ≤72-character subjects and include issue references (`#123`) when relevant.
- Flag breaking changes under a `BREAKING CHANGE:` paragraph and describe behavioural impacts in the body.
- PRs must outline scope, list verification (`pnpm lint`, `pnpm test:unit`, targeted Playwright runs), and attach screenshots or Looms for UI updates; request reviewers from the owning squad and target the staging branch.

## Environment & Configuration

- Copy `.env.example` to `.env.local`, set `VITE_API_BASE_URL` and related keys, and keep secrets out of git.
- After backend schema updates, rerun `pnpm generate:types` to refresh helpers consumed in `src/lib/server.ts`.
- Types are generated into `src/types`, with data objects coming from the `components` namespace and query params from `operations`. Prefer `type` aliases over `interface` unless inheritance is unavoidable.
