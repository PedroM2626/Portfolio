// Função utilitária para pegar cor do gradiente Tailwind
function getTailwindColor(color: string): string {
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
function getBoxShadowColor(iconColor: string): string {
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
import { SkillsSection } from "@/components/SkillsSection";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "@/components/LanguageSwitch";
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
  Cpu,
  Calendar,
} from "lucide-react";

// Typing animation hook
interface TypingEffectResult {
  displayedText: string;
  isComplete: boolean;
}

const useTypingEffect = (
  text: string,
  speed: number = 100,
  shouldStart: boolean = true,
): TypingEffectResult => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);

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
const useScrollReveal = (): Set<string> => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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

interface NavItem {
  href: string;
  label: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const { t } = useTranslation();
  
  useEffect(() => { 
    setMounted(true); 
  }, []);
  
  const navItems: NavItem[] = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#timeline", label: t("nav.timeline") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];
  
  const scrollToSection = (href: string): void => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };
  
  // Ícones para cada item do menu
  const navIcons: Record<string, JSX.Element> = {
    "#home": <Home className="h-5 w-5 mr-2" />,
    "#about": <User className="h-5 w-5 mr-2" />,
    "#skills": <Cpu className="h-5 w-5 mr-2" />,
    "#timeline": <Calendar className="h-5 w-5 mr-2" />,
    "#projects": <Github className="h-5 w-5 mr-2" />,
    "#contact": <Mail className="h-5 w-5 mr-2" />,
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
          Pedro Morato
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="relative group text-foreground/60 hover:text-foreground transition-colors duration-300"
              style={{
                background: 'none',
                border: 'none',
                padding: '0.5rem 0',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                lineHeight: '1.25rem',
              }}
            >
              <span className="relative group">
                <span className={`relative z-10 group-hover:bg-gradient-to-r ${theme === 'dark' ? 'group-hover:from-purple-500 group-hover:to-blue-500' : 'group-hover:from-yellow-500 group-hover:to-amber-500'} group-hover:bg-clip-text group-hover:text-transparent`}>
                  {item.label}
                </span>
                <span className={`absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-yellow-500 to-amber-500'}`}></span>
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {mounted && (
            <div className="flex items-center space-x-2 bg-muted/50 dark:bg-muted/20 p-1.5 rounded-full">
              <Sun className="h-4 w-4 text-yellow-500 dark:text-yellow-400 transition-colors" />
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${theme === "dark" ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-yellow-300 to-amber-400'}`}
                aria-label="Toggle theme"
              >
                <span 
                  className={`block w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${theme === "dark" ? 'translate-x-6 bg-gradient-to-r from-purple-400 to-blue-400' : 'translate-x-0 bg-yellow-500'}`}
                />
              </button>
              <Moon className="h-4 w-4 text-blue-600 dark:text-blue-400 transition-colors" />
            </div>
          )}
          <LanguageSwitch />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t("aria.openMenu")}
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
              {navIcons[item.href]}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

const HomeSection: React.FC = () => {
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("home");
  const { t } = useTranslation();

  const { displayedText: nameText, isComplete: nameComplete } = useTypingEffect(
    "Pedro Morato",
    120,
    isVisible,
  );
  const { displayedText: jobText, isComplete: jobComplete } = useTypingEffect(
    t("hero.title"),
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
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-center">
                <span className={`bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent`}>
                  {nameText}
                </span>
                {!nameComplete && <span className="animate-pulse">|</span>}
              </div>

              {/* Job Title */}
              <div className="text-xl md:text-2xl opacity-80 mx-auto text-blue-700 dark:text-blue-300">
                {nameComplete && (
                  <>
                    {jobText}
                    {!jobComplete && <span className="animate-pulse">|</span>}
                  </>
                )}
              </div>

              {/* Welcome Message + Emoji - só embaixo no mobile, ao lado no desktop */}
              <div className="flex flex-col items-center justify-center gap-2 text-xl md:text-2xl font-medium mx-auto text-foreground w-full">
                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2">
                  <span className="w-full text-center">Seja bem-vindo ao meu portfólio!</span>
                  {/* Emoji só aparece ao lado em sm+ */}
                  {jobComplete && (
                    <span className="hidden sm:inline-block animate-wave text-4xl md:text-5xl leading-none">
                      👋
                    </span>
                  )}
                </div>
                {/* Emoji só aparece embaixo no mobile */}
                {jobComplete && (
                  <span className="sm:hidden animate-wave inline-block text-4xl leading-none mt-1">
                    👋
                  </span>
                )}
              </div>

              {/* Social Buttons - Responsivo */}
              <div className="flex flex-col items-center gap-4 mt-2 w-full">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
                  <a
                    href="https://github.com/PedroM2626"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-gray-600/40 text-purple-700 dark:text-purple-300 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_32px_rgba(168,85,247,0.7)] transform hover:-translate-y-0.5 hover:bg-white/30 dark:hover:bg-black/40 min-w-[120px] max-w-full"
                  >
                    <Github className="h-4 w-4" />
                    <span className="font-medium">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/pedro-morato-lahoz-7996b1314/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-gray-600/40 text-blue-700 dark:text-blue-300 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_32px_rgba(59,130,246,0.7)] transform hover:-translate-y-0.5 hover:bg-white/30 dark:hover:bg-black/40 min-w-[120px] max-w-full"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                  <a
                    href="mailto:pedromoratolahoz@gmail.com"
                    className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-gray-600/40 text-pink-700 dark:text-pink-300 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_32px_rgba(236,72,153,0.7)] transform hover:-translate-y-0.5 hover:bg-white/30 dark:hover:bg-black/40 min-w-[120px] max-w-full"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">{t('common.email')}</span>
                  </a>
                </div>

                {/* Download Resume Button - original centralizado */}
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
                <div 
                  className="relative w-80 h-80 rounded-full p-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-400 dark:to-blue-400 shadow-2xl"
                  style={{
                    boxShadow: '0 0 20px 5px rgba(245, 158, 11, 0.5)', // Yellow/amber shadow for light mode
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F0357267305144552820808f6068fd9e6%2F2e66a49a3d734d7aaf0ed006154187d8"
                      alt="Pedro Morato"
                      className="w-full h-full object-cover mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Add theme-specific styles for the shadow */}
            <style jsx={true} global={true}>
              {`
                .dark .relative.w-80.h-80.rounded-full::before {
                  content: '';
                  position: absolute;
                  inset: 0;
                  border-radius: 9999px;
                  padding: 1px;
                  background: linear-gradient(45deg, #a78bfa, #60a5fa);
                  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                  -webkit-mask-composite: xor;
                  mask-composite: exclude;
                  pointer-events: none;
                  box-shadow: 0 0 30px 8px rgba(139, 92, 246, 0.5);
                  animation: pulse 3s infinite;
                }
                
                .relative.w-80.h-80.rounded-full::before {
                  content: '';
                  position: absolute;
                  inset: 0;
                  border-radius: 9999px;
                  padding: 1px;
                  background: linear-gradient(45deg, #f59e0b, #fbbf24);
                  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                  -webkit-mask-composite: xor;
                  mask-composite: exclude;
                  pointer-events: none;
                  box-shadow: 0 0 30px 8px rgba(245, 158, 11, 0.5);
                  animation: pulse 3s infinite;
                }
                
                @keyframes pulse {
                  0% {
                    transform: scale(1);
                    opacity: 0.8;
                  }
                  50% {
                    transform: scale(1.02);
                    opacity: 1;
                  }
                  100% {
                    transform: scale(1);
                    opacity: 0.8;
                  }
                }
              `}
            </style>
          </div> {/* Fechamento da div do grid */}

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
              <p className="text-sm mb-2 animate-bounce bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent font-medium">
                {t('home.scrollDown')}
              </p>
              <div className="animate-bounce">
                <ChevronDown className="h-6 w-6 mx-auto text-yellow-500 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// BackToTop button
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const toggleVisibility = (): void => {
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
    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]'
    : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.5)]';
  return (
    <Button
      className={`fixed bottom-10 right-10 z-50 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } h-16 w-16 text-3xl ${gradient} text-white border-0`}
      onClick={scrollToTop}
      style={{ fontSize: "2rem" }}
    >
      <ChevronUp className="h-8 w-8" />
    </Button>
  );
}

