import Section from '@/components/Section'
import { personalStrengths } from '@/data/about'

export const PersonalStrengthsSection = () => {
  return (
    <Section title="Personal Strengths">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {personalStrengths.map((strength, index) => (
          <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3">{strength.title}</h3>
            <p className="text-muted-foreground">{strength.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
