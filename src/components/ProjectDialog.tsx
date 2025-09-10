import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Eye, Github, AlertTriangle } from 'lucide-react'
import TechStack from './TechStack'
import { Project } from '@/data/projects'
import { toast } from 'sonner'

interface ProjectDialogProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectDialog = ({ project, isOpen, onClose }: ProjectDialogProps) => {
  if (!project) return null

  const handleInteraction = (e: React.MouseEvent, url?: string) => {
    e.preventDefault()
    if (project.alert) {
      toast.info(project.alert, {
        action: url ? { label: 'Continue', onClick: () => window.open(url, '_blank') } : undefined,
      })
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {project.alert && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-yellow-500/10 text-yellow-500">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm">{project.alert}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Project Overview</h4>
              <p className="text-muted-foreground">{project.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Features</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {project.features?.map((feature, index) => <li key={index}>{feature}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">My Role</h4>
              <p className="text-muted-foreground">{project.role}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Technologies</h4>
              <TechStack technologies={project.technologies} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {project.demoUrl && (
              <Button
                variant="default"
                className="flex-1"
                onClick={(e) => handleInteraction(e, project.demoUrl)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={(e) => handleInteraction(e, project.githubUrl)}
              >
                <Github className="mr-2 h-4 w-4" />
                View Source Code
              </Button>
            )}
            {!project.githubUrl && project.alert && (
              <Button variant="outline" className="flex-1" onClick={(e) => handleInteraction(e)}>
                <Github className="mr-2 h-4 w-4" />
                View Source Code
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDialog
