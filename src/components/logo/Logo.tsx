
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full'
}) => {
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
  
  const sizeClass = getSizeClass();
  
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-wealthveda-indigo to-wealthveda-teal">
        <span className="text-white font-bold">व</span>
      </div>
      
      {variant === 'full' && (
        <div className={`ml-2 ${sizeClass} font-bold`}>
          Wealth<span className="text-wealthveda-indigo">वाणी</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
