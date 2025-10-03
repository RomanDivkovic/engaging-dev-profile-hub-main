import { useOnlineStatus } from '@/hooks/use-online-status'
import { useOfflineStorage } from '@/hooks/use-offline-storage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw, MessageSquare, Briefcase } from 'lucide-react'

export const OfflineContent = () => {
  const { isOnline } = useOnlineStatus()
  const { storedMessages, hasStoredMessages } = useOfflineStorage()

  if (isOnline) return null

  // Cached project data (this would normally come from an API)
  const cachedProjects = [
    {
      id: 'betbuddys',
      title: 'BetBuddys',
      description: 'A webapp for creating groups and betting with friends on UFC/PPV events.',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      featured: true,
    },
    {
      id: 'portfolio',
      title: 'Developer Portfolio',
      description: 'A personal portfolio website showcasing projects and skills.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      featured: false,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Offline Mode</h2>
        <p className="text-muted-foreground">
          You're currently offline, but you can still browse cached content.
        </p>
        <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Refresh
        </Button>
      </div>

      {/* Pending Messages */}
      {hasStoredMessages && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Pending Messages ({storedMessages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              These messages will be sent when you're back online:
            </p>
            <div className="space-y-2">
              {storedMessages.slice(0, 3).map((msg, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">{msg}</p>
                </div>
              ))}
              {storedMessages.length > 3 && (
                <p className="text-sm text-muted-foreground">
                  ...and {storedMessages.length - 3} more
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cached Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Featured Projects (Cached)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {cachedProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{project.title}</h3>
                  {project.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Offline Tips */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Offline Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Your messages are automatically saved and will be sent when you're back online</p>
          <p>• You can still browse this portfolio's content</p>
          <p>• Try refreshing the page when your connection is restored</p>
          <p>• Some interactive features may be limited while offline</p>
        </CardContent>
      </Card>
    </div>
  )
}
