import { create } from 'zustand'
import { Page } from '@/types'
import { nanoid } from 'nanoid'

interface WorkspaceState {
  pages: Page[]
  currentPageId: string | null
  recentPages: string[]
  favorites: string[]
  
  // Actions
  loadPages: () => Promise<void>
  createPage: (title: string, parentId?: string) => Promise<Page>
  updatePage: (id: string, updates: Partial<Page>) => Promise<void>
  deletePage: (id: string) => Promise<void>
  setCurrentPage: (id: string) => void
  addToRecent: (id: string) => void
  toggleFavorite: (id: string) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  pages: [],
  currentPageId: null,
  recentPages: [],
  favorites: [],

  loadPages: async () => {
    if (window.electronAPI) {
      const pages = await window.electronAPI.getPages()
      set({ pages })
    }
  },

  createPage: async (title: string, parentId?: string) => {
    const page: Page = {
      id: nanoid(),
      parent_id: parentId || null,
      title,
      icon: null,
      cover: null,
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted: 0
    }

    if (window.electronAPI) {
      await window.electronAPI.createPage(page)
      set(state => ({ pages: [...state.pages, page] }))
    }
    
    return page
  },

  updatePage: async (id: string, updates: Partial<Page>) => {
    if (window.electronAPI) {
      await window.electronAPI.updatePage(id, updates)
      set(state => ({
        pages: state.pages.map(p => p.id === id ? { ...p, ...updates, updated_at: Date.now() } : p)
      }))
    }
  },

  deletePage: async (id: string) => {
    if (window.electronAPI) {
      await window.electronAPI.deletePage(id)
      set(state => ({
        pages: state.pages.filter(p => p.id !== id)
      }))
    }
  },

  setCurrentPage: (id: string) => {
    set({ currentPageId: id })
    get().addToRecent(id)
  },

  addToRecent: (id: string) => {
    set(state => {
      const filtered = state.recentPages.filter(pid => pid !== id)
      return { recentPages: [id, ...filtered].slice(0, 10) }
    })
  },

  toggleFavorite: (id: string) => {
    set(state => {
      const isFavorite = state.favorites.includes(id)
      return {
        favorites: isFavorite
          ? state.favorites.filter(fid => fid !== id)
          : [...state.favorites, id]
      }
    })
  }
}))
