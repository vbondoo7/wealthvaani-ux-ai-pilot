
import React, { useState } from 'react';
import { 
  BarChart3, 
  MessageCircle, 
  Bell, 
  TrendingUp, 
  Calendar, 
  ArrowUp,
  ArrowDown,
  Info,
  Wallet,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn, formatCurrency } from "@/lib/utils";
import { Link } from "react-router-dom";
import useUserStore from '@/lib/userStore';
import { format } from 'date-fns';

import NudgeFeed from './NudgeFeed';
import ChatBox from './ChatBox';
import { BottomTabs } from './ui/bottom-tabs';

interface DashboardProps {
  onChangeScreen: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeScreen }) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const { currentUser } = useUserStore();
  
  if (!currentUser) return null;
  
  // Calculate investment growth based on transactions
  const investmentGrowth = currentUser.transactions
    .filter(t => t.category === 'investment')
    .reduce((total, t) => total + t.amount, 0);
  
  // Calculate monthly spending from transactions
  const monthlySpending = currentUser.transactions
    .filter(t => t.type === 'debit' && t.category !== 'investment')
    .reduce((total, t) => total + t.amount, 0);
  
  // Get primary goal (first in the list)
  const primaryGoal = currentUser.goals[0] || {
    name: "No goals set",
    cost: 0,
    timelineYears: 0,
    savedAmount: 0,
    progress: 0
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="wv-container py-4">
          <div className="flex-between">
            <div>
              <h1 className="text-lg font-bold">Namaste, {currentUser.name.split(' ')[0]}</h1>
              <p className="text-sm text-muted-foreground">{format(new Date(), 'EEEE, dd MMM yyyy')}</p>
            </div>
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full"
              onClick={() => onChangeScreen('notifications')}
            >
              <Bell className="h-5 w-5 text-wealthveda-indigo" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 wv-container space-y-6 pb-20">
        {/* Financial Health Score */}
        <div className="wv-card bg-gradient-to-br from-wealthveda-teal/10 to-wealthveda-indigo/10">
          <div className="flex-between mb-3">
            <h2 className="text-sm font-medium text-muted-foreground">Financial Health</h2>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex-between mb-3">
            <h3 className="text-xl font-bold">
              {currentUser.subscription.plan === 'Basic' ? '65' : 
               currentUser.subscription.plan === 'Pro' ? '72' : '86'}
              <span className="text-sm font-normal text-muted-foreground">/100</span>
            </h3>
            <span className="text-xs px-2 py-1 bg-wealthveda-teal/20 text-wealthveda-teal rounded-full flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              {currentUser.subscription.plan === 'Basic' ? '+2' : 
               currentUser.subscription.plan === 'Pro' ? '+4' : '+6'} pts
            </span>
          </div>
          
          <Progress value={currentUser.subscription.plan === 'Basic' ? 65 : 
                          currentUser.subscription.plan === 'Pro' ? 72 : 86} className="h-2 bg-muted" />
          
          <p className="text-xs mt-2 text-muted-foreground">
            <span className="hindi-text">
              {currentUser.subscription.plan === 'Basic' ? 'अच्छा!' : 
               currentUser.subscription.plan === 'Pro' ? 'उत्तम!' : 'शानदार!'}
            </span> 
            {currentUser.subscription.plan === 'Basic' ? 'Good progress, but room to improve' : 
             currentUser.subscription.plan === 'Pro' ? 'Good progress, but room to improve' : 'Excellent progress!'}
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="wv-card cursor-pointer" onClick={() => onChangeScreen('banking')}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-wealthveda-indigo/10 flex-center">
                <TrendingUp className="h-4 w-4 text-wealthveda-indigo" />
              </div>
              <span className="text-sm font-medium">Investments</span>
            </div>
            <div className="text-lg font-bold">{formatCurrency(investmentGrowth)}</div>
            <div className="text-xs text-wealthveda-teal flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              {currentUser.subscription.plan === 'Basic' ? '+5.8%' : 
               currentUser.subscription.plan === 'Pro' ? '+8.4%' : '+12.6%'} in 2024
            </div>
          </div>
          
          <div className="wv-card cursor-pointer" onClick={() => onChangeScreen('budget')}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-wealthveda-saffron/10 flex-center">
                <Wallet className="h-4 w-4 text-wealthveda-saffron" />
              </div>
              <span className="text-sm font-medium">This Month</span>
            </div>
            <div className="text-lg font-bold">{formatCurrency(monthlySpending)}</div>
            <div className="text-xs text-destructive flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              +{currentUser.subscription.plan === 'Basic' ? '18' : 
                 currentUser.subscription.plan === 'Pro' ? '12' : '5'}% vs Avg.
            </div>
          </div>
        </div>

        {/* Goal Progress */}
        <div className="wv-card">
          <div className="flex-between mb-3">
            <h2 className="font-medium">Goal: {primaryGoal.name.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</h2>
            <span className="text-xs bg-wealthveda-indigo/10 text-wealthveda-indigo px-2 py-0.5 rounded">
              {new Date().getFullYear() + primaryGoal.timelineYears} Target
            </span>
          </div>
          
          <div className="flex-between mb-1">
            <span className="text-sm text-muted-foreground">
              Saved: {formatCurrency(primaryGoal.savedAmount || 0)}
            </span>
            <span className="text-sm font-medium">
              Target: {formatCurrency(primaryGoal.cost)}
            </span>
          </div>
          
          <Progress value={primaryGoal.progress || 0} className="h-2.5 bg-muted" />
          
          <div className="mt-3 flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex-1"
              onClick={() => onChangeScreen('goals')}
            >
              Details
            </Button>
            <Button 
              size="sm" 
              className="text-xs flex-1 bg-wealthveda-teal hover:bg-wealthveda-teal/90"
              onClick={() => onChangeScreen('chat')}
            >
              Increase SIP
            </Button>
          </div>
        </div>

        <Separator />

        {/* AI Nudges Feed */}
        <div>
          <div className="flex-between mb-3">
            <h2 className="font-semibold">Smart Actions</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-wealthveda-indigo"
              onClick={() => onChangeScreen('saving-recommendations')}
            >
              View All
            </Button>
          </div>
          <NudgeFeed />
        </div>
        
        {/* Did You Know */}
        <div className="wv-card bg-wealthveda-indigo/5 border-dashed border-wealthveda-indigo/30">
          <div className="flex items-start gap-3">
            <div className="min-w-8 h-8 rounded-full bg-wealthveda-indigo/10 flex-center">
              <Info className="h-4 w-4 text-wealthveda-indigo" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">Did you know?</h3>
              <p className="text-xs text-muted-foreground">
                {currentUser.subscription.plan === 'Basic' 
                  ? 'Investing ₹5,000 monthly for 20 years at 12% returns can grow to ₹49 lakhs.'
                  : currentUser.subscription.plan === 'Pro'
                  ? 'Income tax saving through ELSS funds provides both tax benefits and wealth growth.'
                  : 'Diversifying investments across equity, debt, and gold can optimize your returns while minimizing risk.'}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Floating Chat Button */}
      {!showChatBox && (
        <Button
          className="fixed bottom-20 right-4 rounded-full h-12 w-12 shadow-lg bg-wealthveda-teal hover:bg-wealthveda-teal/90 z-40"
          onClick={() => setShowChatBox(true)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}
      
      {/* Chat Box */}
      {showChatBox && (
        <ChatBox onClose={() => setShowChatBox(false)} />
      )}

      {/* Bottom Navigation Tabs */}
      <BottomTabs currentScreen="dashboard" onChangeScreen={onChangeScreen} />
    </div>
  );
};

export default Dashboard;
