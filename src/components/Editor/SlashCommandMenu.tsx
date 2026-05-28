import { useState, useEffect } from 'react'
import { Editor } from '@tiptap/react'
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  Minus,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SlashCommandMenuProps {
  editor: Editor | null
}

interface Command {
  title: string
  description?: string
  icon: React.ReactNode
  command: () => void
  shortcut?: string
}

export function SlashCommandMenu({ editor }: SlashCommandMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands: Command[] = [
    {
      title: 'Text',
      icon: <Type className="h-4 w-4" />,
      command: () => editor?.chain().focus().setParagraph().run()
    },
    {
      title: 'Heading 1',
      icon: <Heading1 className="h-4 w-4" />,
      command: () => editor?.chain().focus().setHeading({ level: 1 }).run(),
      shortcut: '#'
    },
    {
      title: 'Heading 2',
      icon: <Heading2 className="h-4 w-4" />,
      command: () => editor?.chain().focus().setHeading({ level: 2 }).run(),
      shortcut: '##'
    },
    {
      title: 'Heading 3',
      icon: <Heading3 className="h-4 w-4" />,
      command: () => editor?.chain().focus().setHeading({ level: 3 }).run(),
      shortcut: '###'
    },
    {
      title: 'Heading 4',
      icon: <Heading4 className="h-4 w-4" />,
      command: () => editor?.chain().focus().setHeading({ level: 4 }).run(),
      shortcut: '####'
    },
    {
      title: 'Bulleted list',
      icon: <List className="h-4 w-4" />,
      command: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
      title: 'Numbered list',
      icon: <ListOrdered className="h-4 w-4" />,
      command: () => editor?.chain().focus().toggleOrderedList().run(),
      shortcut: '1.'
    },
    {
      title: 'To-do list',
      icon: <CheckSquare className="h-4 w-4" />,
      command: () => editor?.chain().focus().toggleTaskList().run(),
      shortcut: '[]'
    },
    {
      title: 'Toggle list',
      icon: <ChevronRight className="h-4 w-4" />,
      command: () => editor?.chain().focus().setParagraph().run()
    },
    {
      title: 'Code',
      icon: <Code className="h-4 w-4" />,
      command: () => editor?.chain().focus().setCodeBlock().run()
    },
    {
      title: 'Divider',
      icon: <Minus className="h-4 w-4" />,
      command: () => editor?.chain().focus().setHorizontalRule().run()
    }
  ]

  const filteredCommands = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (!editor) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        setIsOpen(true)
      }
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editor])

  if (!isOpen || !editor) return null

  const handleSelect = (command: Command) => {
    command.command()
    setIsOpen(false)
    setSearch('')
    setSelectedIndex(0)
  }

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[480px] bg-[#2a2a2a] rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
      <div className="p-2">
        <div className="text-xs text-gray-500 px-3 py-2 font-medium">Basic blocks</div>
        {filteredCommands.map((cmd, index) => (
          <button
            key={cmd.title}
            onClick={() => handleSelect(cmd)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 text-left transition-colors",
              selectedIndex === index && "bg-gray-700"
            )}
          >
            <div className="text-gray-400">{cmd.icon}</div>
            <div className="flex-1">
              <div className="text-sm text-white">{cmd.title}</div>
            </div>
            {cmd.shortcut && (
              <div className="text-xs text-gray-500">{cmd.shortcut}</div>
            )}
          </button>
        ))}
      </div>
      <div className="border-t border-gray-700 px-3 py-2 flex items-center justify-between text-xs text-gray-500">
        <span>Type to filter...</span>
        <span>Close menu <kbd className="px-1 bg-gray-800 rounded">esc</kbd></span>
      </div>
    </div>
  )
}
