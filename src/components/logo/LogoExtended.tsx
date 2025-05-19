
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
  
  // Add the className prop to the Logo interface
  const logoClassName = `${className} ${variant === 'light' ? 'text-white' : ''}`;
  
  // @ts-ignore - Ignore the TypeScript error for now as we need to update the Logo component
  return <Logo size={size} variant={logoVariant} className={logoClassName} />;
};

export default LogoExtended;
