
import { useState, useEffect } from "react";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import ProjectDialog from "@/components/ProjectDialog";
import { projects, Project } from "@/data/projects";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  
  const uniqueTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();
  
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter((project) => project.technologies.includes(filter));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="pt-16">
      <Section 
        title="My Projects" 
        subtitle="Explore my work and see what I've built"
        className="bg-gradient-to-b from-muted/20 to-background py-16 md:py-24"
      >
        {/* Filter buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
            className="rounded-full"
          >
            All
          </Button>
          
          {uniqueTechnologies.map((tech) => (
            <Button 
              key={tech} 
              variant={filter === tech ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter(tech)}
              className="rounded-full"
            >
              {tech}
            </Button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              featured={project.featured}
              onClick={() => handleProjectClick(project)}
              className="cursor-pointer"
            />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center my-16">
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              No projects match the selected filter. Try selecting a different technology.
            </p>
          </div>
        )}
      </Section>
      
      {/* Project details dialog */}
      <ProjectDialog 
        project={selectedProject} 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
      />
      
      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-navy/10 to-gold/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Interested in working together?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            I'm always open to discussing new projects and opportunities. Whether you have a specific project in mind or just want to chat, feel free to reach out!
          </p>
          <Button asChild size="lg">
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default Projects;
