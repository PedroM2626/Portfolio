import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Play,
  Search
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
        <div className="text-xl font-bold">Pedro Morato</div>
        
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
          Pedro Morato
          <span className="ml-4 animate-wave inline-block">👋</span>
        </h1>
        
        <div className="text-xl md:text-2xl text-muted-foreground mb-4 h-8">
          {displayedText}
          {!isComplete && <span className="animate-pulse">|</span>}
        </div>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Bem-vindo ao meu portfólio! Sou apaixonado por criar aplicações bonitas e funcionais
          que fazem a diferença. Vamos construir algo incrível juntos! 🇧🇷 Brasília, Brasil
        </p>
        
        <div className="flex items-center justify-center space-x-6 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/PedroM2626" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/pedro-morato-lahoz-7996b1314/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:pedromoratolahoz@gmail.com">
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

// Enhanced tech stack data with more technologies
const getTechInfo = (name: string) => {
  const techMap: { [key: string]: { color: string; icon: string } } = {
    "Git": { color: "bg-red-500", icon: "🔴" },
    "VS Code": { color: "bg-blue-600", icon: "💙" },
    "Docker": { color: "bg-blue-500", icon: "🐳" },
    "Firebase": { color: "bg-yellow-600", icon: "🔥" },
    "C": { color: "bg-blue-700", icon: "💻" },
    "C++": { color: "bg-blue-800", icon: "➕" },
    "C#": { color: "bg-purple-600", icon: "🔷" },
    "Python": { color: "bg-yellow-500", icon: "🐍" },
    "JavaScript": { color: "bg-yellow-400", icon: "🟨" },
    "HTML5": { color: "bg-orange-500", icon: "🔶" },
    "CSS3": { color: "bg-blue-500", icon: "🎨" },
    "React": { color: "bg-cyan-500", icon: "⚛️" },
    "Flask": { color: "bg-gray-700", icon: "🌶️" },
    "SQLite": { color: "bg-blue-400", icon: "💾" },
    "Unity": { color: "bg-gray-800", icon: "🎮" },
    "Unreal Engine": { color: "bg-gray-900", icon: "🎯" },
    "Godot": { color: "bg-blue-600", icon: "🎪" },
    "FlutterFlow": { color: "bg-purple-500", icon: "💜" },
    "Flutter": { color: "bg-blue-400", icon: "🦋" },
    "Node.js": { color: "bg-green-600", icon: "🟢" },
    "TypeScript": { color: "bg-blue-600", icon: "📘" },
    "PostgreSQL": { color: "bg-blue-700", icon: "🐘" },
    "AWS": { color: "bg-orange-500", icon: "☁️" },
  };

  return techMap[name] || { color: "bg-gray-500", icon: "🔧" };
};

