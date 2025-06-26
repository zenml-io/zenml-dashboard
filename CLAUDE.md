# ZenML Dashboard - Claude Code Configuration

## Project Overview
ZenML Dashboard is a TypeScript React-based application that serves as a companion dashboard for the ZenML MLOps platform. It provides a web interface for managing and visualizing ML pipelines, stacks, artifacts, and other ZenML resources.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **Testing**: Vitest (unit), Playwright (e2e)
- **Linting**: ESLint with TypeScript
- **Formatting**: Prettier

## Development Commands
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Run unit tests
pnpm test:unit

# Run e2e tests
pnpm test:e2e

# Format code
pnpm format

# Generate API types
pnpm generate:types
```

## Project Structure
- `src/app/` - Main application pages and routes
- `src/components/` - Reusable UI components
- `src/data/` - API queries and data fetching logic
- `src/lib/` - Utility functions and helpers
- `src/types/` - TypeScript type definitions
- `src/layouts/` - Layout components
- `e2e-tests/` - Playwright end-to-end tests

## Environment Variables
- `VITE_API_BASE_URL` - ZenML Server API base URL (required)
- `VITE_FEATURE_OS_KEY` - Feature OS key (optional for local dev)
- `VITE_FRONTEND_VERSION` - Frontend version display (optional)

## Key Dependencies
- React Component Library: `@zenml-io/react-component-library`
- Data Fetching: `@tanstack/react-query`
- Tables: `@tanstack/react-table`
- Forms: `react-hook-form` with `@hookform/resolvers`
- Validation: `zod`
- Flow Diagrams: `reactflow`
- Date Handling: Native JS Date (no external library)

## Notes
- Uses pnpm workspaces and package overrides for security
- Integrates with ZenML Server as backend
- Not intended for standalone use
- Build files are bundled into ZenML PyPI package