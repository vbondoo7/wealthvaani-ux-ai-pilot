
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
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Load onboarding status from localStorage
  useEffect(() => {
    const completed = localStorage.getItem('onboardingCompleted');
    setOnboardingCompleted(completed === 'true');
  }, []);

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

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
};

export default Index;
