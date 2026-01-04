import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

// Custom hook for scroll reveal
const useScrollReveal = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          } else {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-reveal]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return visibleSections;
};

type SkillCategory = 'frontend' | 'backend' | 'tools' | 'languages' | 'game-dev' | 'mobile' | 'desktop' | 'automation' | 'ai-ml';

interface Skill {
  name: string;
  level: number; // 1-5
  categories: SkillCategory[];
  alias?: string; // Optional display name (e.g., 'C# (Unity)' for C# in game-dev)
}

// Single source of truth for all skills
const skills: Skill[] = [
  // Languages
  { name: 'JavaScript', level: 5, categories: ['languages', 'frontend'] },
  { name: 'TypeScript', level: 4, categories: ['languages', 'frontend'] },
  { name: 'Python', level: 4, categories: ['languages', 'backend', 'automation'] },
  { name: 'C', level: 3, categories: ['languages', 'desktop'] },
  { name: 'C++', level: 3, categories: ['languages', 'desktop'] },
  { name: 'C#', level: 4, categories: ['languages', 'game-dev', 'desktop'] },
  { name: 'Lua', level: 4, categories: ['languages', 'game-dev'] },
  { name: 'Ruby', level: 3, categories: ['languages', 'backend'] },
  { name: 'Rust', level: 3, categories: ['languages', 'desktop', 'backend'] },
  { name: 'PHP', level: 3, categories: ['languages', 'backend'] },
  { name: 'Dart', level: 4, categories: ['languages', 'mobile'] },
  
  // Frontend
  { name: 'React', level: 4, categories: ['frontend'] },
  { name: 'Next.js', level: 4, categories: ['frontend'] },
  { name: 'HTML5', level: 5, categories: ['frontend'] },
  { name: 'CSS3', level: 5, categories: ['frontend'] },
  { name: 'Tailwind CSS', level: 4, categories: ['frontend'] },
  
  // Backend
  { name: 'Node.js', level: 4, categories: ['backend', 'automation'] },
  { name: 'Express', level: 4, categories: ['backend'] },
  { name: 'Flask', level: 3, categories: ['backend', 'automation'] },
  { name: 'SQL', level: 4, categories: ['backend'] },
  { name: 'MongoDB', level: 3, categories: ['backend'] },
  
  // Tools & DevOps
  { name: 'Git', level: 5, categories: ['tools'] },
  { name: 'GitHub', level: 5, categories: ['tools'] },
  { name: 'VS Code', level: 5, categories: ['tools'] },
  { name: 'Visual Studio', level: 4, categories: ['tools', 'desktop'] },
  { name: 'Vite', level: 4, categories: ['tools', 'frontend'] },
  { name: 'Docker', level: 3, categories: ['tools'] },
  { name: 'Windows', level: 5, categories: ['tools', 'desktop'] },
  { name: 'Firebase', level: 3, categories: ['tools', 'mobile', 'backend'] },
  { name: 'Supabase', level: 3, categories: ['tools', 'backend'] },
  { name: 'Postman', level: 4, categories: ['tools', 'automation'] },
  
  // Game Development
  { name: 'Unity', level: 4, categories: ['game-dev', 'mobile', 'desktop'] },
  { name: 'Unreal Engine', level: 3, categories: ['game-dev', 'desktop'] },
  { name: 'Godot', level: 3, categories: ['game-dev', 'desktop'] },
  { name: 'Roblox Studio', level: 4, categories: ['game-dev'] },
  
  // AI & Machine Learning
  { name: 'Scikit-Learn', level: 4, categories: ['ai-ml'] },
  { name: 'Transformers', level: 4, categories: ['ai-ml'] },
  { name: 'Hugging Face', level: 4, categories: ['ai-ml'] },
  { name: 'Keras', level: 3, categories: ['ai-ml'] },
  { name: 'XGBoost', level: 3, categories: ['ai-ml'] },
  { name: 'LightGBM', level: 3, categories: ['ai-ml'] },
  { name: 'OpenCV', level: 3, categories: ['ai-ml'] },
  { name: 'Pandas', level: 4, categories: ['ai-ml', 'backend'] },
  { name: 'NumPy', level: 4, categories: ['ai-ml', 'backend'] },
  { name: 'spaCy', level: 3, categories: ['ai-ml'] },
  { name: 'NLTK', level: 3, categories: ['ai-ml'] },
  { name: 'Prophet', level: 3, categories: ['ai-ml'] },
  { name: 'Statsmodels', level: 3, categories: ['ai-ml'] },
  
  // Mobile & Desktop
  { name: 'Flutter', level: 4, categories: ['mobile', 'desktop'] },
  { name: 'React Native', level: 3, categories: ['mobile'] },
  { name: 'Electron', level: 3, categories: ['desktop'] },
  { name: 'Qt', level: 2, categories: ['desktop'] },
  
];

