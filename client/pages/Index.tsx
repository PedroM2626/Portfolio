// Função utilitária para pegar cor do gradiente Tailwind
function getTailwindColor(color) {
  switch (color) {
    case 'yellow-400': return '#facc15';
    case 'orange-500': return '#f97316';
    case 'purple-500': return '#a855f7';
    case 'pink-500': return '#ec4899';
    case 'green-400': return '#4ade80';
    case 'cyan-500': return '#06b6d4';
    case 'blue-500': return '#3b82f6';
    case 'purple-600': return '#9333ea';
    case 'blue-600': return '#2563eb';
    case 'purple-400': return '#c084fc';
    case 'pink-400': return '#f472b6';
    case 'purple-900': return '#6d28d9';
    case 'blue-900': return '#1e3a8a';
    case 'indigo-900': return '#312e81';
    default: return '#a855f7';
  }
}

// Função utilitária para pegar cor da sombra
function getBoxShadowColor(iconColor) {
  if (iconColor.includes('from-yellow-400')) return '#facc15';
  if (iconColor.includes('from-orange-500')) return '#f97316';
  if (iconColor.includes('from-purple-500')) return '#a855f7';
  if (iconColor.includes('from-pink-500')) return '#ec4899';
  if (iconColor.includes('from-green-400')) return '#4ade80';
  if (iconColor.includes('from-cyan-500')) return '#06b6d4';
  if (iconColor.includes('from-blue-500')) return '#3b82f6';
  if (iconColor.includes('from-purple-600')) return '#9333ea';
  if (iconColor.includes('from-blue-600')) return '#2563eb';
  return '#a855f7';
}
import React, { useState, useEffect, useRef } from "react";
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
  Home,
  User,
} from "lucide-react";

