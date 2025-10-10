import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Github, AlertTriangle } from 'lucide-react'
import TechStack from './TechStack'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  alert?: string
  className?: string
  featured?: boolean
  onClick?: () => void
}

const ProjectCard = ({
  title,
  description,
  technologies,
  image,
  demoUrl,
  githubUrl,
  alert,
  className,
  featured = false,
  onClick,
}: ProjectCardProps) => {
  const handleInteraction = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation()
    if (alert) {
      toast.info(alert, {
        action: url ? { label: 'Continue', onClick: () => window.open(url, '_blank') } : undefined,
      })
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] cursor-pointer group',
        featured && 'border-secondary/50',
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={image}
          alt={`Screenshot of ${title} - ${description.slice(0, 60)}${description.length > 60 ? '...' : ''}`}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:brightness-105"
          loading="lazy"
        />
        {alert && (
          <div className="absolute top-2 right-2" role="img" aria-label="Warning">
            <AlertTriangle className="w-5 h-5 text-yellow-400" aria-hidden="true" />
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          {featured && (
            <span className="text-xs font-medium bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <TechStack technologies={technologies} />
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        {demoUrl && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => handleInteraction(e, demoUrl)}
          >
            <Eye className="mr-1 h-4 w-4" />
            Demo
          </Button>
        )}
        {githubUrl && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => handleInteraction(e, githubUrl)}
          >
            <Github className="mr-1 h-4 w-4" />
            Code
          </Button>
        )}
        {!githubUrl && alert && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => handleInteraction(e)}
          >
            <Github className="mr-1 h-4 w-4" />
            Code
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
