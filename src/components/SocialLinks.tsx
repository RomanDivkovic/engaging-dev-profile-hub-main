import { Github, Linkedin, FileText, Code } from 'lucide-react'
import { toast } from 'sonner'

interface SocialLinksProps {
  className?: string
  showCodeButton?: boolean
}

export const SocialLinks = ({ className, showCodeButton = true }: SocialLinksProps) => {
  const handleCodeClick = () => {
    const messages = [
      "You're already on my website! 🚀",
      'Welcome to my digital home! 🏠',
      "Here you'll find everything about me and my projects! 💻",
      'Thanks for visiting my portfolio! 🙏',
    ]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    toast.success(randomMessage, { duration: 3000 })
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <a
        href="https://github.com/RomanDivkovic"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <Github className="h-5 w-5 hover:text-secondary transition-colors" />
      </a>
      <a
        href="https://www.linkedin.com/in/roman-divkovic-65699a19b/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-5 w-5 hover:text-secondary transition-colors" />
      </a>
      <a href="/files/cv.pdf" target="_blank" rel="noopener noreferrer" aria-label="CV">
        <FileText className="h-5 w-5 hover:text-secondary transition-colors" />
      </a>
      {showCodeButton && (
        <button
          onClick={handleCodeClick}
          className="hover:text-secondary transition-colors p-0 bg-transparent border-none"
          aria-label="You're already here!"
        >
          <Code className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
