
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/logo/Logo';
import useUserStore from '@/lib/userStore';
import {
  Home,
  BarChart,
  Calendar,
  Users,
  User,
  Settings,
  LogOut,
  BadgeIndianRupee,
  CreditCard,
  Gift,
  MessageCircle,
  BookOpen,
  PhoneCall
} from "lucide-react";

interface MainMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeScreen: (screen: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ isOpen, onClose, onChangeScreen }) => {
  const { currentUser, logout } = useUserStore();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const isPremiumUser = currentUser?.subscription.plan === 'Premium';
  const isProUser = currentUser?.subscription.plan === 'Pro';
  
  const handleNavigation = (screen: string) => {
    onChangeScreen(screen);
    navigate(`/${screen}`);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/landing');
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader className="text-left">
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col justify-between h-[calc(100%-64px)]">
          <div className="py-4">
            {/* Primary Navigation */}
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('dashboard')}
              >
                <Home className="mr-2 h-4 w-4" />
                {t('dashboard')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('goals')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t('goals')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('banking')}
              >
                <BadgeIndianRupee className="mr-2 h-4 w-4" />
                {t('banking')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('budget')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {t('budget')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('analytics')}
              >
                <BarChart className="mr-2 h-4 w-4" />
                {t('analytics')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('chat')}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t('chat')}
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            {/* New Features */}
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('advisor')}
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                Talk to Advisor
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('festival-planning')}
              >
                <Gift className="mr-2 h-4 w-4" />
                Festival Planning
                {(isProUser || isPremiumUser) && (
                  <Badge variant="outline" className="ml-auto">Pro</Badge>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('investment-intelligence')}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Investment Intelligence
                {(isProUser || isPremiumUser) && (
                  <Badge variant="outline" className="ml-auto">Pro</Badge>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('family-management')}
              >
                <Users className="mr-2 h-4 w-4" />
                Family Management
                {isPremiumUser && (
                  <Badge variant="outline" className="ml-auto">Premium</Badge>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('learning-center')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Learning Center
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            {/* Account & Settings */}
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('profile')}
              >
                <User className="mr-2 h-4 w-4" />
                {t('profile')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('subscription')}
              >
                <Badge className="mr-2 h-4 w-4" />
                Subscription Plan
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('notifications')}
              >
                <Settings className="mr-2 h-4 w-4" />
                {t('settings')}
              </Button>
            </div>
          </div>
          
          {/* Logout */}
          <div className="pt-2 pb-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t('logout')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MainMenu;
