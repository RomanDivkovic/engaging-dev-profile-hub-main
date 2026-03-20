import * as React from 'react'
import type { SidebarContext } from './sidebar-types'

export const SidebarContextValue = React.createContext<SidebarContext | null>(null)
