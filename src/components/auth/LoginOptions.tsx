
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { predefinedUsers } from '@/lib/config';
import { User, BadgeIndianRupee, Wallet } from 'lucide-react';

interface LoginOptionsProps {
  onSelectUser: (email: string, password: string) => void;
}

const LoginOptions: React.FC<LoginOptionsProps> = ({ onSelectUser }) => {
  const { language } = useLanguage();
  
  // Filter out admin user
  const demoUsers = predefinedUsers.filter(user => !user.isAdmin).map(user => ({
    name: user.name,
    email: user.email,
    password: user.password || 'password123',
    subscription: user.subscription?.plan || 'Basic'
  }));
  
  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'Premium': return 'bg-saffron-orange/10 text-saffron-orange';
      case 'Pro': return 'bg-royal-blue/10 text-royal-blue';
      default: return 'bg-emerald-500/10 text-emerald-500';
    }
  };

  return (
    <div className="mt-6">
      <p className="text-base font-medium mb-3 text-gray-700">
        {language === 'en' 
          ? "Sample accounts:" 
          : language === 'hi' 
            ? "नमूना खाते:" 
            : "Sample accounts:"}
      </p>
      <div className="space-y-2 bg-muted/50 rounded-lg p-3">
        {demoUsers.map((user) => (
          <div 
            key={user.email} 
            onClick={() => onSelectUser(user.email, user.password)}
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors cursor-pointer border border-transparent hover:border-muted-foreground/20"
          >
            <div className="w-10 h-10 rounded-full bg-royal-blue/20 flex items-center justify-center">
              <User className="h-5 w-5 text-royal-blue" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className={`text-xs px-2.5 py-1 rounded-full ${getPlanColor(user.subscription)}`}>
              {user.subscription === 'Premium' ? (
                <div className="flex items-center">
                  <BadgeIndianRupee className="h-3 w-3 mr-1" />
                  <span>{user.subscription}</span>
                </div>
              ) : user.subscription === 'Pro' ? (
                <div className="flex items-center">
                  <Wallet className="h-3 w-3 mr-1" />
                  <span>{user.subscription}</span>
                </div>
              ) : (
                <span>{user.subscription}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        {language === 'en'
          ? "Click on a user to auto-fill login details"
          : language === 'hi'
            ? "लॉगिन विवरण स्वचालित रूप से भरने के लिए उपयोगकर्ता पर क्लिक करें"
            : "Login details auto-fill karne ke liye user par click karein"}
      </p>
    </div>
  );
};

export default LoginOptions;
