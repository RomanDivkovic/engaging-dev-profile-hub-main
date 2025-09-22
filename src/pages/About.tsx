import { useEffect } from 'react'
import Section from '@/components/Section'
import Timeline from '@/components/Timeline'
import { HeroSection } from '@/components/about/HeroSection'
import { SkillsSection } from '@/components/about/SkillsSection'
import { PersonalStrengthsSection } from '@/components/about/PersonalStrengthsSection'
import { CTASection } from '@/components/about/CTASection'
import { useAboutData } from '@/hooks/use-about-data'

const About = () => {
  const { educationTimeline, experienceTimeline } = useAboutData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-16">
      <HeroSection />

      {/* Experience Section */}
      <Section
        title="Work Experience"
        subtitle="My professional journey as a developer"
        className="bg-muted/10"
      >
        <div className="max-w-4xl mx-auto">
          <Timeline items={experienceTimeline} />
        </div>
      </Section>

      {/* Education Section */}
      <Section
        title="Education & Internships"
        subtitle="My academic background and practical experience"
      >
        <div className="max-w-4xl mx-auto">
          <Timeline items={educationTimeline} />
        </div>
      </Section>

      <SkillsSection />
      <PersonalStrengthsSection />
      <CTASection />
    </div>
  )
}

export default About
