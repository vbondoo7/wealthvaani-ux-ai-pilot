import React from 'react';
import { 
  BarChart3, 
  MessageCircle, 
  Bell, 
  TrendingUp, 
  Calendar, 
  ArrowUp,
  ArrowDown,
  Info,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

import NudgeFeed from './NudgeFeed';

interface DashboardProps {
  onChangeScreen: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeScreen }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="wv-container py-4">
          <div className="flex-between">
            <div>
              <h1 className="text-lg font-bold">Namaste, Rahul</h1>
              <p className="text-sm text-muted-foreground">Let's manage your finances</p>
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

      <main className="flex-1 wv-container space-y-6">
        {/* Financial Health Score */}
        <div className="wv-card bg-gradient-to-br from-wealthveda-teal/10 to-wealthveda-indigo/10">
          <div className="flex-between mb-3">
            <h2 className="text-sm font-medium text-muted-foreground">Financial Health</h2>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex-between mb-3">
            <h3 className="text-xl font-bold">72<span className="text-sm font-normal text-muted-foreground">/100</span></h3>
            <span className="text-xs px-2 py-1 bg-wealthveda-teal/20 text-wealthveda-teal rounded-full flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +4 pts
            </span>
          </div>
          
          <Progress value={72} className="h-2 bg-muted" />
          
          <p className="text-xs mt-2 text-muted-foreground">
            <span className="hindi-text">उत्तम!</span> Good progress, but room to improve
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
            <div className="text-lg font-bold">₹1,84,500</div>
            <div className="text-xs text-wealthveda-teal flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +8.4% in 2024
            </div>
          </div>
          
          <div className="wv-card cursor-pointer" onClick={() => onChangeScreen('budget')}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-wealthveda-saffron/10 flex-center">
                <Wallet className="h-4 w-4 text-wealthveda-saffron" />
              </div>
              <span className="text-sm font-medium">This Month</span>
            </div>
            <div className="text-lg font-bold">₹24,300</div>
            <div className="text-xs text-destructive flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              +12% vs Avg.
            </div>
          </div>
        </div>

        {/* Goal Progress */}
        <div className="wv-card">
          <div className="flex-between mb-3">
            <h2 className="font-medium">Goal: Child's Education</h2>
            <span className="text-xs bg-wealthveda-indigo/10 text-wealthveda-indigo px-2 py-0.5 rounded">
              2032 Target
            </span>
          </div>
          
          <div className="flex-between mb-1">
            <span className="text-sm text-muted-foreground">Saved: ₹2.4L</span>
            <span className="text-sm font-medium">Target: ₹18L</span>
          </div>
          
          <Progress value={13} className="h-2.5 bg-muted" />
          
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
                Investing ₹5,000 monthly for 20 years at 12% returns can grow to ₹49 lakhs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
