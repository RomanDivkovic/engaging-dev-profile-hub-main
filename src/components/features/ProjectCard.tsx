import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/data-display/card'
import { Button } from '@/components/ui/interactive/button'
import { Eye, Github, AlertTriangle } from 'lucide-react'
import TechStack from '../common/TechStack'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { track } from '@vercel/analytics'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  image: string
  mobileImage?: string
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
  mobileImage,
  demoUrl,
  githubUrl,
  alert,
  className,
  featured = false,
  onClick,
}: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const currentImage = isMobile && mobileImage ? mobileImage : image

  const handleImageError = () => {
    console.error(`Failed to load image for project: ${title}`)
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleInteraction = (e: React.MouseEvent, url?: string, type?: string) => {
    e.stopPropagation()

    if (type && title) {
      track('Project Interaction', { project: title, action: type })
    }

    if (alert) {
      toast.info(alert, {
        action: url ? { label: 'Continue', onClick: () => window.open(url, '_blank') } : undefined,
      })
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCardClick = () => {
    track('Project Card Clicked', { project: title })
    if (onClick) onClick()
  }

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] cursor-pointer group',
        featured && 'border-secondary/50',
        className
      )}
      onClick={handleCardClick}
    >
      <div className="aspect-video w-full overflow-hidden relative bg-muted/20">
        {!imageError ? (
          <img
            src={currentImage}
            alt={`Screenshot of ${title} - ${description.slice(0, 60)}${description.length > 60 ? '...' : ''}`}
            className={cn(
              'w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:brightness-105',
              !imageLoaded && 'opacity-0'
            )}
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50">
            <div className="text-center p-4">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Image unavailable</p>
            </div>
          </div>
        )}
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
            onClick={(e) => handleInteraction(e, demoUrl, 'demo')}
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
            onClick={(e) => handleInteraction(e, githubUrl, 'github')}
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
            onClick={(e) => handleInteraction(e, undefined, 'private-repo')}
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
