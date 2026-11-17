import Section from '@/components/common/Section'
import { SpinningPortrait } from './SpinningPortrait'

export const HeroSection = () => {
  return (
    <Section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 reveal-animation">
            <span>About</span>
            <span className="gold-gradient-text"> Me</span>
          </h1>

          {/* Profile Image and Bio */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <SpinningPortrait />

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 reveal-animation flex-1">
              <p className="text-lg text-muted-foreground">
                I'm Roman Divković, currently working in the IT department at Capio Sweden as a
                software developer with experience across the whole stack. I finished my studies in
                App development for iOS & Android in Gothenburg, Sweden.
              </p>

              <p className="text-lg text-muted-foreground">
                I have skills in iOS and Android development using Java, as well as backend
                development with C# and .NET. I also work with React, React Native for
                cross-platform development, and Vue for web solutions. I'm experienced with
                Firebase, MySQL, and various development tools.
              </p>

              <p className="text-lg text-muted-foreground">
                I also build basketball management games with Expo and with Unity, C# and C++,
                alongside private AI projects including LocalisAI and its Guardian action
                safeguards. You can explore these projects in my portfolio and contact me to discuss
                the work.
              </p>

              <p className="text-lg text-muted-foreground">
                I'm fluent in Swedish, English, and Serbo-Croatian, both orally and written. Don't
                hesitate to contact me if you want to hear more about me and what I can do for your
                company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