// Helper function to get skills by category
const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skills.filter(skill => skill.categories.includes(category));
};

const categoryTitles = (t: (key: string) => string) => ({
  'frontend': t('skills.categories.frontend'),
  'backend': t('skills.categories.backend'),
  'tools': t('skills.categories.tools'),
  'languages': t('skills.categories.languages'),
  'game-dev': t('skills.categories.gameDev'),
  'mobile': t('skills.categories.mobile'),
  'desktop': t('skills.categories.desktop'),
  'automation': t('skills.categories.automation'),
  'ai-ml': t('skills.categories.aiMl'),
});

const getTechInfo = (name: string) => {
  const techMap: { [key: string]: { color: string; icon: string } } = {
    // Frontend
    'React': { color: 'bg-blue-400', icon: 'https://skillicons.dev/icons?i=react' },
    'TypeScript': { color: 'bg-blue-600', icon: 'https://skillicons.dev/icons?i=typescript' },
    'JavaScript': { color: 'bg-yellow-400', icon: 'https://skillicons.dev/icons?i=javascript' },
    'HTML5': { color: 'bg-orange-500', icon: 'https://skillicons.dev/icons?i=html' },
    'CSS3': { color: 'bg-blue-500', icon: 'https://skillicons.dev/icons?i=css' },
    'Tailwind CSS': { color: 'bg-cyan-400', icon: 'https://skillicons.dev/icons?i=tailwind' },
    
    // Backend
    'Node.js': { color: 'bg-green-600', icon: 'https://skillicons.dev/icons?i=nodejs' },
    'Python': { color: 'bg-yellow-500', icon: 'https://skillicons.dev/icons?i=python' },
    'Flask': { color: 'bg-gray-200', icon: 'https://skillicons.dev/icons?i=flask' },
    'SQL': { color: 'bg-blue-700', icon: 'https://skillicons.dev/icons?i=postgresql' },
    
    // Tools
    'Git': { color: 'bg-red-500', icon: 'https://skillicons.dev/icons?i=git' },
    'VS Code': { color: 'bg-blue-600', icon: 'https://skillicons.dev/icons?i=vscode' },
    'Docker': { color: 'bg-blue-500', icon: 'https://skillicons.dev/icons?i=docker' },
    'Firebase': { color: 'bg-yellow-600', icon: 'https://skillicons.dev/icons?i=firebase' },
    'GitHub': { color: 'bg-gray-800', icon: 'https://skillicons.dev/icons?i=github' },
    
    // Languages
    'C': { color: 'bg-blue-700', icon: 'https://skillicons.dev/icons?i=c' },
    'C++': { color: 'bg-blue-800', icon: 'https://skillicons.dev/icons?i=cpp' },
    'C#': { color: 'bg-purple-600', icon: 'https://skillicons.dev/icons?i=cs' },
    
    // Game Development
    'Unity': { color: 'bg-gray-800', icon: 'https://skillicons.dev/icons?i=unity' },
    'Unreal Engine': { color: 'bg-gray-200', icon: 'https://skillicons.dev/icons?i=unreal' },
    'Godot': { color: 'bg-purple-600', icon: 'https://skillicons.dev/icons?i=godot' },
    'Roblox Studio': { color: 'bg-blue-600', icon: 'https://skillicons.dev/icons?i=robloxstudio' },
    'Lua': { color: 'bg-blue-500', icon: 'https://skillicons.dev/icons?i=lua' },
    
    // Design & Others
    'Figma': { color: 'bg-purple-500', icon: 'https://skillicons.dev/icons?i=figma' },
    'Linux': { color: 'bg-yellow-500', icon: 'https://skillicons.dev/icons?i=linux' },
    'Windows': { color: 'bg-blue-500', icon: 'https://skillicons.dev/icons?i=windows' },
    'Vite': { color: 'bg-purple-600', icon: 'https://skillicons.dev/icons?i=vite' },
    'Next.js': { color: 'bg-black', icon: 'https://skillicons.dev/icons?i=nextjs' },
    'AWS': { color: 'bg-orange-500', icon: 'https://skillicons.dev/icons?i=aws' },
    'PostgreSQL': { color: 'bg-blue-700', icon: 'https://skillicons.dev/icons?i=postgresql' }
    ,
    'Scikit-Learn': { color: 'bg-orange-500', icon: 'https://cdn.simpleicons.org/scikitlearn' },
    'Transformers': { color: 'bg-yellow-500', icon: 'https://cdn.simpleicons.org/huggingface' },
    'Hugging Face': { color: 'bg-yellow-500', icon: 'https://cdn.simpleicons.org/huggingface' },
    'Keras': { color: 'bg-red-500', icon: 'https://cdn.simpleicons.org/keras' },
    'XGBoost': { color: 'bg-green-600', icon: 'https://cdn.simpleicons.org/xgboost' },
    'LightGBM': { color: 'bg-green-500', icon: 'https://cdn.simpleicons.org/lightgbm' },
    'OpenCV': { color: 'bg-blue-700', icon: 'https://skillicons.dev/icons?i=opencv' },
    'Pandas': { color: 'bg-blue-500', icon: 'https://skillicons.dev/icons?i=pandas' },
    'NumPy': { color: 'bg-blue-600', icon: 'https://skillicons.dev/icons?i=numpy' },
    'spaCy': { color: 'bg-teal-500', icon: 'https://cdn.simpleicons.org/spacy' },
    'NLTK': { color: 'bg-purple-500', icon: 'https://cdn.simpleicons.org/python' },
    'Prophet': { color: 'bg-indigo-500', icon: 'https://cdn.simpleicons.org/python' },
    'Statsmodels': { color: 'bg-indigo-600', icon: 'https://cdn.simpleicons.org/python' }
  };

  return (
    techMap[name] || {
      color: "bg-gray-500",
      icon: `https://skillicons.dev/icons?i=${name.toLowerCase()}`,
    }
  );
};

