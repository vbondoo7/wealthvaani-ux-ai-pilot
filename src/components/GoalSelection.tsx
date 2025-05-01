
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialGoal {
  id: string;
  title: string;
  hindiTitle: string;
  icon: string;
}

const goals: FinancialGoal[] = [
  { 
    id: "emergency", 
    title: "Emergency Fund", 
    hindiTitle: "आपातकालीन कोष",
    icon: "🛡️" 
  },
  { 
    id: "retirement", 
    title: "Retirement", 
    hindiTitle: "सेवानिवृत्ति",
    icon: "👵" 
  },
  { 
    id: "education", 
    title: "Child's Education", 
    hindiTitle: "बच्चों की शिक्षा",
    icon: "🎓" 
  },
  { 
    id: "home", 
    title: "Buy a Home", 
    hindiTitle: "घर खरीदना",
    icon: "🏠" 
  },
  { 
    id: "vacation", 
    title: "Vacation", 
    hindiTitle: "छुट्टियां",
    icon: "✈️" 
  },
  { 
    id: "car", 
    title: "Buy a Car", 
    hindiTitle: "गाड़ी खरीदना",
    icon: "🚗" 
  },
  { 
    id: "wedding", 
    title: "Wedding", 
    hindiTitle: "शादी",
    icon: "💍" 
  },
  { 
    id: "wealth", 
    title: "Build Wealth", 
    hindiTitle: "धन बनाना",
    icon: "💰" 
  }
];

const GoalSelection: React.FC = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(goalId => goalId !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  return (
    <div className="wv-container">
      <div className="space-y-4 mb-8">
        <h1 className="text-2xl font-bold">Select Your Goals</h1>
        <p className="text-muted-foreground">
          Choose your financial priorities so WealthVeda can help you achieve them
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-8">
        {goals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={cn(
              "relative rounded-xl border p-4 flex flex-col items-center text-center cursor-pointer transition-all",
              selectedGoals.includes(goal.id) 
                ? "bg-wealthveda-teal/10 border-wealthveda-teal" 
                : "bg-card hover:border-wealthveda-teal/50"
            )}
          >
            {selectedGoals.includes(goal.id) && (
              <div className="absolute -top-2 -right-2 bg-wealthveda-teal text-white rounded-full p-1">
                <Check className="h-3 w-3" />
              </div>
            )}
            <div className="text-3xl mb-2">{goal.icon}</div>
            <div className="font-medium text-sm">{goal.title}</div>
            <div className="text-xs hindi-text">{goal.hindiTitle}</div>
          </div>
        ))}
      </div>
      
      <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto">
        <Button 
          disabled={selectedGoals.length === 0}
          className={cn(
            "w-full rounded-xl h-12 transition-all",
            selectedGoals.length > 0 
              ? "bg-wealthveda-indigo hover:bg-wealthveda-indigo/90" 
              : "bg-muted text-muted-foreground"
          )}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default GoalSelection;
