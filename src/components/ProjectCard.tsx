
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Github } from "lucide-react";
import TechStack from "./TechStack";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  className?: string;
  featured?: boolean;
  onClick?: () => void;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  image,
  demoUrl,
  githubUrl,
  className,
  featured = false,
  onClick,
}: ProjectCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        featured && "border-secondary/50",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          {featured && (
            <span className="text-xs font-medium bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        <TechStack technologies={technologies} />
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        {demoUrl && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <Eye className="mr-1 h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
        {githubUrl && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1 h-4 w-4" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