// Typing animation hook
const useTypingEffect = (
  text: string,
  speed: number = 100,
  shouldStart: boolean = true,
) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!shouldStart) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed, shouldStart]);

  // Reset when shouldStart changes from false to true
  useEffect(() => {
    if (shouldStart) {
      setDisplayedText("");
      setIsComplete(false);
    }
  }, [shouldStart]);

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
  useEffect(() => { setMounted(true); }, []);
  const navItems = [
    { href: "#home", label: "Início" },
    { href: "#about", label: "Sobre" },
    { href: "#timeline", label: "Jornada" },
    { href: "#projects", label: "Projetos" },
    { href: "#contact", label: "Contato" },
  ];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };
  // Ícones para cada item do menu
  const navIcons = {
    "Início": <Home className="h-5 w-5 mr-2" />,
    "Sobre": <User className="h-5 w-5 mr-2" />,
    "Jornada": <Badge className="h-5 w-5 mr-2" />,
    "Projetos": <Github className="h-5 w-5 mr-2" />,
    "Contato": <Mail className="h-5 w-5 mr-2" />,
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-purple-600 dark:text-purple-400">Pedro Morato</div>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-muted-foreground transition-colors relative bg-clip-text"
              style={{
                background: "none",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "",
                transition: "background 0.4s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "linear-gradient(90deg, #6d28d9, #2563eb)";
                // @ts-ignore
                e.currentTarget.style.webkitBackgroundClip = "text";
                // @ts-ignore
                e.currentTarget.style.webkitTextFillColor = "transparent";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "none";
                // @ts-ignore
                e.currentTarget.style.webkitTextFillColor = "";
              }}
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
                onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
              />
              <Moon className="h-4 w-4" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen
              ? <X className="h-6 w-6 text-purple-600 dark:text-white" />
              : <Menu className="h-6 w-6 text-purple-600 dark:text-white" />}
          </Button>
        </div>
      </nav>
      {/* Mobile menu - mais bonito e com ícones, agora responsivo ao tema */}
      {isMobileMenuOpen && (
  <div className="md:hidden absolute top-full left-0 right-0 z-50 animate-fade-in flex flex-col items-center py-8 gap-2 shadow-2xl border-b backdrop-blur-lg bg-gradient-to-br from-purple-100 via-blue-200 to-indigo-200 dark:from-purple-950 dark:via-blue-900 dark:to-indigo-900">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="w-11/12 max-w-md flex items-center justify-start text-lg py-3 px-4 rounded-xl text-foreground dark:text-white font-semibold hover:bg-purple-700/80 dark:hover:bg-blue-900/80 hover:scale-[1.04] transition-all duration-200 shadow-lg gap-2 bg-white/70 dark:bg-black/40"
            >
              {navIcons[item.label]}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

const HomeSection = () => {
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("home");

  const { displayedText: nameText, isComplete: nameComplete } = useTypingEffect(
    "Pedro Morato",
    120,
    isVisible,
  );
  const { displayedText: jobText, isComplete: jobComplete } = useTypingEffect(
    "Desenvolvedor Independente",
    150,
    isVisible && nameComplete,
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 transition-all duration-1000 relative"
      data-reveal
    >
      {/* Gradient Background - Theme aware */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full absolute inset-0 z-0">
          {/* Light theme: purple/blue/indigo, Dark theme: purple-950/blue-950/indigo-950 */}
          <div className="w-full h-full bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-blue-900/60 dark:via-indigo-900/40 dark:to-purple-900/60 absolute inset-0" />
          <div className="w-full h-full bg-black/10 dark:bg-black/40 absolute inset-0" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-foreground">
        <div className="container mx-auto px-4">
          <div
            className={`grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-220px)] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Left Column - Content */}
            <div className="space-y-10 text-left lg:pl-16 flex flex-col justify-center">
              {/* Name */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mx-auto bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {nameText}
                {!nameComplete && <span className="animate-pulse">|</span>}
              </h1>

              {/* Job Title */}
              <div className="text-xl md:text-2xl opacity-80 mx-auto text-blue-700 dark:text-blue-300">
                {nameComplete && (
                  <>
                    {jobText}
                    {!jobComplete && <span className="animate-pulse">|</span>}
                  </>
                )}
              </div>

              {/* Welcome Message */}
              <div className="flex items-center justify-center gap-3 text-xl md:text-2xl font-medium mx-auto text-foreground">
                <span>Seja bem-vindo ao meu portfólio!</span>
                {jobComplete && (
                  <span className="animate-wave inline-block text-4xl md:text-5xl leading-none">
                    👋
                  </span>
                )}
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col items-center gap-5 mt-2">
                <div className="flex items-center gap-5">
                  <a
                    href="https://github.com/PedroM2626"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-gray-600/40 text-purple-700 dark:text-purple-300 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_32px_rgba(168,85,247,0.7)] transform hover:-translate-y-0.5 hover:bg-white/30 dark:hover:bg-black/40"
                  >
                    <Github className="h-4 w-4" />
                    <span className="font-medium">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/pedro-morato-lahoz-7996b1314/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-gray-600/40 text-blue-700 dark:text-blue-300 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_32px_rgba(59,130,246,0.7)] transform hover:-translate-y-0.5 hover:bg-white/30 dark:hover:bg-black/40"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                  <a
                    href="mailto:pedromoratolahoz@gmail.com"
                    className="px-6 py-3 rounded-xl bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-gray-600/40 text-pink-700 dark:text-pink-300 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_32px_rgba(236,72,153,0.7)] transform hover:-translate-y-0.5 hover:bg-white/30 dark:hover:bg-black/40"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Email</span>
                  </a>
                </div>

                {/* Download Resume Button - Centralizado */}
                    <a
                      href="/resume.pdf"
                      download
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-blue-400 text-white transition-all duration-300 flex items-center gap-2 font-medium border-0 mt-2"
                      style={{
                        boxShadow: "0 0 24px 0px #ec4899, 0 0 24px 0px #3b82f6",
                        transition: "box-shadow 0.3s, transform 0.3s"
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = "0 0 48px 0px #ec4899, 0 0 48px 0px #3b82f6";
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = "0 0 24px 0px #ec4899, 0 0 24px 0px #3b82f6";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <Download className="h-4 w-4" />
                      <span style={{ color: "white" }}>Baixar Currículo</span>
                    </a>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="flex justify-center lg:justify-end lg:pr-16">
              <div className="relative flex flex-col">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 shadow-2xl flex flex-col border-purple-600 dark:border-purple-400">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F0357267305144552820808f6068fd9e6%2F2e66a49a3d734d7aaf0ed006154187d8"
                    alt="Pedro Morato"
                    className="w-full h-full object-cover mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator - Moved Up, spacing adjusted */}
          <div className="text-center mt-8">
            <div
              className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <p className="text-sm mb-2 animate-bounce text-foreground">Role para baixo</p>
              <div className="animate-bounce">
                <ChevronDown className="h-6 w-6 mx-auto text-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// BackToTop button
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { theme } = useTheme();
  const gradient = theme === 'dark'
    ? 'bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900'
    : 'bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300';
  return (
    <Button
      className={`fixed bottom-10 right-10 z-50 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transform hover:-translate-y-0.5 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } h-16 w-16 text-3xl ${gradient} text-white border-0`}
      onClick={scrollToTop}
      style={{ fontSize: "2rem" }}
    >
      <ChevronUp className="h-8 w-8" />
    </Button>
  );
}

// Enhanced tech stack data with skill-icons
const getTechInfo = (name: string) => {
  const techMap: { [key: string]: { color: string; icon: string } } = {
    Git: { color: "bg-red-500", icon: "https://skillicons.dev/icons?i=git" },
    "VS Code": {
      color: "bg-blue-600",
      icon: "https://skillicons.dev/icons?i=vscode",
    },
    Docker: {
      color: "bg-blue-500",
      icon: "https://skillicons.dev/icons?i=docker",
    },
    Firebase: {
      color: "bg-yellow-600",
      icon: "https://skillicons.dev/icons?i=firebase",
    },
    C: { color: "bg-blue-700", icon: "https://skillicons.dev/icons?i=c" },
    "C++": { color: "bg-blue-800", icon: "https://skillicons.dev/icons?i=cpp" },
    "C#": { color: "bg-purple-600", icon: "https://skillicons.dev/icons?i=cs" },
    Python: {
      color: "bg-yellow-500",
      icon: "https://skillicons.dev/icons?i=python",
    },
    JavaScript: {
      color: "bg-yellow-400",
      icon: "https://skillicons.dev/icons?i=js",
    },
    HTML5: {
      color: "bg-orange-500",
      icon: "https://skillicons.dev/icons?i=html",
    },
    CSS3: { color: "bg-blue-500", icon: "https://skillicons.dev/icons?i=css" },
    React: {
      color: "bg-cyan-500",
      icon: "https://skillicons.dev/icons?i=react",
    },
    Flask: {
      color: "bg-gray-700",
      icon: "https://skillicons.dev/icons?i=flask",
    },
    SQLite: {
      color: "bg-blue-400",
      icon: "https://skillicons.dev/icons?i=sqlite",
    },
    Unity: {
      color: "bg-gray-800",
      icon: "https://skillicons.dev/icons?i=unity",
    },
    "Unreal Engine": {
      color: "bg-gray-900",
      icon: "https://skillicons.dev/icons?i=unreal",
    },
    Godot: {
      color: "bg-blue-800",
      icon: "https://skillicons.dev/icons?i=godot",
    },
    "Roblox Studio": {
      color: "bg-blue-600",
      icon: "https://skillicons.dev/icons?i=robloxstudio",
    },
    FlutterFlow: {
      color: "bg-purple-500",
      icon: "https://skillicons.dev/icons?i=flutter",
    },
    Flutter: {
      color: "bg-blue-400",
      icon: "https://skillicons.dev/icons?i=flutter",
    },
    "Node.js": {
      color: "bg-green-600",
      icon: "https://skillicons.dev/icons?i=nodejs",
    },
    TypeScript: {
      color: "bg-blue-600",
      icon: "https://skillicons.dev/icons?i=typescript",
    },
    PostgreSQL: {
      color: "bg-blue-700",
      icon: "https://skillicons.dev/icons?i=postgresql",
    },
    AWS: { color: "bg-orange-500", icon: "https://skillicons.dev/icons?i=aws" },
    Vite: {
      color: "bg-purple-600",
      icon: "https://skillicons.dev/icons?i=vite",
    },
    Lua: { color: "bg-blue-500", icon: "https://skillicons.dev/icons?i=lua" },
  };

  return (
    techMap[name] || {
      color: "bg-gray-500",
      icon: "https://skillicons.dev/icons?i=github",
    }
  );
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
    "Roblox Studio": "bg-blue-600/15 text-white border border-blue-600",
    Vite: "bg-purple-600/15 text-white border border-purple-600",
    Lua: "bg-blue-500/15 text-white border border-blue-500",
  };

  return styleMap[name] || "bg-gray-500/15 text-white border border-gray-500";
};

const AboutSection = () => {
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("about");
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animations when section becomes visible again
  useEffect(() => {
    if (isVisible) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isVisible]);

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
    "Roblox Studio",
    "FlutterFlow",
    "Flutter",
    "Vite",
    "Lua",
  ];

  return (
    <section
      id="about"
      className="py-20 transition-all duration-1000 relative"
      data-reveal
    >
      {/* Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-indigo-900/70 dark:via-purple-900/40 dark:to-blue-900/70" />
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mim</h2>
              <div className="w-16 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-xl font-semibold mb-6">Quem sou eu?</h3>
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
                  alguns jogos como forma de aprimorar meu conhecimento em
                  lógica de programação, bibliotecas e ferramentas modernas.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Estou sempre buscando aprender mais, melhorar meus códigos e
                  construir soluções reais.
                </p>
                <p className="text-lg text-muted-foreground">
                  Atualmente estudo algoritmos e resolução de problemas com foco
                  em entrevistas técnicas. Meu objetivo é evoluir como
                  desenvolvedor e, no futuro, conquistar uma vaga em uma grande
                  empresa de tecnologia.
                </p>
              </div>

              <div className="flex flex-col w-full">
                <h3 className="text-xl font-semibold mb-6">
                  Tecnologias que eu já utilizei
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center">
                  {techStack.map((tech, index) => {
                    const techInfo = getTechInfo(tech);
                    const isGit = tech === "Git";
                    return (
                      <div
                        key={`${tech}-${animationKey}`}
                        className={`${isGit ? "bg-red-500/15 text-white border-2 border-red-500" : getTechTransparentStyle(tech)} p-2 sm:p-3 rounded-full flex flex-row items-center justify-center text-center transform transition-all duration-300 hover:scale-110 gap-2 w-full max-w-[140px] min-h-[40px] font-light cursor-pointer`}
                        style={{
                          animationDelay: isVisible ? `${index * 50}ms` : "0ms",
                          animation: isVisible ? "slideInRight 0.6s ease-out forwards" : "none"
                        }}
                      >
                        {techInfo.icon.startsWith("https://") ? (
                          <img
                            src={techInfo.icon}
                            alt={tech}
                            className="w-4 h-4 sm:w-6 sm:h-6"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="text-base sm:text-xl">
                            {techInfo.icon}
                          </span>
                        )}
                        <span className="font-medium text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TimelineSection = () => {
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("timeline");
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animations when section becomes visible again
  useEffect(() => {
    if (isVisible) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isVisible]);

  // Definição dos períodos para cor do ícone
  const timelineItems = [
    {
      date: "1º Semestre 2026 - Futuro Próximo",
      title: "Objetivos & Metas",
      description:
        "Conquistar posição em empresa de tecnologia e continuar evoluindo como desenvolvedor.",
      icon: "🎯",
      iconColor: "bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text", // Futuro
      dotColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
      achievements: [
        "Estágio em tech",
        "Contribuições open source",
        "Projetos pessoais",
        "Networking",
      ],
    },
    {
      date: "2º Semestre 2025 - Presente",
      title: "Universidade & Especialização",
      description:
        "Iniciei Ciência da Computação na UniCEUB e estudo algoritmos para entrevistas técnicas.",
      icon: "🎓",
      iconColor: "bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text", // Presente
      dotColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      achievements: [
        "Início da graduação em Ciência da Computação",
        "Algoritmos avançados",
        "Estruturas de dados",
        "Preparação para big techs",
      ],
    },
    {
      date: "1º Semestre 2025",
      title: "Frameworks Modernos & Projetos",
      description:
        "Expandi conhecimentos com React, Flask, banco de dados e desenvolvi 3 projetos web. Explorei plataformas low/no code como flutterflow.",
      icon: "⚛️",
      iconColor: "bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text", // Passado
      dotColor: "bg-gradient-to-r from-green-400 to-cyan-500",
      achievements: [
        "React",
        "Flask (Python)",
        "PostgreSQL & SQLite",
        "3 projetos web",
        "FlutterFlow",
      ],
    },
    {
      date: "2º Semestre 2024",
      title: "Início da Jornada",
      description:
        "Comecei a aprender programação com Python como minha primeira linguagem, estudando lógica de programação e desenvolvimento web básico. Também aprendi sobre desenvolvimento de jogos e desenvolvi projetos na unreal, unity, godot e roblox studio.",
      icon: "🚀",
      iconColor: "bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text", // Passado
      dotColor: "bg-gradient-to-r from-blue-500 to-purple-500",
      achievements: [
        "Python (primeira linguagem)",
        "Lógica de programação",
        "HTML, CSS e JavaScript básico",
        "3 jogos (Unity, Godot, Unreal)",
      ],
    },
  ];

  return (
    <section id="timeline" className="py-20 relative" data-reveal>
  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-pink-900/40 dark:via-purple-900/60 dark:to-blue-900/40" />
      <div className="container mx-auto px-4 relative z-10">
        <div
          key={`timeline-${animationKey}`}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Minha Jornada
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          </div>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            1 ano de experiência, aprendizado e evolução como desenvolvedor
          </p>

          {/* Distribuição em duas colunas com linha gradiente central */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Linha gradiente central vertical */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-orange-400 via-purple-500 via-cyan-500 to-blue-500 rounded-full z-0" />

            {/* Coluna esquerda */}
            <div className="flex flex-col gap-8 z-10">
              {timelineItems.filter((_, i) => i % 2 === 0).map((item, index) => (
                <div key={`${item.date}-${animationKey}-left`} className="relative">
                  <div
                    className={`bg-card rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 border-[2px]`}
                    style={{
                      borderImage: (() => {
                        const match = item.iconColor.match(/from-([a-z0-9-]+).*to-([a-z0-9-]+)/);
                        if (match) {
                          const from = getTailwindColor(match[1]);
                          const to = getTailwindColor(match[2]);
                          return `linear-gradient(90deg, ${from}, ${to}) 1`;
                        }
                        return 'linear-gradient(90deg, #a855f7, #2563eb) 1';
                      })(),
                      borderImageSlice: 1,
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      boxShadow: `0 0 16px 0px ${getBoxShadowColor(item.iconColor)}`,
                      transition: 'box-shadow 0.3s',
                      borderRadius: '1rem', // rounded-2xl
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      const match = item.iconColor.match(/from-([a-z0-9-]+).*to-([a-z0-9-]+)/);
                      let from = '#a855f7', to = '#2563eb';
                      if (match) {
                        from = getTailwindColor(match[1]);
                        to = getTailwindColor(match[2]);
                      }
                      e.currentTarget.style.boxShadow = `0 0 32px 0px ${getBoxShadowColor(item.iconColor)}`;
                      e.currentTarget.style.borderImage = `linear-gradient(90deg, ${from}, ${to}) 1`;
                    }}
                    onMouseLeave={e => {
                      const match = item.iconColor.match(/from-([a-z0-9-]+).*to-([a-z0-9-]+)/);
                      let from = '#a855f7', to = '#2563eb';
                      if (match) {
                        from = getTailwindColor(match[1]);
                        to = getTailwindColor(match[2]);
                      }
                      e.currentTarget.style.boxShadow = `0 0 16px 0px ${getBoxShadowColor(item.iconColor)}`;
                      e.currentTarget.style.borderImage = `linear-gradient(90deg, ${from}, ${to}) 1`;
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full bg-clip-text text-transparent ${item.iconColor}`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {item.date}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-3 flex items-center gap-3`}>
                      <span className={`w-7 h-7 rounded-full bg-background flex items-center justify-center text-lg shadow-lg border-4 border-background`}>
                        <span className={`bg-clip-text text-transparent ${item.iconColor}`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.icon}</span>
                      </span>
                      <span className={`bg-clip-text text-transparent ${item.iconColor}`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.title}</span>
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    {/* Achievements */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Principais Conquistas:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {item.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center text-sm text-muted-foreground">
                            <span className={`w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 ${item.dotColor}`}></span>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coluna direita */}
            <div className="flex flex-col gap-8 z-10">
                {timelineItems.filter((_, i) => i % 2 === 1).map((item, index) => (
                  <div key={`${item.date}-${animationKey}-right`} className="relative">
                    <div
                      className={`bg-card rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 border-[2px]`}
                      style={{
                        borderImage: (() => {
                          const match = item.iconColor.match(/from-([a-z0-9-]+).*to-([a-z0-9-]+)/);
                          if (match) {
                            const from = getTailwindColor(match[1]);
                            const to = getTailwindColor(match[2]);
                            return `linear-gradient(90deg, ${from}, ${to}) 1`;
                          }
                          return 'linear-gradient(90deg, #a855f7, #2563eb) 1';
                        })(),
                        borderImageSlice: 1,
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        boxShadow: `0 0 16px 0px ${getBoxShadowColor(item.iconColor)}`,
                        transition: 'box-shadow 0.3s',
                        borderRadius: '1rem', // rounded-2xl
                        overflow: 'hidden',
                      }}
                      onMouseEnter={e => {
                        const match = item.iconColor.match(/from-([a-z0-9-]+).*to-([a-z0-9-]+)/);
                        let from = '#a855f7', to = '#2563eb';
                        if (match) {
                          from = getTailwindColor(match[1]);
                          to = getTailwindColor(match[2]);
                        }
                        e.currentTarget.style.boxShadow = `0 0 32px 0px ${getBoxShadowColor(item.iconColor)}`;
                        e.currentTarget.style.borderImage = `linear-gradient(90deg, ${from}, ${to}) 1`;
                      }}
                      onMouseLeave={e => {
                        const match = item.iconColor.match(/from-([a-z0-9-]+).*to-([a-z0-9-]+)/);
                        let from = '#a855f7', to = '#2563eb';
                        if (match) {
                          from = getTailwindColor(match[1]);
                          to = getTailwindColor(match[2]);
                        }
                        e.currentTarget.style.boxShadow = `0 0 16px 0px ${getBoxShadowColor(item.iconColor)}`;
                        e.currentTarget.style.borderImage = `linear-gradient(90deg, ${from}, ${to}) 1`;
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full bg-clip-text text-transparent ${item.iconColor}`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          {item.date}
                        </span>
                      </div>
                      <h3 className={`text-xl font-bold mb-3 flex items-center gap-3`}>
                        <span className={`w-7 h-7 rounded-full bg-background flex items-center justify-center text-lg shadow-lg border-4 border-background`}>
                          <span className={`bg-clip-text text-transparent ${item.iconColor}`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.icon}</span>
                        </span>
                        <span className={`bg-clip-text text-transparent ${item.iconColor}`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.title}</span>
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      {/* Achievements */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          Principais Conquistas:
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {item.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex items-center text-sm text-muted-foreground">
                              <span className={`w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 ${item.dotColor}`}></span>
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animations when section becomes visible again
  useEffect(() => {
    if (isVisible) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isVisible]);

  const projects = [
    {
      id: 1,
      name: "Frecomu",
      image: "/placeholder.svg",
      date: "2025",
      tech: ["React", "Node.js", "PostgreSQL", "TypeScript"],
      description:
        "Um sistema completo para gerenciamento escolar com autenticação de usuários, cadastro de alunos, notas, frequência e dashboard administrativo. Desenvolvido com tecnologias modernas para performance otimizada.",
      demoVideo: "https://example.com/demo1.mp4",
      github: "https://github.com/PedroM2626/Frecomu",
      live: "https://school-management-demo.com",
    },
    {
      id: 2,
      name: "Util Tools",
      image: "/placeholder.svg",
      date: "2025",
      tech: ["Unity", "C#"],
      description:
        "Um jogo de puzzle em 3D com mecânicas inovadoras, sistema de níveis progressivos e interface intuitiva. Desenvolvido na Unity com scripts otimizados.",
      demoVideo: "https://example.com/demo2.mp4",
      github: "https://github.com/PedroM2626/util-tools",
      live: "https://puzzle-game-demo.com",
    },
    {
      id: 3,
      name: "Task Manager",
      image: "/placeholder.svg",
      date: "2025",
      tech: ["Flutter", "Firebase", "Dart"],
      description:
        "Aplicativo móvel para controle financeiro pessoal com categorização automática de gastos, relatórios detalhados e sincronização em nuvem.",
      demoVideo: "https://example.com/demo3.mp4",
      github: "https://github.com/PedroM2626/task-manager",
      live: "https://finance-app-demo.com",
    },
    // {
    //   id: 4,
    //   name: "Portfolio Responsivo",
    //   image: "/placeholder.svg",
    //   date: "2024",
    //   tech: ["HTML5", "CSS3", "JavaScript"],
    //   description:
    //     "Website portfolio totalmente responsivo com animações suaves, design moderno e otimizado para SEO.",
    //   demoVideo: "https://example.com/demo4.mp4",
    //   github: "https://github.com/PedroM2626/portfolio-website",
    //   live: "https://portfolio-demo.com",
    // },
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
    <section id="projects" className="py-20 relative" data-reveal>
  <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300 dark:from-purple-900/50 dark:via-blue-900/50 dark:to-indigo-900/50" />
      <div className="container mx-auto px-4 relative z-10">
        <div
          key={`projects-${animationKey}`}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meus Projetos
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

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
                        {techInfo.icon.startsWith("https://") ? (
                          <img
                            src={techInfo.icon}
                            alt={tech}
                            className="w-4 h-4"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span>{techInfo.icon}</span>
                        )}
                        <span>{tech}</span>
                        <X className="h-3 w-3 ml-1" />
                      </div>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-7 px-2 text-xs transition-all duration-300 hover:shadow-[0_0_15px_rgba(156,163,175,0.4)] transform hover:-translate-y-0.5"
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
                        {techInfo.icon.startsWith("https://") ? (
                          <img
                            src={techInfo.icon}
                            alt={tech}
                            className="w-4 h-4"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span>{techInfo.icon}</span>
                        )}
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
                className={
                  `cursor-pointer hover:shadow-lg transition-shadow rounded-2xl ` +
                  `bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-green-900/40 dark:via-blue-900/60 dark:to-purple-900/40`
                }
                style={{ position: "relative", zIndex: 1 }}
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
                      const isGit = tech === "Git";
                      return (
                        <div
                          key={tech}
                          className={`${isGit ? "bg-red-500/15 text-white border border-red-500" : getTechTransparentStyle(tech)} px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}
                        >
                          {techInfo.icon.startsWith("https://") ? (
                            <img
                              src={techInfo.icon}
                              alt={tech}
                              className="w-4 h-4"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <span>{techInfo.icon}</span>
                          )}
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
                        const isGit = tech === "Git";
                        return (
                          <div
                            key={tech}
                            className={`$${
                              isGit
                                ? "bg-red-500/15 text-white border border-red-500"
                                : getTechTransparentStyle(tech)
                            } px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2`}
                          >
                            {techInfo.icon.startsWith("https://") ? (
                              <img
                                src={techInfo.icon}
                                alt={tech}
                                className="w-5 h-5"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <span>{techInfo.icon}</span>
                            )}
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
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_32px_rgba(147,51,234,0.7)] hover:text-purple-600 transform hover:-translate-y-0.5 font-medium border-0"
                        style={{ position: 'relative', zIndex: 2 }}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Repositório
                      </a>
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-500 text-white transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_32px_rgba(236,72,153,0.7)] hover:text-purple-600 transform hover:-translate-y-0.5 font-medium border-0"
                        style={{ position: 'relative', zIndex: 2 }}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo Ao Vivo
                      </a>
                      <a
                        href={selectedProject.demoVideo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_32px_rgba(16,185,129,0.7)] hover:text-purple-600 transform hover:-translate-y-0.5 font-medium border-0"
                        style={{ position: 'relative', zIndex: 2 }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Vídeo no youtube
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
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
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("contact");

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
        const errText = await response.text();
        throw new Error(errText || "Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Fallback: open email client
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Nome: ${formData.name}\n\nMensagem:\n${formData.message}`,
      );
      const cc = encodeURIComponent(formData.email);
      window.open(
        `mailto:pedromoratolahoz@gmail.com?subject=${subject}&body=${body}&cc=${cc}`,
      );
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 relative" data-reveal>
  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-yellow-900/40 dark:via-pink-900/60 dark:to-indigo-900/40" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold">Entre em Contato</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-2"></div>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
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
              {/* Location Card */}
              <div className="group">
                <div className="flex items-center p-4 rounded-lg border border-muted bg-card">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 mr-4">
                    <span className="text-green-600 dark:text-green-400">
                      📍
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      Localidade
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Brasília (Brasil)
                    </div>
                  </div>
                </div>
              </div>

              {/* Birth Date Card */}
              <div className="group">
                <div className="flex items-center p-4 rounded-lg border border-muted bg-card">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 mr-4">
                    <span className="text-yellow-600 dark:text-yellow-400">
                      🎂
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      Data de Nascimento
                    </div>
                    <div className="text-sm text-muted-foreground">
                      20/09/2007
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <a
                href="https://wa.me/5561993096847"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-lg border border-muted bg-card transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_32px_rgba(16,185,129,0.7)] hover:border-green-500 hover:shadow-md"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-cyan-600 dark:text-cyan-400">📞</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground group-hover:text-purple-400 transition-colors duration-300">Telefone</div>
                  <div className="text-sm text-muted-foreground group-hover:text-purple-400 transition-colors duration-300">
                    +55 (61) 99309-6847
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-green-500 group-hover:text-purple-400 transition-colors" />
              </a>

              {/* GitHub Card */}
              <div className="group">
                <a
                  href="https://github.com/PedroM2626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg border border-muted transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_32px_rgba(168,85,247,0.7)] hover:border-primary/50 bg-card hover:shadow-md"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Github className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground group-hover:text-purple-400 transition-colors duration-300">GitHub</div>
                    <div className="text-sm text-muted-foreground group-hover:text-purple-400 transition-colors duration-300">
                      @PedroM2626
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                </a>
              </div>

              {/* LinkedIn Card */}
              <div className="group">
                <a
                  href="https://linkedin.com/in/pedro-morato-lahoz-7996b1314/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg border border-muted transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_32px_rgba(59,130,246,0.7)] hover:border-primary/50 bg-card hover:shadow-md"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground group-hover:text-purple-400 transition-colors duration-300">LinkedIn</div>
                    <div className="text-sm text-muted-foreground group-hover:text-purple-400 transition-colors duration-300">
                      pedro-morato-lahoz-7996b1314
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                </a>
              </div>

              {/* Email Card */}
              <div className="group">
                <a
                  href="mailto:pedromoratolahoz@gmail.com"
                  className="flex items-center p-4 rounded-lg border border-muted transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_32px_rgba(236,72,153,0.7)] hover:border-primary/50 bg-card hover:shadow-md"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/20 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-pink-600 dark:text-pink-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground group-hover:text-purple-400 transition-colors duration-300">Email</div>
                    <div className="text-sm text-muted-foreground group-hover:text-purple-400 transition-colors duration-300">
                      pedromoratolahoz@gmail.com
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-purple-400 transition-colors" />
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
                className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transform hover:-translate-y-0.5"
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

const Footer = () => {
  return (
  <footer className="bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Pedro Morato. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <HomeSection />
      <AboutSection />
      <TimelineSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <BackToTop />

      <style>{`
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

        @keyframes slideInTimeline {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
