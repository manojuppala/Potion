# Potion - Claude AI Context Document

This document provides comprehensive context about the Potion project for AI assistants (like Claude) to understand the codebase and help with development.

## Project Overview

**Potion** is a local-first, Notion-inspired knowledge management and document editing application built with Electron, React, and TypeScript.

### Key Characteristics

- **Local-first**: All data stored in SQLite, works completely offline
- **Block-based editor**: Similar to Notion's editing experience
- **Desktop application**: Cross-platform via Electron
- **Type-safe**: TypeScript strict mode throughout
- **Modern stack**: React 18, Vite, Tailwind CSS, TipTap

## Architecture Overview

### Three-Layer Architecture

```
┌─────────────────────────────────────┐
│   Electron Main Process (Node.js)   │
│   - SQLite database operations      │
│   - IPC handlers                    │
│   - Window management               │
└──────────────┬──────────────────────┘
               │ Secure IPC
┌──────────────┴──────────────────────┐
│   Preload Script (Context Bridge)   │
│   - Type-safe IPC contracts         │
│   - Exposes safe APIs               │
└──────────────┬──────────────────────┘
               │
┌──────────────┴──────────────────────┐
│   Renderer Process (React)          │
│   - UI components                   │
│   - TipTap editor                   │
│   - Zustand state management        │
└─────────────────────────────────────┘
```

### Database Schema

**SQLite** with 4 main tables:

```sql
-- Pages: Document hierarchy
pages (id, parent_id, title, icon, cover, created_at, updated_at, deleted)

-- Blocks: Editor content
blocks (id, page_id, parent_block_id, type, content, position, props, created_at, updated_at)

-- Databases: Future database views
databases (id, page_id, schema_json, created_at, updated_at)

-- Database rows: Future database entries
database_rows (id, database_id, values_json, created_at, updated_at)
```

## Tech Stack

### Core Technologies

- **Electron 28**: Desktop app framework
- **React 18**: UI library (functional components + hooks)
- **TypeScript 5.3**: Strict mode enabled
- **Vite 5**: Build tool and dev server
- **TipTap 2.1**: Rich text editor (built on ProseMirror)
- **better-sqlite3 9.2**: Synchronous SQLite database
- **Zustand 4.4**: Lightweight state management
- **Tailwind CSS 3.4**: Utility-first styling
- **shadcn/ui**: Accessible UI components (Radix UI based)

### Key Dependencies

```json
{
  "editor": ["@tiptap/react", "@tiptap/starter-kit", "prosemirror"],
  "ui": ["@radix-ui/*", "tailwindcss", "lucide-react", "framer-motion"],
  "state": ["zustand"],
  "database": ["better-sqlite3"],
  "utils": ["nanoid", "clsx", "tailwind-merge"]
}
```

## File Structure

```
potion/
├── electron/                   # Electron processes
│   ├── main.ts                # Main process entry (database, IPC, windows)
│   └── preload.ts             # IPC bridge (context isolation)
│
├── src/
│   ├── components/
│   │   ├── Editor/
│   │   │   ├── Editor.tsx              # Main TipTap editor component
│   │   │   ├── SlashCommandMenu.tsx    # Slash command interface
│   │   │   └── GettingStartedContent.tsx # Default page content
│   │   ├── ui/                          # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   └── scroll-area.tsx
│   │   └── Sidebar.tsx                  # Navigation sidebar
│   │
│   ├── stores/
│   │   ├── useWorkspaceStore.ts  # Pages, navigation, favorites
│   │   └── useEditorStore.ts     # Blocks, selection, command menu
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   │
│   ├── lib/
│   │   └── utils.ts              # Helper functions (cn, etc.)
│   │
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles + Tailwind
│
├── package.json                  # Dependencies + scripts
├── vite.config.ts               # Vite + Electron plugin config
├── tsconfig.json                # TypeScript configuration
└── tailwind.config.js           # Tailwind theme
```

## Key Concepts

