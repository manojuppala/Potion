# Potion - Project Summary

## What is Potion?

Potion is a **local-first, Notion-inspired knowledge management application** built with Electron, React, and TypeScript. It provides a rich document editing experience with block-based content, nested pages, and offline-first architecture.

## ✨ Key Features

### Current Features (v0.1.0)
- 📝 **Rich Text Editor** - Block-based editing with TipTap/ProseMirror
- 🎨 **Beautiful Dark UI** - Notion-inspired interface
- 💾 **Local Storage** - All data stored in SQLite database
- ⚡ **Offline-First** - Works completely without internet
- 🔍 **Slash Commands** - Type `/` for quick formatting
- 📁 **Page Management** - Nested pages with sidebar navigation
- ✅ **Task Lists** - Create and manage to-do items
- ⌨️ **Markdown Shortcuts** - `#`, `##`, `-`, `[]` and more

### Coming Soon
- 🔎 Global search with FlexSearch
- 🎯 Command palette (Cmd+K)
- 🗂️ Database views (Table, Kanban, Calendar)
- 📋 Templates system
- 🔗 Backlinks and graph view
- 🎨 Theme customization
- 🔌 Plugin architecture

## 🏗️ Technical Architecture

### Stack
- **Frontend**: React 18 + TypeScript
- **Desktop**: Electron 28
- **Editor**: TipTap + ProseMirror
- **Database**: SQLite (better-sqlite3)
- **State**: Zustand
- **Styling**: Tailwind CSS + shadcn/ui
- **Build**: Vite

### Project Structure
```
potion/
├── electron/              # Electron main & preload processes
│   ├── main.ts           # Main process (DB, IPC, window)
│   └── preload.ts        # IPC bridge
├── src/
│   ├── components/       # React components
│   │   ├── Editor/      # Editor & slash commands
│   │   ├── ui/          # shadcn/ui primitives
│   │   └── Sidebar.tsx  # Navigation sidebar
│   ├── stores/          # Zustand state stores
│   ├── types/           # TypeScript definitions
│   ├── lib/             # Utilities
│   └── App.tsx          # Root component
├── package.json
├── vite.config.ts
└── README.md
```

## 📊 Database Schema

### Tables
1. **pages** - Page metadata, hierarchy, icons
2. **blocks** - Editor content blocks
3. **databases** - Database configurations (future)
4. **database_rows** - Database entries (future)

### Storage Location
- **macOS**: `~/Library/Application Support/potion/`
- **Windows**: `%APPDATA%/potion/`
- **Linux**: `~/.config/potion/`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm or npm

### Quick Start
```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm electron:dev

# Build for production
pnpm electron:build
```

### Usage
1. App launches with a "Getting Started" page
2. Click pages in sidebar to navigate
3. Type `/` to open slash command menu
4. Create new pages with "+ New agent"
5. All changes auto-saved to SQLite

## 🎯 Design Goals

1. **Local-First** - All data stays on your machine
2. **Performance** - Instant startup, smooth editing
3. **Privacy** - No tracking, no cloud (by default)
4. **Extensibility** - Plugin-ready architecture
5. **Type-Safe** - TypeScript strict mode throughout
6. **Keyboard-First** - Optimized for power users
7. **Beautiful** - Clean, minimal, polished UI

## 📚 Documentation

- **[README.md](README.md)** - Main documentation
- **[SETUP.md](SETUP.md)** - Setup and installation guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture
- **[prompt.md](prompt.md)** - Original project specification

## 🛠️ Development

### File Breakdown
- **13 TypeScript files** in `src/`
- **2 Electron process files** in `electron/`
- **7 UI components** (Sidebar, Editor, SlashCommandMenu, etc.)
- **2 Zustand stores** (Workspace, Editor)
- **Type-safe IPC** communication

### Key Technologies
- **TipTap**: Extensible rich-text editor
- **Zustand**: Lightweight state management
- **better-sqlite3**: Fast, synchronous SQLite
- **shadcn/ui**: Beautiful, accessible components
- **Radix UI**: Unstyled, accessible primitives
- **Lucide**: Beautiful icon library

## 🔒 Security

- ✅ Context isolation enabled
- ✅ Sandbox mode enabled
- ✅ No Node integration in renderer
- ✅ Secure IPC via preload script
- ✅ Type-safe IPC contracts

## 📦 Build Output

### Platform Support
- **macOS**: `.dmg` installer
- **Windows**: `.exe` NSIS installer
- **Linux**: `.AppImage`

All built with `electron-builder`.

## 🎨 UI/UX

- **Dark theme** by default
- **Notion-inspired** interface
- **Smooth animations** with Framer Motion
- **Keyboard shortcuts** throughout
- **Responsive** layout
- **Accessible** components

## 🔮 Future Vision

Potion aims to become a full-featured, local-first productivity platform combining:
- The editing experience of **Notion**
- The speed of **Linear**
- The offline reliability of **Obsidian**
- The extensibility of **VSCode**

## 📝 Current Status

**Version**: 0.1.0 (Alpha)  
**Status**: Core features implemented  
**Next**: Search, templates, database views

## 🤝 Contributing

This is currently a demonstration project. Future contributions welcome for:
- Plugin development
- Additional block types
- Database views
- Import/export formats
- Performance optimizations

## 📄 License

MIT

---

**Built with ❤️ following the specifications in [prompt.md](prompt.md)**

For detailed setup instructions, see [SETUP.md](SETUP.md).  
For architecture details, see [ARCHITECTURE.md](ARCHITECTURE.md).
