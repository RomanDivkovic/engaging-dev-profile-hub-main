import * as React from 'react'
import { PanelLeft } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { Button } from '../button'
import { useSidebar } from './sidebar-hooks'

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('h-7 w-7', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = 'SidebarTrigger'

export const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          'absolute inset-y-0 right-0 z-20 hidden w-4 translate-x-1/2 cursor-col-resize bg-transparent transition-colors ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2 after:bg-sidebar-border after:transition-colors hover:after:bg-sidebar-accent-foreground group-data-[side=right]:right-auto group-data-[side=right]:left-0 group-data-[side=right]:after:left-auto group-data-[side=right]:after:right-1/2 group-data-[side=right]:after:-translate-x-1/2 group-data-[side=right]:after:translate-x-1/2 group-data-[side=right]:cursor-w-resize md:flex',
          '[[data-side=left]_&]:cursor-w-resize',
          '[[data-side=right]_&]:cursor-e-resize',
          '[[data-state=collapsed]_&]:cursor-e-resize',
          '[[data-state=expanded]_&]:cursor-w-resize',
          className
        )}
        {...props}
      />
    )
  }
)
SidebarRail.displayName = 'SidebarRail'
