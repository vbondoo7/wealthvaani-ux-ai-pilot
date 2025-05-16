
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/logo/Logo';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-gray-600 max-w-md">
              {language === 'en' 
                ? "India's first agentic Wealth Operating System, designed to act as a Proactive Wealth Companion for Indian families."
                : language === 'hi'
                  ? "भारत का पहला एजेंटिक वेल्थ ऑपरेटिंग सिस्टम, भारतीय परिवारों के लिए सक्रिय धन साथी के रूप में कार्य करने के लिए डिज़ाइन किया गया है।"
                  : "India ka pehla agentic Wealth Operating System, jo Indian families ke liye Proactive Wealth Companion ke roop mein kaam karta hai."}
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {language === 'en' ? "Company" : language === 'hi' ? "कंपनी" : "Company"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-royal-blue">
                  {language === 'en' ? "About Us" : language === 'hi' ? "हमारे बारे में" : "About Us"}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-royal-blue">
                  {language === 'en' ? "Careers" : language === 'hi' ? "करियर" : "Careers"}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-royal-blue">
                  {language === 'en' ? "Blog" : language === 'hi' ? "ब्लॉग" : "Blog"}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {language === 'en' ? "Legal" : language === 'hi' ? "कानूनी" : "Legal"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-royal-blue">
                  {language === 'en' ? "Privacy Policy" : language === 'hi' ? "गोपनीयता नीति" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-royal-blue">
                  {language === 'en' ? "Terms of Service" : language === 'hi' ? "सेवा की शर्तें" : "Terms of Service"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            &copy; {currentYear} Wealthवाणी. {language === 'en' 
              ? "All rights reserved." 
              : language === 'hi' 
                ? "सभी अधिकार सुरक्षित।" 
                : "Saare adhikar surakshit hain."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
