# Installing Prerequisites for Potion

Before you can run Potion, you need to install Node.js and a package manager. Follow the steps below for your operating system.

## Required Software

1. **Node.js 18 or higher** - JavaScript runtime
2. **npm** (comes with Node.js) - Package manager
3. **pnpm** (optional, recommended) - Fast package manager

---

## Installation Steps

### Option 1: Install Node.js (Recommended)

#### macOS

**Using Homebrew (Recommended):**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

**Using Official Installer:**
1. Download from [nodejs.org](https://nodejs.org/)
2. Choose the LTS version (Long Term Support)
3. Run the installer
4. Verify: `node --version` and `npm --version`

#### Windows

**Using Official Installer:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version for Windows
3. Run the `.msi` installer
4. Follow the installation wizard
5. Verify in Command Prompt: `node --version` and `npm --version`

**Using Chocolatey:**
```powershell
# Install Chocolatey first if needed
# Then install Node.js
choco install nodejs-lts

# Verify
node --version
npm --version
```

#### Linux (Ubuntu/Debian)

```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

---

### Option 2: Install pnpm (Optional but Recommended)

After installing Node.js, install pnpm for faster package management:

```bash
# Using npm
npm install -g pnpm

# Verify
pnpm --version
```

---

## After Installing Prerequisites

Once Node.js and npm (or pnpm) are installed:

### 1. Install Potion Dependencies

Navigate to the Potion directory and run:

```bash
# Using pnpm (faster, recommended)
pnpm install

# OR using npm (comes with Node.js)
npm install

# OR using yarn (if you have it)
yarn install
```

This will install all ~200 dependencies needed for Potion.

### 2. Start Potion in Development Mode

```bash
# Using pnpm
pnpm electron:dev

# OR using npm
npm run electron:dev

# OR using yarn
yarn electron:dev
```

---

## Troubleshooting

### "pnpm: command not found"

**Solution**: Either install pnpm (see above) or use npm instead:
```bash
npm install
npm run electron:dev
```

### "npm: command not found"

**Solution**: Node.js is not installed. Follow the installation steps above.

### "node: command not found"

**Solution**: Node.js is not installed or not in your PATH. Follow the installation steps above.

### Permission errors on macOS/Linux

**Solution**: Don't use `sudo` with npm. Instead, configure npm to install global packages without sudo:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Build fails on macOS with "gyp: No Xcode or CLT version"

**Solution**: Install Xcode Command Line Tools:
```bash
xcode-select --install
```

### Python errors during installation

**Solution**: Some native modules need Python. Install Python 3:
```bash
# macOS
brew install python3

# Ubuntu/Debian
sudo apt-get install python3

# Windows
# Download from python.org
```

---

## Quick Start After Installation

Once everything is installed:

```bash
# 1. Install dependencies (only needed once)
npm install

# 2. Run Potion
npm run electron:dev
```

That's it! The app should open automatically.

---

## Verification Checklist

Before running Potion, verify you have:

- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ In the Potion directory
- ✅ Run `npm install` successfully
- ✅ Ready to run `npm run electron:dev`

---

## Additional Resources

- [Node.js Downloads](https://nodejs.org/)
- [pnpm Installation](https://pnpm.io/installation)
- [Homebrew (macOS)](https://brew.sh/)
- [Chocolatey (Windows)](https://chocolatey.org/)

---

## Next Steps

After installation succeeds:
1. Read [QUICKSTART.md](QUICKSTART.md) for a 5-minute guide
2. Check [README.md](README.md) for full documentation
3. See [NEXT_STEPS.md](NEXT_STEPS.md) for what to do next
