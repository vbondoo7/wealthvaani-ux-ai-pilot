
import React from 'react';
import { 
  BellRing,
  ArrowUp,
  TrendingUp,
  Calendar,
  DollarSign,
  Check,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NudgeCardProps {
  type: 'reminder' | 'opportunity' | 'risk' | 'tip';
  title: string;
  description: string;
  action?: string;
  dueDate?: string;
  icon?: React.ReactNode;
}

const NudgeCard: React.FC<NudgeCardProps> = ({ 
  type, 
  title, 
  description, 
  action,
  dueDate,
  icon: customIcon
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'reminder':
        return {
          bgColor: 'bg-wealthveda-saffron/10',
          textColor: 'text-wealthveda-saffron',
          icon: customIcon || <Calendar className="h-4 w-4" />
        };
      case 'opportunity':
        return {
          bgColor: 'bg-wealthveda-teal/10',
          textColor: 'text-wealthveda-teal',
          icon: customIcon || <TrendingUp className="h-4 w-4" />
        };
      case 'risk':
        return {
          bgColor: 'bg-destructive/10',
          textColor: 'text-destructive',
          icon: customIcon || <BellRing className="h-4 w-4" />
        };
      case 'tip':
        return {
          bgColor: 'bg-wealthveda-indigo/10',
          textColor: 'text-wealthveda-indigo',
          icon: customIcon || <Info className="h-4 w-4" />
        };
      default:
        return {
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
          icon: customIcon || <Info className="h-4 w-4" />
        };
    }
  };

  const { bgColor, textColor, icon } = getTypeStyles();

  return (
    <div className="wv-card mb-3 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className={cn("min-w-8 h-8 rounded-full flex-center", bgColor)}>
          <div className={textColor}>{icon}</div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground mb-3">{description}</p>
          
          {dueDate && (
            <div className="flex items-center mb-3">
              <Calendar className="h-3 w-3 mr-1.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{dueDate}</span>
            </div>
          )}
          
          {action && (
            <Button 
              size="sm" 
              className={cn(
                "text-xs h-8 rounded-lg w-full",
                type === 'opportunity' && "bg-wealthveda-teal hover:bg-wealthveda-teal/90",
                type === 'reminder' && "bg-wealthveda-saffron hover:bg-wealthveda-saffron/90",
                type === 'risk' && "bg-destructive hover:bg-destructive/90",
                type === 'tip' && "bg-wealthveda-indigo hover:bg-wealthveda-indigo/90"
              )}
            >
              {action}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const NudgeFeed: React.FC = () => {
  const nudges: NudgeCardProps[] = [
    {
      type: 'reminder',
      title: 'Credit Card Bill Due',
      description: 'HDFC credit card payment of ₹12,450 is due in 3 days.',
      action: 'Schedule Payment',
      dueDate: 'Due on 4th May, 2025',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      type: 'opportunity',
      title: 'SIP Top-up',
      description: "Increase your child's education SIP by ₹1,000 to reach your goal faster.",
      action: 'Top-up SIP',
      icon: <ArrowUp className="h-4 w-4" />
    },
    {
      type: 'risk',
      title: 'Unusual Spending',
      description: 'Your restaurant spending is 40% higher than your monthly average.',
      action: 'Review Transactions'
    },
    {
      type: 'tip',
      title: 'Tax Saving Opportunity',
      description: 'You can save ₹15,000 in taxes by investing in ELSS funds before March.',
      action: 'Explore Options'
    }
  ];

  return (
    <div className="space-y-3">
      {nudges.map((nudge, index) => (
        <NudgeCard key={index} {...nudge} />
      ))}
    </div>
  );
};

export default NudgeFeed;
