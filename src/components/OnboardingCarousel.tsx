
import React, { useState } from 'react';
import { ChevronRight, Lightbulb, Wallet, Shield, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from 'react-router-dom';

const OnboardingCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      title: "Namaste to a Smarter Financial Future",
      description: "WealthVeda - Your AI-powered financial assistant that makes money management simple and effective.",
      icon: <Lightbulb className="h-12 w-12 text-wealthveda-saffron" />
    },
    {
      title: "Personalized Financial Insights",
      description: "Get proactive nudges and recommendations tailored to your spending patterns and financial goals.",
      icon: <Wallet className="h-12 w-12 text-wealthveda-teal" />
    },
    {
      title: "Secure Bank Connections",
      description: "Connect your accounts securely using Account Aggregator framework. Your data stays encrypted and private.",
      icon: <Shield className="h-12 w-12 text-wealthveda-indigo" />
    },
    {
      title: "Ask Anything About Your Money",
      description: "Chat with our AI assistant about budgets, investments, or financial queries in simple language.",
      icon: <Bot className="h-12 w-12 text-wealthveda-saffron" />
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/goal-selection'); // Go to the goal selection screen
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="mb-6">
          {slides[currentSlide].icon}
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-3">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-center text-muted-foreground mb-8">
          {slides[currentSlide].description}
        </p>
        
        <div className="flex gap-1.5 mb-8">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`h-1.5 rounded-full ${index === currentSlide 
                ? 'w-6 bg-primary' 
                : 'w-1.5 bg-muted'}`}
            />
          ))}
        </div>
        
        <AspectRatio ratio={16/9} className="bg-muted/50 rounded-xl mb-6 overflow-hidden">
          <div className="h-full flex items-center justify-center">
            <span className="text-muted-foreground">Illustration {currentSlide + 1}</span>
          </div>
        </AspectRatio>
      </div>
      
      <div className="px-6 py-8 border-t">
        <Button 
          onClick={handleNext} 
          className="w-full bg-wealthveda-teal hover:bg-wealthveda-teal/90 h-12"
        >
          {currentSlide < slides.length - 1 ? 'Continue' : 'Get Started'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
