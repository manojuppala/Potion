# Getting Started with Potion - Quick Reference

## ❌ Getting Errors?

If you're seeing errors when running `pnpm install` or `pnpm electron:dev`, it's likely because you need to install Node.js first.

---

## ✅ Solution: Install Node.js First

### Step 1: Install Node.js

Choose your operating system:

#### 🍎 **macOS**
```bash
# Option 1: Using Homebrew (recommended)
brew install node

# Option 2: Download from https://nodejs.org/
```

#### 🪟 **Windows**
```
1. Go to https://nodejs.org/
2. Download the "LTS" version (left button)
3. Run the installer
4. Click through the installation wizard
```

#### 🐧 **Linux (Ubuntu/Debian)**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 2: Verify Installation

Open a new terminal/command prompt and run:
```bash
node --version
npm --version
```

You should see version numbers (e.g., `v20.11.0` and `10.2.4`).

---

## 🚀 Now Install & Run Potion

Once Node.js is installed, run these commands:

```bash
# Navigate to the Potion directory
cd /path/to/Potion

# Install dependencies (this will take 2-3 minutes)
npm install

# Start the app
npm run electron:dev
```

---

## 📖 Full Documentation

For more detailed instructions, see:
- **[INSTALL_PREREQUISITES.md](INSTALL_PREREQUISITES.md)** - Detailed installation guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide
- **[README.md](README.md)** - Complete documentation

---

## 🆘 Still Having Issues?

### Error: "pnpm: command not found"
**Solution:** Use `npm` instead (it comes with Node.js):
```bash
npm install
npm run electron:dev
```

### Error: "npm: command not found" or "node: command not found"
**Solution:** Node.js is not installed or not in your PATH. Install Node.js following Step 1 above.

### Error: "gyp: No Xcode or CLT version detected!" (macOS)
**Solution:** Install Xcode Command Line Tools:
```bash
xcode-select --install
```

### Error: Python-related errors
**Solution:** Install Python 3:
```bash
# macOS
brew install python3

# Windows: Download from https://python.org/
```

### Permission errors (macOS/Linux)
**Solution:** Don't use `sudo`. Configure npm properly:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## ✨ Success!

Once `npm run electron:dev` works, you'll see:
1. Terminal shows "Vite dev server running"
2. Electron window opens automatically
3. The Potion app appears with a sidebar and editor

Start typing to create your first note! 📝

---

## 🎯 Quick Command Reference

```bash
# Install dependencies (only once)
npm install

# Run development mode
npm run electron:dev

# Build for production
npm run electron:build

# Lint code
npm run lint
```

---

## 💡 Tips

- Use **npm** if you're just starting out (it comes with Node.js)
- Use **pnpm** if you want faster installs (install with: `npm install -g pnpm`)
- The app stores data in: `~/Library/Application Support/potion/` (macOS)
- Press `/` in the editor to see formatting options
- All changes auto-save instantly

---

**Need Help?** Check the full documentation in the links above!
