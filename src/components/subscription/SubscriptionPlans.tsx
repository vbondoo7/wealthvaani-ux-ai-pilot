
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import useUserStore from '@/lib/userStore';
import { Check, X } from "lucide-react";

const SubscriptionPlans: React.FC = () => {
  const { currentUser, upgradePlan } = useUserStore();
  const { toast } = useToast();
  
  if (!currentUser) return null;
  
  const handleUpgrade = (plan: 'Pro' | 'Premium') => {
    upgradePlan(plan);
    toast({
      title: `Plan upgraded to ${plan}`,
      description: "Your subscription has been upgraded successfully.",
      variant: "default",
    });
  };
  
  const plans = [
    {
      name: 'Basic',
      price: 0,
      description: 'Basic features, 3 nudges/month',
      features: [
        'Auto-Tracking of Expenses & Cash Flow',
        'Proactive nudges (Limited)',
        'Auto-save suggestions',
        'Affordable Financial Advisory (Paid, on-demand)',
        'Privacy-First & Non-Advisory by default'
      ],
      limitations: [
        'Goal-Based Suggestions & Actions',
        'Cash Flow Forecasting',
        'Income-Aware Advice',
        'Unlimited Proactive Nudges',
        'Festival & Season-Based Planning',
        'One-Tap Actions',
        'Works for Families',
        'Monthly Reports with Detailed Analytics',
        'Investment Intelligence / Execution'
      ],
      popular: false,
      current: currentUser.subscription.plan === 'Basic'
    },
    {
      name: 'Pro',
      price: 199,
      description: 'Unlimited nudges, tax reports',
      features: [
        'Auto-Tracking of Expenses & Cash Flow',
        'Proactive nudges (Limited)',
        'Auto-save suggestions',
        'Affordable Financial Advisory (Paid, on-demand)',
        'Privacy-First & Non-Advisory by default',
        'Goal-Based Suggestions & Actions',
        'Cash Flow Forecasting',
        'Income-Aware Advice',
        'Unlimited Proactive Nudges',
        'Festival & Season-Based Planning',
        'One-Tap Actions',
        'Tax Reports'
      ],
      limitations: [
        'Works for Families',
        'Monthly Reports with Detailed Analytics',
        'Investment Intelligence / Execution'
      ],
      popular: true,
      current: currentUser.subscription.plan === 'Pro'
    },
    {
      name: 'Premium',
      price: 499,
      description: 'Families, Auto-invest execution',
      features: [
        'Auto-Tracking of Expenses & Cash Flow',
        'Proactive nudges (Limited)',
        'Auto-save suggestions',
        'Affordable Financial Advisory (Paid, on-demand)',
        'Privacy-First & Non-Advisory by default',
        'Goal-Based Suggestions & Actions',
        'Cash Flow Forecasting',
        'Income-Aware Advice',
        'Unlimited Proactive Nudges',
        'Festival & Season-Based Planning',
        'One-Tap Actions',
        'Tax Reports',
        'Works for Families',
        'Monthly Reports with Detailed Analytics',
        'Investment Intelligence / Execution'
      ],
      limitations: [],
      popular: false,
      current: currentUser.subscription.plan === 'Premium'
    }
  ];
  
  return (
    <div className="wv-container py-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-center">Subscription Plans</h1>
        <p className="text-muted-foreground text-center">
          Choose the right plan for your financial journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`relative ${
              plan.popular 
                ? 'border-wealthveda-teal shadow-lg' 
                : plan.current
                  ? 'border-wealthveda-indigo' 
                  : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-wealthveda-teal text-white text-xs font-medium px-2 py-1 rounded-full">
                  Popular Choice
                </span>
              </div>
            )}
            
            {plan.current && (
              <div className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2">
                <span className="bg-wealthveda-indigo text-white text-xs font-medium px-2 py-1 rounded-full">
                  Current Plan
                </span>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-2xl">
                {plan.name}
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">₹{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                {plan.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Features:</h3>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {plan.limitations.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2 text-muted-foreground">Not Included:</h3>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation) => (
                      <li key={limitation} className="flex items-start">
                        <X className="h-4 w-4 text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {plan.current ? (
                <Button className="w-full bg-wealthveda-indigo" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-wealthveda-teal hover:bg-wealthveda-teal/90' 
                      : 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90'
                  }`}
                  onClick={() => handleUpgrade(plan.name as 'Pro' | 'Premium')}
                  disabled={plan.name === 'Basic'}
                >
                  {plan.name === 'Basic' ? 'Free Plan' : `Upgrade to ${plan.name}`}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-muted rounded-lg text-center">
        <h3 className="font-medium mb-2">Pro Plan: Tier-based Pricing</h3>
        <p className="text-sm text-muted-foreground">
          ₹199/- for Tier-1, ₹99/- for Tier-2 and ₹49/- for Tier-3 cities
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Premium Plan: Remains same ₹499/- across all cities
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
