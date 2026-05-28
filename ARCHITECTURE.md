# Potion Architecture

This document outlines the architecture and design decisions for Potion.

## Overview

Potion is a local-first, Notion-inspired knowledge management application built with Electron, React, and TypeScript. The architecture prioritizes:

1. **Local-first operation** - All data stored and processed locally
2. **Performance** - Fast startup, instant saves, smooth editing
3. **Offline capability** - No internet required
4. **Type safety** - TypeScript throughout
5. **Extensibility** - Plugin-ready architecture

## System Architecture

### Three-Process Model

```
┌─────────────────────────────────────────────┐
│           Main Process (Node.js)            │
│  - Window management                        │
│  - Database operations (SQLite)             │
│  - File system access                       │
│  - IPC handlers                             │
└──────────────────┬──────────────────────────┘
                   │ IPC (Secure)
┌──────────────────┴──────────────────────────┐
│          Preload Script (Bridge)            │
│  - Exposes safe APIs to renderer            │
│  - Context isolation                        │
│  - Type-safe IPC contracts                  │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────┴──────────────────────────┐
│        Renderer Process (React)             │
│  - User interface                           │
│  - Editor (TipTap/ProseMirror)              │
│  - State management (Zustand)               │
│  - UI components (shadcn/ui)                │
└─────────────────────────────────────────────┘
```

## Data Layer

### Database Schema

**SQLite** database with the following tables:

#### Pages Table

```sql
CREATE TABLE pages (
  id TEXT PRIMARY KEY,
  parent_id TEXT,
  title TEXT,
  icon TEXT,
  cover TEXT,
  created_at INTEGER,
  updated_at INTEGER,
  deleted INTEGER DEFAULT 0
);
```

#### Blocks Table

```sql
CREATE TABLE blocks (
  id TEXT PRIMARY KEY,
  page_id TEXT,
  parent_block_id TEXT,
  type TEXT,
  content TEXT,
  position REAL,
  props TEXT,
  created_at INTEGER,
  updated_at INTEGER
);
```

### Data Flow

1. **User Action** → React Component
2. **Component** → Zustand Store Action
3. **Store** → IPC Call to Main Process
4. **Main Process** → SQLite Database
5. **Database** → Response via IPC
6. **Store Update** → React Re-render

## State Management

### Zustand Stores

**WorkspaceStore** (`useWorkspaceStore`)

- Manages pages, navigation, favorites
- Handles CRUD operations for pages
- Tracks current page and recent pages

**EditorStore** (`useEditorStore`)

- Manages blocks and editor state
- Handles block selection
- Controls command menu visibility

## Editor Architecture

### TipTap/ProseMirror Stack

```
User Input
    ↓
TipTap Extensions
    ↓
ProseMirror Schema
    ↓
Document State
    ↓
React Renderer
```

### Block Types

- Paragraph
- Headings (H1-H4)
- Lists (Bullet, Numbered, Task)
- Code blocks
- Dividers
- Quotes
- Toggle blocks (future)

### Slash Commands

Triggered by `/` character, provides:

- Block type conversion
- Quick formatting
- Content insertion
- Plugin actions (future)

## Security

### Electron Security Best Practices

✅ **Enabled:**

- `contextIsolation: true`
- `sandbox: true`
- `nodeIntegration: false`
- Preload scripts for IPC bridging
- CSP policies

❌ **Disabled:**

- Remote module
- Direct Node.js access from renderer
- `nodeIntegration`

### IPC Communication

All IPC calls are:

- Type-safe (TypeScript interfaces)
- Validated in main process
- Sandboxed in renderer
- Exposed only via preload script

## Performance Optimizations

### Current

1. **Debounced autosave** - Batch writes to database
2. **Indexed queries** - SQLite indexes on foreign keys
3. **React.memo** - Prevent unnecessary re-renders
4. **Lazy loading** - Code splitting where beneficial

### Future

1. **Virtualization** - For large documents (TanStack Virtual)
2. **Worker threads** - Heavy computations
3. **Incremental search** - FlexSearch integration
4. **Prepared statements** - Faster database queries

## File Structure

```
potion/
├── electron/
│   ├── main.ts           # Main process entry
│   └── preload.ts        # Preload/IPC bridge
├── src/
│   ├── components/
│   │   ├── Editor/       # Editor components
│   │   │   ├── Editor.tsx
│   │   │   ├── SlashCommandMenu.tsx
│   │   │   └── GettingStartedContent.tsx
│   │   ├── ui/           # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   └── scroll-area.tsx
│   │   └── Sidebar.tsx   # Main sidebar
│   ├── stores/           # Zustand stores
│   │   ├── useWorkspaceStore.ts
│   │   └── useEditorStore.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── lib/              # Utilities
│   │   └── utils.ts
│   ├── App.tsx           # Root component
│   ├── main.tsx          # React entry
│   └── index.css         # Global styles
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## Future Enhancements

### Phase 1 (Current)

- ✅ Basic editor
- ✅ Page management
- ✅ Sidebar navigation
- ✅ Slash commands

### Phase 2 (Next)

- [ ] Command palette (Cmd+K)
- [ ] Global search
- [ ] Templates
- [ ] Drag & drop blocks
- [ ] Page hierarchy in sidebar

### Phase 3

- [ ] Database views (Table, Kanban, Calendar)
- [ ] Property types
- [ ] Filtering & sorting
- [ ] Formulas

### Phase 4

- [ ] Plugin system
- [ ] Import/export (Markdown, HTML, PDF)
- [ ] Themes & customization
- [ ] Backlinks & graph view

### Phase 5 (Future)

- [ ] Real-time collaboration (CRDT)
- [ ] Cloud sync (optional)
- [ ] Mobile companion app
- [ ] AI features

## Design Principles

1. **Local-first** - Never require internet
2. **Performance** - Instant startup, smooth editing
3. **Type-safe** - TypeScript strict mode
4. **Accessible** - Keyboard navigation, ARIA labels
5. **Extensible** - Plugin architecture
6. **Privacy** - All data stays local by default
7. **Reliability** - Crash recovery, autosave

## Technology Choices

### Why Electron?

- Cross-platform desktop support
- Native file system access
- Local database access (SQLite)
- Mature ecosystem

### Why React?

- Large ecosystem
- Excellent TypeScript support
- Fast development with Vite
- Component reusability

### Why TipTap?

- Built on ProseMirror (battle-tested)
- Extensible architecture
- Great TypeScript support
- Collaboration-ready

### Why SQLite?

- Reliable and mature
- Zero-config embedded database
- Fast for local operations
- Transactional integrity

### Why Zustand?

- Lightweight state management
- Simple API
- TypeScript-friendly
- No boilerplate

## Testing Strategy

### Unit Tests (Future)

- Component testing with Vitest
- Store testing
- Utility functions

### Integration Tests (Future)

- IPC communication
- Database operations
- Editor interactions

### E2E Tests (Future)

- Playwright for full app testing
- Critical user flows
- Cross-platform testing

## Build & Distribution

### Development

```bash
yarn electron:dev
```

### Production Build

```bash
yarn electron:build
```

### Targets

- macOS: DMG installer
- Windows: NSIS installer
- Linux: AppImage