### 1. IPC Communication Pattern

All database operations go through secure IPC:

```typescript
// Renderer → Main Process
const pages = await window.electronAPI.getPages();

// Preload (electron/preload.ts) exposes:
contextBridge.exposeInMainWorld("electronAPI", {
  getPages: () => ipcRenderer.invoke("db:getPages"),
  // ... other methods
});

// Main process (electron/main.ts) handles:
ipcMain.handle("db:getPages", () => {
  return db.prepare("SELECT * FROM pages WHERE deleted = 0").all();
});
```

### 2. State Management with Zustand

Two main stores:

**useWorkspaceStore** - Workspace-level state

```typescript
{
  pages: Page[],
  currentPageId: string | null,
  recentPages: string[],
  favorites: string[],

  // Actions
  loadPages, createPage, updatePage, deletePage,
  setCurrentPage, addToRecent, toggleFavorite
}
```

**useEditorStore** - Editor-level state

```typescript
{
  blocks: Block[],
  selectedBlockIds: string[],
  isCommandMenuOpen: boolean,

  // Actions
  loadBlocks, createBlock, updateBlock,
  setSelectedBlocks, toggleCommandMenu
}
```

### 3. TipTap Editor Configuration

```typescript
const editor = useEditor({
  extensions: [
    StarterKit, // Basic formatting
    Placeholder, // Placeholder text
    TaskList, // Checkboxes
    TaskItem, // Individual tasks
  ],
  content: "",
  editorProps: {
    attributes: {
      class: "prose prose-invert max-w-none focus:outline-none",
    },
  },
});
```

### 4. Block Types

```typescript
type BlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "bulletList"
  | "numberedList"
  | "todoList"
  | "quote"
  | "divider"
  | "code"
  | "toggle";
```

## Development Patterns

### Component Structure

```typescript
// Use functional components with TypeScript
export function ComponentName({ prop }: ComponentProps) {
  const store = useStore()

  useEffect(() => {
    // Side effects
  }, [dependencies])

  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  )
}
```

### Adding New Features

**New UI Component:**

1. Create in `src/components/ui/` following shadcn/ui patterns
2. Use Radix UI primitives for accessibility
3. Style with Tailwind CSS
4. Export with TypeScript types

**New Store Action:**

1. Add to appropriate store (`useWorkspaceStore` or `useEditorStore`)
2. If needs database, add IPC handler in `electron/main.ts`
3. Add method to preload in `electron/preload.ts`
4. Update TypeScript types

**New Block Type:**

1. Define type in `src/types/index.ts`
2. Add TipTap extension in editor configuration
3. Add to slash command menu
4. Update database schema if needed

### Styling Conventions

- **Use Tailwind utility classes** - No inline styles
- **Use cn() helper** for conditional classes
- **Follow shadcn/ui patterns** for component variants
- **Dark mode first** - UI designed for dark theme
- **Responsive by default** - Mobile-friendly (future)

```typescript
import { cn } from '@/lib/utils'

<button className={cn(
  "base-classes",
  condition && "conditional-classes",
  className // Allow override
)} />
```

## Common Tasks

### Run Development Server

```bash
yarn electron:dev
```

Starts Vite dev server + Electron app with hot reload

### Build for Production

```bash
yarn electron:build
```

Creates platform-specific installers in `release/`

### Lint Code

```bash
yarn lint
```

### Add New Dependency

```bash
yarn add package-name
yarn add -D package-name  # Dev dependency
```

## Security Considerations

### Electron Security

- ✅ `contextIsolation: true` - Prevents renderer access to Node.js
- ✅ `sandbox: true` - Sandboxed renderer process
- ✅ `nodeIntegration: false` - No Node.js in renderer
- ✅ Preload script - Only expose necessary APIs
- ✅ Type-safe IPC - Validated contracts

### Best Practices

- Never expose entire Node.js modules to renderer
- Validate all IPC inputs in main process
- Use prepared statements for SQL queries
- Sanitize user input before database operations

