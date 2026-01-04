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
      home: {
        scrollDown: "Role para baixo",
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
        defaultDescription: "Projeto de IA/ML",
        videoFallback: "Seu navegador não suporta o elemento de vídeo.",
        categories: {
          web: "Web",
          automacao: "Automação",
          jogo: "Jogos",
          aplicativo: "Aplicativos",
          aiMl: "IA & ML",
        },
      },
      projects: {
        static: {
          frecomu: {
            description: {
              pt: "Aplicativo de chat em tempo real com sistema de contas, respostas e mensagens instantâneas. Desenvolvido com Flask e WebSockets para comunicação em tempo real.",
              en: "Real-time chat app with accounts, replies and instant messages. Built with Flask and WebSockets for real-time communication.",
            },
          },
          taskManager: {
            description: {
              pt: "Gerenciador de tarefas completo com autenticação do Google, CRUD de tarefas, subtarefas e tags personalizáveis. Inclui testes unitários e de aceitação.",
              en: "Full task manager with Google auth, task CRUD, subtasks and custom tags. Includes unit and acceptance tests.",
            },
          },
          utilTools: {
            description: {
              pt: "Coleção de ferramentas online úteis, incluindo funcionalidades como remoção de fundo de imagens e OCR (reconhecimento óptico de caracteres).",
              en: "Collection of useful online tools, including background removal and OCR (optical character recognition).",
            },
          },
        },
        dynamic: {
          "senti-pred": {
            summary: {
              pt: "Classificação de sentimentos em comentários/registro.",
              en: "Sentiment classification on comments/entries.",
            },
            details: {
              pt: "Projeto completo de previsão de sentimentos em textos, aplicando conceitos de Machine Learning, MLOps, IA Engineering e Data Science. Inclui preparação de dados, treinamento, avaliação e inferência com bibliotecas de NLP.",
              en: "Complete sentiment prediction project for text, applying Machine Learning, MLOps, AI Engineering and Data Science. Includes data prep, training, evaluation and inference with NLP libraries.",
            },
          },
          "chatbot-previsao-ia": {
            summary: {
              pt: "Chatbot que faz previsões com IA.",
              en: "Chatbot that performs AI-based forecasts.",
            },
            details: {
              pt: "Chatbot que realiza previsões usando modelos Transformers, com pipelines de inferência e integração com bibliotecas de NLP. Foco em respostas consistentes e previsões baseadas em dados.",
              en: "Chatbot that performs forecasts using Transformers models, with inference pipelines and NLP libraries integration. Focused on consistent responses and data-driven predictions.",
            },
          },
          "assistente-virtual": {
            summary: {
              pt: "Assistente virtual com NLP.",
              en: "Virtual assistant with NLP.",
            },
            details: {
              pt: "Assistente virtual que responde perguntas e auxilia em tarefas usando modelos pré-treinados de NLP. Inclui fluxo de conversação, classificação e extração de informação.",
              en: "Virtual assistant that answers questions and assists tasks using pre-trained NLP models. Includes conversation flow, classification and information extraction.",
            },
          },
          "previsao-forecast": {
            summary: {
              pt: "Previsão de séries temporais (Prophet/Statsmodels).",
              en: "Time series forecasting (Prophet/Statsmodels).",
            },
            details: {
              pt: "Projeto de previsão com técnicas de séries temporais usando Prophet e Statsmodels, cobrindo preparação de dados, ajuste de modelos, validação e análise de resultados.",
              en: "Forecasting project with time series techniques using Prophet and Statsmodels, covering data prep, model fitting, validation and results analysis.",
            },
          },
          "big-data-hackathon-forecast-2025": {
            summary: {
              pt: "Previsão em cenário de big data.",
              en: "Forecasting in a big data scenario.",
            },
            details: {
              pt: "Projeto de previsão com foco em séries temporais, avaliação de modelos e comparação de abordagens (Prophet, Statsmodels). Envolve tratamento de dados, tuning e validação.",
              en: "Forecasting project focused on time series, model evaluation and approach comparison (Prophet, Statsmodels). Involves data processing, tuning and validation.",
            },
          },
          "azure-ml-previsao-vendas-regressao-linear": {
            summary: {
              pt: "Previsão de vendas com Azure ML.",
              en: "Sales forecasting with Azure ML.",
            },
            details: {
              pt: "Modelo de regressão linear para previsão de vendas, utilizando Azure Machine Learning para experimentos, rastreio e execução. Inclui pipeline e análise de resultados.",
              en: "Linear regression model for sales forecasting, using Azure Machine Learning for experiments, tracking and execution. Includes pipeline and results analysis.",
            },
          },
          "aws-sagemaker-canvas-previsao-de-estoque": {
            summary: {
              pt: "Previsão de estoque com SageMaker Canvas.",
              en: "Stock forecasting with SageMaker Canvas.",
            },
            details: {
              pt: "Exploração de previsão de dados usando a interface Canvas do AWS SageMaker, com preparação de datasets e avaliação de modelos. Foco em praticidade e visualização.",
              en: "Exploration of data forecasting using AWS SageMaker Canvas UI, with dataset preparation and model evaluation. Focused on practicality and visualization.",
            },
          },
          "azure-ml-chatbot-de-busca-em-pdf-busca-vetorial": {
            summary: {
              pt: "Chatbot de busca em PDFs (Azure ML).",
              en: "PDF search chatbot (Azure ML).",
            },
            details: {
              pt: "Chatbot que responde com base no conteúdo de PDFs por busca vetorial, integrando Azure ML e modelos Transformers. Inclui indexação e pipeline de consulta.",
              en: "Chatbot that answers based on PDF content via vector search, integrating Azure ML and Transformers models. Includes indexing and query pipeline.",
            },
          },
        },
      },
      contact: {
        title: "Entre em Contato",
        talk: "Vamos Conversar!",
        intro:
          "Estou sempre interessado em novas oportunidades e projetos desafiadores. Entre em contato comigo!",
        sendMessage: "Envie uma Mensagem",
        locationLabel: "Localidade",
        locationValue: "Brasília (Brasil)",
        phoneLabel: "Telefone",
      },
      timeline: {
        title: "Minha Jornada",
        subtitle: "1 ano de experiência, aprendizado e evolução como desenvolvedor",
        achievementsTitle: "Principais Conquistas:",
        items: [
          {
            date: "1º Semestre 2026 - Futuro Próximo",
            title: "Objetivos & Metas",
            description:
              "Conquistar posição em empresa de tecnologia e continuar evoluindo como desenvolvedor.",
            achievements: ["Estágio em tech", "Contribuições open source", "Projetos pessoais", "Networking"],
          },
          {
            date: "2º Semestre 2025 - Presente",
            title: "Universidade & Especialização",
            description:
              "Iniciei Ciência da Computação na UniCEUB e estudo algoritmos para entrevistas técnicas.",
            achievements: ["Início da graduação em Ciência da Computação", "Algoritmos avançados", "Estruturas de dados", "Preparação para big techs"],
          },
          {
            date: "1º Semestre 2025",
            title: "Frameworks Modernos & Projetos",
            description:
              "Expandi conhecimentos com React, Flask, banco de dados e desenvolvi 3 projetos web. Explorei plataformas low/no code como flutterflow.",
            achievements: ["React", "Flask (Python)", "PostgreSQL & SQLite", "3 projetos web", "FlutterFlow"],
          },
          {
            date: "2º Semestre 2024",
            title: "Início da Jornada",
            description:
              "Comecei a aprender programação com Python como minha primeira linguagem, estudando lógica de programação e desenvolvimento web básico. Também aprendi sobre desenvolvimento de jogos e desenvolvi projetos na unreal, unity, godot e roblox studio.",
            achievements: ["Python (primeira linguagem)", "Lógica de programação", "HTML, CSS e JavaScript básico", "3 jogos (Unity, Godot, Unreal)"],
          },
        ],
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
      home: {
        scrollDown: "Scroll down",
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
        defaultDescription: "AI/ML Project",
        videoFallback: "Your browser does not support the video element.",
        categories: {
          web: "Web",
          automacao: "Automation",
          jogo: "Games",
          aplicativo: "Applications",
          aiMl: "AI & ML",
        },
      },
      projects: {
        static: {
          frecomu: {
            description: {
              pt: "Aplicativo de chat em tempo real com sistema de contas, respostas e mensagens instantâneas. Desenvolvido com Flask e WebSockets para comunicação em tempo real.",
              en: "Real-time chat app with accounts, replies and instant messages. Built with Flask and WebSockets for real-time communication.",
            },
          },
          taskManager: {
            description: {
              pt: "Gerenciador de tarefas completo com autenticação do Google, CRUD de tarefas, subtarefas e tags personalizáveis. Inclui testes unitários e de aceitação.",
              en: "Full task manager with Google auth, task CRUD, subtasks and custom tags. Includes unit and acceptance tests.",
            },
          },
          utilTools: {
            description: {
              pt: "Coleção de ferramentas online úteis, incluindo funcionalidades como remoção de fundo de imagens e OCR (reconhecimento óptico de caracteres).",
              en: "Collection of useful online tools, including background removal and OCR (optical character recognition).",
            },
          },
        },
        dynamic: {
          "senti-pred": {
            summary: {
              pt: "Classificação de sentimentos em comentários/registro.",
              en: "Sentiment classification on comments/entries.",
            },
            details: {
              pt: "Projeto completo de previsão de sentimentos em textos, aplicando conceitos de Machine Learning, MLOps, IA Engineering e Data Science. Inclui preparação de dados, treinamento, avaliação e inferência com bibliotecas de NLP.",
              en: "Complete sentiment prediction project for text, applying Machine Learning, MLOps, AI Engineering and Data Science. Includes data prep, training, evaluation and inference with NLP libraries.",
            },
          },
          "chatbot-previsao-ia": {
            summary: {
              pt: "Chatbot que faz previsões com IA.",
              en: "Chatbot that performs AI-based forecasts.",
            },
            details: {
              pt: "Chatbot que realiza previsões usando modelos Transformers, com pipelines de inferência e integração com bibliotecas de NLP. Foco em respostas consistentes e previsões baseadas em dados.",
              en: "Chatbot that performs forecasts using Transformers models, with inference pipelines and NLP libraries integration. Focused on consistent responses and data-driven predictions.",
            },
          },
          "assistente-virtual": {
            summary: {
              pt: "Assistente virtual com NLP.",
              en: "Virtual assistant with NLP.",
            },
            details: {
              pt: "Assistente virtual que responde perguntas e auxilia em tarefas usando modelos pré-treinados de NLP. Inclui fluxo de conversação, classificação e extração de informação.",
              en: "Virtual assistant that answers questions and assists tasks using pre-trained NLP models. Includes conversation flow, classification and information extraction.",
            },
          },
          "previsao-forecast": {
            summary: {
              pt: "Previsão de séries temporais (Prophet/Statsmodels).",
              en: "Time series forecasting (Prophet/Statsmodels).",
            },
            details: {
              pt: "Projeto de previsão com técnicas de séries temporais usando Prophet e Statsmodels, cobrindo preparação de dados, ajuste de modelos, validação e análise de resultados.",
              en: "Forecasting project with time series techniques using Prophet and Statsmodels, covering data prep, model fitting, validation and results analysis.",
            },
          },
          "big-data-hackathon-forecast-2025": {
            summary: {
              pt: "Previsão em cenário de big data.",
              en: "Forecasting in a big data scenario.",
            },
            details: {
              pt: "Projeto de previsão com foco em séries temporais, avaliação de modelos e comparação de abordagens (Prophet, Statsmodels). Envolve tratamento de dados, tuning e validação.",
              en: "Forecasting project focused on time series, model evaluation and approach comparison (Prophet, Statsmodels). Involves data processing, tuning and validation.",
            },
          },
          "azure-ml-previsao-vendas-regressao-linear": {
            summary: {
              pt: "Previsão de vendas com Azure ML.",
              en: "Sales forecasting with Azure ML.",
            },
            details: {
              pt: "Modelo de regressão linear para previsão de vendas, utilizando Azure Machine Learning para experimentos, rastreio e execução. Inclui pipeline e análise de resultados.",
              en: "Linear regression model for sales forecasting, using Azure Machine Learning for experiments, tracking and execution. Includes pipeline and results analysis.",
            },
          },
          "aws-sagemaker-canvas-previsao-de-estoque": {
            summary: {
              pt: "Previsão de estoque com SageMaker Canvas.",
              en: "Stock forecasting with SageMaker Canvas.",
            },
            details: {
              pt: "Exploração de previsão de dados usando a interface Canvas do AWS SageMaker, com preparação de datasets e avaliação de modelos. Foco em praticidade e visualização.",
              en: "Exploration of data forecasting using AWS SageMaker Canvas UI, with dataset preparation and model evaluation. Focused on practicality and visualization.",
            },
          },
          "azure-ml-chatbot-de-busca-em-pdf-busca-vetorial": {
            summary: {
              pt: "Chatbot de busca em PDFs (Azure ML).",
              en: "PDF search chatbot (Azure ML).",
            },
            details: {
              pt: "Chatbot que responde com base no conteúdo de PDFs por busca vetorial, integrando Azure ML e modelos Transformers. Inclui indexação e pipeline de consulta.",
              en: "Chatbot that answers based on PDF content via vector search, integrating Azure ML and Transformers models. Includes indexing and query pipeline.",
            },
          },
        },
      },
      contact: {
        title: "Get in Touch",
        talk: "Let's Talk!",
        intro:
          "I'm always interested in new opportunities and challenging projects. Get in touch with me!",
        sendMessage: "Send a Message",
        locationLabel: "Location",
        locationValue: "Brasília (Brazil)",
        phoneLabel: "Phone",
      },
      timeline: {
        title: "My Journey",
        subtitle: "1 year of experience, learning and growth as a developer",
        achievementsTitle: "Key Achievements:",
        items: [
          {
            date: "1st Semester 2026 - Near Future",
            title: "Goals & Objectives",
            description:
              "Earn a position in a tech company and keep growing as a developer.",
            achievements: ["Tech internship", "Open-source contributions", "Personal projects", "Networking"],
          },
          {
            date: "2nd Semester 2025 - Present",
            title: "University & Specialization",
            description:
              "Started Computer Science at UniCEUB and study algorithms for technical interviews.",
            achievements: ["Computer Science degree started", "Advanced algorithms", "Data structures", "Preparation for big techs"],
          },
          {
            date: "1st Semester 2025",
            title: "Modern Frameworks & Projects",
            description:
              "Expanded knowledge with React, Flask, databases and built 3 web projects. Explored low/no-code platforms like FlutterFlow.",
            achievements: ["React", "Flask (Python)", "PostgreSQL & SQLite", "3 web projects", "FlutterFlow"],
          },
          {
            date: "2nd Semester 2024",
            title: "Beginning of the Journey",
            description:
              "Started programming with Python as the first language, studying logic and basic web development. Also learned game development and built projects in Unreal, Unity, Godot and Roblox Studio.",
            achievements: ["Python (first language)", "Programming logic", "Basic HTML, CSS and JavaScript", "3 games (Unity, Godot, Unreal)"],
          },
        ],
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
