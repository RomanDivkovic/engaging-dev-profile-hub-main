import Section from '@/components/Section'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export const CTASection = () => {
  return (
    <Section className="bg-gradient-to-r from-navy/10 to-gold/10">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Want to learn more?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <a href="https://betbuddys.app" target="_blank" rel="noopener noreferrer">
              BetBuddy
            </a>
          </Button>
          <Button asChild>
            <a href="https://bookingsystems.vercel.app" target="_blank" rel="noopener noreferrer">
              Calender
            </a>
          </Button>
          <Button asChild>
            <a href="https://capio.se/" target="_blank" rel="noopener noreferrer">
              Capio
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/files/cv.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
