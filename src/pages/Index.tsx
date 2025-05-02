
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnboardingCarousel from '@/components/OnboardingCarousel';
import GoalSelection from '@/components/GoalSelection';
import Dashboard from '@/components/Dashboard';
import BankConnection from '@/components/BankConnection';
import GoalTracker from '@/components/GoalTracker';
import ChatInterface from '@/components/ChatInterface';
import NotificationSettings from '@/components/NotificationSettings';
import BudgetAndExpenses from '@/components/BudgetAndExpenses';
import SavingRecommendations from '@/components/SavingRecommendations';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  BarChart3, 
  MessageCircle, 
  TrendingUp, 
  Calendar,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Load onboarding status from localStorage
  useEffect(() => {
    const completed = localStorage.getItem('onboardingCompleted');
    setOnboardingCompleted(completed === 'true');
    
    // Set current screen based on route path
    const path = location.pathname.replace('/', '');
    if (path && path !== 'dashboard') {
      setCurrentScreen(path);
    } else if (location.pathname === '/') {
      setCurrentScreen('dashboard');
    }
  }, [location.pathname]);

  // Update localStorage when onboarding is completed
  useEffect(() => {
    if (onboardingCompleted) {
      localStorage.setItem('onboardingCompleted', 'true');
    }
  }, [onboardingCompleted]);
  
  // Update URL when screen changes
  useEffect(() => {
    if (currentScreen !== 'dashboard' && location.pathname === '/') {
      navigate(`/${currentScreen}`, { replace: true });
    } else if (currentScreen === 'dashboard' && location.pathname !== '/') {
      navigate('/', { replace: true });
    } else if (location.pathname !== '/' && location.pathname !== `/${currentScreen}`) {
      navigate(`/${currentScreen}`, { replace: true });
    }
  }, [currentScreen, navigate, location.pathname]);
  
  if (!onboardingCompleted) {
    return (
      <Tabs defaultValue="onboarding" className="min-h-screen">
        <TabsList className="hidden">
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="onboarding" className="h-screen">
          <OnboardingCarousel />
        </TabsContent>
        
        <TabsContent value="goals" className="h-screen">
          <GoalSelection />
        </TabsContent>
      </Tabs>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onChangeScreen={setCurrentScreen} />;
      case 'banking':
        return <BankConnection />;
      case 'goals':
        return <GoalTracker />;
      case 'chat':
        return <ChatInterface />;
      case 'notifications':
        return <NotificationSettings />;
      case 'budget':
        return <BudgetAndExpenses />;
      case 'saving-recommendations':
        return <SavingRecommendations />;
      default:
        return <Dashboard onChangeScreen={setCurrentScreen} />;
    }
  };

  // Modified to always show navigation bar
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="pb-16">
        {renderScreen()}
      </div>
      
      {/* Global Navigation Bar - Always visible on all screens */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border/60 h-16 px-4 shadow-md z-50">
        <div className="max-w-md mx-auto h-full flex-between">
          <Button 
            variant="ghost" 
            className={`flex flex-col h-full items-center gap-1 ${currentScreen === 'dashboard' ? 'text-wealthveda-indigo' : ''}`}
            onClick={() => setCurrentScreen('dashboard')}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </Button>
          
          <Button 
            variant="ghost"
            className={`flex flex-col h-full items-center gap-1 ${currentScreen === 'budget' ? 'text-wealthveda-indigo' : ''}`}
            onClick={() => setCurrentScreen('budget')}
          >
            <Wallet className="h-5 w-5" />
            <span className="text-xs">Budget</span>
          </Button>
          
          <div className="relative">
            <Button 
              className={`rounded-full h-12 w-12 absolute -top-6 left-1/2 transform -translate-x-1/2 shadow-lg ${
                currentScreen === 'chat' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : 'bg-wealthveda-teal hover:bg-wealthveda-teal/90'
              }`}
              onClick={() => setCurrentScreen('chat')}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
          
          <Button 
            variant="ghost"
            className={`flex flex-col h-full items-center gap-1 ${currentScreen === 'banking' ? 'text-wealthveda-indigo' : ''}`}
            onClick={() => setCurrentScreen('banking')}
          >
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs">Invest</span>
          </Button>
          
          <Button 
            variant="ghost"
            className={`flex flex-col h-full items-center gap-1 ${currentScreen === 'goals' ? 'text-wealthveda-indigo' : ''}`}
            onClick={() => setCurrentScreen('goals')}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Goals</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
