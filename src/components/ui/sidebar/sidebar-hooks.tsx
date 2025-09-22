import { useContext } from 'react'
import { SidebarContextValue } from './sidebar-context'

export function useSidebar() {
  const context = useContext(SidebarContextValue)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}
