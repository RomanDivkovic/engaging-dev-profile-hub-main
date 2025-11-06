export type SidebarContext = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: (value: boolean | ((prev: boolean) => boolean)) => void
  isMobile: boolean
  toggleSidebar: () => void
}
