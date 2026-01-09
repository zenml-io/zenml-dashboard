# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands

```bash
pnpm install          # Install dependencies (uses pnpm, not yarn!)
pnpm dev             # Start development server (default port 5173)
pnpm build           # Build for production (tsc + vite build)
pnpm lint            # Run ESLint
pnpm format          # Format code with Prettier
```

### Testing

```bash
pnpm test:unit       # Run unit tests with Vitest
pnpm test:e2e        # Run e2e tests with Playwright
```

### Type Generation

```bash
pnpm generate:types -- <baseurl>  # Generate TypeScript types from OpenAPI/Swagger
```

Example: `pnpm generate:types -- http://localhost:8237` (point it at whichever ZenML server instance is running).

This script fetches `/openapi.json` from the server and generates `src/types/core.ts` using openapi-typescript. Data models come from the `components` namespace, while query params live under `operations`. Store the outputs under `src/types`, prefer `type` aliases over `interface` (reserve interfaces for the rare inheritance case), and never fall back to `any`.

### Running Tests

**Single unit test file:**

```bash
pnpm vitest run src/lib/forms.spec.ts
```

**Watch mode for unit tests:**

```bash
pnpm vitest watch
```

**Single e2e test file:**

```bash
pnpm playwright test e2e-tests/example.spec.ts
```

## General OSS Practices

- The dashboard is a pure Vite SPA—everything runs client-side, so no SSR plumbing is required.
- Routing flows through `react-router-dom`; keep navigation centralized in router helpers rather than ad-hoc history calls.
- The OSS dashboard ships alongside the FastAPI ZenML server, so API requests always target the paired backend domain using shared cookies.
- Avoid duplicating code or inventing hyper-generic abstractions: inspect existing flows (and `zenml-cloud-ui`) before writing new components or helpers.
- Prefer focused components over catch-all versions; duplicating two purposeful components is often clearer than a single complex abstraction.

## Environment Configuration

Required environment variables (see `.env.example`):

```bash
VITE_API_BASE_URL=http://localhost:8080/api/v1  # ZenML Server API endpoint
VITE_FRONTEND_VERSION=v0.17.0                   # Optional: UI version number
VITE_REO_KEY=<key>                              # Optional: Reo analytics key
```

**Important:** The frontend and server must be on the same domain (e.g., `localhost`) for authentication to work correctly. The dashboard uses `credentials: "include"` for cookie-based auth.

## Architecture Overview

### Technology Stack

- **Framework:** Vite + React 18 (SPA)
- **Routing:** React Router v6 with lazy-loaded routes
- **Data Fetching:** TanStack Query (React Query) v5
- **Forms:** React Hook Form + Zod validation
- **Styling:** Tailwind CSS + Tailwind plugins (forms, typography, container-queries)
- **UI Components:** @zenml-io/react-component-library; Radix UI primitives where needed
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Type Safety:** TypeScript (strict mode) with generated types from OpenAPI

### Project Structure

```
src/
├── app/                 # Page components organized by route
│   ├── pipelines/      # Pipeline list and detail pages
│   ├── runs/           # Run list and detail pages
│   ├── stacks/         # Stack management pages
│   ├── components/     # Stack component pages
│   └── settings/       # Settings pages (secrets, connectors, etc.)
├── components/          # Reusable UI components
├── layouts/            # Layout wrappers (authenticated, gradient, project-scoped)
├── data/               # Data fetching layer (React Query hooks and fetchers)
├── types/              # TypeScript types (generated and custom)
├── lib/                # Utility functions and business logic
├── context/            # Gloabl and reused React contexts (Auth, Schema, Wizard, etc.)
├── router/             # Router configuration and route definitions
├── hooks/              # Custom React hooks
└── assets/             # Icons, images, and global styles
```

- Route folders mirror URL paths; dynamic segments use square brackets (e.g., `src/app/stacks/[stackId]/page.tsx`).
- Each page exports a default component from `page.tsx`. Page-specific components can live beside the page, while shared components belong under `src/components/`.
- Layouts in `src/layouts` always render `<Outlet />` and are wired through the lazy router.
- Contexts reused across the app belong in `src/context`; page-only contexts/components can stay local to the feature directory.
- Utilities live under `src/lib/<topic>/` and should ship with matching `*.spec.ts` coverage to keep business logic testable.
- Assets (icons/images) live in `src/assets` and can be imported as React components via SVGR. `src/contents` is legacy static copy—avoid expanding it unless absolutely required.

### Data Fetching Pattern

All API interactions follow a consistent pattern using TanStack Query:

1. **Query files** (e.g., `pipeline-run-detail-query.ts`) export:

   - `getXQueryKey()` - Query key factory function
   - `fetchX()` - Async fetcher function
   - `useX()` - React Query hook

2. **Example pattern:**

