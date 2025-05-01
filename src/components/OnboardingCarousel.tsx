
import React, { useState } from 'react';
import { Check, ChevronRight, Wallet, BarChart3, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ElementType;
}

const steps: OnboardingStep[] = [
  {
    title: "Welcome to WealthVeda",
    description: "तपसः आत्मज्ञानम् (Knowledge through financial discipline) - Your personal finance AI assistant",
    icon: Wallet
  },
  {
    title: "Track Your Money",
    description: "Connect your bank accounts securely and let AI analyze your spending patterns",
    icon: BarChart3
  },
  {
    title: "Smart Alerts",
    description: "Get personalized notifications before problems arise, not after",
    icon: Bell
  }
];

const OnboardingCarousel: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const StepIndicator = () => (
    <div className="flex gap-2 justify-center mt-8">
      {steps.map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index === currentStep
              ? "w-8 bg-wealthveda-teal"
              : "w-2 bg-muted"
          )}
        />
      ))}
    </div>
  );

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="flex flex-col h-full justify-between py-8">
      <div className="space-y-8 flex flex-col items-center text-center px-6">
        <div className="w-16 h-16 rounded-full bg-wealthveda-teal/10 flex-center">
          <Icon className="w-8 h-8 text-wealthveda-teal" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{currentStepData.title}</h1>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </div>
        
        <div className="relative h-56 w-full bg-gradient-to-br from-wealthveda-teal/10 to-wealthveda-indigo/10 rounded-2xl flex-center">
          <div className="absolute inset-0 flex-center">
            {/* Placeholder for illustration */}
            <div className="text-lg text-muted-foreground/50 italic">Illustration {currentStep + 1}</div>
          </div>
        </div>
        
        <StepIndicator />
      </div>
      
      <div className="px-6 pt-4">
        <Button 
          onClick={nextStep}
          className={cn(
            "w-full rounded-xl h-12",
            isLastStep ? "bg-wealthveda-teal hover:bg-wealthveda-teal/90" : "bg-wealthveda-indigo hover:bg-wealthveda-indigo/90"
          )}
        >
          {isLastStep ? (
            <>
              <span>Get Started</span>
              <Check className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <span>Continue</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
