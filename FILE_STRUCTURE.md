# Potion - Complete File Structure

This document shows the complete file structure of the Potion project.

## 📁 Project Tree

```
potion/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tsconfig.node.json        # Node TypeScript config
│   ├── vite.config.ts            # Vite bundler configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── .gitignore                # Git ignore rules
│   ├── .env.example              # Environment variables template
│   └── LICENSE                   # MIT License
│
├── 📚 Documentation
│   ├── README.md                 # Main documentation
│   ├── QUICKSTART.md             # Quick start guide
│   ├── SETUP.md                  # Detailed setup instructions
│   ├── ARCHITECTURE.md           # Technical architecture
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   ├── PROJECT_SUMMARY.md        # Project overview
│   ├── CHANGELOG.md              # Version history
│   ├── FILE_STRUCTURE.md         # This file
│   └── prompt.md                 # Original specification
│
├── 🖥️ Electron Process (electron/)
│   ├── main.ts                   # Main process (Node.js)
│   │   ├── Window management
│   │   ├── Database setup (SQLite)
│   │   ├── IPC handlers
│   │   └── File system access
│   │
│   └── preload.ts                # Preload script (IPC bridge)
│       ├── Exposes safe APIs
│       ├── Context isolation
│       └── Type-safe contracts
│
├── ⚛️ React Application (src/)
│   │
│   ├── 📄 Entry Points
│   │   ├── main.tsx              # React entry point
│   │   ├── App.tsx               # Root component
│   │   └── index.css             # Global styles
│   │
│   ├── 🎨 Components (components/)
│   │   │
│   │   ├── Editor/               # Editor components
│   │   │   ├── Editor.tsx        # Main editor component
│   │   │   ├── SlashCommandMenu.tsx  # Slash commands
│   │   │   └── GettingStartedContent.tsx  # Default content
│   │   │
│   │   ├── ui/                   # UI primitives (shadcn/ui)
│   │   │   ├── button.tsx        # Button component
│   │   │   └── scroll-area.tsx   # Scroll area component
│   │   │
│   │   └── Sidebar.tsx           # Navigation sidebar
│   │
│   ├── 🗄️ State Management (stores/)
│   │   ├── useWorkspaceStore.ts  # Workspace state
│   │   │   ├── Pages management
│   │   │   ├── Navigation
│   │   │   ├── Favorites
│   │   │   └── Recent pages
│   │   │
│   │   └── useEditorStore.ts     # Editor state
│   │       ├── Blocks management
│   │       ├── Selection
│   │       └── Command menu
│   │
│   ├── 📘 Type Definitions (types/)
│   │   └── index.ts              # TypeScript interfaces
│   │       ├── Page
│   │       ├── Block
│   │       ├── Database
│   │       └── DatabaseRow
│   │
│   └── 🛠️ Utilities (lib/)
│       └── utils.ts              # Helper functions
│           └── cn() - Tailwind class merger
│
├── 🔧 VS Code Settings (.vscode/)
│   ├── settings.json             # Editor settings
│   └── extensions.json           # Recommended extensions
│
├── 📦 Build Output (Generated)
│   ├── dist/                     # Vite build output
│   ├── dist-electron/            # Electron build output
│   ├── release/                  # Platform installers
│   └── node_modules/             # Dependencies
│
└── 🗄️ User Data (Runtime, in system folder)
    └── potion.db                 # SQLite database
```

## 📊 File Count Summary

### Source Files
- **TypeScript/React**: 13 files
- **Electron**: 2 files
- **Configuration**: 8 files
- **Documentation**: 9 files
- **Total**: 32 source files

### Lines of Code (Approx)
- **TypeScript/TSX**: ~1,500 lines
- **Configuration**: ~300 lines
- **Documentation**: ~2,000 lines
- **Total**: ~3,800 lines

## 🎯 Key Files Explained

### Configuration Layer
| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies, scripts, Electron builder config |
| `tsconfig.json` | TypeScript strict mode, paths, React JSX |
| `vite.config.ts` | Electron plugin, React plugin, path aliases |
| `tailwind.config.js` | Theme colors, animations, plugins |

### Electron Layer
| File | Purpose |
|------|---------|
| `electron/main.ts` | Main process, window creation, database, IPC |
| `electron/preload.ts` | IPC bridge, exposes safe APIs to renderer |

### React Layer
| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component, layout, initialization |
| `src/main.tsx` | React DOM render |
| `src/index.css` | Global styles, Tailwind, theme variables |

### Components Layer
| File | Purpose |
|------|---------|
| `Sidebar.tsx` | Navigation, page list, recent pages |
| `Editor/Editor.tsx` | TipTap editor, page rendering |
| `Editor/SlashCommandMenu.tsx` | Slash command interface |
| `ui/button.tsx` | Reusable button component |
| `ui/scroll-area.tsx` | Custom scroll area |

### State Layer
| File | Purpose |
|------|---------|
| `stores/useWorkspaceStore.ts` | Pages, navigation, favorites |
| `stores/useEditorStore.ts` | Blocks, selection, commands |

### Types Layer
| File | Purpose |
|------|---------|
| `types/index.ts` | TypeScript interfaces for data models |

## 🔄 Data Flow

```
User Input
    ↓
React Component
    ↓
Zustand Store Action
    ↓
IPC Call (via preload)
    ↓
Main Process Handler
    ↓
SQLite Database
    ↓
Response via IPC
    ↓
Store Update
    ↓
React Re-render
```

## 📦 Dependencies Breakdown

### Production Dependencies (~15)
- React ecosystem (react, react-dom)
- Electron
- TipTap + extensions
- Database (better-sqlite3)
- State (zustand)
- UI (Radix UI, shadcn/ui)
- Styling (Tailwind, clsx)
- Icons (lucide-react)
- Utilities (nanoid)

### Development Dependencies (~20)
- TypeScript
- Vite + plugins
- Electron builder
- ESLint + plugins
- Tailwind + plugins
- Type definitions

## 🎨 Asset Organization

```
public/           # Static assets (future)
  ├── icons/      # App icons
  └── images/     # Images

workspace/        # User data (runtime)
  ├── potion.db   # SQLite database
  ├── assets/     # User uploads (future)
  └── cache/      # Cached data (future)
```

## 🚀 Build Output

### Development
```
dist-electron/    # Compiled Electron code
  ├── main.js
  └── preload.js
```

### Production
```
release/          # Platform-specific builds
  ├── mac/
  │   └── Potion.dmg
  ├── win/
  │   └── Potion Setup.exe
  └── linux/
      └── Potion.AppImage
```

## 📝 Notes

- All source files use **TypeScript strict mode**
- Components follow **functional React patterns**
- State management is **centralized in Zustand stores**
- IPC is **type-safe and secure**
- UI components use **Tailwind CSS**
- Database operations are **async via IPC**

---

For more details, see:
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
- [README.md](README.md) - Main documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute
