# Build a Local-First Notion Clone (Electron + TypeScript) — Master Prompt

## Objective

Build a high-performance, local-first knowledge management and document editing application inspired by Notion.

The application should:

- Run as a desktop app using Electron
- Store all user data locally by default
- Work fully offline
- Use TypeScript across the entire stack
- Support rich text editing with blocks
- Provide fast search and indexing
- Support nested pages and databases
- Be modular and extensible
- Be optimized for performance and developer experience
- Be architected to later support optional sync and collaboration

The goal is NOT to clone Notion pixel-by-pixel.
The goal is to build a modern, scalable, local-first productivity platform inspired by Notion’s UX and architecture.

---

# Product Vision

Create a desktop-first productivity workspace that combines:

- Rich document editing
- Block-based content architecture
- Nested page organization
- Database/table views
- Slash commands
- Markdown shortcuts
- Command palette
- Fast fuzzy search
- Local-first storage
- Keyboard-driven UX
- Plugin-ready architecture

The app should feel:

- Extremely fast
- Native-like
- Minimal
- Clean
- Keyboard optimized
- Smoothly animated

---

# Recommended Tech Stack

## Desktop Framework

### Electron

Use Electron for:

- Cross-platform desktop support
- Native filesystem access
- Local database access
- Native menus and shortcuts
- Background workers
- File watching

Requirements:

- Secure IPC architecture
- Context isolation enabled
- No nodeIntegration in renderer
- Use preload scripts

---

# Frontend Stack

## React + TypeScript

Use:

- React 19+
- TypeScript strict mode
- Vite for renderer bundling

Why:

- Fast HMR
- Massive ecosystem
- Excellent editor integrations
- Strong typing

---

## UI Framework

Use:

- Tailwind CSS
- shadcn/ui
- Radix UI
- Framer Motion

Requirements:

- Minimal modern UI
- Dark/light mode
- Accessible components
- Smooth transitions
- Keyboard navigation everywhere

---

# Editor Architecture

## Recommended Editor

### TipTap + ProseMirror

Use TipTap because:

- Extensible block editor
- Strong ProseMirror foundation
- Great TypeScript support
- Collaboration-ready architecture
- Custom node support
- Slash commands
- Markdown shortcuts

Alternative:

- Lexical

But TipTap is recommended for Notion-like behavior.

---

# Core Features

## 1. Block-Based Editor

Support blocks:

- Paragraph
- Headings
- Bulleted list
- Numbered list
- Checklist
- Quote
- Divider
- Code block
- Callout
- Toggle
- Image block
- Table block
- Bookmark/embed block
- Equation block
- Columns
- Synced blocks
- Database blocks

Each block should:

- Have a stable unique ID
- Be independently editable
- Support drag/drop reordering
- Support nested children
- Support keyboard navigation
- Support copy/paste

---

## 2. Slash Commands

Implement `/` command menu:

Examples:

- /h1
- /todo
- /table
- /code
- /image
- /quote

Requirements:

- Fuzzy search
- Keyboard navigation
- Categorized actions
- Plugin extensibility

---

## 3. Markdown Shortcuts

Examples:

- `# ` → heading
- `## ` → heading 2
- `[] ` → checkbox
- `> ` → quote
- `---` → divider

---

## 4. Page System

Pages should support:

- Infinite nesting
- Parent-child relationships
- Icons
- Cover images
- Breadcrumbs
- Favorites
- Recent pages
- Templates
- Trash/archive

---

## 5. Sidebar Navigation

Features:

- Collapsible tree
- Drag/drop pages
- Search
- Favorites
- Workspace switching
- Recent documents
- Keyboard shortcuts

---

## 6. Local Database System

Implement Notion-style databases.

Views:

- Table
- Board/Kanban
- Calendar
- List
- Gallery

Property types:

- Text
- Number
- Select
- Multi-select
- Checkbox
- Date
- URL
- Email
- Tags
- Relation
- Formula
- Rollup

Requirements:

- Sorting
- Filtering
- Grouping
- Computed fields
- Inline editing

---

## 7. Global Search

Requirements:

- Full-text indexing
- Instant results
- Fuzzy search
- Search blocks and pages
- Highlight matches
- Keyboard shortcuts

Recommended:

- FlexSearch
- MiniSearch
- Tantivy (Rust)

---

## 8. Command Palette

Implement:

- Cmd/Ctrl + K

Features:

