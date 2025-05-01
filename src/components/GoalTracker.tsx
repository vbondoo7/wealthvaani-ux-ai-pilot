
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowUp, TrendingUp, CalendarClock } from "lucide-react";

const GoalTracker: React.FC = () => {
  const goals = [
    {
      id: 'education',
      name: "Child's Education",
      targetYear: 2032,
      targetAmount: 1800000,  // 18L
      savedAmount: 240000,    // 2.4L
      monthlyContribution: 5000,
      progress: 13,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: 'home',
      name: "Buy a Home",
      targetYear: 2028,
      targetAmount: 5000000,  // 50L
      savedAmount: 800000,    // 8L
      monthlyContribution: 30000,
      progress: 16,
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];
  
  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  return (
    <div className="wv-container py-6">
      <h1 className="text-xl font-bold mb-2">Your Financial Goals</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Track your progress and stay on target
      </p>
      
      <Tabs defaultValue={goals[0].id}>
        <TabsList className="w-full mb-6">
          {goals.map(goal => (
            <TabsTrigger 
              key={goal.id} 
              value={goal.id}
              className="flex-1"
            >
              {goal.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {goals.map(goal => (
          <TabsContent key={goal.id} value={goal.id} className="space-y-6">
            <div className="wv-card bg-gradient-to-br from-wealthveda-teal/10 to-wealthveda-indigo/10">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg">{goal.name}</h2>
                <span className="text-xs bg-wealthveda-indigo/10 text-wealthveda-indigo px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CalendarClock className="h-3 w-3" />
                  {goal.targetYear} Target
                </span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-wealthveda-teal/10 flex-center">
                  {goal.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {formatAmount(goal.targetAmount)}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Target amount
                  </p>
                </div>
              </div>
              
              <div className="mb-6 mt-2">
                <div className="flex-between mb-1">
                  <span className="text-sm text-muted-foreground">
                    Saved: {formatAmount(goal.savedAmount)}
                  </span>
                  <span className="text-sm font-medium">
                    {goal.progress}% Complete
                  </span>
                </div>
                
                <Progress value={goal.progress} className="h-2.5 bg-muted" />
              </div>
              
              <div className="p-3 bg-background rounded-lg mb-4 border border-border/60">
                <div className="flex-between mb-2">
                  <span className="text-sm">Monthly contribution</span>
                  <span className="font-medium">₹{goal.monthlyContribution.toLocaleString()}</span>
                </div>
                <div className="flex-between">
                  <span className="text-sm">Months remaining</span>
                  <span className="font-medium">{(goal.targetYear - 2025) * 12}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  size="sm"
                >
                  Adjust Target
                </Button>
                <Button 
                  className="flex-1 bg-wealthveda-teal hover:bg-wealthveda-teal/90"
                  size="sm"
                >
                  <ArrowUp className="h-4 w-4 mr-1" />
                  Increase SIP
                </Button>
              </div>
            </div>
            
            <div className="wv-card">
              <h3 className="font-medium mb-2">AI Recommendation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Increasing your SIP by ₹3,000 can help you reach your goal 8 months earlier.
              </p>
              <Button 
                className="w-full text-xs h-8 rounded-lg bg-wealthveda-indigo hover:bg-wealthveda-indigo/90"
              >
                See Detailed Projection
              </Button>
            </div>
            
            <div className="flex items-center p-4 bg-muted rounded-xl">
              <div className="w-10 h-10 rounded-full bg-background flex-center mr-3">
                <TrendingUp className="h-4 w-4 text-wealthveda-teal" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Did you know?</h3>
                <p className="text-xs text-muted-foreground">
                  Investing early helps you gain from the power of compounding. Each year of delay can reduce your final corpus by up to 15%.
                </p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GoalTracker;
