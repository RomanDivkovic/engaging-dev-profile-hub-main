
import { useEffect } from "react";
import Section from "@/components/Section";
import Timeline from "@/components/Timeline";
import TechStack from "@/components/TechStack";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

// Updated data based on CV
const educationTimeline = [
  {
    year: "2022",
    title: "App Development for iOS & Android",
    organization: "IT-Högskolan, Gothenburg",
    description: "Completed studies in mobile application development, focusing on iOS and Android platforms with modern development practices."
  },
  {
    year: "2022",
    title: "Internship - App Developer",
    organization: "Gardenize AB, Göteborg",
    description: "Second internship focusing on iOS development and Android features. Worked on native apps and implemented push notifications for garden management features."
  },
  {
    year: "2021",
    title: "Internship - System Developer",
    organization: "Find Sourcing, Gothenburg",
    description: "First internship creating applications from scratch using JavaScript and React Native, focusing on user-friendly tariff code solutions."
  }
];

const experienceTimeline = [
  {
    year: "2022",
    title: "Software Developer",
    organization: "Capio AB",
    description: "Working as a junior software developer with the whole stack. Developed both front-end and back-end solutions using React, React Native, JavaScript, TypeScript, C#, and .NET."
  }
];

const skills = [
  {
    category: "Mobile Development",
    technologies: ["React Native", "iOS", "Android", "Swift", "Java"]
  },
  {
    category: "Frontend",
    technologies: ["React", "Vue", "TypeScript", "JavaScript", "HTML/CSS"]
  },
  {
    category: "Backend",
    technologies: ["C#", ".NET", "Firebase", "MySQL", "REST APIs"]
  },
  {
    category: "Tools & Methods",
    technologies: ["Xcode", "Android Studio", "Git", "Objective-C", "Database Functionality"]
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
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
                <img 
                  src="/lovable-uploads/07d45f1f-1633-4df8-92fa-a6306a59bbb5.png" 
                  alt="Roman Divković" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 reveal-animation flex-1">
                <p className="text-lg text-muted-foreground">
                  I'm Roman Divković, currently working in the IT department at Capio Sweden as a software developer with experience across the whole stack. I finished my studies in App development for iOS & Android in Gothenburg, Sweden.
                </p>
                
                <p className="text-lg text-muted-foreground">
                  I have skills in iOS and Android development using Java, as well as backend development with C# and .NET. I also work with React, React Native for cross-platform development, and Vue for web solutions. I'm experienced with Firebase, MySQL, and various development tools.
                </p>
                
                <p className="text-lg text-muted-foreground">
                  Currently, I'm expanding my mobile development skills by learning Flutter and developing an app using this framework. This allows me to explore new approaches to cross-platform mobile development and stay current with emerging technologies.
                </p>
                
                <p className="text-lg text-muted-foreground">
                  I'm fluent in Swedish, English, and Serbo-Croatian, both orally and written. Don't hesitate to contact me if you want to hear more about me and what I can do for your company.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

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
      <Section title="Education & Internships" subtitle="My academic background and practical experience">
        <div className="max-w-4xl mx-auto">
          <Timeline items={educationTimeline} />
        </div>
      </Section>
      
      {/* Skills Section */}
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
      
      {/* Personal Strengths */}
      <Section title="Personal Strengths">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3">Full-Stack Development</h3>
            <p className="text-muted-foreground">
              Experience working with both frontend and backend technologies, from mobile apps to web solutions, ensuring complete project delivery.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3">Cross-Platform Solutions</h3>
            <p className="text-muted-foreground">
              Skilled in developing applications for multiple platforms using React Native, ensuring consistent user experience across iOS and Android.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3">Multilingual Communication</h3>
            <p className="text-muted-foreground">
              Fluent in Swedish, English, and Serbo-Croatian, enabling effective communication in diverse international teams and projects.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3">Healthcare Technology</h3>
            <p className="text-muted-foreground">
              Specialized experience in healthcare technology through my work at Capio, understanding the unique requirements of medical applications.
            </p>
          </div>
        </div>
      </Section>
      
      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-navy/10 to-gold/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Want to learn more?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild>
              <Link to="/projects">
                View My Projects
              </Link>
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
    </div>
  );
};

export default About;