- Navigate pages
- Run commands
- Theme switching
- Open settings
- Search blocks
- Plugin actions

---

## 9. Offline-First Architecture

The app must:

- Work fully offline
- Never require internet
- Persist all edits locally instantly
- Use autosave
- Recover after crashes

---

# Data Storage Architecture

## Recommended Local Database

### Primary Recommendation: SQLite

Why:

- Mature
- Reliable
- Fast
- Transactional
- Portable
- Excellent Electron support

Use:

- better-sqlite3

---

# Suggested Schema

## Tables

### pages

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

---

### blocks

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

---

### databases

```sql
CREATE TABLE databases (
  id TEXT PRIMARY KEY,
  page_id TEXT,
  schema_json TEXT,
  created_at INTEGER,
  updated_at INTEGER
);
```

---

### database_rows

```sql
CREATE TABLE database_rows (
  id TEXT PRIMARY KEY,
  database_id TEXT,
  values_json TEXT,
  created_at INTEGER,
  updated_at INTEGER
);
```

---

# Local-First Sync Architecture (Future Ready)

Even though the first version is local-only, architect for future sync.

Recommendations:

## Event Sourcing

Store:

- Operations
- Mutations
- Transactions

Benefits:

- Undo/redo
- Collaboration readiness
- Time travel
- Sync conflict resolution

---

## CRDT Preparation

Future-ready options:

- Yjs
- Automerge

Do NOT overbuild collaboration initially.
But avoid architecture that blocks future sync.

---

# File Storage

Store:

- Images
- Attachments
- Covers
- Cached previews

Recommended structure:

```text
workspace/
  db.sqlite
  assets/
  cache/
  exports/
```

---

# State Management

## Recommended

Use:

- Zustand

Why:

- Lightweight
- Simple
- Fast
- TypeScript-friendly

Use separate stores for:

- Editor state
- Sidebar state
- Search state
- Workspace state
- UI preferences

---

# Electron Architecture

## Process Structure

### Main Process

Responsible for:

- Native APIs
- File access
- Database access
- Window lifecycle
- Background jobs

### Renderer Process

Responsible for:

- UI
- Editor
- State management
- Animations

### Preload Scripts

Expose:

- Safe IPC APIs
- Filesystem APIs
- Database methods

---

# IPC Best Practices

Use:

- Typed IPC contracts
- Zod validation
- Context isolation

Avoid:

- Direct Node exposure
- Unsafe eval
- Arbitrary filesystem access

---

# Recommended Monorepo Structure

```text
apps/
  desktop/

packages/
  ui/
  editor/
  database/
  shared/
  types/
  search/
  plugins/
```

Use:

- pnpm workspaces
- TurboRepo

---

# Search Engine

## Recommendation

### FlexSearch

Features:

- Fast
- In-memory indexing
- Fuzzy matching
- Lightweight

Alternative:

- Tantivy via Rust bridge

---

# Keyboard UX

Must support:

- Cmd/Ctrl + P
- Cmd/Ctrl + K
- Cmd/Ctrl + /
- Arrow navigation
- Multi-block selection
- Tab indentation
- Shift selection

The UX should feel similar to:

- Notion
- VSCode
- Obsidian

---

# Performance Requirements

## Must Optimize

### Virtualization

Use:

- TanStack Virtual

For:

- Large pages
- Huge databases
- Long lists

---

## Memoization

Use:

- React.memo
- useMemo
- useCallback

But avoid premature optimization.

---

## Database Optimization

Requirements:

- Prepared statements
- Batched writes
- Debounced saves
- Background indexing

---

# Rich Text Editing Best Practices

## Avoid Massive JSON Trees

Instead:

- Normalize data
- Store blocks independently

Benefits:

- Faster updates
- Easier sync
- Smaller writes
- Better undo history

---

# Autosave Strategy

Requirements:

- Save every few hundred milliseconds
- Debounced writes
- Transaction batching
- Crash recovery

---

# Undo / Redo System

Implement:

- Command pattern
- Operation history
- Transaction grouping

Support:

- Cross-block undo
- Multi-selection undo

---

# Theming

Support:

- Light mode
- Dark mode
- System mode
- Theme variables

Recommended:

- CSS variables
- Tailwind theme extension

---

# Export Features

Support exports:

- Markdown
- HTML
- PDF
- JSON

Optional:

- DOCX

---

# Plugin Architecture

Design plugin APIs early.

Plugin capabilities:

