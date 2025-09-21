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
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <OfflineIndicator />
          {isOnline && <NavBar />}
          <main>{isOnline ? <PageTransitionRoutes /> : <OfflineContent />}</main>
          {isOnline && <Footer />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
