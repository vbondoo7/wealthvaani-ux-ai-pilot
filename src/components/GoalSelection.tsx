
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, GraduationCap, Car, HeartPulse, Plane, Landmark } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const GoalSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
  const goals = [
    { id: "home", label: "Buy a Home", icon: <Home className="h-6 w-6" /> },
    { id: "education", label: "Child's Education", icon: <GraduationCap className="h-6 w-6" /> },
    { id: "car", label: "Buy a Car", icon: <Car className="h-6 w-6" /> },
    { id: "health", label: "Medical Emergency", icon: <HeartPulse className="h-6 w-6" /> },
    { id: "vacation", label: "Dream Vacation", icon: <Plane className="h-6 w-6" /> },
    { id: "retirement", label: "Retirement", icon: <Landmark className="h-6 w-6" /> }
  ];
  
  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleContinue = () => {
    // Save selected goals to localStorage or context
    localStorage.setItem('selectedGoals', JSON.stringify(selectedGoals));
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-2">Set Your Financial Goals</h1>
        <p className="text-muted-foreground mb-6">
          Select your top financial priorities and we'll help you achieve them.
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {goals.map((goal) => (
            <div 
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-colors ${
                selectedGoals.includes(goal.id) 
                  ? 'bg-wealthveda-indigo/10 border-wealthveda-indigo/30' 
                  : 'bg-card border-border/60 hover:bg-accent/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                selectedGoals.includes(goal.id) 
                  ? 'bg-wealthveda-indigo/20 text-wealthveda-indigo' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {goal.icon}
              </div>
              <span className="text-sm font-medium">{goal.label}</span>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground mb-3">
          <span className="hindi-text">समझदारी।</span> You can always change or add more goals later.
        </p>
      </div>
      
      <div className="px-6 py-8 border-t">
        <Button 
          onClick={handleContinue} 
          disabled={selectedGoals.length === 0}
          className="w-full bg-wealthveda-teal hover:bg-wealthveda-teal/90 h-12"
        >
          Continue
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
        {selectedGoals.length === 0 && (
          <p className="text-xs text-center text-muted-foreground mt-2">
            Please select at least one goal to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default GoalSelection;
