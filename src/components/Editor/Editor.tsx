import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { SlashCommandMenu } from './SlashCommandMenu'
import { GETTING_STARTED_CONTENT } from './GettingStartedContent'

export function Editor() {
  const { currentPageId, pages } = useWorkspaceStore()
  const currentPage = pages.find(p => p.id === currentPageId)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4]
        }
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Heading'
          }
          return "Click anywhere and just start typing"
        }
      }),
      TaskList,
      TaskItem.configure({
        nested: true
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-screen'
      }
    }
  })

  useEffect(() => {
    if (editor && currentPage) {
      // Load page content - use default content for "Getting Started"
      if (currentPage.title === 'Getting Started') {
        editor.commands.setContent(GETTING_STARTED_CONTENT)
      } else {
        editor.commands.setContent('')
      }
    }
  }, [editor, currentPage])

  if (!currentPageId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0f0f0f] text-gray-500">
        <div className="text-center">
          <p className="text-xl mb-2">Select a page to get started</p>
          <p className="text-sm">or create a new one</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-[#0f0f0f] overflow-auto">
      {/* Page Header */}
      <div className="px-24 pt-16 pb-8 border-b border-gray-800">
        <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <span>{currentPage?.title}</span>
          <span className="flex items-center gap-1">
            <span className="text-xs">🔒</span>
            <span className="text-xs">Private</span>
          </span>
        </div>
      </div>

      {/* Editor Content */}
      <div className="px-24 py-8">
        <EditorContent editor={editor} />
      </div>

      {/* Slash Command Menu */}
      <SlashCommandMenu editor={editor} />
    </div>
  )
}
