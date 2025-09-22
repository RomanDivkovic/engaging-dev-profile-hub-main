import { useEffect } from 'react'
import Section from '@/components/Section'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-16">
      <Section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 reveal-animation">
              <span>Get in </span>
              <span className="gold-gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl reveal-animation">
              I'm always interested in new opportunities, collaborations, or just a friendly chat
              about technology and development.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Contact
