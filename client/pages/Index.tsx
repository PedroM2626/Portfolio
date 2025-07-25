import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
  Search,
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
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          } else {
            // Remove from visible sections when it leaves view
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.2 },
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
    { href: "#home", label: "Início" },
    { href: "#about", label: "Sobre" },
    { href: "#projects", label: "Projetos" },
    { href: "#contact", label: "Contato" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">
          <span style={{ color: "rgb(248, 231, 28)" }}>P</span>edro{" "}
          <span style={{ color: "rgb(144, 19, 254)" }}>M</span>orato
        </div>

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
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
              <Moon className="h-4 w-4" />
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
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
  const { displayedText: nameText, isComplete: nameComplete } = useTypingEffect(
    "Pedro Morato",
    120,
  );
  const { displayedText: jobText, isComplete: jobComplete } = useTypingEffect(
    "Desenvolvedor Independente",
    150,
  );
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("home");

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 transition-all duration-1000"
      style={{
        background: `hsl(var(--home-background))`,
        color: `hsl(var(--home-foreground))`,
      }}
      data-reveal
    >
      <div className="container mx-auto px-4">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Left Column - Content */}
          <div className="space-y-8 text-left lg:pl-12 flex flex-col">
            {/* Welcome Message */}
            <div className="flex items-center gap-3 text-xl md:text-2xl font-medium">
              <span>Seja bem-vindo ao meu portfólio!</span>
              {jobComplete && (
                <span className="animate-wave inline-block">👋</span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {nameText}
              {!nameComplete && <span className="animate-pulse">|</span>}
            </h1>

            {/* Job Title */}
            <div className="text-xl md:text-2xl opacity-80">
              {nameComplete && (
                <>
                  {jobText}
                  {!jobComplete && <span className="animate-pulse">|</span>}
                </>
              )}
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-2 border-muted hover:bg-muted overflow-hidden"
                asChild
              >
                <a
                  href="https://github.com/PedroM2626"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-2 border-muted hover:bg-muted overflow-hidden"
                asChild
              >
                <a
                  href="https://linkedin.com/in/pedro-morato-lahoz-7996b1314/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-2 border-muted hover:bg-muted overflow-hidden"
                asChild
              >
                <a href="mailto:pedromoratolahoz@gmail.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
              </Button>
            </div>

            {/* Download Resume Button */}
            <div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full overflow-hidden"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Currículo
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center lg:justify-end lg:pr-12">
            <div className="relative flex flex-col">
              <div
                className="w-80 h-80 rounded-full overflow-hidden border-4 shadow-2xl flex flex-col"
                style={{
                  borderColor: `hsl(var(--home-border))`,
                }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F0357267305144552820808f6068fd9e6%2F2e66a49a3d734d7aaf0ed006154187d8"
                  alt="Pedro Morato"
                  className="w-full h-full object-cover mx-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator - Moved Up */}
        <div className="text-center mt-4">
          <div
            className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <p className="text-sm mb-2 animate-bounce">Role para baixo</p>
            <div className="animate-bounce">
              <ChevronDown className="h-6 w-6 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced tech stack data with more technologies
const getTechInfo = (name: string) => {
  const techMap: { [key: string]: { color: string; icon: string } } = {
    Git: { color: "bg-red-500", icon: "🔴" },
    "VS Code": { color: "bg-blue-600", icon: "💙" },
    Docker: { color: "bg-blue-500", icon: "🐳" },
    Firebase: { color: "bg-yellow-600", icon: "🔥" },
    C: { color: "bg-blue-700", icon: "💻" },
    "C++": { color: "bg-blue-800", icon: "➕" },
    "C#": { color: "bg-purple-600", icon: "🔷" },
    Python: { color: "bg-yellow-500", icon: "🐍" },
    JavaScript: { color: "bg-yellow-400", icon: "🟨" },
    HTML5: { color: "bg-orange-500", icon: "🔶" },
    CSS3: { color: "bg-blue-500", icon: "🎨" },
    React: { color: "bg-cyan-500", icon: "⚛️" },
    Flask: { color: "bg-gray-700", icon: "🌶️" },
    SQLite: { color: "bg-blue-400", icon: "💾" },
    Unity: { color: "bg-gray-800", icon: "🎮" },
    "Unreal Engine": { color: "bg-gray-900", icon: "🎯" },
    Godot: { color: "bg-blue-600", icon: "🎪" },
    FlutterFlow: { color: "bg-purple-500", icon: "💜" },
    Flutter: { color: "bg-blue-400", icon: "🦋" },
    "Node.js": { color: "bg-green-600", icon: "🟢" },
    TypeScript: { color: "bg-blue-600", icon: "📘" },
    PostgreSQL: { color: "bg-blue-700", icon: "🐘" },
    AWS: { color: "bg-orange-500", icon: "☁��" },
  };

  return techMap[name] || { color: "bg-gray-500", icon: "🔧" };
};

// Function to get transparent background style for tech items
const getTechTransparentStyle = (name: string) => {
  const styleMap: { [key: string]: string } = {
    "VS Code": "bg-blue-600/15 text-white border border-blue-600",
    Docker: "bg-blue-500/15 text-white border border-blue-500",
    Firebase: "bg-yellow-600/15 text-white border border-yellow-600",
    C: "bg-blue-700/15 text-white border border-blue-700",
    "C++": "bg-blue-800/15 text-white border border-blue-800",
    "C#": "bg-purple-600/15 text-white border border-purple-600",
    Python: "bg-yellow-500/15 text-white border border-yellow-500",
    JavaScript: "bg-yellow-400/15 text-white border border-yellow-400",
    HTML5: "bg-orange-500/15 text-white border border-orange-500",
    CSS3: "bg-blue-500/15 text-white border border-blue-500",
    React: "bg-cyan-500/15 text-white border border-cyan-500",
    Flask: "bg-gray-700/15 text-white border border-gray-700",
    SQLite: "bg-blue-400/15 text-white border border-blue-400",
    Unity: "bg-gray-800/15 text-white border border-gray-800",
    "Unreal Engine": "bg-gray-900/15 text-white border border-gray-900",
    Godot: "bg-blue-600/15 text-white border border-blue-600",
    FlutterFlow: "bg-purple-500/15 text-white border border-purple-500",
    Flutter: "bg-blue-400/15 text-white border border-blue-400",
    "Node.js": "bg-green-600/15 text-white border border-green-600",
    TypeScript: "bg-blue-600/15 text-white border border-blue-600",
    PostgreSQL: "bg-blue-700/15 text-white border border-blue-700",
    AWS: "bg-orange-500/15 text-white border border-orange-500",
  };

  return styleMap[name] || "bg-gray-500/15 text-white border border-gray-500";
};

const AboutSection = () => {
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("about");

  const techStack = [
    "Git",
    "VS Code",
    "Docker",
    "Firebase",
    "C",
    "C++",
    "C#",
    "Python",
    "JavaScript",
    "HTML5",
    "CSS3",
    "React",
    "Flask",
    "SQLite",
    "Unity",
    "Unreal Engine",
    "Godot",
    "FlutterFlow",
    "Flutter",
  ];

  return (
    <section
      id="about"
      className="py-20 bg-muted/30 transition-all duration-1000"
      data-reveal
    >
      <div className="container mx-auto px-4">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Sobre Mim
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-xl font-semibold mb-6">Minha Jornada</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Tenho 17 anos e estou iniciando a graduação em Ciência da
                Computação na UniCEUB.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Já tenho experiência prática com programação, com foco em
                desenvolvimento web e jogos.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Ao longo do último ano, desenvolvi 3 projetos web completos e
                alguns jogos como forma de aprimorar meu conhecimento em lógica
                de programação, bibliotecas e ferramentas modernas.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Estou sempre buscando aprender mais, melhorar meus códigos e
                construir soluções reais.
              </p>
              <p className="text-lg text-muted-foreground">
                Atualmente estudo algoritmos e resolução de problemas com foco
                em entrevistas t��cnicas. Meu objetivo é evoluir como
                desenvolvedor e, no futuro, conquistar uma vaga em uma grande
                empresa de tecnologia.
              </p>
            </div>

            <div className="flex flex-col max-w-[500px]">
              <h3 className="text-xl font-semibold mb-6">Tecnologias</h3>
              <div className="grid grid-cols-3 justify-center overflow-hidden items-center">
                {techStack.map((tech, index) => {
                  const techInfo = getTechInfo(tech);
                  const isGit = tech === "Git";
                  return (
                    <div
                      key={tech}
                      className={`${
                        isGit
                          ? "bg-red-500/15 text-white border-2 border-red-500"
                          : getTechTransparentStyle(tech)
                      } p-3 rounded-full flex flex-row items-center justify-center text-center transform transition-all duration-300 hover:scale-110 gap-[10px] mt-4 max-w-[120px] w-[120px] overflow-hidden font-light cursor-pointer`}
                      style={{
                        animationDelay: isVisible ? `${index * 50}ms` : "0ms",
                        animation: isVisible
                          ? "slideInRight 0.6s ease-out forwards"
                          : "none",
                        minHeight: isGit ? "0px" : "25px",
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
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("projects");

  const projects = [
    {
      id: 1,
      name: "Sistema de Gerenciamento Escolar",
      image: "/placeholder.svg",
      date: "2024",
      tech: ["React", "Node.js", "PostgreSQL", "TypeScript"],
      description:
        "Um sistema completo para gerenciamento escolar com autenticação de usuários, cadastro de alunos, notas, frequência e dashboard administrativo. Desenvolvido com tecnologias modernas para performance otimizada.",
      demoVideo: "https://example.com/demo1.mp4",
      github: "https://github.com/PedroM2626/school-management",
      live: "https://school-management-demo.com",
    },
    {
      id: 2,
      name: "Jogo de Puzzle 3D",
      image: "/placeholder.svg",
      date: "2023",
      tech: ["Unity", "C#"],
      description:
        "Um jogo de puzzle em 3D com mecânicas inovadoras, sistema de níveis progressivos e interface intuitiva. Desenvolvido na Unity com scripts otimizados.",
      demoVideo: "https://example.com/demo2.mp4",
      github: "https://github.com/PedroM2626/puzzle-game",
      live: "https://puzzle-game-demo.com",
    },
    {
      id: 3,
      name: "App de Controle Financeiro",
      image: "/placeholder.svg",
      date: "2023",
      tech: ["Flutter", "Firebase", "Dart"],
      description:
        "Aplicativo móvel para controle financeiro pessoal com categorização automática de gastos, relatórios detalhados e sincronização em nuvem.",
      demoVideo: "https://example.com/demo3.mp4",
      github: "https://github.com/PedroM2626/finance-app",
      live: "https://finance-app-demo.com",
    },
    {
      id: 4,
      name: "Website Portfolio Responsivo",
      image: "/placeholder.svg",
      date: "2024",
      tech: ["HTML5", "CSS3", "JavaScript"],
      description:
        "Website portfolio totalmente responsivo com animações suaves, design moderno e otimizado para SEO.",
      demoVideo: "https://example.com/demo4.mp4",
      github: "https://github.com/PedroM2626/portfolio-website",
      live: "https://portfolio-demo.com",
    },
  ];

  // Get all unique technologies for filter options
  const allTechs = Array.from(
    new Set(projects.flatMap((project) => project.tech)),
  ).sort();

  // Toggle technology selection
  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedTechs([]);
    setSearchTerm("");
  };

  // Filter projects based on selected technologies and search term
  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      selectedTechs.length === 0 ||
      selectedTechs.some((tech) => project.tech.includes(tech));
    const matchesSearch =
      !searchTerm ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-20" data-reveal>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Meus Projetos
        </h2>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Pesquisar tecnologia"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50 border-muted"
            />
          </div>

          {/* Technology Filter Chips */}
          <div className="space-y-4">
            {/* Selected Technologies */}
            {selectedTechs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTechs.map((tech) => {
                  const techInfo = getTechInfo(tech);
                  return (
                    <div
                      key={tech}
                      className={`${techInfo.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity`}
                      onClick={() => toggleTech(tech)}
                    >
                      <span>{techInfo.icon}</span>
                      <span>{tech}</span>
                      <X className="h-3 w-3 ml-1" />
                    </div>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-7 px-2 text-xs"
                >
                  Limpar todos
                </Button>
              </div>
            )}

            {/* Available Technologies */}
            <div className="flex flex-wrap gap-2">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 cursor-pointer transition-all ${
                  selectedTechs.length === 0
                    ? "bg-white text-black"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                onClick={clearAllFilters}
              >
                <span>✓</span>
                <span>Todos</span>
              </div>
              {allTechs
                .filter((tech) => !selectedTechs.includes(tech))
                .map((tech) => {
                  const techInfo = getTechInfo(tech);
                  return (
                    <div
                      key={tech}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 cursor-pointer hover:bg-muted/80 transition-all"
                      onClick={() => toggleTech(tech)}
                    >
                      <span>{techInfo.icon}</span>
                      <span>{tech}</span>
                    </div>
                  );
                })}
            </div>
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
            <p className="text-muted-foreground">
              Nenhum projeto encontrado com os filtros aplicados.
            </p>
          </div>
        )}

        {/* Project Modal */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-2xl">
                {selectedProject?.name}
              </DialogTitle>
              <DialogDescription className="text-base">
                {selectedProject?.date}
              </DialogDescription>
            </DialogHeader>

            {selectedProject && (
              <div className="space-y-6 pb-4">
                {/* Media Section */}
                <div className="grid md:grid-cols-2 gap-4">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  {/* Video Player */}
                  <div className="relative">
                    <video
                      controls
                      className="w-full h-48 rounded-lg bg-muted object-cover"
                      poster={selectedProject.image}
                    >
                      <source
                        src={selectedProject.demoVideo}
                        type="video/mp4"
                      />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Descrição</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">
                    Tecnologias Utilizadas
                  </h4>
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
                </div>

                {/* Action Buttons */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">
                    Links do Projeto
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="flex-1 min-w-[140px]">
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Repositório
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="flex-1 min-w-[140px]"
                    >
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo Ao Vivo
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="flex-1 min-w-[140px]"
                    >
                      <a
                        href={selectedProject.demoVideo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Vídeo Demo
                      </a>
                    </Button>
                  </div>
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
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using a service or API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Fallback: open email client
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`,
      );
      window.open(
        `mailto:pedromoratolahoz@gmail.com?subject=${subject}&body=${body}`,
      );
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-background" data-reveal>
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold">Entre em Contato</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-2"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16">
          {/* Left Column - Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">
              Vamos Conversar!
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Estou sempre interessado em novas oportunidades e projetos
              desafiadores. Entre em contato comigo!
            </p>

            <div className="space-y-4">
              {/* GitHub Card */}
              <div className="group">
                <a
                  href="https://github.com/PedroM2626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg border border-muted hover:border-primary/50 transition-all duration-300 bg-card hover:shadow-md"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Github className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">GitHub</div>
                    <div className="text-sm text-muted-foreground">
                      @PedroM2626
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>

              {/* LinkedIn Card */}
              <div className="group">
                <a
                  href="https://linkedin.com/in/pedro-morato-lahoz-7996b1314/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg border border-muted hover:border-primary/50 transition-all duration-300 bg-card hover:shadow-md"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">LinkedIn</div>
                    <div className="text-sm text-muted-foreground">
                      pedro-morato-lahoz-7996b1314
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>

              {/* Email Card */}
              <div className="group">
                <a
                  href="mailto:pedromoratolahoz@gmail.com"
                  className="flex items-center p-4 rounded-lg border border-muted hover:border-primary/50 transition-all duration-300 bg-card hover:shadow-md"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/20 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-sm text-muted-foreground">
                      pedromoratolahoz@gmail.com
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">
              Envie uma Mensagem
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Nome *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-muted/50 border-muted focus:border-primary"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-muted/50 border-muted focus:border-primary"
                />
              </div>
              <div>
                <Input
                  placeholder="Assunto *"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="bg-muted/50 border-muted focus:border-primary"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Mensagem *"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="bg-muted/50 border-muted focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
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
