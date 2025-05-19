
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  BarChart, 
  MessageCircle, 
  Target, 
  CalendarDays
} from 'lucide-react';

interface BottomTabsProps {
  currentScreen: string;
  onChangeScreen: (screen: string) => void;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({ currentScreen, onChangeScreen }) => {
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'budget', label: 'Budget', icon: BarChart },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  ];
  
  const handleTabClick = (screenId: string) => {
    onChangeScreen(screenId);
    navigate(`/${screenId}`);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-wealthveda-teal" : "text-gray-500"
              )}
              onClick={() => handleTabClick(tab.id)}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-wealthveda-teal" : "text-gray-500")} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