interface TechInfo {
  color: string;
  icon: string;
}

// Enhanced tech stack data with skill-icons
const getTechInfo = (name: string): TechInfo => {
  const techMap: Record<string, TechInfo> = {
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
    "Scikit-Learn": { color: "bg-orange-500", icon: "https://cdn.simpleicons.org/scikitlearn" },
    Transformers: { color: "bg-yellow-500", icon: "https://cdn.simpleicons.org/huggingface" },
    "Hugging Face": { color: "bg-yellow-500", icon: "https://cdn.simpleicons.org/huggingface" },
    Keras: { color: "bg-red-500", icon: "https://cdn.simpleicons.org/keras" },
    XGBoost: { color: "bg-green-600", icon: "https://cdn.simpleicons.org/xgboost" },
    LightGBM: { color: "bg-green-500", icon: "https://cdn.simpleicons.org/lightgbm" },
    OpenCV: { color: "bg-blue-700", icon: "https://skillicons.dev/icons?i=opencv" },
    Pandas: { color: "bg-blue-500", icon: "https://skillicons.dev/icons?i=pandas" },
    NumPy: { color: "bg-blue-600", icon: "https://skillicons.dev/icons?i=numpy" },
    spaCy: { color: "bg-teal-500", icon: "https://cdn.simpleicons.org/spacy" },
    NLTK: { color: "bg-purple-500", icon: "https://cdn.simpleicons.org/python" },
    Prophet: { color: "bg-indigo-500", icon: "https://cdn.simpleicons.org/python" },
    Statsmodels: { color: "bg-indigo-600", icon: "https://cdn.simpleicons.org/python" },
  };

  return (
    techMap[name] || {
      color: "bg-gray-500",
      icon: "https://skillicons.dev/icons?i=github",
    }
  );
};

