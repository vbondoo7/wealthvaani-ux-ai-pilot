
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import AuthForms from '@/components/auth/AuthForms';
import useUserStore from '@/lib/userStore';
import Logo from '@/components/logo/Logo';
import { notificationService } from '@/lib/notificationService';
import { useLanguage } from '@/contexts/LanguageContext';
import { isAdminLoggedIn } from '@/lib/adminService';
import { Globe } from "lucide-react";
import { toast } from "sonner";
import { asLanguageOption } from '@/lib/typeUtils';

// Import all necessary components
import OnboardingCarousel from '@/components/OnboardingCarousel';
import GoalSelection from '@/components/GoalSelection';
import Dashboard from '@/components/Dashboard';
import BankConnection from '@/components/BankConnection';
import GoalTracker from '@/components/GoalTracker';
import ChatInterface from '@/components/ChatInterface';
import NotificationSettings from '@/components/NotificationSettings';
import BudgetAndExpenses from '@/components/BudgetAndExpenses';
import SavingRecommendations from '@/components/SavingRecommendations';
import ProfileCreation from '@/components/profile/ProfileCreation';
import UserProfile from '@/components/profile/UserProfile';
import SavedNudges from '@/components/nudges/SavedNudges';
import Transactions from '@/components/transactions/Transactions';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import FinancialAnalytics from '@/components/analytics/FinancialAnalytics';
import TalkToAdvisor from '@/components/advisor/TalkToAdvisor';
import FestivalPlanning from '@/components/festivals/FestivalPlanning';
import InvestmentIntelligence from '@/components/investment/InvestmentIntelligence';
import FamilyManagement from '@/components/family/FamilyManagement';
import LearningCenter from '@/components/LearningCenter';
import LandingPage from '@/components/LandingPage';
import BlogAdminPanel from '@/components/blog/BlogAdminPanel';
import BlogSection from '@/components/blog/BlogSection';
import MainMenu from '@/components/menu/MainMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MAX_IDLE_TIME = 5 * 60 * 1000; // 5 minutes

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('landing');
  const { isAuthenticated, currentUser, logout } = useUserStore();
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const adminLoggedIn = isAdminLoggedIn();
  
  console.log('Index component rendered', { isAuthenticated, currentUser, path: location.pathname, adminLoggedIn });
  
  // Set current screen based on route path
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path) {
      console.log('Setting current screen from path:', path);
      setCurrentScreen(path);
    } else if (location.pathname === '/') {
      // Admin users go to blog management
      if (adminLoggedIn) {
        console.log('Admin detected, redirecting to blog');
        setCurrentScreen('blog');
        navigate('/blog');
      } else if (isAuthenticated) {
        // Regular authenticated users go to dashboard
        console.log('Setting current screen for authenticated user:', 'dashboard');
        setCurrentScreen('dashboard');
        navigate('/dashboard');
      } else {
        // Non-authenticated users go to landing
        console.log('Setting current screen for non-authenticated user:', 'landing');
        setCurrentScreen('landing');
        navigate('/landing');
      }
    }
  }, [location.pathname, isAuthenticated, navigate, adminLoggedIn]);
  
  // Handle user activity tracking for session timeout
  useEffect(() => {
    const resetTimer = () => {
      setLastActivityTime(Date.now());
    };
    
    // Add event listeners for user activity
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    
    // Check for session timeout
    const intervalId = setInterval(() => {
      const now = Date.now();
      if (isAuthenticated && now - lastActivityTime > MAX_IDLE_TIME) {
        console.log('Session timed out due to inactivity');
        handleLogout();
        toast.info("Your session has expired due to inactivity");
      }
    }, 10000); // Check every 10 seconds
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      clearInterval(intervalId);
    };
  }, [isAuthenticated, lastActivityTime]);
  
  // Start notification service when user is authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser?.profileCreated) {
      console.log('Starting notification service');
      notificationService.start();
    } else {
      console.log('Stopping notification service');
      notificationService.stop();
    }
    
    return () => {
      notificationService.stop();
    };
  }, [isAuthenticated, currentUser]);

  const handleLogout = () => {
    console.log('Logging out');
    logout();
    toast.success(
      language === 'en' 
        ? "Logged out successfully" 
        : language === 'hi' 
          ? "सफलतापूर्वक लॉग आउट किया गया" 
          : "Successfully logout ho gaye"
    );
    setCurrentScreen('landing');
    navigate('/landing');
  };
  
  // Non-authenticated landing page - now without duplicate header/footer
  if (!isAuthenticated && !adminLoggedIn && (currentScreen === 'landing' || location.pathname === '/landing')) {
    console.log('Rendering LandingPage');
    return <LandingPage />;
  }
  
  // Authentication screen
  if (!isAuthenticated && !adminLoggedIn && (currentScreen === 'login' || location.pathname === '/login')) {
    console.log('Rendering AuthForms');
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
                onChange={(e) => changeLanguage(asLanguageOption(e.target.value))}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
          </div>
          <AuthForms onSuccess={() => {
            console.log('Auth success');
            // Admin redirect to blog, regular users to dashboard
            if (isAdminLoggedIn()) {
              console.log('Admin logged in, redirecting to blog');
              setCurrentScreen('blog');
              navigate('/blog');
            } else {
              console.log('Regular user logged in, redirecting to dashboard');
              setCurrentScreen('dashboard');
              navigate('/dashboard');
            }
          }} defaultTab={location.state?.defaultTab || 'login'} />
        </div>
      </div>
    );
  }
  
  // Profile creation state for regular users
  if (isAuthenticated && currentUser && !currentUser.profileCreated && !adminLoggedIn) {
    console.log('Rendering ProfileCreation');
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
                onChange={(e) => changeLanguage(asLanguageOption(e.target.value))}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
          </div>
          <ProfileCreation onComplete={() => {
            console.log('Profile creation complete, navigating to dashboard');
            setCurrentScreen('dashboard');
            navigate('/dashboard');
          }} />
        </div>
      </div>
    );
  }
  
  // Onboarding state - fixed navigation flow
  if (currentScreen === 'onboarding') {
    console.log('Rendering OnboardingCarousel');
    return <OnboardingCarousel />;
  }

  if (currentScreen === 'goal-selection') {
    console.log('Rendering GoalSelection');
    return <GoalSelection />;
  }

  // Main authenticated interface
  const renderScreen = () => {
    console.log('Rendering screen:', currentScreen);
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
      case 'advisor':
        return <TalkToAdvisor />;
      case 'festival-planning':
        return <FestivalPlanning />;
      case 'investment-intelligence':
        return <InvestmentIntelligence />;
      case 'family-management':
        return <FamilyManagement />;
      case 'learning-center':
        return <LearningCenter />;
      default:
        return <Dashboard onChangeScreen={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header handleLogout={handleLogout} />
      
      <div className="container mx-auto px-4 pb-16">
        {renderScreen()}
        <Outlet />
      </div>
      
      {/* Main Menu */}
      <MainMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onChangeScreen={setCurrentScreen} />
      
      <Footer />
    </div>
  );
};

export default Index;
