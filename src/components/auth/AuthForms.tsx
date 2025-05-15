
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/contexts/LanguageContext';
import useUserStore from '@/lib/userStore';
import { toast } from "sonner";
import { loginAdmin } from '@/lib/adminService';

interface AuthFormsProps {
  onSuccess: () => void;
  defaultTab?: 'login' | 'signup';
}

const AuthForms: React.FC<AuthFormsProps> = ({ onSuccess, defaultTab = 'login' }) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const { login, register } = useUserStore();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      toast.error(language === 'en' 
        ? "Please fill in all fields" 
        : language === 'hi' 
          ? "कृपया सभी फ़ील्ड भरें" 
          : "Please saare fields fill karein");
      return;
    }
    
    // Check if this is an admin login attempt
    if (loginEmail === 'admin@wealthvani.com') {
      const isAdminLogin = loginAdmin(loginEmail, loginPassword);
      if (isAdminLogin) {
        toast.success(language === 'en' 
          ? "Welcome Admin!" 
          : language === 'hi' 
            ? "व्यवस्थापक का स्वागत है!" 
            : "Admin ka swagat hai!");
        onSuccess();
        return;
      }
    }
    
    // Regular user login
    const success = login(loginEmail, loginPassword);
    
    if (success) {
      toast.success(language === 'en' 
        ? "Login successful!" 
        : language === 'hi' 
          ? "लॉगिन सफल!" 
          : "Login successful!");
      onSuccess();
    } else {
      toast.error(language === 'en' 
        ? "Invalid email or password" 
        : language === 'hi' 
          ? "अमान्य ईमेल या पासवर्ड" 
          : "Invalid email ya password");
    }
  };
  
  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error(language === 'en' 
        ? "Please fill in all fields" 
        : language === 'hi' 
          ? "कृपया सभी फ़ील्ड भरें" 
          : "Please saare fields fill karein");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error(language === 'en' 
        ? "Passwords don't match" 
        : language === 'hi' 
          ? "पासवर्ड मेल नहीं खाते" 
          : "Passwords match nahin karte");
      return;
    }
    
    // Prevent admin email registration 
    if (email === 'admin@wealthvani.com') {
      toast.error(language === 'en' 
        ? "This email is reserved" 
        : language === 'hi' 
          ? "यह ईमेल आरक्षित है" 
          : "Yeh email reserved hai");
      return;
    }
    
    const success = register(email, password, name);
    
    if (success) {
      toast.success(language === 'en' 
        ? "Registration successful!" 
        : language === 'hi' 
          ? "पंजीकरण सफल!" 
          : "Registration successful!");
      onSuccess();
    } else {
      toast.error(language === 'en' 
        ? "Email already exists" 
        : language === 'hi' 
          ? "ईमेल पहले से मौजूद है" 
          : "Email already exist karta hai");
    }
  };
  
  return (
    <div>
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{t('login')}</TabsTrigger>
          <TabsTrigger value="signup">{t('signup')}</TabsTrigger>
        </TabsList>
        
        {/* Login Form */}
        <TabsContent value="login" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={language === 'en' ? "Enter your email" : language === 'hi' ? "अपना ईमेल दर्ज करें" : "Apna email darj karein"}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              placeholder={language === 'en' ? "Enter your password" : language === 'hi' ? "अपना पासवर्ड दर्ज करें" : "Apna password darj karein"}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Button 
            className="w-full bg-royal-blue hover:bg-royal-blue/90" 
            onClick={handleLogin}
          >
            {t('login')}
          </Button>
        </TabsContent>
        
        {/* Signup Form */}
        <TabsContent value="signup" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('full-name')}</Label>
            <Input
              id="name"
              placeholder={language === 'en' ? "Enter your full name" : language === 'hi' ? "अपना पूरा नाम दर्ज करें" : "Apna poora naam darj karein"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">{t('email')}</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder={language === 'en' ? "Enter your email" : language === 'hi' ? "अपना ईमेल दर्ज करें" : "Apna email darj karein"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">{t('password')}</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder={language === 'en' ? "Create a password" : language === 'hi' ? "एक पासवर्ड बनाएं" : "Ek password banaye"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">{t('confirm-password')}</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder={language === 'en' ? "Confirm your password" : language === 'hi' ? "अपने पासवर्ड की पुष्टि करें" : "Apne password ki pushtee karen"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button 
            className="w-full bg-royal-blue hover:bg-royal-blue/90" 
            onClick={handleSignup}
          >
            {t('signup')}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForms;
