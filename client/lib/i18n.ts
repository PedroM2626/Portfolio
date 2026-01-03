import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  pt: {
    translation: {
      nav: {
        home: "Início",
        about: "Sobre",
        skills: "Tecnologias",
        timeline: "Jornada",
        projects: "Projetos",
        contact: "Contato",
      },
      hero: {
        title: "Desenvolvedor Independente",
      },
      aria: {
        openMenu: "Abrir menu",
      },
      common: {
        email: "Email",
      },
      skills: {
        title: "Tecnologias",
        subtitle: "Todas as tecnologias que eu utilizo ou já utilizei em projetos",
        noteTitle: "Sobre o uso de IA",
        noteText:
          "A maioria das ferramentas foram utilizadas de forma assistida (IA) em meus projetos. Estou constantemente buscando aprofundar meus conhecimentos nessas tecnologias e estou aberto a oportunidades de aprendizado e desenvolvimento profissional.",
        categories: {
          frontend: "Frontend",
          backend: "Backend",
          tools: "Ferramentas & DevOps",
          languages: "Linguagens de Programação",
          gameDev: "Desenvolvimento de Jogos",
          mobile: "Aplicativos Móveis",
          desktop: "Aplicativos Desktop",
          automation: "Automação & Bots",
          aiMl: "IA & Machine Learning",
        },
      },
      about: {
        title: "Sobre Mim",
        subtitle: "Desenvolvedor apaixonado por criar soluções práticas e funcionais",
        who: "Quem sou eu?",
        age: "Tenho 17 anos e estou iniciando a graduação em Ciência da Computação na UniCEUB.",
        experience: "Com mais de {{years}} anos de experiência em programação, me especializei em desenvolvimento web e jogos, criando soluções práticas e funcionais.",
        projects: "Já desenvolvi {{count}} projetos completos, desde aplicações web modernas até jogos interativos, sempre buscando aplicar as melhores práticas e tecnologias do mercado.",
        goal: "Meu objetivo é continuar evoluindo como desenvolvedor, enfrentando novos desafios e contribuindo para projetos inovadores em uma grande empresa de tecnologia.",
        birth: "Nascimento: 20/09/2007",
        stats: {
          expYears: "Anos de Experiência",
          doneProjects: "Projetos Concluídos",
        },
      },
      projectsPage: {
        featuredTitle: "Projetos em destaque",
        descriptionTitle: "Descrição",
        technologiesTitle: "Tecnologias Utilizadas",
        linksTitle: "Links do Projeto",
        videoFallback: "Seu navegador não suporta o elemento de vídeo.",
        categories: {
          web: "Web",
          automacao: "Automação",
          jogo: "Jogos",
          aplicativo: "Aplicativos",
          aiMl: "IA & ML",
        },
      },
      contact: {
        title: "Entre em Contato",
        talk: "Vamos Conversar!",
        intro:
          "Estou sempre interessado em novas oportunidades e projetos desafiadores. Entre em contato comigo!",
        sendMessage: "Envie uma Mensagem",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        skills: "Technologies",
        timeline: "Journey",
        projects: "Projects",
        contact: "Contact",
      },
      hero: {
        title: "Independent Developer",
      },
      aria: {
        openMenu: "Open menu",
      },
      common: {
        email: "Email",
      },
      skills: {
        title: "Technologies",
        subtitle: "All technologies I use or have used in projects",
        noteTitle: "About AI usage",
        noteText:
          "Most tools were used in an assisted way (AI) in my projects. I keep deepening my knowledge in these technologies and I'm open to opportunities for learning and professional development.",
        categories: {
          frontend: "Frontend",
          backend: "Backend",
          tools: "Tools & DevOps",
          languages: "Programming Languages",
          gameDev: "Game Development",
          mobile: "Mobile Apps",
          desktop: "Desktop Apps",
          automation: "Automation & Bots",
          aiMl: "AI & Machine Learning",
        },
      },
      about: {
        title: "About Me",
        subtitle: "Developer passionate about building practical and functional solutions",
        who: "Who am I?",
        age: "I'm 17 and starting my Computer Science degree at UniCEUB.",
        experience:
          "With over {{years}} years of programming experience, I specialize in web and game development, creating practical and functional solutions.",
        projects:
          "I've built {{count}} complete projects, from modern web applications to interactive games, always aiming for best practices and technologies.",
        goal:
          "My goal is to keep growing as a developer, tackling new challenges and contributing to innovative projects in a major tech company.",
        birth: "Birth: 09/20/2007",
        stats: {
          expYears: "Years of Experience",
          doneProjects: "Completed Projects",
        },
      },
      projectsPage: {
        featuredTitle: "Featured projects",
        descriptionTitle: "Description",
        technologiesTitle: "Technologies Used",
        linksTitle: "Project Links",
        videoFallback: "Your browser does not support the video element.",
        categories: {
          web: "Web",
          automacao: "Automation",
          jogo: "Games",
          aplicativo: "Applications",
          aiMl: "AI & ML",
        },
      },
      contact: {
        title: "Get in Touch",
        talk: "Let's Talk!",
        intro:
          "I'm always interested in new opportunities and challenging projects. Get in touch with me!",
        sendMessage: "Send a Message",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
