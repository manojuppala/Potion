import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Editor } from '@/components/Editor/Editor'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'

function App() {
  const { loadPages, createPage, pages, setCurrentPage } = useWorkspaceStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeApp = async () => {
      await loadPages()
      setIsInitialized(true)
    }

    initializeApp()
  }, [loadPages])

  useEffect(() => {
    const createDefaultPage = async () => {
      if (isInitialized && pages.length === 0) {
        const page = await createPage('Getting Started')
        setCurrentPage(page.id)
      } else if (isInitialized && pages.length > 0 && !useWorkspaceStore.getState().currentPageId) {
        setCurrentPage(pages[0].id)
      }
    }

    createDefaultPage()
  }, [isInitialized, pages, createPage, setCurrentPage])

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-white overflow-hidden">
      <Sidebar />
      <Editor />
    </div>
  )
}

export default App
