
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
import AuthForms from '@/components/auth/AuthForms';
import ProfileCreation from '@/components/profile/ProfileCreation';
import UserProfile from '@/components/profile/UserProfile';
import SavedNudges from '@/components/nudges/SavedNudges';
import Transactions from '@/components/transactions/Transactions';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import FinancialAnalytics from '@/components/analytics/FinancialAnalytics';
import LandingPage from '@/components/LandingPage';
import useUserStore from '@/lib/userStore';
import Logo from '@/components/logo/Logo';
import { notificationService } from '@/lib/notificationService';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BarChart3,
  MessageCircle,
  TrendingUp,
  Calendar,
  Wallet,
  Bell,
  User,
  CreditCard,
  BadgeIndianRupee,
  BellRing,
  BarChart,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('landing');
  const { isAuthenticated, currentUser } = useUserStore();
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Set current screen based on route path
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path && path !== 'dashboard') {
      setCurrentScreen(path);
    } else if (location.pathname === '/') {
      setCurrentScreen(isAuthenticated ? 'dashboard' : 'landing');
    }
  }, [location.pathname, isAuthenticated]);
  
  // Update URL when screen changes
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    const currentPath = currentScreen === 'dashboard' ? '' : currentScreen;
    
    if (path !== currentPath && !path.includes(currentPath)) {
      navigate(`/${currentPath}`, { replace: true });
    }
  }, [currentScreen, navigate, location.pathname]);
  
  // Start notification service when user is authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser?.profileCreated) {
      notificationService.start();
    } else {
      notificationService.stop();
    }
    
    return () => {
      notificationService.stop();
    };
  }, [isAuthenticated, currentUser]);
  
  // Non-authenticated landing page
  if (!isAuthenticated && currentScreen === 'landing') {
    return <LandingPage />;
  }
  
  // Authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-blue/5 to-saffron-orange/5">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <Logo size="lg" />
            
            <div className="flex items-center gap-2 mt-4">
              <Globe className="h-4 w-4 text-royal-blue" />
              <select 
                className="text-sm border-none bg-transparent focus:ring-0"
                value={language}
                onChange={(e) => changeLanguage(e.target.value as 'en' | 'hi' | 'hinglish')}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
          </div>
          <AuthForms onSuccess={() => setCurrentScreen('dashboard')} />
        </div>
      </div>
    );
  }
  
  // Profile creation state
  if (isAuthenticated && currentUser && !currentUser.profileCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-royal-blue/5 to-saffron-orange/5">
        <div className="container mx-auto p-6">
          <div className="flex flex-col items-center mb-8">
            <Logo size="lg" />
            <div className="flex items-center gap-2 mt-4">
              <Globe className="h-4 w-4 text-royal-blue" />
              <select 
                className="text-sm border-none bg-transparent focus:ring-0"
                value={language}
                onChange={(e) => changeLanguage(e.target.value as 'en' | 'hi' | 'hinglish')}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
          </div>
          <ProfileCreation onComplete={() => setCurrentScreen('dashboard')} />
        </div>
      </div>
    );
  }
  
  // Onboarding state - fixed navigation flow
  if (currentScreen === 'onboarding') {
    return <OnboardingCarousel />;
  }

  if (currentScreen === 'goal-selection') {
    return <GoalSelection />;
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
      case 'profile':
        return <UserProfile />;
      case 'saved-nudges':
        return <SavedNudges />;
      case 'transactions':
        return <Transactions />;
      case 'subscription':
        return <SubscriptionPlans />;
      case 'analytics':
        return <FinancialAnalytics onAction={setCurrentScreen} />;
      default:
        return <Dashboard onChangeScreen={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Logo />
          <div className="flex gap-2">
            <div className="flex items-center gap-2 mr-2">
              <Globe className="h-4 w-4 text-royal-blue" />
              <select 
                className="text-sm border-none bg-transparent focus:ring-0"
                value={language}
                onChange={(e) => changeLanguage(e.target.value as 'en' | 'hi' | 'hinglish')}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentScreen('saved-nudges')}
              className="relative"
            >
              <BellRing className="h-5 w-5" />
              {currentUser?.savedNudges?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-saffron-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {currentUser.savedNudges.length}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentScreen('profile')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <div className="pb-16">
        {renderScreen()}
      </div>
      
      {/* Global Navigation Bar - Always visible on all screens */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border/60 h-16 px-4 shadow-md z-50">
        <div className="max-w-md mx-auto h-full flex items-center justify-between">
          <Button 
            variant="ghost" 
            className={`flex flex-col h-full items-center gap-1 ${currentScreen === 'dashboard' ? 'text-royal-blue' : ''}`}
            onClick={() => setCurrentScreen('dashboard')}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">{t('dashboard')}</span>
          </Button>
          
          <Button 
            variant="ghost"
            className={`flex flex-col h-full items-center gap-1 ${
              ['budget', 'transactions', 'analytics'].includes(currentScreen) ? 'text-royal-blue' : ''
            }`}
            onClick={() => setCurrentScreen('analytics')}
          >
            <BarChart className="h-5 w-5" />
            <span className="text-xs">{t('analytics')}</span>
          </Button>
          
          <div className="relative">
            <Button 
              className={`rounded-full h-12 w-12 absolute -top-6 left-1/2 transform -translate-x-1/2 shadow-lg ${
                currentScreen === 'chat' ? 'bg-royal-blue hover:bg-royal-blue/90' : 'bg-saffron-orange hover:bg-saffron-orange/90'
              }`}
              onClick={() => setCurrentScreen('chat')}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
          
          <Button 
            variant="ghost"
            className={`flex flex-col h-full items-center gap-1 ${
              ['banking', 'subscription'].includes(currentScreen) ? 'text-royal-blue' : ''
            }`}
            onClick={() => setCurrentScreen('subscription')}
          >
            <BadgeIndianRupee className="h-5 w-5" />
            <span className="text-xs">{t('plans')}</span>
          </Button>
          
          <Button 
            variant="ghost"
            className={`flex flex-col h-full items-center gap-1 ${
              currentScreen === 'goals' ? 'text-royal-blue' : ''
            }`}
            onClick={() => setCurrentScreen('goals')}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs">{t('goals')}</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