const SkillItem = ({ techName }: { techName: string }) => {
  const techInfo = getTechInfo(techName);
  const bgColor = techInfo.color;
  const iconUrl = techInfo.icon;
  
  // Special case for technologies that need specific styling
  const getTechStyle = (name: string) => {
    const styles: {[key: string]: string} = {
      'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      'TypeScript': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'JavaScript': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-200 border-yellow-100 dark:border-yellow-800/50',
      'HTML5': 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-200 border-orange-100 dark:border-orange-800/50',
      'CSS3': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'Tailwind CSS': 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-200 border-cyan-100 dark:border-cyan-800/50',
      'Node.js': 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-200 border-green-100 dark:border-green-800/50',
      'Python': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'Flask': 'bg-gray-50 text-gray-700 dark:bg-gray-800/30 dark:text-gray-200 border-gray-200 dark:border-gray-700/50',
      'SQL': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'Git': 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-200 border-red-100 dark:border-red-800/50',
      'VS Code': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'Docker': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'Firebase': 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-200 border-orange-100 dark:border-orange-800/50',
      'C': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'C++': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'C#': 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-200 border-purple-100 dark:border-purple-800/50',
      'Next.js': 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200 border-gray-200 dark:border-gray-700/50',
      'PostgreSQL': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'AWS': 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-200 border-orange-100 dark:border-orange-800/50',
      'Roblox Studio': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'Vite': 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-200 border-purple-100 dark:border-purple-800/50',
      'Lua': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'Figma': 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-200 border-purple-100 dark:border-purple-800/50',
      // AI & ML
      'Scikit-Learn': 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-200 border-orange-100 dark:border-orange-800/50',
      'Transformers': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-200 border-yellow-100 dark:border-yellow-800/50',
      'Hugging Face': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-200 border-yellow-100 dark:border-yellow-800/50',
      'Keras': 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-200 border-red-100 dark:border-red-800/50',
      'XGBoost': 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-200 border-green-100 dark:border-green-800/50',
      'LightGBM': 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-200 border-green-100 dark:border-green-800/50',
      'OpenCV': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'Pandas': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'NumPy': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
      'spaCy': 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-200 border-teal-100 dark:border-teal-800/50',
      'NLTK': 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-200 border-purple-100 dark:border-purple-800/50',
      'Prophet': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-200 border-indigo-100 dark:border-indigo-800/50',
      'Statsmodels': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-200 border-indigo-100 dark:border-indigo-800/50',
      'GitHub': 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200 border-gray-200 dark:border-gray-700/50',
      'Linux': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-200 border-yellow-100 dark:border-yellow-800/50',
      'Windows': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200 border-blue-100 dark:border-blue-800/50',
    };
    
    return styles[name] || 'bg-gray-50 text-gray-700 dark:bg-gray-800/30 dark:text-gray-200 border-gray-200 dark:border-gray-700/50';
  };

  const techStyle = getTechStyle(techName);

  return (
    <div className="flex items-center">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${techStyle} transition-colors`}>
        <img 
          src={iconUrl} 
          alt={techName}
          className="w-4 h-4 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://skillicons.dev/icons?i=github';
          }}
        />
        <span>{techName}</span>
      </div>
    </div>
  );
};

// Category color mapping
const categoryColors = {
  'frontend': {
    bg: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20',
    text: 'text-blue-600 dark:text-blue-400',
    bullet: 'bg-blue-500 dark:bg-blue-400',
    border: 'border-blue-200 dark:border-blue-800/50'
  },
  'backend': {
    bg: 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20',
    text: 'text-green-600 dark:text-green-400',
    bullet: 'bg-green-500 dark:bg-green-400',
    border: 'border-green-200 dark:border-green-800/50'
  },
  'tools': {
    bg: 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20',
    text: 'text-purple-600 dark:text-purple-400',
    bullet: 'bg-purple-500 dark:bg-purple-400',
    border: 'border-purple-200 dark:border-purple-800/50'
  },
  'languages': {
    bg: 'from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20',
    text: 'text-amber-600 dark:text-amber-400',
    bullet: 'bg-amber-500 dark:bg-amber-400',
    border: 'border-amber-200 dark:border-amber-800/50'
  },
  'game-dev': {
    bg: 'from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/20',
    text: 'text-pink-600 dark:text-pink-400',
    bullet: 'bg-pink-500 dark:bg-pink-400',
    border: 'border-pink-200 dark:border-pink-800/50'
  },
  'mobile': {
    bg: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    bullet: 'bg-indigo-500 dark:bg-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800/50'
  },
  'desktop': {
    bg: 'from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    bullet: 'bg-cyan-500 dark:bg-cyan-400',
    border: 'border-cyan-200 dark:border-cyan-800/50'
  },
  'automation': {
    bg: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    bullet: 'bg-emerald-500 dark:bg-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800/50'
  },
  'ai-ml': {
    bg: 'from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-900/30 dark:to-fuchsia-800/20',
    text: 'text-fuchsia-600 dark:text-fuchsia-400',
    bullet: 'bg-fuchsia-500 dark:bg-fuchsia-400',
    border: 'border-fuchsia-200 dark:border-fuchsia-800/50'
  }
} as const;

export const SkillsSection = () => {
  const { t } = useTranslation();
  const visibleSections = useScrollReveal();
  const isVisible = visibleSections.has("skills");
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animations when section becomes visible again
  useEffect(() => {
    if (isVisible) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isVisible]);

  const categories = ['frontend', 'backend', 'tools', 'languages', 'game-dev', 'mobile', 'desktop', 'automation', 'ai-ml'] as const;
  
  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden transition-all duration-1000"
      data-reveal
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 dark:from-indigo-900/70 dark:via-purple-900/40 dark:to-blue-900/70" />
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-500 dark:to-blue-500 bg-clip-text text-transparent">
                    {t('skills.title')}
                  </span>
                </h2>
                <div className="w-24 h-1 mx-auto bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-purple-500 dark:to-blue-500 rounded-full mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-8 max-w-3xl mx-auto">
                  {t('skills.subtitle')}
                </h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const categorySkills = getSkillsByCategory(category);
                const colors = categoryColors[category];
                
                return (
                  <div 
                    key={`${category}-${animationKey}`}
                    className={`bg-gradient-to-br ${colors.bg} p-6 rounded-xl border ${colors.border} shadow-sm transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                    style={{
                      animation: isVisible 
                        ? `fadeInUp 0.6s ease-out ${index * 100}ms forwards`
                        : 'none',
                      opacity: 0,
                      transform: 'translateY(20px)'
                    }}
                  >
                    <h3 className={`text-xl font-semibold mb-4 flex items-center ${colors.text}`}>
                      <span className={`w-2 h-6 ${colors.bullet} rounded-full mr-2`}></span>
                      {categoryTitles(t)[category]}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <SkillItem 
                          key={`${skill.name}-${category}`} 
                          techName={skill.alias || skill.name} 
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-16 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-lg p-6 max-w-4xl mx-auto">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold text-lg mb-2">{t('skills.noteTitle')}</h4>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    {t('skills.noteText')}
                  </p>
                </div>
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
};
