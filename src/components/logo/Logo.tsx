
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'compact';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = ''
}) => {
  const { language } = useLanguage();
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-lg';
      case 'md':
        return 'text-2xl';
      case 'lg':
        return 'text-3xl';
      default:
        return 'text-2xl';
    }
  };
  
  const getLogoSize = () => {
    switch (size) {
      case 'sm':
        return 'h-7 w-7';
      case 'md':
        return 'h-9 w-9';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-9 w-9';
    }
  };
  
  const sizeClass = getSizeClass();
  const logoSize = getLogoSize();
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`flex items-center justify-center ${logoSize} rounded-full bg-gradient-to-r from-royal-blue to-teal shadow-md overflow-hidden border border-royal-blue/20`}>
        <span className="text-white font-bold">W</span>
      </div>
      
      {variant === 'compact' && (
        <div className={`ml-2 ${sizeClass} font-bold flex items-center`}>
          <span className="text-royal-blue">W</span>
          <span className="text-saffron-orange hindi-text">व</span>
        </div>
      )}

      {variant === 'full' && (
        <div className={`ml-2 ${sizeClass} font-bold flex items-center`}>
          <span className="text-royal-blue">Wealth</span>
          <span className="text-saffron-orange hindi-text">वाणी</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
