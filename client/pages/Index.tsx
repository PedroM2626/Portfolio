import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { 
  Moon, 
  Sun, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Menu,
  X,
  ExternalLink,
  Play
} from "lucide-react";

// Typing animation hook
const useTypingEffect = (text: string, speed: number = 100) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed]);

  return { displayedText, isComplete };
};

// Scroll reveal hook
const useScrollReveal = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll("[data-reveal]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return visibleSections;
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">Portfolio</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
      size="icon"
    >
      <ChevronUp className="h-4 w-4" />
    </Button>
  );
};

const HomeSection = () => {
  const { displayedText, isComplete } = useTypingEffect("Full Stack Developer", 150);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20" data-reveal>
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <img
            src="/placeholder.svg"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          John Doe
          <span className="ml-4 animate-wave inline-block">👋</span>
        </h1>
        
        <div className="text-xl md:text-2xl text-muted-foreground mb-4 h-8">
          {displayedText}
          {!isComplete && <span className="animate-pulse">|</span>}
        </div>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Welcome to my portfolio! I'm passionate about creating beautiful, functional applications 
          that make a difference. Let's build something amazing together.
        </p>
        
        <div className="flex items-center justify-center space-x-6 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:john@example.com">
              <Mail className="h-6 w-6" />
            </a>
          </Button>
        </div>
        
        <Button className="mb-12" asChild>
          <a href="/resume.pdf" download>
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </a>
        </Button>
        
        <div className="animate-bounce">
          <ChevronDown 
            className="h-8 w-8 mx-auto cursor-pointer text-muted-foreground"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          />
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("about");

  const techStack = [
    { name: "React", color: "bg-blue-500", icon: "⚛️" },
    { name: "TypeScript", color: "bg-blue-600", icon: "📘" },
    { name: "Node.js", color: "bg-green-600", icon: "🟢" },
    { name: "Python", color: "bg-yellow-500", icon: "🐍" },
    { name: "PostgreSQL", color: "bg-blue-700", icon: "🐘" },
    { name: "AWS", color: "bg-orange-500", icon: "☁️" },
    { name: "Docker", color: "bg-blue-500", icon: "🐳" },
    { name: "Git", color: "bg-red-500", icon: "📚" },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30" data-reveal>
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                I'm a passionate full-stack developer with over 5 years of experience creating 
                web applications that solve real-world problems. I love working with modern 
                technologies and am always eager to learn new tools and frameworks.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                When I'm not coding, you can find me exploring new hiking trails, reading tech 
                blogs, or contributing to open-source projects. I believe in writing clean, 
                maintainable code and creating user experiences that delight.
              </p>
              <p className="text-lg text-muted-foreground">
                I'm currently looking for exciting opportunities to work with innovative teams 
                and build products that make a positive impact.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className={`${tech.color} text-white p-4 rounded-lg flex items-center space-x-3 transform transition-all duration-300 hover:scale-105`}
                    style={{
                      animationDelay: isVisible ? `${index * 100}ms` : "0ms",
                      animation: isVisible ? "slideInRight 0.6s ease-out forwards" : "none",
                    }}
                  >
                    <span className="text-2xl">{tech.icon}</span>
                    <span className="font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      image: "/placeholder.svg",
      date: "2024",
      tech: ["React", "Node.js", "MongoDB"],
      description: "A full-featured e-commerce platform with user authentication, shopping cart, payment processing, and admin dashboard. Built with modern technologies for optimal performance.",
      demoVideo: "https://example.com/demo1.mp4",
      github: "https://github.com/johndoe/ecommerce",
      live: "https://ecommerce-demo.com"
    },
    {
      id: 2,
      name: "Task Management App",
      image: "/placeholder.svg",
      date: "2023",
      tech: ["React", "TypeScript", "Supabase"],
      description: "A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
      demoVideo: "https://example.com/demo2.mp4",
      github: "https://github.com/johndoe/taskapp",
      live: "https://taskapp-demo.com"
    },
    {
      id: 3,
      name: "Weather Dashboard",
      image: "/placeholder.svg",
      date: "2023",
      tech: ["Vue.js", "Python", "FastAPI"],
      description: "A comprehensive weather dashboard with location-based forecasts, historical data visualization, and weather alerts.",
      demoVideo: "https://example.com/demo3.mp4",
      github: "https://github.com/johndoe/weather",
      live: "https://weather-demo.com"
    }
  ];

  return (
    <section id="projects" className="py-20" data-reveal>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProject(project)}
            >
              <CardHeader>
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedProject?.name}</DialogTitle>
              <DialogDescription>{selectedProject?.date}</DialogDescription>
            </DialogHeader>
            
            {selectedProject && (
              <div className="space-y-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <p className="text-muted-foreground">{selectedProject.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech: string) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Button asChild>
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={selectedProject.demoVideo} target="_blank" rel="noopener noreferrer">
                      <Play className="h-4 w-4 mr-2" />
                      Demo Video
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-muted/30" data-reveal>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
            <p className="text-muted-foreground mb-8">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology. Feel free to reach out!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Github className="h-6 w-6" />
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  github.com/johndoe
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Linkedin className="h-6 w-6" />
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  linkedin.com/in/johndoe
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6" />
                <a href="mailto:john@example.com"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  john@example.com
                </a>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <BackToTop />
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
