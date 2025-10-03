# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Context

This is the **zenml-dashboard** - the open-source React frontend for ZenML that gets bundled with the ZenML Python package. This lives in a monorepo alongside zenml-cloud-ui (the Pro SaaS offering).

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

Example: `pnpm generate:types -- http://localhost:8080/api/v1`

This script fetches `/openapi.json` from the server and generates `src/types/core.ts` using openapi-typescript.

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

## Environment Configuration

Required environment variables (see `.env.example`):

```bash
VITE_API_BASE_URL=http://localhost:8080/api/v1  # ZenML Server API endpoint
VITE_FRONTEND_VERSION=v0.17.0                   # Optional: UI version number
VITE_FEATURE_OS_KEY=<key>                       # Optional: Feature flag service key
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
- **UI Components:** Radix UI primitives
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
├── context/            # React contexts (Auth, Schema, Wizard, etc.)
├── router/             # Router configuration and route definitions
├── hooks/              # Custom React hooks
└── assets/             # Icons, images, and global styles
```

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

### Routing Architecture

- Routes defined in `src/router/Router.tsx` using React Router's data router
- Lazy loading for all page components to optimize bundle size
- Protected routes wrapped with `withProtectedRoute()` HOC
- Loaders used for data prefetching (`rootLoader`, `authenticatedLayoutLoader`)
- Error boundaries at root and page level (`RootBoundary`, `PageBoundary`)
- Route paths centralized in `src/router/routes.tsx`

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

## Testing Guidelines

### Unit Tests
- Located alongside source files with `.spec.ts` extension
- Use Vitest for running tests
- Focus on utility functions in `src/lib/`
- Example files: `forms.spec.ts`, `search.spec.ts`, `user.spec.ts`

### E2E Tests
- Located in `e2e-tests/` directory
- Use Playwright for browser automation
- Test against built preview server (port 4173)
- Configured to run on chromium, firefox, and webkit

## Important Constraints

1. **Same-domain requirement:** Frontend and API must be on the same domain for authentication
2. **Bundle size:** Build files are bundled into the Python package, so bundle size matters
3. **No standalone use:** This dashboard is designed to work with the ZenML Server backend
4. **Backwards compatibility:** Consider that users may be running different ZenML Server versions

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
