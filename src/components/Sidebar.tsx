import { useEffect } from 'react'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  Home,
  MessageSquare,
  Search,
  Mail,
  Inbox,
  FileText,
  Calendar,
  CheckSquare,
  BookOpen,
  ShoppingCart,
  Trash2,
  Plus,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { pages, currentPageId, recentPages, loadPages, createPage, setCurrentPage } = useWorkspaceStore()

  useEffect(() => {
    loadPages()
  }, [loadPages])

  const recentPagesList = pages.filter(p => recentPages.includes(p.id)).slice(0, 5)
  const privatePages = pages.filter(p => !p.parent_id)

  const handleCreatePage = async () => {
    const page = await createPage('Untitled')
    setCurrentPage(page.id)
  }

  return (
    <div className="w-64 h-screen bg-[#1a1a1a] border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <span className="text-sm text-gray-300 truncate">Manoj Uppala's Notion</span>
        </div>
        
        <div className="flex gap-2 text-gray-400">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Home className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Inbox className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Recent Section */}
          {recentPagesList.length > 0 && (
            <div className="mb-4">
              <div className="px-2 py-1 text-xs text-gray-500 font-medium">Recents</div>
              {recentPagesList.map(page => (
                <PageItem
                  key={page.id}
                  page={page}
                  isActive={currentPageId === page.id}
                  onClick={() => setCurrentPage(page.id)}
                />
              ))}
            </div>
          )}

          {/* Agents Section */}
          <div className="mb-4">
            <div className="px-2 py-1 text-xs text-gray-500 font-medium">Agents</div>
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2 text-sm text-gray-400 hover:bg-gray-800"
              onClick={handleCreatePage}
            >
              <Plus className="h-4 w-4 mr-2" />
              New agent
            </Button>
          </div>

          {/* Private Section */}
          <div className="mb-4">
            <div className="px-2 py-1 text-xs text-gray-500 font-medium">Private</div>
            {privatePages.map(page => (
              <PageItem
                key={page.id}
                page={page}
                isActive={currentPageId === page.id}
                onClick={() => setCurrentPage(page.id)}
              />
            ))}
          </div>

          {/* Shared Section */}
          <div className="mb-4">
            <div className="px-2 py-1 text-xs text-gray-500 font-medium">Shared</div>
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2 text-sm text-gray-400 hover:bg-gray-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Start collaborating
            </Button>
          </div>

          {/* Notion Apps */}
          <div className="mb-4">
            <div className="px-2 py-1 text-xs text-gray-500 font-medium">Notion apps</div>
            <SidebarLink icon={<Mail className="h-4 w-4" />} label="Notion Mail" />
            <SidebarLink icon={<Calendar className="h-4 w-4" />} label="Notion Calendar" />
          </div>

          {/* Other Links */}
          <SidebarLink icon={<BookOpen className="h-4 w-4" />} label="Library" />
          <SidebarLink icon={<CheckSquare className="h-4 w-4" />} label="My Tasks" />
          <SidebarLink icon={<ShoppingCart className="h-4 w-4" />} label="Marketplace" />
          <SidebarLink icon={<Trash2 className="h-4 w-4" />} label="Trash" />
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-2 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start h-8 px-2 text-sm text-gray-400 hover:bg-gray-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          New chat ⌘O
        </Button>
      </div>
    </div>
  )
}

function PageItem({ page, isActive, onClick }: any) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-8 px-2 text-sm hover:bg-gray-800",
        isActive ? "bg-gray-800 text-white" : "text-gray-400"
      )}
      onClick={onClick}
    >
      <FileText className="h-4 w-4 mr-2" />
      <span className="truncate">{page.title}</span>
    </Button>
  )
}

function SidebarLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start h-8 px-2 text-sm text-gray-400 hover:bg-gray-800"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  )
}
