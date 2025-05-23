
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/60 dark:bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <img src="/lovable-uploads/a6e4ee57-a5ff-483a-b6e1-71809843ead5.png" alt="RD Logo" className="h-8 w-8" />
              <span className="font-semibold text-lg">Roman Divković</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md text-center md:text-left">
              Fullstack developer specializing in React, React Native, and Firebase solutions. Building user-centered applications with modern technology.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-5 mb-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:romandivkovic@outlook.com" 
                className="text-foreground hover:text-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="/pdf/cv.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-secondary transition-colors"
                aria-label="CV"
              >
                <FileText className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">© {currentYear} Roman Divković. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