```typescript
// Query key factory
export function getPipelineRunDetailQueryKey({ runId, queryParams }) {
  return ["runs", runId, queryParams];
}

// Fetcher function
export async function fetchPipelineRun({ runId, queryParams }) {
  const url = createApiPath(apiPaths.runs.detail(runId));
  const res = await fetcher(url, { method: "GET" });
  if (!res.ok) throw new FetchError({ ... });
  return res.json();
}

// Hook
export function usePipelineRun(params, options) {
  return useQuery({
    queryKey: getPipelineRunDetailQueryKey(params),
    queryFn: () => fetchPipelineRun(params),
    ...options
  });
}
```

3. **API paths** are centralized in `src/data/api.ts`
4. **Custom fetcher** in `src/data/fetch.ts` adds `credentials: "include"` and `Source-Context: "dashboard-v2"` header

Additional guardrails:

- Store exactly one request per endpoint under `src/data/<resource>/`. Use the folder's `index.ts` to re-export query options.
- All fetchers must call the shared `fetcher` helper so cookies, headers, and context are set consistently.
- Match query keys to the API path: list queries look like `["stacks", params]`, detail queries `["stacks", stackId, params?]`. Pass query params as optional, strongly typed objects from `src/types`.
- Mutations live beside their resource queries, export their helpers directly, and must invalidate relevant query keys.
- Never duplicate requests—extend existing hooks or helpers before adding a new file.

### Routing Architecture

- Routes defined in `src/router/Router.tsx` using React Router's data router
- Lazy loading for all page components to optimize bundle size
- Protected routes wrapped with `withProtectedRoute()` HOC
- Loaders used for data prefetching (`rootLoader`, `authenticatedLayoutLoader`)
- Error boundaries at root and page level (`RootBoundary`, `PageBoundary`)
- Route paths are centralized in `src/router/routes.tsx`; do not hard-code literal href strings outside that helper.

### Layouts & Pages

- Every route folder under `src/app/` mirrors the URL shape; dynamic params use `[paramName]` directories.
- Each page exports a default component from `page.tsx`. Keep page-only helpers beside that file; promote reusable pieces to `src/components/`.
- Layout components in `src/layouts` must render `<Outlet />` and are lazy-loaded through `src/router/Router.tsx`.
- The router lazily imports page modules; follow that pattern for any new top-level or nested routes.

### Path Aliasing

The codebase uses `@/*` as an alias for `src/*`:

```typescript
import { useAuthContext } from "@/context/AuthContext";
import { fetcher } from "@/data/fetch";
```

Configured in both `tsconfig.json` and `vite.config.ts`.

### Authentication

Authentication state is managed via:

- Cookie-based authentication with the ZenML Server
- `AuthContext` in `src/context/AuthContext.tsx`
- Session helpers in `src/lib/sessions.ts`
- Protected routes check auth state before rendering

### Form Handling

Forms use React Hook Form + Zod for validation:

- Dynamic form generation from JSON Schema (see `src/lib/forms.ts`)
- Schema-to-Zod conversion for service connectors and stack components
- Form components in `src/components/form/`

### Code Chunking

Vite build is configured to split chunks by library:

- `@reactflow` - DAG visualization
- `@radix` - UI primitives
- `@tanstack` - React Query
- `@react-router` - Router and navigation

### TypeScript Configuration

- Strict mode enabled
- No unused locals/parameters
- `bundler` module resolution
- All files must pass type checking before build

### Components & Styling

- Reach for primitives in `@zenml-io/react-component-library` first; use Radix UI primitives only when the component library does not cover the need.
- Components that serve as primitives should accept transient props via `HTMLAttributes` so consumers can pass native attributes/refs.
- Organize shared components by context under `src/components/<context>/` and avoid barrel exports unless necessary.
- It's fine to colocate component-specific TypeScript helpers or contexts under `src/components` alongside the component; reserve `src/lib` for global/shared helpers.
- Icons and illustrations live in `src/assets` and can be imported as React components via SVGR; avoid pulling from `lucide-react`.
- Keep Tailwind utility classes; Prettier (with the Tailwind plugin) auto-sorts them.
- Prefer focused components over overly generic abstractions.

### Coding Conventions

- Define React components with `function` declarations instead of arrow functions.
- Remove `console.log` debugging before committing.
- Use `useMemo`/`useCallback` to stabilize expensive derived data or callback props, but do so intentionally.
- Stick to strict typing: no `any`, prefer `type` aliases, and colocate types near usage or under `src/types` (with `components` vs `operations` imports as appropriate).

## Testing Guidelines

### Unit Tests

- Located alongside source files with `.spec.ts` extension
- Use Vitest for running tests
- Focus on utility functions in `src/lib/`
- Example files: `forms.spec.ts`, `search.spec.ts`, `user.spec.ts`
- Only test TypeScript business logic—avoid dedicated React component harnesses and instead pull logic into `.ts` helpers.

