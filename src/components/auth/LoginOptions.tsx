
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { predefinedUsers } from '@/lib/config';

interface LoginOptionsProps {
  onSelectUser: (email: string, password: string) => void;
}

const LoginOptions: React.FC<LoginOptionsProps> = ({ onSelectUser }) => {
  const { language } = useLanguage();
  
  // Filter out admin user
  const demoUsers = predefinedUsers.filter(user => !user.isAdmin).map(user => ({
    name: user.name,
    email: user.email,
    password: user.password || 'password123'
  }));

  return (
    <div className="mt-6">
      <p className="text-base font-medium mb-2 text-gray-700">
        {language === 'en' 
          ? "Predefined accounts:" 
          : language === 'hi' 
            ? "पूर्वनिर्धारित खाते:" 
            : "Predefined accounts:"}
      </p>
      <ul className="list-disc pl-5 space-y-2">
        {demoUsers.map((user) => (
          <li key={user.email} className="text-royal-blue">
            <button 
              className="text-royal-blue hover:underline font-medium"
              onClick={() => onSelectUser(user.email, user.password)}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoginOptions;