- Add slash commands
- Add custom blocks
- Add database views
- Add keyboard shortcuts
- Add AI actions

Use:

- Sandboxed plugin runtime
- Typed APIs

---

# Security Best Practices

## Electron Security

Mandatory:

- contextIsolation: true
- sandbox: true
- nodeIntegration: false
- validate IPC messages
- CSP policies

Avoid:

- remote module
- arbitrary shell execution

---

# Testing Strategy

## Unit Testing

Use:

- Vitest
- React Testing Library

---

## E2E Testing

Use:

- Playwright

Test:

- Editor interactions
- Drag/drop
- Slash commands
- Database editing

---

# Packaging & Distribution

Use:

- electron-builder

Generate:

- macOS dmg
- Windows exe/msi
- Linux AppImage

---

# Recommended Folder Structure

```text
src/
  main/
  renderer/
  preload/

  features/
    editor/
    pages/
    databases/
    search/
    sidebar/
    settings/

  components/
  hooks/
  stores/
  services/
  lib/
  styles/
  types/
```

---

# Suggested Development Roadmap

# Phase 1 — Core Foundation

Build:

- Electron shell
- React renderer
- Tailwind setup
- SQLite integration
- IPC layer
- Zustand stores

Deliverable:

- Empty desktop app with local persistence

---

# Phase 2 — Basic Editor

Build:

- TipTap integration
- Paragraph blocks
- Headings
- Slash commands
- Keyboard navigation

Deliverable:

- Minimal working document editor

---

# Phase 3 — Block System

Build:

- Block nesting
- Drag/drop
- Multi-select
- Copy/paste
- Undo/redo

Deliverable:

- Usable Notion-style editor

---

# Phase 4 — Pages & Sidebar

Build:

- Nested pages
- Sidebar tree
- Favorites
- Search
- Breadcrumbs

Deliverable:

- Full workspace navigation

---

# Phase 5 — Databases

Build:

- Table view
- Property types
- Filtering
- Sorting
- Kanban view

Deliverable:

- Notion-style databases

---

# Phase 6 — Performance

Optimize:

- Virtualization
- Search indexing
- Background jobs
- Large document rendering

Deliverable:

- Smooth experience on huge workspaces

---

# Phase 7 — Advanced Features

Add:

- Templates
- Plugins
- AI actions
- Markdown import/export
- Backlinks
- Graph view

---

# Nice-to-Have Features

Potential future additions:

- AI writing assistant
- Real-time collaboration
- Whiteboards
- Mind maps
- Backlinks
- Wikilinks
- Graph visualization
- Git-style history
- Workspace encryption
- Multi-window support
- Mobile companion app
- Voice notes
- OCR
- Local AI embedding search

---

# Inspiration Sources

Study the UX and architecture of:

- Notion
- Obsidian
- Anytype
- Capacities
- Craft
- Logseq
- VSCode
- Linear

Focus on:

- Responsiveness
- Keyboard UX
- Layout density
- Animation polish
- Discoverability

---

# UI/UX Guidelines

The interface should:

- Feel calm and minimal
- Avoid clutter
- Use generous spacing
- Use smooth animations
- Keep interactions discoverable
- Prioritize keyboard shortcuts
- Avoid modal-heavy workflows

The editor should feel:

- Instant
- Fluid
- Native

---

# Example Features to Implement First

Priority order:

1. Rich text blocks
2. Slash commands
3. Sidebar navigation
4. Nested pages
5. Search
6. Databases
7. Templates
8. Plugins
9. Collaboration

---

# Suggested Libraries

## Core

- electron
- react
- typescript
- vite
- tailwindcss
- zustand
- zod

---

## Editor

- @tiptap/react
- prosemirror
- dnd-kit

---

## Data

- better-sqlite3
- drizzle-orm

---

## Search

- flexsearch

---

## UI

- shadcn/ui
- radix-ui
- lucide-react
- framer-motion

---

## Testing

- vitest
- playwright

---

# Architecture Principles

Always prioritize:

1. Local-first
2. Performance
3. Type safety
4. Extensibility
5. Offline support
6. Keyboard UX
7. Maintainability
8. Security
9. Fast startup time
10. Modular design

---

# Final Goal

Create a production-grade local-first workspace application that combines:

- The editing experience of Notion
- The speed of Linear
- The offline reliability of Obsidian
- The extensibility of VSCode

The system should be scalable, maintainable, and capable of evolving into a collaborative productivity platform in the future.
