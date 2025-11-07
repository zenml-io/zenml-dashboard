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

## Deployment

### Deploy to GitHub Pages (Recommended)

The easiest way to deploy this app:

1. Update `package.json` with your GitHub username and repo:
```json
{
  "homepage": "https://yourusername.github.io/announcements-preview"
}
```

2. Add deploy script to `package.json`:
```json
{
  "scripts": {
    "deploy": "pnpm build && gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
pnpm deploy
```

That's it! Your app will be live at `https://yourusername.github.io/announcements-preview`

### Deploy to Vercel

Even easier - just connect your GitHub repo to Vercel:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect it's a Vite app and deploy it

Or use the CLI:
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

Drag and drop the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop) after running:
```bash
pnpm build
```

## Usage

1. **Edit JSON**: Use the Monaco editor on the left to edit JSON directly
2. **Upload File**: Click "Upload File" or drag-and-drop a JSON file
3. **Format JSON**: Click "Format JSON" to beautify the JSON
4. **Preview**: See the live preview on the right side
5. **Validation**: Any errors will appear above the preview panel

## Customization

- **Sample Data**: Edit `src/data/sample-announcements.json` to change default sample data
- **Schema**: Modify `src/lib/schema.ts` to update validation rules

## Troubleshooting

**Build errors?** Try:
```bash
rm -rf node_modules pnpm-lock.yaml && pnpm install
```

**Styles look wrong?** Make sure `@zenml-io/react-component-library` version matches the main dashboard.

