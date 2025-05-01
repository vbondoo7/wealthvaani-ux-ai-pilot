
import React from 'react';
import {
  ArrowUp,
  Calendar,
  Check,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GoalProps {
  id: string;
  name: string;
  targetAmount: string;
  currentAmount: string;
  progress: number;
  targetDate: string;
  monthlyContribution: string;
  returns: string;
  icon: string;
}

const goals: GoalProps[] = [
  {
    id: "education",
    name: "Child's Education",
    targetAmount: "₹18,00,000",
    currentAmount: "₹2,40,000",
    progress: 13,
    targetDate: "Feb 2032",
    monthlyContribution: "₹5,000",
    returns: "+9.8%",
    icon: "🎓"
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    targetAmount: "₹4,50,000",
    currentAmount: "₹2,70,000",
    progress: 60,
    targetDate: "Nov 2025",
    monthlyContribution: "₹15,000",
    returns: "+6.2%",
    icon: "🛡️"
  },
  {
    id: "retirement",
    name: "Retirement",
    targetAmount: "₹1,20,00,000",
    currentAmount: "₹8,40,000",
    progress: 7,
    targetDate: "Mar 2045",
    monthlyContribution: "₹10,000",
    returns: "+10.4%",
    icon: "👵"
  }
];

const GoalCard: React.FC<GoalProps> = ({ 
  name, 
  targetAmount, 
  currentAmount, 
  progress, 
  targetDate,
  monthlyContribution,
  returns,
  icon
}) => {
  return (
    <div className="wv-card mb-4">
      <div className="flex-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-2xl">{icon}</div>
          <h3 className="font-medium">{name}</h3>
        </div>
        <span className="text-xs bg-muted rounded-full px-2 py-0.5 flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {targetDate}
        </span>
      </div>
      
      <div className="flex-between mb-1">
        <span className="text-sm text-muted-foreground">Saved: {currentAmount}</span>
        <span className="text-sm font-medium">Target: {targetAmount}</span>
      </div>
      
      <Progress value={progress} className="h-2.5 bg-muted mb-4" />
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/50 p-2 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Monthly SIP</div>
          <div className="font-medium">{monthlyContribution}</div>
        </div>
        
        <div className="bg-muted/50 p-2 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Returns</div>
          <div className="font-medium text-wealthveda-teal flex items-center">
            {returns}
            <ArrowUp className="h-3 w-3 ml-1" />
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 text-sm"
        >
          Details
        </Button>
        <Button 
          className="flex-1 text-sm bg-wealthveda-indigo hover:bg-wealthveda-indigo/90"
        >
          Modify Goal
        </Button>
      </div>
    </div>
  );
};

interface InsightCardProps {
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'neutral';
  icon: React.ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  type,
  icon
}) => {
  return (
    <div className={cn(
      "wv-card border-l-4 mb-3",
      type === 'positive' && "border-l-wealthveda-teal",
      type === 'warning' && "border-l-wealthveda-saffron",
      type === 'neutral' && "border-l-wealthveda-indigo",
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "min-w-8 h-8 rounded-full flex-center",
          type === 'positive' && "bg-wealthveda-teal/10 text-wealthveda-teal",
          type === 'warning' && "bg-wealthveda-saffron/10 text-wealthveda-saffron",
          type === 'neutral' && "bg-wealthveda-indigo/10 text-wealthveda-indigo",
        )}>
          {icon}
        </div>
        
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

const GoalTracker: React.FC = () => {
  return (
    <div className="wv-container">
      <div className="flex-between mb-4">
        <h1 className="text-xl font-bold">Your Goals</h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-8"
        >
          <Check className="h-3 w-3 mr-1" />
          Add Goal
        </Button>
      </div>
      
      <Tabs defaultValue="goals">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="mt-0">
          {goals.map((goal) => (
            <GoalCard key={goal.id} {...goal} />
          ))}
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <InsightCard 
            title="On Track for Emergency Fund"
            description="You'll reach your emergency fund goal 2 months earlier at this rate."
            type="positive"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          
          <InsightCard 
            title="Education Goal at Risk"
            description="At current contribution rate, you may fall short by ₹3.2 lakhs."
            type="warning"
            icon={<Clock className="h-4 w-4" />}
          />
          
          <InsightCard 
            title="Investment Allocation Tip"
            description="Consider increasing equity allocation for long-term goals like retirement."
            type="neutral"
            icon={<ArrowUp className="h-4 w-4" />}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoalTracker;
