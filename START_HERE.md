# 🚀 START HERE - Potion Setup in 3 Steps

## ❓ Getting "command not found" errors?

You need to install Node.js first! Follow the guide below.

---

## Step 1️⃣: Install Node.js

### Check if you already have it:

```bash
node --version
npm --version
```

If you see version numbers (like `v20.11.0` and `10.2.4`), **skip to Step 2**.

If you see "command not found", install Node.js:

### 🍎 macOS

```bash
# If you have Homebrew:
brew install node

# Otherwise: Download from https://nodejs.org/
```

### 🪟 Windows

1. Go to **https://nodejs.org/**
2. Click the **"LTS"** download button (left side)
3. Run the installer
4. **Restart your terminal/Command Prompt**
5. Verify: `node --version`

### 🐧 Linux (Ubuntu/Debian)

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
```

---

## Step 2️⃣: Install Potion Dependencies

Open your terminal in the Potion directory and run:

```bash
npm install
```

This will take 2-3 minutes and download ~200MB of dependencies.

**Seeing errors?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## Step 3️⃣: Run Potion

```bash
npm run electron:dev
```

The Potion app window should open automatically! 🎉

---

## ✅ Success Checklist

- ✅ Node.js installed (`node --version` works)
- ✅ npm installed (`npm --version` works)
- ✅ In the Potion directory (`ls` shows package.json)
- ✅ Dependencies installed (`npm install` completed)
- ✅ App running (`npm run electron:dev` opened a window)

---

## 🎯 What to Do Next

Once the app opens:

1. **Type anywhere** in the editor
2. **Press `/`** to see formatting options
3. **Create a new page** with "+ New agent" in sidebar
4. **Try markdown**: Type `# ` for heading, `- ` for list
5. **Everything auto-saves** - no save button needed!

---

## 📚 Learn More

- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Detailed quick start
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute guide
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Fix common errors
- **[README.md](README.md)** - Full documentation

---

## 🆘 Common Issues

### "yarn: command not found"

**Fix:** Use `npm` instead (comes with Node.js)

```bash
npm install
npm run electron:dev
```

### "npm: command not found"

**Fix:** Install Node.js (see Step 1 above)

### "gyp: No Xcode or CLT version" (macOS)

**Fix:** Install Xcode tools

```bash
xcode-select --install
```

### Python errors

**Fix:** Install Python 3

```bash
# macOS
brew install python3

# Windows/Linux: Download from python.org
```

### Still stuck?

See **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** for detailed solutions

---

## 🎊 That's It!

You're ready to start using Potion. Enjoy your new local-first note-taking app! 📝

**Quick Commands:**

```bash
npm install           # Install dependencies (once)
npm run electron:dev  # Run the app
npm run lint          # Check code
npm run electron:build  # Build for production
```
