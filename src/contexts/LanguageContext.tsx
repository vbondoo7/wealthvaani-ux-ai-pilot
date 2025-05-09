
import React, { createContext, useState, useContext, useEffect } from 'react';
import { LanguageOption } from '@/lib/types';

type LanguageContextType = {
  language: LanguageOption;
  changeLanguage: (lang: LanguageOption) => void;
  t: (key: string) => string;
};

// Simple translations for demonstration
const translations = {
  en: {
    'home': 'Home',
    'dashboard': 'Dashboard',
    'analytics': 'Analytics',
    'goals': 'Goals',
    'plans': 'Plans',
    'welcome': 'Welcome',
    'login': 'Login',
    'signup': 'Sign Up',
    'create-account': 'Create Account',
    'get-started': 'Get Started',
    'email': 'Email',
    'password': 'Password',
    'full-name': 'Full Name',
    'confirm-password': 'Confirm Password',
    'vision': 'Our Vision',
    'vision-text': 'To make every Indian household financially intelligent and self-reliant using AI.',
    'mission': 'Our Mission',
    'mission-text': 'To democratize financial literacy and wealth management by offering an AI-powered financial planner that plans, advises, and acts.',
    'continue': 'Continue',
    'namaste': 'Welcome',
    'financial-insights': 'Personalized Financial Insights',
    'secure-connection': 'Secure Bank Connections',
    'ai-assistant': 'Ask Anything About Your Money',
    'smart-planning': 'Smart Financial Planning',
    'secure-private': 'Secure & Private',
    'financial-companion': 'Financial AI Companion',
    'proactive-insights': 'Proactive Insights'
  },
  hi: {
    'home': 'होम',
    'dashboard': 'डैशबोर्ड',
    'analytics': 'एनालिटिक्स',
    'goals': 'लक्ष्य',
    'plans': 'योजनाएँ',
    'welcome': 'नमस्ते',
    'login': 'लॉगिन',
    'signup': 'साइन अप',
    'create-account': 'अकाउंट बनाएं',
    'get-started': 'शुरू करें',
    'email': 'ईमेल',
    'password': 'पासवर्ड',
    'full-name': 'पूरा नाम',
    'confirm-password': 'पासवर्ड की पुष्टि',
    'vision': 'हमारी दृष्टि',
    'vision-text': 'AI का उपयोग करके हर भारतीय परिवार को वित्तीय रूप से समझदार और आत्मनिर्भर बनाना।',
    'mission': 'हमारा मिशन',
    'mission-text': 'AI-संचालित वित्तीय योजनाकार के माध्यम से वित्तीय साक्षरता और धन प्रबंधन को सुलभ बनाना जो योजना बनाता है, सलाह देता है, और कार्य करता है।',
    'continue': 'जारी रखें',
    'namaste': 'नमस्ते',
    'financial-insights': 'व्यक्तिगत वित्तीय जानकारी',
    'secure-connection': 'सुरक्षित बैंक कनेक्शन',
    'ai-assistant': 'अपने पैसे के बारे में कुछ भी पूछें',
    'smart-planning': 'स्मार्ट वित्तीय योजना',
    'secure-private': 'सुरक्षित और निजी',
    'financial-companion': 'वित्तीय AI साथी',
    'proactive-insights': 'सक्रिय अंतर्दृष्टि'
  },
  hinglish: {
    'home': 'Home',
    'dashboard': 'Dashboard',
    'analytics': 'Analytics',
    'goals': 'Goals',
    'plans': 'Plans',
    'welcome': 'Namaste',
    'login': 'Login',
    'signup': 'Sign Up',
    'create-account': 'Account Banaye',
    'get-started': 'Shuru Karen',
    'email': 'Email',
    'password': 'Password',
    'full-name': 'Poora Naam',
    'confirm-password': 'Password Confirm Karen',
    'vision': 'Hamara Vision',
    'vision-text': 'AI ka use karke har Indian family ko financially intelligent aur aatmanirbhar banana.',
    'mission': 'Hamara Mission',
    'mission-text': 'Financial literacy aur wealth management ko AI-powered financial planner ke madhyam se accessible banana jo plan kare, advise de, aur action le.',
    'continue': 'Continue',
    'namaste': 'Namaste',
    'financial-insights': 'Personalized Financial Insights',
    'secure-connection': 'Secure Bank Connections',
    'ai-assistant': 'Apne paise ke bare mein kuch bhi poochein',
    'smart-planning': 'Smart Financial Planning',
    'secure-private': 'Secure & Private',
    'financial-companion': 'Financial AI Companion',
    'proactive-insights': 'Proactive Insights'
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageOption>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('wealthvani-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi' || savedLanguage === 'hinglish')) {
      setLanguage(savedLanguage as LanguageOption);
    }
  }, []);

  const changeLanguage = (lang: LanguageOption) => {
    setLanguage(lang);
    localStorage.setItem('wealthvani-language', lang);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
