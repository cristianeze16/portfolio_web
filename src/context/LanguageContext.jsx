import React, { createContext, useState, useContext, useEffect } from "react";

const translations = {
  es: {
    hero: {
      title: "Desarrollador Full Stack",
      description:
        "Mi Nombre es Cristian, soy Desarrollador Full Stack especializado en MERN Stack, MySQL, y JavaScript. Creando soluciones web modernas, escalables y eficientes con las mejores prácticas y tecnologías actuales.",
      contactButton: "Contactame",
    },
    projects: {
      title: "Mis Proyectos",
      project1: {
        title: "Motor X",
        description: "Proyecto de E-commerce, de autos de alta gama",
      },
      project2: {
        title: "My Tinerary",
        description: "Proyecto de MERN Stack, de una app de viajes",
      },
      project3: {
        title: "Bot de Telegram",
        description:
          "Bot de Telegram para que envia recordatorios a una hora especifica",
      },
      project4: {
        title: "Extension de Chrome",
        description:
          "Esta extensión de chrome, personaliza la paleta de colores de linkedin",
      },
    },
    skills: {
      title: "Mis Habilidades",
    },
    contact: {
      title: "Contacto",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      send: "Enviar Mensaje",
    },
  },
  en: {
    hero: {
      title: "Full Stack Developer",
      description:
        "My name is Cristian, I am a Full Stack Developer specialized in MERN Stack, MySQL, and JavaScript. Creating modern, scalable and efficient web solutions with the best practices and current technologies",
      contactButton: "Contact Me",
    },
    projects: {
      title: "My Projects",
      project1: {
        title: "Motor X",
        description: "E-commerce project for high-end cars",
      },
      project2: {
        title: "My Tinerary",
        description: "MERN Stack project, a travel app",
      },
      project3: {
        title: "Telegram Bot",
        description: "Telegram bot to send reminders at a specific time",
      },
      project4: {
        title: "Chrome Extension",
        description: "This chrome extension customizes the linkedin color palette",
      },
    },
    skills: {
      title: "My Skills",
    },
    contact: {
      title: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
    },
  },
};

const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "es";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) {
      value = value[k];
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
