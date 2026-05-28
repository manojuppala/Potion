# Changelog

All notable changes to Potion will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-01-XX (Initial Release)

### Added
- 🎉 Initial release of Potion
- 📝 Rich text editor powered by TipTap/ProseMirror
- 💾 Local-first SQLite database storage
- 🎨 Dark mode UI inspired by Notion
- 🔍 Slash command menu (type `/`)
- ✅ Task list support with checkboxes
- 📁 Page management system with sidebar navigation
- ⚡ Offline-first architecture - no internet required
- ⌨️ Markdown shortcuts (# for headings, - for lists, etc.)
- 🏗️ Electron desktop app (macOS, Windows, Linux)
- 🎯 Block-based content architecture
- 📊 SQLite database schema for pages and blocks
- 🔒 Secure IPC communication between processes
- 🎨 Tailwind CSS styling with shadcn/ui components
- 📚 Comprehensive documentation

### Editor Features
- Paragraph blocks
- Headings (H1, H2, H3, H4)
- Bullet lists
- Numbered lists
- Task lists with checkboxes
- Code blocks
- Horizontal dividers
- Bold, italic, and inline formatting

### Slash Commands
- `/text` - Plain paragraph
- `/h1` - Heading 1
- `/h2` - Heading 2
- `/h3` - Heading 3
- `/h4` - Heading 4
- `/bullet` - Bulleted list
- `/number` - Numbered list
- `/todo` - To-do list
- `/code` - Code block
- `/divider` - Horizontal rule

### Technical
- Electron 28
- React 18
- TypeScript strict mode
- Vite for build tooling
- Zustand for state management
- better-sqlite3 for database
- Context isolation and sandboxing enabled
- Type-safe IPC contracts

### Documentation
- README.md - Main documentation
- SETUP.md - Installation guide
- QUICKSTART.md - 5-minute quick start
- ARCHITECTURE.md - Technical architecture
- CONTRIBUTING.md - Contribution guidelines
- PROJECT_SUMMARY.md - Project overview

## [Unreleased]

### Planned Features

#### Phase 2 (Next)
- [ ] Command palette (Cmd/Ctrl + K)
- [ ] Global search with FlexSearch
- [ ] Template system
- [ ] Drag & drop block reordering
- [ ] Page hierarchy in sidebar (expand/collapse)
- [ ] Favorites/starred pages
- [ ] Recent pages section
- [ ] Trash/archive functionality

#### Phase 3
- [ ] Database views (Table, Kanban, Calendar, List, Gallery)
- [ ] Property types (Text, Number, Select, Date, etc.)
- [ ] Filtering and sorting
- [ ] Formulas and rollups
- [ ] Relations between databases
- [ ] Inline database views

#### Phase 4
- [ ] Plugin system and API
- [ ] Import from Notion, Markdown, HTML
- [ ] Export to Notion, Markdown, HTML, PDF
- [ ] Custom themes and styling
- [ ] Backlinks between pages
- [ ] Graph view of connections
- [ ] Block references and embeds

#### Phase 5 (Future)
- [ ] Real-time collaboration (CRDT-based)
- [ ] Optional cloud sync
- [ ] Mobile companion app (iOS/Android)
- [ ] AI writing assistant
- [ ] Web clipper extension
- [ ] API and webhooks
- [ ] Workspace encryption
- [ ] Multi-window support

### Bug Fixes Needed
- None yet (initial release)

### Known Issues
- Slash menu positioning could be improved
- No undo/redo yet (editor-level only)
- Limited keyboard shortcuts
- No search functionality yet
- No database views yet

---

## Version History

- **0.1.0** - Initial release with core editing features

---

## Notes

### Breaking Changes
None (initial release)

### Deprecated
None (initial release)

### Removed
None (initial release)

### Security
- Context isolation enabled
- Sandbox mode enabled
- No Node integration in renderer
- Secure IPC via preload scripts

---

## Development

### How to Release

1. Update version in `package.json`
2. Update this CHANGELOG.md
3. Commit changes: `git commit -am "Release vX.X.X"`
4. Create tag: `git tag vX.X.X`
5. Push: `git push && git push --tags`
6. Build: `pnpm electron:build`
7. Upload releases from `release/` folder

---

For more information, see:
- [README.md](README.md) - Full documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details
