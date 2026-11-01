import { useState } from 'react'
import { Github, LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/interactive/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/overlays/dialog'
import { contactInfo } from '@/data/contact'

interface ProjectSourceActionsProps {
  title: string
  githubUrl?: string
  privateSource?: boolean
  backendUrl?: string
  compact?: boolean
}

const ProjectSourceActions = ({
  title,
  githubUrl,
  privateSource,
  backendUrl,
  compact = false,
}: ProjectSourceActionsProps) => {
  const [open, setOpen] = useState(false)
  const subject = encodeURIComponent(`Request access to ${title}`)
  const body = encodeURIComponent(
    `Hi Roman,\n\nI'd like to request access to the ${title} source code.\n\nMy GitHub username: \nReason for requesting access: \n`
  )

  return (
    <>
      {privateSource ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size={compact ? 'sm' : 'default'}
              className="flex-1"
              onClick={(event) => event.stopPropagation()}
            >
              <LockKeyhole className="mr-2 h-4 w-4" />
              Request Code Access
            </Button>
          </DialogTrigger>
          <DialogContent onClick={(event) => event.stopPropagation()}>
            <DialogHeader>
              <DialogTitle>Request access to {title}</DialogTitle>
              <DialogDescription>
                {title}'s source code is private. Email me with your GitHub username and a short
                reason for requesting access, and I'll get back to you.
              </DialogDescription>
            </DialogHeader>
            <Button asChild>
              <a href={`mailto:${contactInfo.email}?subject=${subject}&body=${body}`}>
                Request Access by Email
              </a>
            </Button>
            {backendUrl && (
              <p className="text-sm text-muted-foreground">
                The C# / .NET backend is public and can be viewed without requesting access.
              </p>
            )}
            {backendUrl && (
              <Button variant="outline" asChild>
                <a href={backendUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View C# Backend
                </a>
              </Button>
            )}
          </DialogContent>
        </Dialog>
      ) : githubUrl ? (
        <Button variant="outline" size={compact ? 'sm' : 'default'} className="flex-1" asChild>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            <Github className="mr-2 h-4 w-4" />
            {compact ? 'Code' : 'View Source Code'}
          </a>
        </Button>
      ) : null}
      {backendUrl && (
        <Button variant="outline" size={compact ? 'sm' : 'default'} className="flex-1" asChild>
          <a
            href={backendUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            <Github className="mr-2 h-4 w-4" />
            C# Backend
          </a>
        </Button>
      )}
    </>
  )
}

export default ProjectSourceActions
