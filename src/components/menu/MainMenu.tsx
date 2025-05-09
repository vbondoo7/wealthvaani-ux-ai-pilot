
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  Info,
  PhoneCall,
  HelpCircle,
  Package,
  LogOut,
  ArrowUp,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useUserStore from '@/lib/userStore';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo/Logo';

interface MainMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeScreen: (screen: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ isOpen, onClose, onChangeScreen }) => {
  const { currentUser, logout } = useUserStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  if (!currentUser) return null;
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate('/landing');
  };
  
  const openFinancialLearnings = () => {
    window.open('https://www.youtube.com/watch?v=2Aosql_3vBY&list=PLvJNSf-7NfrNxtRMOGbQ_mlMwHfq56x-S', '_blank');
  };
  
  return (
    <div 
      className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div 
        className={`absolute top-0 left-0 h-full w-3/4 max-w-[320px] bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <Logo />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-wealthveda-indigo/10 flex items-center justify-center">
              <span className="text-wealthveda-indigo font-bold text-lg">
                {currentUser.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-medium">{currentUser.name}</h3>
              <p className="text-xs text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-wealthveda-indigo/10 rounded-full">
            <div className="w-3 h-3 rounded-full bg-wealthveda-indigo" />
            <span className="text-xs font-medium text-wealthveda-indigo">
              {currentUser.subscription.plan} Plan
            </span>
          </div>
        </div>
        
        <div className="p-4 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-left"
            onClick={() => {
              onChangeScreen('profile');
              onClose();
            }}
          >
            <User size={18} />
            Profile Settings
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-left"
            onClick={() => {
              onChangeScreen('analytics');
              onClose();
            }}
          >
            <Info size={18} />
            Key Details & Reports
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-left"
            onClick={openFinancialLearnings}
          >
            <Book size={18} />
            Financial Learning
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-left"
            onClick={() => {
              toast({
                title: "Contact Support",
                description: "You can reach us at support@wealthvani.com or call 1800-123-4567",
              });
              onClose();
            }}
          >
            <PhoneCall size={18} />
            Contact Support
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-left"
            onClick={() => {
              toast({
                title: "Help Center",
                description: "Our support team will get back to you within 24 hours",
              });
              onClose();
            }}
          >
            <HelpCircle size={18} />
            Help & FAQs
          </Button>
        </div>
        
        <Separator />
        
        <div className="p-4 space-y-4">
          <h3 className="font-medium text-sm px-3">Your Subscription</h3>
          
          <div className="bg-muted/30 rounded-lg p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{currentUser.subscription.plan} Plan</span>
              <span className="text-xs bg-wealthveda-indigo/10 text-wealthveda-indigo px-2 py-0.5 rounded">
                {currentUser.subscription.plan === 'Basic' ? 'Free' : `₹${currentUser.subscription.pricePerMonth}/month`}
              </span>
            </div>
            
            <div className="space-y-1 text-sm">
              {currentUser.subscription.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-wealthveda-indigo" />
                  <span className="text-muted-foreground">{feature.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
            
            {currentUser.subscription.plan !== 'Premium' && (
              <Button 
                className="w-full bg-wealthveda-teal hover:bg-wealthveda-teal/90 gap-2"
                onClick={() => {
                  onChangeScreen('subscription');
                  onClose();
                }}
              >
                <ArrowUp size={16} />
                Upgrade Plan
              </Button>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
