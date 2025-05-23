
import { cn } from "@/lib/utils";

interface TechStackProps {
  technologies: string[];
  className?: string;
}

const TechStack = ({ technologies, className }: TechStackProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {technologies.map((tech, index) => (
        <span 
          key={index} 
          className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-primary dark:bg-background/30"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

export default TechStack;
