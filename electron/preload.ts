import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Page operations
  getPages: () => ipcRenderer.invoke('db:getPages'),
  getPage: (id: string) => ipcRenderer.invoke('db:getPage', id),
  createPage: (page: any) => ipcRenderer.invoke('db:createPage', page),
  updatePage: (id: string, updates: any) => ipcRenderer.invoke('db:updatePage', id, updates),
  deletePage: (id: string) => ipcRenderer.invoke('db:deletePage', id),
  
  // Block operations
  getBlocks: (pageId: string) => ipcRenderer.invoke('db:getBlocks', pageId),
  createBlock: (block: any) => ipcRenderer.invoke('db:createBlock', block),
  updateBlock: (id: string, updates: any) => ipcRenderer.invoke('db:updateBlock', id, updates),
})

declare global {
  interface Window {
    electronAPI: {
      getPages: () => Promise<any[]>
      getPage: (id: string) => Promise<any>
      createPage: (page: any) => Promise<any>
      updatePage: (id: string, updates: any) => Promise<any>
      deletePage: (id: string) => Promise<void>
      getBlocks: (pageId: string) => Promise<any[]>
      createBlock: (block: any) => Promise<any>
      updateBlock: (id: string, updates: any) => Promise<void>
    }
  }
}
