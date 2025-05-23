
import { useState, useEffect, useRef } from "react";
import { ArrowDown, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";

const Home = () => {
  const featuredProjects = projects.filter(project => project.featured);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-background to-muted/30"
      >
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <div className={cn(
            "transition-all duration-1000 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="mb-8">
              <img 
                src="/lovable-uploads/a6e4ee57-a5ff-483a-b6e1-71809843ead5.png" 
                alt="Roman Divković Logo" 
                className="mx-auto w-24 h-24 mb-6"
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="block">Hi, I'm</span>
                <span className="gold-gradient-text block">Roman Divković</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                I'm a fullstack developer specializing in React, React Native, and Firebase. 
                I build user-centered solutions with modern technology and passion.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Contact Me
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/projects">
                  View My Projects
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <Section 
        title="Featured Projects" 
        subtitle="Here are some of my recent projects that I'm proud of."
        className="bg-muted/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              featured={true}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild>
            <Link to="/projects">
              View All Projects
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Why Work With Me Section */}
      <Section title="Why Work With Me">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Fast & Efficient</h3>
            <p className="text-muted-foreground">
              I focus on optimized solutions that load quickly and run smoothly, ensuring the best possible user experience.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Responsive Design</h3>
            <p className="text-muted-foreground">
              All applications are designed to work flawlessly on any device, from mobile phones to large desktop screens.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Modern & Secure</h3>
            <p className="text-muted-foreground">
              I stay updated with the latest technologies and security practices to ensure your applications are both cutting-edge and secure.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-navy/10 to-gold/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Next Project?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you have a specific project in mind or just want to discuss some ideas, I'm always open to new opportunities and collaborations.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Let's Work Together
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
};

export default Home;
