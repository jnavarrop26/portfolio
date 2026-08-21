export const ui = {
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      education: "Educación",
      certifications: "Certificaciones",
      projects: "Proyectos",
      skills: "Habilidades",
      publications: "Publicaciones",
    },
    section: {
      about: "Sobre Mi",
      experience: "Experiencia laboral",
      education: "Educación",
      certifications: "Certificaciones",
      skills: "Habilidades",
      projects: "Proyectos",
      publications: "Publicaciones",
    },
    misc: {
      featured: "Destacado",
      viewSourceCode: "Ver código fuente",
      viewCaseStudy: "Ver caso de estudio",
      article: "Artículo",
      paper: "Paper",
      viewPublications: "Ver publicaciones",
      pressToOpen: "Pulsa",
      openCommandPalette: "para abrir la paleta de comandos.",
      searchCommand: "Buscar comando",
      print: "Imprimir",
      actions: "Acciones",
      social: "Social",
      credentialId: "ID",
      dateLocale: "es-CO",
      switchLangLabel: "English",
      switchLangHref: "/en",
    },
    fmt: {
      emailTitle: (name: string, email: string) =>
        `Enviar un correo electrónico a ${name} al correo ${email}`,
      phoneTitle: (name: string, phone: string) =>
        `Llamar por teléfono a ${name} al número ${phone}`,
      profileTitle: (name: string, network: string) =>
        `Visitar el perfil de ${name} en ${network}`,
      viewWorkTitle: (name: string) => `Ver ${name}`,
      viewProjectTitle: (name: string) => `Ver el proyecto ${name}`,
      readPublicationTitle: (name: string) => `Leer: ${name}`,
      visitTitle: (network: string) => `Visitar ${network}`,
      portfolioTitle: (name: string, label: string) => `Portafolio de ${name} - ${label}`,
    },
  },
  en: {
    nav: {
      about: "About Me",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
      projects: "Projects",
      skills: "Skills",
      publications: "Publications",
    },
    section: {
      about: "About Me",
      experience: "Work Experience",
      education: "Education",
      certifications: "Certifications",
      skills: "Skills",
      projects: "Projects",
      publications: "Publications",
    },
    misc: {
      featured: "Featured",
      viewSourceCode: "View source code",
      viewCaseStudy: "View case study",
      article: "Article",
      paper: "Paper",
      viewPublications: "View publications",
      pressToOpen: "Press",
      openCommandPalette: "to open the command palette.",
      searchCommand: "Search command",
      print: "Print",
      actions: "Actions",
      social: "Social",
      credentialId: "ID",
      dateLocale: "en-US",
      switchLangLabel: "Español",
      switchLangHref: "/",
    },
    fmt: {
      emailTitle: (name: string, email: string) => `Send an email to ${name} at ${email}`,
      phoneTitle: (name: string, phone: string) => `Call ${name} at ${phone}`,
      profileTitle: (name: string, network: string) =>
        `Visit ${name}'s profile on ${network}`,
      viewWorkTitle: (name: string) => `View ${name}`,
      viewProjectTitle: (name: string) => `View project ${name}`,
      readPublicationTitle: (name: string) => `Read: ${name}`,
      visitTitle: (network: string) => `Visit ${network}`,
      portfolioTitle: (name: string, label: string) => `${name}'s Portfolio - ${label}`,
    },
  },
} as const;

export type Lang = keyof typeof ui;

export function getLang(currentLocale: string | undefined): Lang {
  return currentLocale === "en" ? "en" : "es";
}
