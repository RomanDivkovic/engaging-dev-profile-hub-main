import Section from '@/components/common/Section'
import { Button } from '@/components/ui/interactive/button'
import { FileText } from 'lucide-react'
import { track } from '@vercel/analytics'

export const CTASection = () => {
  const handleCTAClick = (name: string, url: string) => {
    track('CTA Button Clicked', { button: name, url })
  }

  return (
    <Section className="bg-gradient-to-r from-navy/10 to-gold/10">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Want to learn more?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <a
              href="https://betbuddys.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTAClick('BetBuddy', 'https://betbuddys.app')}
            >
              BetBuddy
            </a>
          </Button>
          <Button asChild>
            <a
              href="https://bookingsystems.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTAClick('Calender', 'https://bookingsystems.vercel.app')}
            >
              Calender
            </a>
          </Button>
          <Button asChild>
            <a
              href="https://capio.se/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCTAClick('Capio', 'https://capio.se/')}
            >
              Capio
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="/files/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('CV Downloaded', { location: 'CTA-section' })}
            >
              <FileText className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
