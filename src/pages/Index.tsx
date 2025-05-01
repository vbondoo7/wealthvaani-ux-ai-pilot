
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnboardingCarousel from '@/components/OnboardingCarousel';
import GoalSelection from '@/components/GoalSelection';
import Dashboard from '@/components/Dashboard';
import BankConnection from '@/components/BankConnection';
import GoalTracker from '@/components/GoalTracker';
import ChatInterface from '@/components/ChatInterface';
import NotificationSettings from '@/components/NotificationSettings';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
  
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
        return <Dashboard />;
      case 'banking':
        return <BankConnection />;
      case 'goals':
        return <GoalTracker />;
      case 'chat':
        return <ChatInterface />;
      case 'notifications':
        return <NotificationSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
};

export default Index;
