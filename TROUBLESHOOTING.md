# Potion - Troubleshooting Guide

Common issues and their solutions when installing and running Potion.

---

## 🔴 Installation Errors

### Error: "pnpm: command not found"

**Problem:** You're trying to use pnpm but it's not installed.

**Solution 1:** Use npm instead (it comes with Node.js):
```bash
npm install
npm run electron:dev
```

**Solution 2:** Install pnpm first:
```bash
npm install -g pnpm
pnpm install
pnpm electron:dev
```

---

### Error: "npm: command not found" or "node: command not found"

**Problem:** Node.js is not installed on your system.

**Solution:** Install Node.js:

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

**Windows:**
1. Go to https://nodejs.org/
2. Download the LTS version
3. Run the installer
4. Restart your terminal/command prompt

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify installation:**
```bash
node --version
npm --version
```

---

### Error: "gyp: No Xcode or CLT version detected!" (macOS)

**Problem:** Native modules need Xcode Command Line Tools to compile.

**Solution:**
```bash
xcode-select --install
```

Click "Install" in the dialog that appears, then try again:
```bash
npm install
```

---

### Error: Python-related errors during installation

**Problem:** Some native modules (like better-sqlite3) need Python to build.

**Solution:**

**macOS:**
```bash
brew install python3
```

**Windows:**
1. Download from https://www.python.org/
2. Run installer
3. Check "Add Python to PATH"

**Linux:**
```bash
sudo apt-get install python3
```

Then retry:
```bash
npm install
```

---

### Error: "EACCES: permission denied" (macOS/Linux)

**Problem:** Trying to install global packages without proper permissions.

**Solution:** Configure npm to use a different directory:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

Then try again:
```bash
npm install -g pnpm  # If you want pnpm
```

---

### Error: "Cannot find module" or "MODULE_NOT_FOUND"

**Problem:** Dependencies not installed or corrupted.

**Solution:** Clean install:
```bash
# Remove old dependencies
rm -rf node_modules package-lock.json

# Fresh install
npm install
```

---

## 🔴 Runtime Errors

### Error: "Port 5173 is already in use"

**Problem:** Another process is using the Vite dev server port.

**Solution 1:** Kill the process:
```bash
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows (Command Prompt)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Solution 2:** Use a different port:
Edit `vite.config.ts` and add:
```typescript
export default defineConfig({
  server: {
    port: 5174  // Different port
  },
  // ... rest of config
})
```

---

### Error: Database errors or "SQLITE_CANTOPEN"

**Problem:** Database file is locked or corrupted.

**Solution:** Delete and recreate the database:
```bash
# macOS
rm ~/Library/Application\ Support/potion/potion.db

# Windows
del %APPDATA%\potion\potion.db

# Linux
rm ~/.config/potion/potion.db
```

Then restart the app - it will create a fresh database.

---

### Error: "Electron failed to install correctly"

**Problem:** Electron binary is missing or corrupted.

**Solution:** Reinstall Electron:
```bash
npm install electron --force
```

Or clean reinstall:
```bash
rm -rf node_modules
npm install
```

---

### Error: Black/blank screen when app opens

**Problem:** Renderer process failed to load.

**Solution 1:** Check the terminal for errors

**Solution 2:** Clear cache and restart:
```bash
# macOS
rm -rf ~/Library/Application\ Support/potion/

# Windows
del %APPDATA%\potion\

# Linux
rm -rf ~/.config/potion/
```

**Solution 3:** Check DevTools (Cmd+Option+I / Ctrl+Shift+I) for errors

---

## 🔴 Build Errors

### Error: "tsc: command not found"

**Problem:** TypeScript compiler not found.

**Solution:**
```bash
npm install
```

The TypeScript compiler is in devDependencies and should be installed automatically.

---

### Error: Build fails with TypeScript errors

**Problem:** Type errors in the code.

**Solution:** Check and fix type errors:
```bash
npm run lint
```

Or skip type checking temporarily:
```bash
# Build without type checking (not recommended)
vite build --mode production
```

---

## 🔴 Development Errors

### Error: Hot reload not working

**Problem:** Changes not reflecting in the app.

**Solution 1:** Restart the dev server:
```bash
# Stop with Ctrl+C
# Then restart
npm run electron:dev
```

**Solution 2:** Hard refresh:
- Main process changes: Restart app
- Renderer changes: Cmd+R / Ctrl+R in app window

---

### Error: "Cannot read property of undefined" in editor

**Problem:** TipTap editor not initialized properly.

**Solution:** Check that all editor extensions are installed:
```bash
npm list @tiptap/react
npm list @tiptap/starter-kit
```

If missing, reinstall:
```bash
npm install
```

---

## 🆘 Still Having Issues?

### Check Node.js version
```bash
node --version
```
Make sure it's 18.0.0 or higher.

### Check npm version
```bash
npm --version
```
Should be 9.0.0 or higher.

### Verify you're in the correct directory
```bash
pwd  # Should show .../Potion
ls   # Should show package.json, src/, electron/, etc.
```

### Try a complete clean install
```bash
# Remove everything
rm -rf node_modules package-lock.json dist dist-electron

# Fresh install
npm install

# Try running
npm run electron:dev
```

---

## 📚 Additional Help

- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Quick start guide
- **[INSTALL_PREREQUISITES.md](INSTALL_PREREQUISITES.md)** - Detailed installation
- **[README.md](README.md)** - Full documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - How it works

---

## 💡 Common Tips

1. **Always use npm** if you're unsure - it comes with Node.js
2. **Restart your terminal** after installing Node.js
3. **Check for typos** in commands
4. **Read error messages** - they often tell you exactly what's wrong
5. **Google the error** - many issues have been solved before

---

**Last resort:** Open an issue with:
- Your OS and version
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Full error message
- Steps you tried
