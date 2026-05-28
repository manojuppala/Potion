# Potion - Quick Start Guide

Get up and running with Potion in less than 5 minutes!

## 📦 Step 1: Install Dependencies

Choose your package manager:

### Using yarn (Recommended)

```bash
yarn install
```

### Using npm

```bash
npm install
```

### Using yarn

```bash
yarn install
```

**This will install:**

- Electron for desktop app
- React for UI
- TipTap for the editor
- SQLite for local database
- Tailwind for styling
- And all other dependencies (~200MB)

## 🚀 Step 2: Start Development Mode

```bash
yarn electron:dev
```

Or with npm:

```bash
npm run electron:dev
```

**What happens:**

1. Vite dev server starts on http://localhost:5173
2. Electron app window opens automatically
3. Hot reload enabled - changes appear instantly
4. Database created in your user data folder

## ✨ Step 3: Explore the App

Once the app launches:

### 1. You'll see the sidebar on the left

- Navigation links
- Page list
- Recent pages
- Settings (bottom)

### 2. Main editor area

- "Getting Started" page loads automatically
- Rich text editing ready to go

### 3. Try these features:

**Type some text**

```
Just click anywhere and start typing!
```

**Use slash commands**

```
Type / and you'll see a menu with:
- Headings
- Lists
- To-do items
- Code blocks
- And more!
```

**Try markdown shortcuts**

```
# → Heading 1
## → Heading 2
- → Bullet point
1. → Numbered list
[ ] → To-do item
```

**Create a new page**

```
Click "+ New agent" in the sidebar
```

## 🎨 What You Can Do

### Rich Text Editing

- ✅ Headings (H1, H2, H3, H4)
- ✅ Paragraphs
- ✅ Bullet lists
- ✅ Numbered lists
- ✅ To-do lists (checkboxes)
- ✅ Code blocks
- ✅ Dividers
- ✅ Bold, italic, and more

### Page Management

- ✅ Create unlimited pages
- ✅ Navigate with sidebar
- ✅ Auto-save (instant)
- ✅ Recently viewed pages
- ✅ Delete pages

### Slash Commands

Press `/` anywhere to:

- Change block types
- Insert content
- Format text
- Add structures

## 🗂️ Where Is My Data?

Your data is stored locally in SQLite:

**macOS**

```
~/Library/Application Support/potion/potion.db
```

**Windows**

```
%APPDATA%/potion/potion.db
```

**Linux**

```
~/.config/potion/potion.db
```

## 🛠️ Development Commands

### Start Dev Server

```bash
yarn electron:dev
```

### Build for Production

```bash
yarn electron:build
```

Creates installers in `release/` folder

### Run Linter

```bash
yarn lint
```

### Format Code

```bash
yarn format
```

(Auto-formats on save in VS Code)

## 🔧 Troubleshooting

### App won't start?

```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install
yarn electron:dev
```

### Database issues?

Delete the database to reset:

```bash
# macOS/Linux
rm ~/Library/Application\ Support/potion/potion.db

# Windows
del %APPDATA%\potion\potion.db
```

### Port already in use?

Kill process on port 5173:

```bash
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## 📚 Next Steps

### Learn More

- Read [README.md](README.md) for full documentation
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

### Customize

- Modify components in `src/components/`
- Add new block types in TipTap
- Customize UI in Tailwind config
- Add features to stores

### Build & Share

```bash
# Build for your platform
yarn electron:build

# Find installer in release/
ls release/
```

## 🎯 Common Tasks

### Add a new page

1. Click "+ New agent" in sidebar
2. Start typing

### Format text

1. Select text
2. Use keyboard shortcuts:
   - **Bold**: Cmd/Ctrl + B
   - **Italic**: Cmd/Ctrl + I
   - **Code**: Cmd/Ctrl + E

### Use slash commands

1. Type `/` in the editor
2. Select from menu
3. Or type to filter (e.g., `/h1`)

### Navigate pages

1. Click any page in sidebar
2. Or use search (coming soon!)

## ✨ Tips & Tricks

1. **Markdown works everywhere** - Use `#`, `-`, `[]` shortcuts
2. **Everything auto-saves** - No save button needed
3. **It's all local** - No internet required
4. **Keyboard-first** - Tab, arrows, shortcuts
5. **Dark mode** - Built-in, always on

## 🎉 You're Ready!

Start creating your knowledge base with Potion.

Questions? Check the docs:

- [README.md](README.md)
- [SETUP.md](SETUP.md)
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

Happy note-taking! 📝
