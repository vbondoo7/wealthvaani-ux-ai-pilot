
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/logo/Logo';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const Header: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/marketing' },
    { name: 'Features', path: '/marketing#features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
  ];
  
  const isActive = (path: string) => {
    if (path.includes('#')) {
      return location.pathname === '/marketing' && location.hash === path.split('#')[1];
    }
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/marketing" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? 'text-royal-blue'
                      : 'text-gray-700 hover:text-royal-blue'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <Globe className="h-4 w-4 text-royal-blue mr-1" />
              <select 
                className="text-sm border-none bg-transparent focus:ring-0"
                value={language}
                onChange={(e) => changeLanguage(e.target.value as 'en' | 'hi' | 'hinglish')}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
            
            <div className="hidden sm:flex space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-royal-blue hover:bg-royal-blue/90" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
            
            <div className="block md:hidden">
              <Button variant="ghost" size="sm" className="text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className="block md:hidden border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-royal-blue'
                    : 'text-gray-700 hover:text-royal-blue'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex space-x-2 px-3 py-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="bg-royal-blue hover:bg-royal-blue/90 w-full" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
