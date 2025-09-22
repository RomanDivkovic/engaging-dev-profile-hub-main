import Section from '@/components/Section'
import TechStack from '@/components/TechStack'
import { skills } from '@/data/about'

export const SkillsSection = () => {
  return (
    <Section title="Skills" subtitle="Technologies and tools I work with" className="bg-muted/10">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-center">{skill.category}</h3>
            <TechStack technologies={skill.technologies} className="justify-center" />
          </div>
        ))}
      </div>
    </Section>
  )
}
