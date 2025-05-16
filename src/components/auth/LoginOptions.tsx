
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { predefinedUsers } from '@/lib/config';
import { User as UserIcon } from 'lucide-react';

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
            className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-royal-blue/20 flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-royal-blue" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="text-xs px-2 py-0.5 rounded-full bg-royal-blue/10 text-royal-blue">
              {user.subscription}
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
