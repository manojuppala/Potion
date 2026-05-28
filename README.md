# Potion

A local-first knowledge management and document editing application inspired by Notion, built with Electron, React, and TypeScript.

## Features

- 📝 **Rich Text Editing** - Block-based editor powered by TipTap/ProseMirror
- 💾 **Local-First** - All data stored locally using SQLite
- 🎨 **Beautiful UI** - Dark mode interface inspired by Notion
- ⚡ **Fast & Offline** - Works completely offline with instant performance
- 🔍 **Slash Commands** - Type `/` to access formatting options
- 📁 **Page Organization** - Nested pages with sidebar navigation
- ✅ **Task Lists** - Create and manage to-do lists
- 🎯 **Keyboard-First** - Optimized for keyboard navigation

## Tech Stack

- **Electron** - Desktop application framework
- **React 18** - UI framework
- **TypeScript** - Type safety
- **TipTap** - Rich text editor
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **SQLite** - Local database (better-sqlite3)
- **Vite** - Build tool
- **shadcn/ui** - UI components

## Getting Started

### Prerequisites

⚠️ **First-time setup?** If you don't have Node.js installed yet, see [INSTALL_PREREQUISITES.md](INSTALL_PREREQUISITES.md) for detailed installation instructions.

**Required:**

- Node.js 18+
- npm (comes with Node.js)

**Optional:**

- yarn (alternative to npm, currently used in this project)

### Installation

**Step 1: Install Node.js**

If you don't have Node.js installed:

- **macOS**: `brew install node` (if you have Homebrew)
- **Windows/macOS/Linux**: Download from [nodejs.org](https://nodejs.org/)

Verify installation:

```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

**Step 2: Install Dependencies**

```bash
# Using yarn (recommended)
yarn install

# OR using npm (comes with Node.js)
npm install
```

**Step 3: Run the Development Server**

```bash
# Using yarn (recommended)
yarn electron:dev

# OR using npm
npm run electron:dev
```

This will start both the Vite dev server and Electron application.

**Troubleshooting:** If you get errors, see [INSTALL_PREREQUISITES.md](INSTALL_PREREQUISITES.md)

### Building

To build the application for production:

```bash
# Using yarn (recommended)
yarn electron:build

# OR using npm
npm run electron:build
```

This will create distributable packages in the `release` folder for your platform.

## Project Structure

```
potion/
├── electron/           # Electron main process
│   ├── main.ts        # Main process entry
│   └── preload.ts     # Preload script (IPC bridge)
├── src/
│   ├── components/    # React components
│   │   ├── Editor/   # Editor components
│   │   ├── ui/       # UI primitives
│   │   └── Sidebar.tsx
│   ├── stores/       # Zustand state stores
│   ├── types/        # TypeScript types
│   ├── lib/          # Utilities
│   ├── App.tsx       # Main app component
│   └── main.tsx      # React entry point
├── index.html
├── vite.config.ts
└── package.json
```

## Usage

### Creating Pages

- Click "New agent" or any page in the sidebar
- Pages are automatically saved to the local SQLite database

### Using the Editor

- **Type `/`** to open the slash command menu
- **Select formatting** from the menu or use markdown shortcuts:
  - `# ` for Heading 1
  - `## ` for Heading 2
  - `- ` for bullet list
  - `1. ` for numbered list
  - `[ ] ` for to-do list

### Keyboard Shortcuts

- **Cmd/Ctrl + K** - Command palette (coming soon)
- **/** - Open slash command menu
- **Esc** - Close menus

## Database Schema

The app uses SQLite with the following tables:

- **pages** - Store page metadata and hierarchy
- **blocks** - Store editor content blocks
- **databases** - Store database configurations (coming soon)
- **database_rows** - Store database entries (coming soon)

All data is stored locally in your user data directory:

- macOS: `~/Library/Application Support/potion/`
- Windows: `%APPDATA%/potion/`
- Linux: `~/.config/potion/`

## Roadmap

- [x] Basic editor with block support
- [x] Page management
- [x] Sidebar navigation
- [x] Slash commands
- [ ] Database views (table, kanban, calendar)
- [ ] Global search
- [ ] Command palette
- [ ] Templates
- [ ] Import/export (Markdown, HTML)
- [ ] Plugin system
- [ ] Real-time collaboration (future)

## Development

### Running Tests

```bash
pnpm test
```

### Linting

```bash
yarn lint
```

## License

MIT

## Acknowledgments

Inspired by Notion, Obsidian, and other excellent note-taking applications.
