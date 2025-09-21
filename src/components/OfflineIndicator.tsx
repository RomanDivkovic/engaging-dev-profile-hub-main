import { AlertTriangle, Wifi, WifiOff } from 'lucide-react'
import { useOnlineStatus } from '@/hooks/use-online-status'

export const OfflineIndicator = () => {
  const { isOnline, showOfflineMessage } = useOnlineStatus()

  if (isOnline && !showOfflineMessage) return null

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      <div
        className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
          isOnline
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
        }`}
      >
        {isOnline ? (
          <Wifi className="h-5 w-5 text-green-600 dark:text-green-400" />
        ) : (
          <WifiOff className="h-5 w-5 text-red-600 dark:text-red-400" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium">{isOnline ? 'Back online!' : 'Offline mode'}</p>
          <p className="text-xs opacity-90">
            {isOnline
              ? 'All features are available again.'
              : 'Some features may be limited without internet.'}
          </p>
        </div>
      </div>
    </div>
  )
}
