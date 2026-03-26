import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../translations/en';
import ta from '../translations/ta';

const LanguageContext = createContext();

const translations = {
  English: en,
  Tamil: ta
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('English');

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && translations[savedLang]) {
      setCurrentLang(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setCurrentLang(lang);
      localStorage.setItem('appLanguage', lang);
    }
  };

  const t = (key) => {
    const dict = translations[currentLang];
    return dict[key] || en[key] || key; // Fallback to English, then to the exact key itself
  };

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
