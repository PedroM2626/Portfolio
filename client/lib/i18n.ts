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

