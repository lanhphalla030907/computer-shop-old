import { createContext, useState } from "react";
import { translations } from "../Data/i18n";
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");

  const text = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, text }}>
      {children}
    </LanguageContext.Provider>
  );
};
