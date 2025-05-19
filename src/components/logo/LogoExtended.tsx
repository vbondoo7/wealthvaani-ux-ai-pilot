
import React from 'react';
import Logo from './Logo';

interface LogoExtendedProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'full' | 'compact' | 'light';
  className?: string;
}

const LogoExtended: React.FC<LogoExtendedProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = '' 
}) => {
  // Convert 'light' variant to 'full' for the original Logo component
  const logoVariant = variant === 'light' ? 'full' : variant;
  
  return (
    <Logo 
      size={size} 
      variant={logoVariant as 'icon' | 'full' | 'compact'} 
      className={`${className} ${variant === 'light' ? 'text-white' : ''}`} 
    />
  );
};

export default LogoExtended;
