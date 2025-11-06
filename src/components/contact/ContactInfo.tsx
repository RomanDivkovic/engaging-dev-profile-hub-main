import * as React from 'react'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { contactInfo } from '@/data/contact'
import MapModal from '@/components/MapModal'

export const ContactInfo = () => {
  const [mapOpen, setMapOpen] = React.useState(false)

  return (
    <>
      <div className="space-y-8 animate-slide-in-right">
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

        <div className="space-y-6">
          <div className="flex items-start">
            <a
              href={`mailto:${contactInfo.email}`}
              className="bg-muted rounded-full p-3 mr-4 hover:bg-secondary/20 transition-colors cursor-pointer"
              aria-label="Send email"
            >
              <Mail className="h-5 w-5 text-foreground" />
            </a>
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
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="bg-muted rounded-full p-3 mr-4 hover:bg-secondary/20 transition-colors cursor-pointer"
              aria-label="Call phone number"
            >
              <Phone className="h-5 w-5 text-foreground" />
            </a>
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
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              className="bg-muted rounded-full p-3 mr-4 hover:bg-secondary/20 transition-colors cursor-pointer"
              aria-label="Open location in map"
            >
              <MapPin className="h-5 w-5 text-foreground" />
            </button>
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                className="text-muted-foreground hover:text-secondary transition-colors text-left"
                aria-label="Open location in map"
                data-testid="open-map"
              >
                {contactInfo.location}
              </button>
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
              <Github className="h-5 w-5 text-foreground" />
            </a>
            <a
              href={contactInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted hover:bg-secondary/20 transition-colors rounded-full p-3"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-foreground" />
            </a>
          </div>
        </div>
      </div>
      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} label={contactInfo.location} />
    </>
  )
}
