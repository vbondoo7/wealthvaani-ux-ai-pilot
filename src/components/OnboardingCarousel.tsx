
import React, { useState } from 'react';
import { ChevronRight, Lightbulb, Wallet, Shield, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

const OnboardingCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  
  const slides = [
    {
      title: language === 'en' ? "Namaste to a Smarter Financial Future" : 
             language === 'hi' ? "स्मार्ट वित्तीय भविष्य के लिए नमस्ते" : 
             "Smarter Financial Future ke liye Namaste",
      description: language === 'en' ? "WealthVeda - Your AI-powered financial assistant that makes money management simple and effective." :
                  language === 'hi' ? "वेल्थवेदा - आपका एआई-संचालित वित्तीय सहायक जो धन प्रबंधन को सरल और प्रभावी बनाता है।" :
                  "WealthVeda - Aapka AI-powered financial assistant jo money management ko simple aur effective banata hai.",
      icon: <Lightbulb className="h-12 w-12 text-saffron-orange" />
    },
    {
      title: language === 'en' ? "Personalized Financial Insights" :
             language === 'hi' ? "व्यक्तिगत वित्तीय अंतर्दृष्टि" :
             "Personalized Financial Insights",
      description: language === 'en' ? "Get proactive nudges and recommendations tailored to your spending patterns and financial goals." :
                  language === 'hi' ? "अपने खर्च पैटर्न और वित्तीय लक्ष्यों के अनुरूप सक्रिय सुझाव और सिफारिशें प्राप्त करें।" :
                  "Apne spending patterns aur financial goals ke hisab se proactive nudges aur recommendations paayein.",
      icon: <Wallet className="h-12 w-12 text-teal" />
    },
    {
      title: language === 'en' ? "Secure Bank Connections" :
             language === 'hi' ? "सुरक्षित बैंक कनेक्शन" :
             "Secure Bank Connections",
      description: language === 'en' ? "Connect your accounts securely using Account Aggregator framework. Your data stays encrypted and private." :
                  language === 'hi' ? "अकाउंट एग्रीगेटर फ्रेमवर्क का उपयोग करके अपने खातों को सुरक्षित रूप से कनेक्ट करें। आपका डेटा एन्क्रिप्टेड और निजी रहता है।" :
                  "Account Aggregator framework ka use karke apne accounts ko securely connect karein. Aapka data encrypted aur private rehta hai.",
      icon: <Shield className="h-12 w-12 text-royal-blue" />
    },
    {
      title: language === 'en' ? "Ask Anything About Your Money" :
             language === 'hi' ? "अपने पैसे के बारे में कुछ भी पूछें" :
             "Apne paise ke bare mein kuch bhi poochein",
      description: language === 'en' ? "Chat with our AI assistant about budgets, investments, or financial queries in simple language." :
                  language === 'hi' ? "सरल भाषा में बजट, निवेश, या वित्तीय प्रश्नों के बारे में हमारे एआई सहायक से चैट करें।" :
                  "Simple language mein budgets, investments, ya financial queries ke bare mein hamare AI assistant se chat karein.",
      icon: <Bot className="h-12 w-12 text-saffron-orange" />
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Show a toast message
      toast({
        title: language === 'en' ? "Welcome to Wealthवाणी" :
               language === 'hi' ? "वेल्थवाणी में आपका स्वागत है" :
               "Wealthवाणी mein aapka swagat hai",
        description: language === 'en' ? "Let's set up your financial goals!" :
                    language === 'hi' ? "आइए अपने वित्तीय लक्ष्य स्थापित करें!" :
                    "Chaliye apne financial goals set karein!",
      });
      
      // Navigate to goals page with a slight delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
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
          className="w-full bg-royal-blue hover:bg-royal-blue/90 h-12"
        >
          {currentSlide < slides.length - 1 ? 
            (language === 'en' ? 'Continue' : language === 'hi' ? 'जारी रखें' : 'Continue') : 
            (language === 'en' ? 'Get Started' : language === 'hi' ? 'शुरू करें' : 'Shuru Karen')}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
