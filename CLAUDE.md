# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production (runs TypeScript compilation + Vite build)
- `pnpm lint` - Run ESLint with TypeScript support
- `pnpm format` - Format code with Prettier
- `pnpm test:unit` - Run unit tests with Vitest
- `pnpm test:e2e` - Run end-to-end tests with Playwright

### Type Generation
- `pnpm generate:types` - Generate TypeScript types from OpenAPI specs (uses scripts/types.js)

### Package Management
- Uses **pnpm** as package manager, not npm
- Node.js v20 required for development
- Husky pre-commit hooks with lint-staged for automatic formatting/linting

## Architecture Overview

### Core Technologies
- **React 18** with TypeScript
- **Vite** as build tool with SWC for fast compilation
- **React Router v6** for client-side routing
- **TanStack Query** for server state management
- **React Flow** for pipeline DAG visualization
- **Tailwind CSS** for styling with component library `@zenml-io/react-component-library`

### Project Structure
```
src/
├── app/                    # Page components organized by route
├── components/             # Reusable UI components  
├── context/               # React contexts (Auth, Schema, etc.)
├── data/                  # API queries and mutations (TanStack Query)
├── hooks/                 # Custom React hooks
├── layouts/               # Layout components for different page types
├── lib/                   # Utility functions and constants
├── router/                # React Router configuration
└── types/                 # TypeScript type definitions
```

### Key Architectural Patterns

#### API Layer
- Centralized API paths in `src/data/api.ts`
- TanStack Query for data fetching with dedicated query files in `src/data/`
- Environment variable `VITE_API_BASE_URL` configures backend URL

#### Authentication
- JWT-based authentication with refresh tokens
- Auth state managed in `src/context/AuthContext.tsx`
- Protected routes using `withProtectedRoute` HOC

#### Routing Architecture
- Nested layouts for different application areas:
  - `AuthenticatedLayout` - Main app shell with navigation
  - `ProjectTabsLayout` - Project-scoped pages 
  - `NonProjectScopedLayout` - Global pages (stacks, components, settings)
  - `GradientLayout` - Login/signup pages
- Lazy loading for all route components

#### Data Fetching Patterns
- All API calls use TanStack Query
- Query keys and mutations organized by domain in `src/data/`
- Optimistic updates for better UX

#### Component Organization
- Domain-specific components in `src/app/[domain]/`
- Shared components in `src/components/`
- Form handling with React Hook Form + Zod validation
- Dynamic form rendering based on OpenAPI schemas

### Pipeline Visualization
- Uses React Flow for DAG (Directed Acyclic Graph) rendering
- Custom node types for steps and artifacts in `src/components/dag-visualizer/`
- ELK.js for automatic layout computation

### Environment Configuration
Required environment variables:
- `VITE_API_BASE_URL` - ZenML server API URL (must end with `/api/v1`)
- `VITE_FRONTEND_VERSION` - UI version number (optional)
- `VITE_FEATURE_OS_KEY` - Feature flag service key (optional for local dev)

### Build Configuration  
- Vite config includes path alias `@/` → `src/`
- Code splitting for major dependencies (@reactflow, @radix, @tanstack, @react-router)
- SVGR plugin for importing SVG as React components
- Bundle prefetching for optimized loading

### Testing Strategy
- Unit tests with Vitest
- E2E tests with Playwright in `e2e-tests/`
- Test files excluded from build in vite.config.ts

### Integration Notes
- Sister repository to main [ZenML Python package](https://github.com/zenml-io/zenml)
- Dashboard build files bundled into ZenML PyPI package
- Designed to work with ZenML Server backend, not standalone
- Frontend and backend must be on same domain for authentication