// Function to get transparent background style for tech items
const getTechTransparentStyle = (name: string): string => {
  const styleMap: Record<string, string> = {
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
  const { t } = useTranslation();
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("about");
  const [animationKey, setAnimationKey] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  // Get project count from projects data
  useEffect(() => {
    // This will be populated when the ProjectsSection loads
    const timer = setInterval(() => {
      const projects = document.querySelectorAll('[data-project-card]');
      if (projects.length > 0) {
        setProjectCount(projects.length);
        clearInterval(timer);
      }
    }, 500);
    
    return () => clearInterval(timer);
  }, []);

  // Calculate years of experience
  const startYear = 2021; // Adjust this to your actual start year
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;

  // Stats data
  const stats = [
    { value: '1+', label: 'Anos de Experiência' },
    { value: '6+', label: 'Projetos Concluídos' },
  ];

  return (
    <section
      id="about"
      className="py-20 transition-all duration-1000 relative"
      data-reveal
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-indigo-900/70 dark:via-purple-900/40 dark:to-blue-900/70" />
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {t('about.title')}
                </span>
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-500 dark:to-blue-500 rounded-full mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {t('about.subtitle')}
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-xl font-semibold mb-6">{t('about.who')}</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {t('about.age')}
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  {t('about.experience', { years: yearsOfExperience })}
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  {t('about.projects', { count: projectCount })}
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  {t('about.goal')}
                </p>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                  <span>{t('about.birth')}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { value: '1+', label: t('about.stats.expYears') },
                  { value: '6+', label: t('about.stats.doneProjects') }
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`bg-card/70 backdrop-blur-sm p-6 rounded-xl border border-border/30 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-500 dark:to-blue-500 bg-clip-text text-transparent mb-3">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-lg">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </section>
  );
}

const TimelineSection = () => {
  const { t } = useTranslation();
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("timeline");
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animations when section becomes visible again
  useEffect(() => {
    if (isVisible) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isVisible]);

  // Definição dos períodos e textos via i18n
  const tItems = t('timeline.items', { returnObjects: true }) as Array<{ date: string; title: string; description: string; achievements: string[] }>;
  const timelineItems = [
    {
      ...tItems[0],
      icon: "🎯",
      iconColor: "bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text",
      dotColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    {
      ...tItems[1],
      icon: "🎓",
      iconColor: "bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text",
      dotColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      ...tItems[2],
      icon: "⚛️",
      iconColor: "bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text",
      dotColor: "bg-gradient-to-r from-green-400 to-cyan-500",
    },
    {
      ...tItems[3],
      icon: "🚀",
      iconColor: "bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text",
      dotColor: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
  ];

  return (
    <section id="timeline" className="py-20 relative" data-reveal>
  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-pink-900/40 dark:via-purple-900/60 dark:to-blue-900/40" />
      <div className="container mx-auto px-4 relative z-10">
        <div
            key={`timeline-${animationKey}`}
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{
              animation: isVisible ? "slideInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1)" : "none"
            }}
          >
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                {t('timeline.title')}
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-400 dark:to-blue-400 mx-auto mb-4"></div>
          </div>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            {t('timeline.subtitle')}
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
                    className="bg-card rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1"
                    style={{
                      boxShadow: `0 0 16px 0px ${getBoxShadowColor(item.iconColor)}`,
                      transition: 'box-shadow 0.3s',
                      borderRadius: '1rem',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = `0 0 32px 0px ${getBoxShadowColor(item.iconColor)}`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = `0 0 16px 0px ${getBoxShadowColor(item.iconColor)}`;
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
                        {t('timeline.achievementsTitle')}
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
                      className="bg-card rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1"
                      style={{
                        boxShadow: `0 0 16px 0px ${getBoxShadowColor(item.iconColor)}`,
                        transition: 'box-shadow 0.3s',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = `0 0 32px 0px ${getBoxShadowColor(item.iconColor)}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = `0 0 16px 0px ${getBoxShadowColor(item.iconColor)}`;
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
                          {t('timeline.achievementsTitle')}
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
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("projects");
  const [animationKey, setAnimationKey] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);
  const [nonFeatured, setNonFeatured] = useState<any[]>([]);

  // Reset animations when section becomes visible again
  useEffect(() => {
    if (isVisible) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isVisible]);

  const initialProjects = [
    {
      id: 1,
      name: "Frecomu",
      image: "/placeholder.svg",
      date: "2024",
      tech: ["Python", "Flask", "Socket.IO", "SQLAlchemy", "JavaScript", "HTML5", "CSS3"],
      category: "web",
      description: t(`projects.static.frecomu.description.${(i18n.language || "pt").split("-")[0]}`),
      demoVideo: "",
      github: "https://github.com/PedroM2626/Frecomu",
      live: "",
    },
    {
      id: 2,
      name: "Task Manager",
      image: "/placeholder.svg",
      date: "2024",
      tech: ["React", "Firebase", "Vite", "Tailwind CSS", "Framer Motion", "Vitest", "Playwright"],
      category: "web",
      description: t(`projects.static.taskManager.description.${(i18n.language || "pt").split("-")[0]}`),
      demoVideo: "",
      github: "https://github.com/PedroM2626/Task-Manager",
      live: "",
    },
    {
      id: 3,
      name: "Util Tools",
      image: "/placeholder.svg",
      date: "2024",
      tech: ["Python", "Flask", "Tesseract OCR", "Docker"],
      category: "web",
      description: t(`projects.static.utilTools.description.${(i18n.language || "pt").split("-")[0]}`),
      demoVideo: "",
      github: "https://github.com/PedroM2626/Util-Tools-Site",
      live: "",
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

  useEffect(() => {
    setProjects(initialProjects);
  }, []);

  useEffect(() => {
    (async () => {
      const lang = (i18n.language || "pt").split("-")[0];
      const { DESCRIPTION_OVERRIDES } = await import("@/lib/projects.config");
      const normalize = (name: string) => name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "");
      setProjects((prev) => {
        const next = prev.map((p) => {
          const norm = normalize(p.name);
          const override = DESCRIPTION_OVERRIDES[norm];
          if (typeof override === "string" && override.length > 0) {
            return { ...p, description: override };
          }
          if (p.name === "Frecomu") {
            return { ...p, description: t(`projects.static.frecomu.description.${lang}`) };
          }
          if (p.name === "Task Manager") {
            return { ...p, description: t(`projects.static.taskManager.description.${lang}`) };
          }
          if (p.name === "Util Tools") {
            return { ...p, description: t(`projects.static.utilTools.description.${lang}`) };
          }
          if (p.category === "ai-ml") {
            return { ...p, description: t("projectsPage.defaultDescription") };
          }
          return p;
        });
        setSelectedProject((sp: any) => {
          if (!sp) return sp;
          const updated = next.find((pr) => pr.id === sp.id);
          return updated ?? sp;
        });
        return next;
      });
    })();
  }, [i18n.language, t]);

  useEffect(() => {
    (async () => {
      try {
        const { loadMLProjectsFromGitHub } = await import("@/lib/github");
        const { NAME_OVERRIDES, DESCRIPTION_OVERRIDES, EXCLUDED_REPOS } = await import("@/lib/projects.config");
        const normalize = (name: string) => name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "");
        const mlProjects = await loadMLProjectsFromGitHub();
        if (mlProjects.length) {
          setProjects((prev) => {
            const existingNames = new Set(prev.map((p) => p.name));
            const deduped = mlProjects.filter((p) => !existingNames.has(p.name));
            return [...prev, ...deduped];
          });
        }
        const applyOverrides = (p: any) => {
          const norm = normalize(p.name);
          const name = NAME_OVERRIDES[norm] ?? p.name;
          const description = DESCRIPTION_OVERRIDES[norm] ?? p.description;
          return { ...p, name, description };
        };
        const excluded = new Set(EXCLUDED_REPOS.map(normalize));
        setProjects((prev) => prev.map(applyOverrides).filter((p) => !excluded.has(normalize(p.name))));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { FEATURED_REPOS } = await import("@/lib/projects.config");
      const normalize = (name: string) => name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "");
      const featKeys = Object.keys(FEATURED_REPOS);
      const feats = new Set<string>([
        ...featKeys.map(normalize),
        ...featKeys
          .map((k) => FEATURED_REPOS[k])
          .filter((v): v is string => typeof v === "string" && v.length > 0)
          .map(normalize),
      ]);
      const featuredList = projects
        .filter((p) => feats.has(normalize(p.name)))
        .map((p) => {
          const norm = normalize(p.name);
          const direct = FEATURED_REPOS[norm];
          if (typeof direct === "string" && direct.length > 0) {
            return { ...p, name: direct };
          }
          const byKey = featKeys.find((k) => normalize(k) === norm);
          const display = byKey ? FEATURED_REPOS[byKey] : undefined;
          return typeof display === "string" && display.length > 0 ? { ...p, name: display } : p;
        });
      const nonFeaturedList = projects.filter((p) => !feats.has(normalize(p.name)));
      setFeatured(featuredList);
      setNonFeatured(nonFeaturedList);
    })();
  }, [projects]);
  // Get all unique technologies for filter options
  const allTechs = Array.from(new Set(projects.flatMap((project) => project.tech))).sort();

  // Categorias disponíveis
  const categories = [
    { id: 'web', name: t('projectsPage.categories.web') },
    { id: 'automacao', name: t('projectsPage.categories.automacao') },
    { id: 'jogo', name: t('projectsPage.categories.jogo') },
    { id: 'aplicativo', name: t('projectsPage.categories.aplicativo') },
    { id: 'ai-ml', name: t('projectsPage.categories.aiMl') },
  ];

  // Toggle technology selection
  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) 
        ? prev.filter((c) => c !== category) 
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedTechs([]);
    setSelectedCategories([]);
    setSearchTerm("");
  };

  // Filter projects based on selected technologies, categories and search term
  const filteredProjects = nonFeatured.filter((project: any) => {
    const matchesTechs = 
      selectedTechs.length === 0 ||
      selectedTechs.some((tech: string) => project.tech.includes(tech));
      
    const matchesCategories = 
      selectedCategories.length === 0 ||
      (project.category && selectedCategories.includes(project.category));
      
    const matchesSearch =
      !searchTerm ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech: string) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      
    return matchesTechs && matchesCategories && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative" data-reveal>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300 dark:from-purple-900/50 dark:via-blue-900/50 dark:to-indigo-900/50" />
      <div className="container mx-auto px-4 relative z-10">
        <div key={`projects-${animationKey}`}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t('projectsPage.featuredTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((project: any) => (
                <Card key={`featured-${project.id}`} className={`cursor-pointer hover:shadow-lg transition-shadow rounded-2xl bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-green-900/40 dark:via-blue-900/60 dark:to-purple-900/40`} style={{ position: "relative", zIndex: 1 }} onClick={() => setSelectedProject(project)}>
                  <CardHeader>
                    <img src={project.image} alt={project.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string) => {
                        const techInfo = getTechInfo(tech);
                        const isGit = tech === "Git";
                        return (
                          <div key={tech} className={`${isGit ? "bg-red-500/15 text-white border border-red-500" : getTechTransparentStyle(tech)} px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}>
                            {techInfo.icon.startsWith("https://") ? (
                              <img src={techInfo.icon} alt={tech} className="w-4 h-4" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
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

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Categorias</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 cursor-pointer transition-all ${
                    selectedCategories.includes(category.id)
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <span>{selectedCategories.includes(category.id) ? '✓' : '○'}</span>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Technologies */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Tecnologias</h3>
            <div className="flex flex-wrap gap-2">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 cursor-pointer transition-all ${
                  selectedTechs.length === 0 && selectedCategories.length === 0
                    ? "bg-white text-black"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                onClick={clearAllFilters}
              >
                <span>✓</span>
                <span>Todos</span>
              </div>
            {Array.from(new Set(filteredProjects.flatMap((p: any) => p.tech))).sort()
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
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 relative z-10 mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project: any) => (
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
                    {project.tech.map((tech: string) => {
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
                        {t('projectsPage.videoFallback')}
                      </video>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{t('projectsPage.descriptionTitle')}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">
                      {t('projectsPage.technologiesTitle')}
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
                      {t('projectsPage.linksTitle')}
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

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("contact");

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
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
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-400 dark:to-blue-400 mx-auto mt-2"></div>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Left Column - Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">
              {t('contact.talk')}
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t('contact.intro')}
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
                      {t('contact.locationLabel')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t('contact.locationValue')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Birth Date Card - Moved to About Section */}

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
                  <div className="font-medium text-foreground group-hover:text-purple-400 transition-colors duration-300">{t('contact.phoneLabel')}</div>
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
              {t('contact.sendMessage')}
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
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-500 dark:to-blue-500 text-black dark:text-white transition-colors duration-100 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transform hover:-translate-y-0.5 flex items-center justify-center"
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

const Footer: React.FC = () => {
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

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HomeSection />
      <AboutSection />
      <SkillsSection />
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

      <style jsx global>{`
        /* Estilos personalizados para a barra de rolagem */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #9333ea;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #7e22ce;
        }

        /* Dark mode */
        .dark ::-webkit-scrollbar-thumb {
          background: #f59e0b;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: #d97706;
        }
      `}</style>
    </div>
  );
}

export default Index;