### E2E Tests

- Located in `e2e-tests/` directory
- Use Playwright for browser automation
- Test against built preview server (port 4173)
- Configured to run on chromium, firefox, and webkit

### Error Handling & Analytics

- Use the `isError` flag returned by queries for lightweight error states, and wrap failure-prone visualizations with `react-error-boundary`.
- Throw a `not-found` error for 404s and set `throwOnError` on the query so React Router error boundaries can capture it.
- Analytics events route through the ZenML Analytics Server (not Segment); coordinate new events with backend partners and guard each emission with `serverInfo.analytics_enabled`.

## Important Constraints

1. **Same-domain requirement:** Frontend and API must be on the same domain for authentication
2. **Bundle size:** Build files are bundled into the Python package, so bundle size matters
3. **No standalone use:** This dashboard is designed to work with the ZenML Server backend
4. **Backwards compatibility:** Consider that users may be running different ZenML Server versions
5. **Scope: Workspace-level resources only:** This dashboard implements workspace-level service accounts. User-level API keys are out of scope for this repository.
6. **OSS vs Pro parity:** The OSS dashboard intentionally omits list filtering, tagging, model/artifact management, and UI-triggered snapshot runs. It uniquely supports server activation, user activation, and workspace-level user management, so never promise Pro-only functionality here.

## Assets & Content

- Place all icons/images in `src/assets` and import them as React components via SVGR; reuse existing assets before adding new ones.
- `src/contents` stores legacy static text blocks—avoid extending it unless a piece of copy truly must be centralized.

## Backend & Analytics Coupling

- The dashboard is deployed together with the FastAPI backend, so API requests always go to its paired server using shared credentials.
- Analytics runs through the ZenML Analytics Server. Coordinate new events with backend owners and wrap every emission in a `serverInfo.analytics_enabled` check.

## Working with AI Coding Assistants

When using AI tools with this codebase:

### Provide Context

1. Reference existing implementations for similar features
2. Point to the data fetching patterns in `src/data/`
3. Note that many patterns are shared with zenml-cloud-ui (check that repo for reference implementations)

### Plan & Review (Agentic Work)
- For non-trivial changes, start with a short Markdown plan/spec (scope, files to touch, similar existing flows, acceptance criteria) and get Julian to review it before implementation.
- **Avoid style thrash:** do not fall into repeated "make it look right" loops of tiny Tailwind/CSS nudges. If you notice multiple iterations where the diff is mostly styling tweaks, stop and re-anchor to the plan and design tokens.
- Ask for a single authoritative reference (screenshot/spec) and explicit acceptance criteria before continuing visual polish. Prefer correcting tokens/variants/layout primitives over adding scattered one-off overrides.
- If a visual change seems to require touching unrelated components or adding arbitrary pixel constants, treat that as a sign the approach is wrong and escalate for human guidance instead of continuing to iterate blindly.

### Common Patterns

- **One-time secrets**: Display token/key once after creation, never show again
- **Query invalidation**: After mutations, invalidate related TanStack Query queries to trigger refetch
- **Component reuse**: Check `src/components/` before creating new components
- **Type safety**: Use generated types from `src/types/core.ts`, avoid `type any`
- **Transient props**: Primitive components should forward `HTMLAttributes` props so callers can pass native attributes/refs.
- **Memoization**: Reach for `useCallback`/`useMemo` to keep props stable when children are memoized.
- **Routing discipline**: Reference `src/router/routes.tsx` helpers instead of hard-coded strings, and mirror URLs with `[param]` directories under `src/app/`.
- **Query hygiene**: Follow the one-request-per-endpoint rule in `src/data/<resource>/` and invalidate keys after mutations.

## Common Patterns

### Adding a new query

1. Create a new file in `src/data/<resource>/`
2. Export query key factory, fetcher, and hook
3. Add API path to `src/data/api.ts`
4. Use the hook in your component

### Adding a new route

1. Add route definition to `src/router/routes.tsx`
2. Create page component in `src/app/<route>/page.tsx`
3. Lazy import in `src/router/Router.tsx`
4. Wrap with `withProtectedRoute()` if authentication required

### Adding a new component

1. Place in `src/components/<category>/`
2. Use Radix UI primitives where possible
3. Style with Tailwind CSS utility classes
4. Export from component file (avoid barrel exports)
5. Prefer focused components, forward transient props where helpful, and remove `console.log` statements once debugging is complete.

## Git Conventions

### PR Titles

- Use plain, descriptive titles without conventional commit prefixes (no `feat:`, `fix:`, `ci:`, etc.)
- Good: "Add workflow to require release label on PRs"
- Bad: "ci: add workflow to require release label on PRs"

### Labels

All PRs should have one of the following release labels:
- `release-notes` - for user-facing changes that should appear in the changelog
- `no-release-notes` - for internal changes (refactoring, tests, CI, etc.)
