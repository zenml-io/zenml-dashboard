# Announcements Preview

A standalone React application for previewing ZenML announcement JSON files before pushing them to production. This tool allows internal ZenML developers to validate and preview announcements with the exact same styling as the main dashboard.

## Features

- **Live JSON Editor**: Edit JSON directly with Monaco Editor and syntax highlighting
- **File Upload**: Drag-and-drop or click to upload JSON files
- **Real-time Validation**: Instant schema validation with clear error messages
- **Live Preview**: See exactly how announcements will appear in the dashboard
- **Exact Styling**: Uses the same components and styles as the ZenML dashboard

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory.

## Deployment to Next.js

This application can be deployed as a standalone static site or integrated into a Next.js application. Here are two approaches:

### Option 1: Deploy as Static Site (Recommended)

Since this is a standalone Vite app, you can deploy it as a static site using Next.js static export or any static hosting service.

#### Using Next.js Static Export

1. Create a new Next.js project (or use an existing one):
```bash
npx create-next-app@latest announcements-preview-nextjs
cd announcements-preview-nextjs
```

2. Copy the built files from this app:
```bash
# After running `pnpm build` in this directory
cp -r ../announcements-preview/dist/* ./public/
```

3. Or, configure Next.js to serve static files from a subdirectory:
   - Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  // Serve static files from public directory
  assetPrefix: process.env.NODE_ENV === 'production' ? '/announcements-preview' : '',
}

module.exports = nextConfig
```

4. Build and export:
```bash
npm run build
```

5. Deploy the `out/` directory to your hosting service (Vercel, Netlify, etc.)

### Option 2: Integrate into Existing Next.js App

If you want to integrate this into an existing Next.js application:

1. Copy the source files to your Next.js project:
```bash
# Copy components
cp -r src/components ./your-nextjs-app/components/announcements-preview
cp -r src/lib ./your-nextjs-app/lib/announcements-preview
cp -r src/assets ./your-nextjs-app/public/assets/announcements-preview
cp src/data/sample-announcements.json ./your-nextjs-app/public/data/
```

2. Create a Next.js page (e.g., `pages/announcements-preview.tsx` or `app/announcements-preview/page.tsx`):

**For Pages Router:**
```typescript
// pages/announcements-preview.tsx
import dynamic from 'next/dynamic'

const AnnouncementsPreview = dynamic(() => import('@/components/announcements-preview/App'), {
  ssr: false
})

export default function AnnouncementsPreviewPage() {
  return <AnnouncementsPreview />
}
```

**For App Router:**
```typescript
// app/announcements-preview/page.tsx
'use client'

import { App } from '@/components/announcements-preview/App'

export default function AnnouncementsPreviewPage() {
  return <App />
}
```

3. Install required dependencies in your Next.js project:
```bash
pnpm add @zenml-io/react-component-library @monaco-editor/react react-markdown remark-gfm zod
pnpm add -D tailwindcss @tailwindcss/typography @tailwindcss/forms @tailwindcss/container-queries tailwindcss-animate
```

4. Configure Tailwind CSS in your Next.js project to include the ZenML preset:
```javascript
// tailwind.config.js
import { zenmlPreset } from "@zenml-io/react-component-library/tailwind";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@zenml-io/react-component-library/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [zenmlPreset],
  // ... rest of your config
}
```

5. Add the required CSS imports to your global styles:
```css
/* app/globals.css or styles/globals.css */
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Option 3: Deploy to Vercel (Easiest)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Build the app:
```bash
pnpm build
```

3. Deploy:
```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Option 4: Deploy to GitHub Pages

1. Install `gh-pages`:
```bash
pnpm add -D gh-pages
```

2. Update `package.json`:
```json
{
  "scripts": {
    "predeploy": "pnpm build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/announcements-preview"
}
```

3. Deploy:
```bash
pnpm deploy
```

## Configuration

### Environment Variables

No environment variables are required for basic usage. The app is fully client-side.

### Customization

- **Sample Data**: Edit `src/data/sample-announcements.json` to change the default sample data
- **Styling**: The app uses the ZenML component library preset. Customize via Tailwind config if needed
- **Schema**: Modify `src/lib/schema.ts` to update the announcement schema validation

## Usage

1. **Load Sample Data**: The app loads with sample announcements by default
2. **Edit JSON**: Use the Monaco editor on the left to edit the JSON directly
3. **Upload File**: Click "Upload File" or drag-and-drop a JSON file
4. **Format JSON**: Click "Format JSON" to beautify the JSON
5. **Preview**: See the live preview on the right side
6. **Validation**: Any validation errors will appear above the preview panel

## Project Structure

```
announcements-preview/
├── src/
│   ├── components/
│   │   ├── EditorPanel.tsx       # JSON editor with file upload
│   │   ├── PreviewPanel.tsx      # Preview container
│   │   ├── ValidationErrors.tsx  # Error display
│   │   ├── Markdown.tsx          # Markdown renderer
│   │   ├── DisplayDate.tsx       # Date formatter
│   │   └── announcements/       # Announcement components
│   ├── lib/
│   │   ├── schema.ts             # Zod schema definitions
│   │   ├── validation.ts         # Validation logic
│   │   └── utils.ts             # Utility functions
│   ├── data/
│   │   └── sample-announcements.json
│   ├── assets/
│   │   ├── icons/                # SVG icons
│   │   └── styles/
│   │       └── index.css         # Global styles
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## Troubleshooting

### Monaco Editor not loading
- Ensure `monaco-editor` is installed as a peer dependency
- Check browser console for errors

### Styles not matching dashboard
- Verify `@zenml-io/react-component-library` version matches the main dashboard
- Check that Tailwind preset is correctly configured
- Ensure fonts are loaded (`@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono`)

### Build errors
- Clear `node_modules` and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Check Node.js version compatibility

## License

Same as the ZenML dashboard project.

