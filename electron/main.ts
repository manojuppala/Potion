import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Database setup
let db: Database.Database;

function initDatabase() {
  const userDataPath = app.getPath("userData");
  const dbPath = path.join(userDataPath, "potion.db");

  db = new Database(dbPath);

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY,
      parent_id TEXT,
      title TEXT,
      icon TEXT,
      cover TEXT,
      created_at INTEGER,
      updated_at INTEGER,
      deleted INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS blocks (
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

    CREATE TABLE IF NOT EXISTS databases (
      id TEXT PRIMARY KEY,
      page_id TEXT,
      schema_json TEXT,
      created_at INTEGER,
      updated_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS database_rows (
      id TEXT PRIMARY KEY,
      database_id TEXT,
      values_json TEXT,
      created_at INTEGER,
      updated_at INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_pages_parent ON pages(parent_id);
    CREATE INDEX IF NOT EXISTS idx_blocks_page ON blocks(page_id);
    CREATE INDEX IF NOT EXISTS idx_blocks_parent ON blocks(parent_block_id);
  `);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    titleBarStyle: "hiddenInset",
    backgroundColor: "#1a1a1a",
  });

  // In development, load from vite dev server
  // VITE_DEV_SERVER_URL is set by vite-plugin-electron
  const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";

  if (process.env.NODE_ENV !== "production") {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  initDatabase();
  setupIpcHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    db.close();
    app.quit();
  }
});

function setupIpcHandlers() {
  // Page operations
  ipcMain.handle("db:getPages", () => {
    return db.prepare("SELECT * FROM pages WHERE deleted = 0 ORDER BY created_at DESC").all();
  });

  ipcMain.handle("db:getPage", (_, id: string) => {
    return db.prepare("SELECT * FROM pages WHERE id = ?").get(id);
  });

  ipcMain.handle("db:createPage", (_, page: any) => {
    const stmt = db.prepare(`
      INSERT INTO pages (id, parent_id, title, icon, cover, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      page.id,
      page.parent_id,
      page.title,
      page.icon,
      page.cover,
      page.created_at,
      page.updated_at,
    );
    return page;
  });

  ipcMain.handle("db:updatePage", (_, id: string, updates: any) => {
    const stmt = db.prepare(`
      UPDATE pages SET title = ?, icon = ?, cover = ?, updated_at = ? WHERE id = ?
    `);
    stmt.run(updates.title, updates.icon, updates.cover, Date.now(), id);
    return db.prepare("SELECT * FROM pages WHERE id = ?").get(id);
  });

  ipcMain.handle("db:deletePage", (_, id: string) => {
    const stmt = db.prepare("UPDATE pages SET deleted = 1 WHERE id = ?");
    stmt.run(id);
  });

  // Block operations
  ipcMain.handle("db:getBlocks", (_, pageId: string) => {
    return db.prepare("SELECT * FROM blocks WHERE page_id = ? ORDER BY position").all(pageId);
  });

  ipcMain.handle("db:createBlock", (_, block: any) => {
    const stmt = db.prepare(`
      INSERT INTO blocks (id, page_id, parent_block_id, type, content, position, props, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      block.id,
      block.page_id,
      block.parent_block_id,
      block.type,
      block.content,
      block.position,
      block.props,
      block.created_at,
      block.updated_at,
    );
    return block;
  });

  ipcMain.handle("db:updateBlock", (_, id: string, updates: any) => {
    const stmt = db.prepare(`
      UPDATE blocks SET content = ?, props = ?, updated_at = ? WHERE id = ?
    `);
    stmt.run(updates.content, updates.props, Date.now(), id);
  });
}