## Known Limitations & TODOs

### Current Limitations

- No undo/redo system (only editor-level)
- No global search yet
- No drag-and-drop block reordering
- No database views (table, kanban, etc.)
- No import/export functionality
- No collaboration features
- No plugin system yet

### Planned Features (See CHANGELOG.md)

- Command palette (Cmd+K)
- Global search with FlexSearch
- Template system
- Database views
- Import/export (Markdown, HTML, PDF)
- Plugin architecture
- Real-time collaboration (CRDT-based)

## Debugging Tips

### Electron DevTools

- Main process: Add `console.log()` - shows in terminal
- Renderer process: Use browser DevTools (auto-opens in dev mode)
- IPC issues: Check both main and renderer console

### Database Debugging

```typescript
// In electron/main.ts
db.prepare("SELECT * FROM pages").all(); // Returns all pages
db.prepare("PRAGMA table_info(pages)").all(); // Show schema
```

### State Debugging

```typescript
// In React component
console.log(useWorkspaceStore.getState());
console.log(useEditorStore.getState());
```

### Common Issues

**App won't start:**

- Check Node.js version (18+ required)
- Clear `node_modules` and reinstall
- Check port 5173 is available

**Database errors:**

- Delete database: `~/Library/Application Support/potion/potion.db`
- Check schema in `electron/main.ts`
- Verify IPC handlers are registered

**Build errors:**

- Run `yarn lint` to check TypeScript errors
- Check `dist-electron/` is being generated
- Verify `vite.config.ts` has correct paths

## Code Style Guidelines

### TypeScript

- Use strict mode (already configured)
- Avoid `any` - use proper types
- Define interfaces in `src/types/`
- Use `unknown` instead of `any` when type is unclear

### React

- Functional components only
- Use hooks (useState, useEffect, etc.)
- Extract custom hooks for reusable logic
- Keep components small and focused

### Naming Conventions

- Components: PascalCase (`Sidebar.tsx`, `Editor.tsx`)
- Hooks: camelCase with `use` prefix (`useWorkspaceStore`)
- Types: PascalCase (`Page`, `Block`, `BlockType`)
- Functions: camelCase (`loadPages`, `createBlock`)
- Constants: UPPER_SNAKE_CASE (`GETTING_STARTED_CONTENT`)

## Testing (Future)

### Planned Test Strategy

- **Unit tests**: Vitest for utilities and hooks
- **Component tests**: React Testing Library
- **E2E tests**: Playwright for full app testing
- **IPC tests**: Test main ↔ renderer communication

## Performance Considerations

### Current Optimizations

- Debounced autosave
- Indexed database queries
- React.memo for expensive components
- Lazy loading where beneficial

### Future Optimizations

- Virtualization for large documents (TanStack Virtual)
- Web Workers for heavy computations
- Incremental search indexing
- Prepared statements caching

## Resources & References

### Documentation

- [Electron Docs](https://www.electronjs.org/docs)
- [React Docs](https://react.dev)
- [TipTap Docs](https://tiptap.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

### Project Documentation

- `README.md` - Main documentation
- `ARCHITECTURE.md` - Technical architecture
- `QUICKSTART.md` - Quick start guide
- `CONTRIBUTING.md` - How to contribute
- `FILE_STRUCTURE.md` - Project layout

## Questions & Support

When helping with this project:

1. **Follow existing patterns** - Match coding style
2. **Maintain type safety** - No `any` types
3. **Update documentation** - Keep docs in sync
4. **Test changes** - Run `yarn electron:dev` to verify
5. **Consider security** - Follow Electron best practices

## Version Information

- **Current Version**: 0.1.0 (Initial Release)
- **Node.js**: 18+ required
- **Package Manager**: yarn (npm also works)
- **Platform Support**: macOS, Windows, Linux

---

**Last Updated**: 2024-01-XX
**Maintainer**: See CONTRIBUTING.md
**License**: MIT (see LICENSE file)
