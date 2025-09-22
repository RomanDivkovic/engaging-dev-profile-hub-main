import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { contactInfo } from '@/data/contact'

export const ContactInfo = () => {
  return (
    <div className="space-y-8 animate-slide-in-right">
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-muted rounded-full p-3 mr-4">
            <Mail className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Email</h3>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-muted-foreground hover:text-secondary transition-colors"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-muted rounded-full p-3 mr-4">
            <Phone className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Phone</h3>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="text-muted-foreground hover:text-secondary transition-colors"
            >
              {contactInfo.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-muted rounded-full p-3 mr-4">
            <MapPin className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Location</h3>
            <p className="text-muted-foreground">{contactInfo.location}</p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-muted">
        <h3 className="font-medium mb-4">Connect with me</h3>
        <div className="flex space-x-4">
          <a
            href={contactInfo.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted hover:bg-secondary/20 transition-colors rounded-full p-3"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={contactInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted hover:bg-secondary/20 transition-colors rounded-full p-3"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
