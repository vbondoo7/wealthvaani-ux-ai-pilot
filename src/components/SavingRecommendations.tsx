
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DollarSign, ChevronRight, PiggyBank, TrendingUp, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const SavingRecommendations: React.FC = () => {
  const recommendations = [
    {
      title: "Reduce dining out expenses",
      description: "Your restaurant spending is 40% higher than last month. Cutting back could save ₹3,500 monthly.",
      impact: "high",
      action: "Create Budget Alert"
    },
    {
      title: "Switch to HDFC SmartSave Credit Card",
      description: "Based on your spending pattern, you could save ₹1,200 in annual fees and get 2% more cashback.",
      impact: "medium",
      action: "Compare Cards"
    },
    {
      title: "Consolidate your small recurring subscriptions",
      description: "You have 8 subscriptions under ₹500 each, totaling ₹2,800/month. Consider reviewing these services.",
      impact: "medium",
      action: "Review Subscriptions"
    },
    {
      title: "Tax-saving investment opportunity",
      description: "Investing additional ₹25,000 in ELSS funds can save ₹7,500 in taxes this financial year.",
      impact: "high",
      action: "Start Investment"
    }
  ];
  
  const getImpactBadgeStyle = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-wealthveda-teal/10 text-wealthveda-teal";
      case "medium":
        return "bg-wealthveda-indigo/10 text-wealthveda-indigo";
      default:
        return "bg-wealthveda-saffron/10 text-wealthveda-saffron";
    }
  };

  return (
    <div className="wv-container py-6">
      <h1 className="text-xl font-bold mb-2">Smart Saving Insights</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Personalized recommendations to optimize your finances
      </p>
      
      <div className="wv-card bg-gradient-to-br from-wealthveda-indigo/10 to-wealthveda-teal/10 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-wealthveda-indigo/20 flex-center">
            <PiggyBank className="h-5 w-5 text-wealthveda-indigo" />
          </div>
          <div>
            <h3 className="font-bold">Potential Monthly Savings</h3>
            <p className="text-sm text-muted-foreground">
              Apply all recommendations
            </p>
          </div>
        </div>
        
        <div className="text-2xl font-bold mb-3">₹8,540</div>
        
        <Button 
          className="w-full bg-wealthveda-indigo hover:bg-wealthveda-indigo/90"
          size="sm"
        >
          See Details
        </Button>
      </div>
      
      <h2 className="font-medium text-lg mb-4">Recommendations for You</h2>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <Card key={index} className="p-4 border-border/60">
            <div className="flex items-start gap-3">
              <div className="min-w-8 h-8 rounded-full bg-muted flex-center">
                {rec.impact === "high" ? (
                  <TrendingUp className="h-4 w-4 text-wealthveda-teal" />
                ) : (
                  <DollarSign className="h-4 w-4 text-wealthveda-indigo" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex-between mb-1">
                  <h3 className="font-medium text-sm">{rec.title}</h3>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", getImpactBadgeStyle(rec.impact))}>
                    {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {rec.description}
                </p>
                
                <Button 
                  size="sm" 
                  className="text-xs w-full h-8 bg-gradient-to-r from-wealthveda-teal to-wealthveda-indigo hover:opacity-90"
                >
                  {rec.action}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-muted/50 rounded-xl flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-wealthveda-teal" />
        <p className="text-sm">
          <span className="hindi-text">सबनेट!</span> You've saved ₹12,350 this year by following our recommendations.
        </p>
      </div>
    </div>
  );
};

export default SavingRecommendations;
