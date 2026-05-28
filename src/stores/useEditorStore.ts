import { create } from 'zustand'
import { Block } from '@/types'

interface EditorState {
  blocks: Block[]
  selectedBlockIds: string[]
  isCommandMenuOpen: boolean
  
  // Actions
  loadBlocks: (pageId: string) => Promise<void>
  createBlock: (block: Partial<Block>) => Promise<void>
  updateBlock: (id: string, updates: Partial<Block>) => Promise<void>
  setSelectedBlocks: (ids: string[]) => void
  toggleCommandMenu: () => void
  setCommandMenuOpen: (open: boolean) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  blocks: [],
  selectedBlockIds: [],
  isCommandMenuOpen: false,

  loadBlocks: async (pageId: string) => {
    if (window.electronAPI) {
      const blocks = await window.electronAPI.getBlocks(pageId)
      set({ blocks })
    }
  },

  createBlock: async (block: Partial<Block>) => {
    if (window.electronAPI && block.page_id) {
      const newBlock = await window.electronAPI.createBlock({
        ...block,
        created_at: Date.now(),
        updated_at: Date.now()
      })
      set(state => ({ blocks: [...state.blocks, newBlock] }))
    }
  },

  updateBlock: async (id: string, updates: Partial<Block>) => {
    if (window.electronAPI) {
      await window.electronAPI.updateBlock(id, updates)
      set(state => ({
        blocks: state.blocks.map(b => b.id === id ? { ...b, ...updates } : b)
      }))
    }
  },

  setSelectedBlocks: (ids: string[]) => {
    set({ selectedBlockIds: ids })
  },

  toggleCommandMenu: () => {
    set(state => ({ isCommandMenuOpen: !state.isCommandMenuOpen }))
  },

  setCommandMenuOpen: (open: boolean) => {
    set({ isCommandMenuOpen: open })
  }
}))
