# Potion Setup Guide

Follow these steps to get Potion running on your machine.

## Quick Start

### 1. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### 2. Run Development Mode

```bash
pnpm electron:dev
```

Or:
```bash
npm run electron:dev
```

This will:
1. Start the Vite development server
2. Launch the Electron app
3. Enable hot-reload for both renderer and main process

### 3. Using the App

Once the app launches:

1. **You'll see a sidebar on the left** with navigation
2. **A "Getting Started" page** will be created automatically
3. **Click anywhere in the editor** and start typing
4. **Press `/`** to open the slash command menu
5. **Create new pages** by clicking "+ New agent" in the sidebar

## Key Features to Try

### Slash Commands
Type `/` and select from:
- Text
- Heading 1, 2, 3, 4
- Bulleted list
- Numbered list
- To-do list
- Toggle list
- Code block
- Divider

### Markdown Shortcuts
- `# ` → Heading 1
- `## ` → Heading 2
- `### ` → Heading 3
- `- ` → Bullet list
- `1. ` → Numbered list
- `[ ] ` → To-do item

### Page Management
- All pages appear in the sidebar
- Click any page to view/edit it
- Pages are automatically saved to SQLite
- Data is stored locally in your user directory

## Development

### Project Structure
```
potion/
├── electron/          # Electron main & preload
├── src/
│   ├── components/   # React components
│   ├── stores/       # Zustand state management
│   ├── types/        # TypeScript types
│   └── lib/          # Utilities
├── package.json
└── vite.config.ts
```

### Available Scripts

- `pnpm dev` - Run Vite dev server only
- `pnpm electron:dev` - Run full Electron app in dev mode
- `pnpm build` - Build for production
- `pnpm electron:build` - Build and package Electron app
- `pnpm lint` - Run ESLint

## Building for Production

To create a distributable app:

```bash
pnpm electron:build
```

This will create platform-specific installers in the `release/` folder:
- **macOS**: `.dmg` file
- **Windows**: `.exe` installer
- **Linux**: `.AppImage`

## Troubleshooting

### Dependencies not installing
Try:
```bash
rm -rf node_modules package-lock.json
pnpm install
```

### Electron won't start
Make sure both the dev server and Electron are starting. Check the terminal output for errors.

### Database errors
The database is created automatically in your user data folder:
- macOS: `~/Library/Application Support/potion/`
- Windows: `%APPDATA%/potion/`
- Linux: `~/.config/potion/`

Delete the `potion.db` file to reset the database.

## Next Steps

Check out the [README.md](README.md) for more information about:
- Architecture
- Roadmap
- Contributing
- Tech stack details

Happy note-taking! 📝
