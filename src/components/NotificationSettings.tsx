
import React, { useState } from 'react';
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  BellRing, 
  Calendar, 
  TrendingUp, 
  CreditCard, 
  BarChart3, 
  AlertCircle, 
  Check,
  ChevronLeft
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  types: {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
  }[];
}

const NotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: 'payments',
      title: 'Bill Payments',
      description: 'Credit card, loan, and utility bill reminders',
      icon: <Calendar className="h-5 w-5 text-wealthveda-saffron" />,
      types: [
        {
          id: 'payment-due',
          title: 'Payment Due Reminders',
          description: 'Receive alerts before bill due dates',
          enabled: true
        },
        {
          id: 'auto-debit',
          title: 'Auto-debit Notifications',
          description: 'Get alerts when auto-payments are processed',
          enabled: true
        },
        {
          id: 'payment-overdue',
          title: 'Overdue Payments',
          description: 'Get alerted when you miss a payment',
          enabled: true
        }
      ]
    },
    {
      id: 'investments',
      title: 'Investment Insights',
      description: 'SIP, market changes, and investment opportunities',
      icon: <TrendingUp className="h-5 w-5 text-wealthveda-teal" />,
      types: [
        {
          id: 'sip-reminder',
          title: 'SIP Reminders',
          description: 'Alerts for upcoming SIP dates',
          enabled: true
        },
        {
          id: 'market-drop',
          title: 'Market Drop Alerts',
          description: 'Alerts when markets drop significantly',
          enabled: false
        },
        {
          id: 'investment-opp',
          title: 'Investment Opportunities',
          description: 'Suggestions for new investments',
          enabled: true
        }
      ]
    },
    {
      id: 'spending',
      title: 'Spending Patterns',
      description: 'Unusual activity and budget limit notifications',
      icon: <CreditCard className="h-5 w-5 text-destructive" />,
      types: [
        {
          id: 'unusual-activity',
          title: 'Unusual Spending Activity',
          description: 'Alerts for spending that deviates from your pattern',
          enabled: true
        },
        {
          id: 'budget-limit',
          title: 'Budget Limit Warnings',
          description: 'When you approach or exceed budget limits',
          enabled: true
        }
      ]
    },
    {
      id: 'account',
      title: 'Account Updates',
      description: 'Balance changes and security notifications',
      icon: <BarChart3 className="h-5 w-5 text-wealthveda-indigo" />,
      types: [
        {
          id: 'large-transactions',
          title: 'Large Transactions',
          description: 'Alerts for large deposits or withdrawals',
          enabled: true
        },
        {
          id: 'low-balance',
          title: 'Low Balance Warnings',
          description: 'When your account balance falls below threshold',
          enabled: true
        }
      ]
    }
  ]);

  const toggleNotification = (categoryId: string, typeId: string) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          types: category.types.map(type => {
            if (type.id === typeId) {
              return { ...type, enabled: !type.enabled };
            }
            return type;
          })
        };
      }
      return category;
    }));
  };

  const saveSettings = () => {
    // Save to localStorage or backend API
    navigate(-1);
  };

  return (
    <div className="wv-container py-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Notification Settings</h1>
      </div>
      
      <div className="bg-wealthveda-saffron/10 p-4 rounded-xl border border-wealthveda-saffron/20 flex gap-3 mb-6">
        <AlertCircle className="h-5 w-5 text-wealthveda-saffron shrink-0 mt-0.5" />
        <p className="text-sm">
          Customize which AI nudges and notifications you want to receive. We recommend keeping important financial alerts enabled.
        </p>
      </div>
      
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category.id}>
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
                {category.icon}
              </div>
              <div>
                <h2 className="font-medium">{category.title}</h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>
            
            <div className="space-y-3 ml-1">
              {category.types.map(type => (
                <div 
                  key={type.id} 
                  className="flex items-center justify-between py-2"
                >
                  <div className="pr-4">
                    <h3 className="text-sm font-medium">{type.title}</h3>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                  <Toggle 
                    pressed={type.enabled}
                    onPressedChange={() => toggleNotification(category.id, type.id)}
                    className="data-[state=on]:bg-wealthveda-teal"
                  >
                    {type.enabled && <Check className="h-3 w-3" />}
                  </Toggle>
                </div>
              ))}
            </div>
            
            <Separator className="mt-4 mb-4" />
          </div>
        ))}
      </div>
      
      <div className="flex gap-3 mt-8">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1 bg-wealthveda-teal hover:bg-wealthveda-teal/90"
          onClick={saveSettings}
        >
          <BellRing className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
