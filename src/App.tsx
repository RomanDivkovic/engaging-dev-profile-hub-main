import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PageTransitionRoutes from './PageTransitionRoutes'
import { OfflineIndicator } from './components/OfflineIndicator'
import { useServiceWorker } from './hooks/use-service-worker'
import { useOnlineStatus } from './hooks/use-online-status'
import { OfflineContent } from './components/OfflineContent'

const queryClient = new QueryClient()

const App = () => {
  useServiceWorker()
  const { isOnline } = useOnlineStatus()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg transition-all"
        >
          Skip to main content
        </a>

        <Toaster />
        <Sonner />
        <BrowserRouter>
          <OfflineIndicator />
          {isOnline && <NavBar />}
          <main id="main-content">{isOnline ? <PageTransitionRoutes /> : <OfflineContent />}</main>
          {isOnline && <Footer />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
