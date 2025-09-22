import Section from '@/components/Section'
import { profileImage } from '@/data/about'

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
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg reveal-animation">
              <img src={profileImage} alt="Roman Divković" className="w-full h-full object-cover" />
            </div>

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
                Currently, I'm expanding my mobile development skills by learning Flutter and
                developing an app using this framework. This allows me to explore new approaches to
                cross-platform mobile development and stay current with emerging technologies.
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
