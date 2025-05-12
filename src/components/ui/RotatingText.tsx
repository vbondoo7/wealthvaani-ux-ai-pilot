
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  phrases,
  interval = 3500,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Create animation cycle
    const animationTimer = setInterval(() => {
      // Start fade out
      setIsVisible(false);
      
      // Wait for fade out, then change text and fade in
      const changeTextTimer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsVisible(true);
      }, 500); // 500ms for fade out transition
      
      return () => clearTimeout(changeTextTimer);
    }, interval);
    
    return () => clearInterval(animationTimer);
  }, [interval, phrases.length]);

  return (
    <div className={cn("h-[60px] flex items-center justify-center", className)}>
      <p 
        className={cn(
          "text-xl text-muted-foreground max-w-2xl text-center transition-all duration-500",
          isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-95",
        )}
      >
        {phrases[currentIndex]}
      </p>
    </div>
  );
};

export default RotatingText;
