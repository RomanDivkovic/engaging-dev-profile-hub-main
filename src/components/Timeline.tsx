
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  organization: string;
}

interface TimelineProps {
  items: TimelineItemProps[];
  className?: string;
}

const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn("space-y-12", className)}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className={cn(
            "relative pl-12 pb-8",
            index !== items.length - 1 && "before:absolute before:left-5 before:top-8 before:h-[calc(100%-12px)] before:w-px before:bg-secondary/30"
          )}
        >
          <div className="absolute left-0 top-1 h-10 w-10 rounded-full border border-secondary/50 bg-muted flex items-center justify-center text-secondary font-mono text-sm">
            {item.year}
          </div>
          <div>
            <h3 className="font-bold text-xl mb-1">{item.title}</h3>
            <h4 className="text-muted-foreground font-medium mb-3">{item.organization}</h4>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
