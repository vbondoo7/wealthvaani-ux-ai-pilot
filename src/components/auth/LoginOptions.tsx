
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface LoginOption {
  name: string;
  email: string;
  password: string;
  description: string;
}

interface LoginOptionsProps {
  onSelectUser: (email: string, password: string) => void;
}

const LoginOptions: React.FC<LoginOptionsProps> = ({ onSelectUser }) => {
  const { language } = useLanguage();
  
  const demoUsers: LoginOption[] = [
    {
      name: "Vishal Kumar",
      email: "vishal@example.com",
      password: "password123",
      description: language === 'en' 
        ? "Basic Plan User - Has 2 goals" 
        : language === 'hi' 
          ? "बेसिक प्लान उपयोगकर्ता - 2 लक्ष्य हैं" 
          : "Basic Plan User - 2 goals hai"
    },
    {
      name: "Priya Sharma",
      email: "priya@example.com",
      password: "password123",
      description: language === 'en' 
        ? "Pro Plan User - Has 4 goals" 
        : language === 'hi' 
          ? "प्रो प्लान उपयोगकर्ता - 4 लक्ष्य हैं" 
          : "Pro Plan User - 4 goals hai"
    },
    {
      name: "Admin",
      email: "admin@wealthvani.com",
      password: "Vishal#123",
      description: language === 'en' 
        ? "Admin User - Full access" 
        : language === 'hi' 
          ? "व्यवस्थापक - पूर्ण पहुंच" 
          : "Admin User - Full access"
    }
  ];

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-sm font-medium text-center text-muted-foreground">
        {language === 'en' 
          ? "Demo Accounts (Click to autofill)" 
          : language === 'hi' 
            ? "डेमो खाते (स्वतः भरने के लिए क्लिक करें)" 
            : "Demo Accounts (Autofill ke liye click karein)"}
      </h3>
      <div className="grid gap-3">
        {demoUsers.map((user) => (
          <Card 
            key={user.email} 
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => onSelectUser(user.email, user.password)}
          >
            <CardContent className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.description}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 sm:mt-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectUser(user.email, user.password);
                }}
              >
                {language === 'en' 
                  ? "Use This" 
                  : language === 'hi' 
                    ? "इसका उपयोग करें" 
                    : "Use karein"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoginOptions;
