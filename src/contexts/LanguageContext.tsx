import React, { createContext, useState, useContext, useEffect } from 'react';
import { LanguageOption } from '@/lib/types';

type LanguageContextType = {
  language: LanguageOption;
  changeLanguage: (lang: LanguageOption) => void;
  t: (key: string) => string;
  availableLanguages: LanguageOption[];
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
    'proactive-insights': 'Proactive Insights',
    'admin-dashboard': 'Admin Dashboard',
    'manage-blogs': 'Manage Blogs',
    'add-blog': 'Add Blog',
    'edit-blog': 'Edit Blog',
    'delete-blog': 'Delete Blog',
    'blog-title': 'Blog Title',
    'blog-content': 'Blog Content',
    'save-changes': 'Save Changes',
    'cancel': 'Cancel',
    'pricing': 'Pricing',
    'careers': 'Careers',
    'terms': 'Terms & Conditions'
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
    'proactive-insights': 'सक्रिय अंतर्दृष्टि',
    'admin-dashboard': 'व्यवस्थापक डैशबोर्ड',
    'manage-blogs': 'ब्लॉग प्रबंधित करें',
    'add-blog': 'ब्लॉग जोड़ें',
    'edit-blog': 'ब्लॉग संपादित करें',
    'delete-blog': 'ब्लॉग हटाएं',
    'blog-title': 'ब्लॉग शीर्षक',
    'blog-content': 'ब्लॉग सामग्री',
    'save-changes': 'परिवर्तन सहेजें',
    'cancel': 'रद्द करें'
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
    'proactive-insights': 'Proactive Insights',
    'admin-dashboard': 'Admin Dashboard',
    'manage-blogs': 'Blogs Manage Karein',
    'add-blog': 'Blog Add Karein',
    'edit-blog': 'Blog Edit Karein',
    'delete-blog': 'Blog Delete Karein',
    'blog-title': 'Blog Title',
    'blog-content': 'Blog Content',
    'save-changes': 'Changes Save Karein',
    'cancel': 'Cancel'
  },
  bn: { // Bengali
    'home': 'হোম',
    'dashboard': 'ড্যাশবোর্ড',
    'analytics': 'বিশ্লেষণ',
    'goals': 'লক্ষ্য',
    'plans': 'পরিকল্পনা',
    'welcome': 'স্বাগতম',
    'login': 'লগইন',
    'signup': 'সাইন আপ',
    'create-account': 'অ্যাকাউন্ট তৈরি করুন',
    'get-started': 'শুরু করুন',
    'email': 'ইমেল',
    'password': 'পাসওয়ার্ড',
    'blog-title': 'ব্লগ শিরোনাম',
    'blog-content': 'ব্লগ সামগ্রী',
    'save-changes': 'পরিবর্তনগুলি সংরক্ষণ করুন',
    'cancel': 'বাতিল'
  },
  ta: { // Tamil
    'home': 'முகப்பு',
    'dashboard': 'டாஷ்போர்டு',
    'analytics': 'பகுப்பாய்வு',
    'goals': 'இலக்குகள்',
    'plans': 'திட்டங்கள்',
    'welcome': 'வரவேற்கிறோம்',
    'login': 'உள்நுழைய',
    'signup': 'பதிவு செய்ய',
    'blog-title': 'வலைப்பதிவு தலைப்பு',
    'blog-content': 'வலைப்பதிவு உள்ளடக்கம்',
    'save-changes': 'மாற்றங்களை சேமி',
    'cancel': 'ரத்து செய்'
  },
  te: { // Telugu
    'home': 'హోమ్',
    'dashboard': 'డాష్‌బోర్డ్',
    'analytics': 'విశ్లేషణలు',
    'goals': 'లక్ష్యాలు',
    'plans': 'ప్రణాళికలు',
    'welcome': 'స్వాగతం',
    'login': 'లాగిన్',
    'signup': 'సైన్ అప్',
    'blog-title': 'బ్లాగ్ శీర్షిక',
    'blog-content': 'బ్లాగ్ విషయం',
    'save-changes': 'మార్పులను సేవ్ చేయండి',
    'cancel': 'రద్దు'
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
  t: () => '',
  availableLanguages: ['en', 'hi', 'hinglish'],
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageOption>('en');
  
  // Primary languages we support for UI and content
  const availableLanguages: LanguageOption[] = ['en', 'hi', 'hinglish'];

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('wealthvani-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi' || savedLanguage === 'hinglish' || 
        savedLanguage === 'bn' || savedLanguage === 'ta' || savedLanguage === 'te')) {
      setLanguage(savedLanguage as LanguageOption);
    }
  }, []);

  const changeLanguage = (lang: LanguageOption) => {
    setLanguage(lang);
    localStorage.setItem('wealthvani-language', lang);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language];
    return currentTranslations?.[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