const AboutSection = () => {
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("about");

  const techStack = [
    "Git", "VS Code", "Docker", "Firebase",
    "C", "C++", "C#", "Python",
    "JavaScript", "HTML5", "CSS3", "React",
    "Flask", "SQLite", "Unity", "Unreal Engine",
    "Godot", "FlutterFlow", "Flutter"
  ];

  return (
    <section id="about" className="py-20 bg-muted/30" data-reveal>
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-xl font-semibold mb-6">Minha Jornada</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Tenho 17 anos e estou iniciando a graduação em Ciência da Computação na UniCEUB.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Já tenho experiência prática com programação, com foco em desenvolvimento web e jogos.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Ao longo do último ano, desenvolvi 3 projetos web completos e alguns jogos como forma de
                aprimorar meu conhecimento em lógica de programação, bibliotecas e ferramentas modernas.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Estou sempre buscando aprender mais, melhorar meus códigos e construir soluções reais.
              </p>
              <p className="text-lg text-muted-foreground">
                Atualmente estudo algoritmos e resolução de problemas com foco em entrevistas técnicas.
                Meu objetivo é evoluir como desenvolvedor e, no futuro, conquistar uma vaga em uma grande
                empresa de tecnologia.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Tecnologias</h3>
              <div className="grid grid-cols-3 gap-3">
                {techStack.map((tech, index) => {
                  const techInfo = getTechInfo(tech);
                  return (
                    <div
                      key={tech}
                      className={`${techInfo.color} text-white p-3 rounded-lg flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-105 min-h-[80px]`}
                      style={{
                        animationDelay: isVisible ? `${index * 50}ms` : "0ms",
                        animation: isVisible ? "slideInRight 0.6s ease-out forwards" : "none",
                      }}
                    >
                      <span className="text-xl mb-1">{techInfo.icon}</span>
                      <span className="font-medium text-xs">{tech}</span>
                    </div>
                  );
                })}
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
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const projects = [
    {
      id: 1,
      name: "Sistema de Gerenciamento Escolar",
      image: "/placeholder.svg",
      date: "2024",
      tech: ["React", "Node.js", "PostgreSQL", "TypeScript"],
      description: "Um sistema completo para gerenciamento escolar com autenticação de usuários, cadastro de alunos, notas, frequência e dashboard administrativo. Desenvolvido com tecnologias modernas para performance otimizada.",
      demoVideo: "https://example.com/demo1.mp4",
      github: "https://github.com/PedroM2626/school-management",
      live: "https://school-management-demo.com"
    },
    {
      id: 2,
      name: "Jogo de Puzzle 3D",
      image: "/placeholder.svg",
      date: "2023",
      tech: ["Unity", "C#"],
      description: "Um jogo de puzzle em 3D com mecânicas inovadoras, sistema de níveis progressivos e interface intuitiva. Desenvolvido na Unity com scripts otimizados.",
      demoVideo: "https://example.com/demo2.mp4",
      github: "https://github.com/PedroM2626/puzzle-game",
      live: "https://puzzle-game-demo.com"
    },
    {
      id: 3,
      name: "App de Controle Financeiro",
      image: "/placeholder.svg",
      date: "2023",
      tech: ["Flutter", "Firebase", "Dart"],
      description: "Aplicativo móvel para controle financeiro pessoal com categorização automática de gastos, relatórios detalhados e sincronização em nuvem.",
      demoVideo: "https://example.com/demo3.mp4",
      github: "https://github.com/PedroM2626/finance-app",
      live: "https://finance-app-demo.com"
    },
    {
      id: 4,
      name: "Website Portfolio Responsivo",
      image: "/placeholder.svg",
      date: "2024",
      tech: ["HTML5", "CSS3", "JavaScript"],
      description: "Website portfolio totalmente responsivo com animações suaves, design moderno e otimizado para SEO.",
      demoVideo: "https://example.com/demo4.mp4",
      github: "https://github.com/PedroM2626/portfolio-website",
      live: "https://portfolio-demo.com"
    }
  ];

  // Get all unique technologies for filter options
  const allTechs = Array.from(new Set(projects.flatMap(project => project.tech))).sort();

  // Toggle technology selection
  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedTechs([]);
    setSearchTerm("");
  };

  // Filter projects based on selected technologies and search term
  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedTechs.length === 0 ||
      selectedTechs.some(tech => project.tech.includes(tech));
    const matchesSearch = !searchTerm ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-20" data-reveal>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projetos</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="flex-1">
            <Input
              placeholder="Pesquisar projetos ou tecnologias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={filterTech} onValueChange={setFilterTech}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tecnologia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as tecnologias</SelectItem>
                {allTechs.map((tech) => (
                  <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
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
                  {project.tech.map((tech) => {
                    const techInfo = getTechInfo(tech);
                    return (
                      <div
                        key={tech}
                        className={`${techInfo.color} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}
                      >
                        <span>{techInfo.icon}</span>
                        <span>{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum projeto encontrado com os filtros aplicados.</p>
          </div>
        )}

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
                  {selectedProject.tech.map((tech: string) => {
                    const techInfo = getTechInfo(tech);
                    return (
                      <div
                        key={tech}
                        className={`${techInfo.color} text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2`}
                      >
                        <span>{techInfo.icon}</span>
                        <span>{tech}</span>
                      </div>
                    );
                  })}
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
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using a service or API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error('Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback: open email client
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(`Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`);
      window.open(`mailto:pedromoratolahoz@gmail.com?subject=${subject}&body=${body}`);
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-muted/30" data-reveal>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Entre em Contato</h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-6">Vamos Conversar</h3>
            <p className="text-muted-foreground mb-8">
              Estou sempre aberto para discutir novas oportunidades, projetos interessantes
              ou apenas bater um papo sobre tecnologia. Sinta-se à vontade para entrar em contato!
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Github className="h-6 w-6" />
                <a href="https://github.com/PedroM2626" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  github.com/PedroM2626
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Linkedin className="h-6 w-6" />
                <a href="https://linkedin.com/in/pedro-morato-lahoz-7996b1314/" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  linkedin.com/in/pedro-morato-lahoz-7996b1314/
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6" />
                <a href="mailto:pedromoratolahoz@gmail.com"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  pedromoratolahoz@gmail.com
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Seu Nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Seu Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                placeholder="Assunto"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Sua Mensagem"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
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
