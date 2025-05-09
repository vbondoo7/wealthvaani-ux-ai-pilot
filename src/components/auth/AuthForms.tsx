
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import useUserStore from '@/lib/userStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { predefinedUsers } from '@/lib/config';
import { useLanguage } from '@/contexts/LanguageContext';

export const LoginForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useUserStore();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', email);
    setIsLoading(true);
    
    // Short timeout to simulate API call and show loading state
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      
      if (success) {
        console.log('Login successful');
        toast.success(
          language === 'en' 
            ? "Login successful! Welcome back to Wealthवाणी!"
            : language === 'hi' 
              ? "लॉगिन सफल! वेल्थवाणी में आपका फिर से स्वागत है!"
              : "Login successful! Wealthवाणी mein aapka phir se swagat hai!"
        );
        
        // Navigate to onboarding for first time users or dashboard for returning users
        const user = useUserStore.getState().currentUser;
        if (user && !user.profileCreated) {
          console.log('Navigating to onboarding for new user');
          navigate('/onboarding');
        } else {
          console.log('Navigating to dashboard for returning user');
          navigate('/dashboard');
        }
        
        if (onSuccess) onSuccess();
      } else {
        console.log('Login failed');
        toast.error(
          language === 'en'
            ? "Invalid email or password. Please try again."
            : language === 'hi' 
              ? "अमान्य ईमेल या पासवर्ड। कृपया पुन: प्रयास करें।"
              : "Invalid email ya password. Please dobara try karein."
        );
      }
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          placeholder={language === 'en' ? "name@example.com" : language === 'hi' ? "नाम@उदाहरण.com" : "name@example.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">{t('password')}</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>{language === 'en' ? "Predefined accounts:" : language === 'hi' ? "पूर्वनिर्धारित खाते:" : "Predefined accounts:"}</p>
        <ul className="list-disc pl-5 mt-1">
          {predefinedUsers.map((user) => (
            <li key={user.id}>
              <button 
                type="button" 
                className="text-royal-blue underline"
                onClick={() => {
                  console.log('Selected predefined user:', user.name);
                  setEmail(user.email);
                  setPassword(user.password);
                }}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-royal-blue hover:bg-royal-blue/90"
        disabled={isLoading}
      >
        {isLoading 
          ? (language === 'en' ? "Logging in..." : language === 'hi' ? "लॉग इन हो रहा है..." : "Logging in...") 
          : t('login')}
      </Button>
    </form>
  );
};

export const SignUpForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register } = useUserStore();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt with:', { name, email });
    
    if (password !== confirmPassword) {
      toast.error(
        language === 'en'
          ? "Passwords do not match. Please ensure both passwords are the same."
          : language === 'hi'
            ? "पासवर्ड मेल नहीं खाते। कृपया सुनिश्चित करें कि दोनों पासवर्ड समान हैं।"
            : "Passwords match nahi karte. Please ensure dono passwords ek jaise hain."
      );
      return;
    }
    
    setIsLoading(true);
    
    // Short timeout to simulate API call and show loading state
    setTimeout(() => {
      const success = register(email, password, name);
      setIsLoading(false);
      
      if (success) {
        console.log('Registration successful');
        toast.success(
          language === 'en'
            ? "Account created successfully! Welcome to Wealthवाणी!"
            : language === 'hi'
              ? "खाता सफलतापूर्वक बनाया गया! वेल्थवाणी में आपका स्वागत है!"
              : "Account successfully create ho gaya! Wealthवाणी mein aapka swagat hai!"
        );
        
        // Navigate to onboarding for new users
        console.log('Navigating to onboarding after signup');
        navigate('/onboarding');
        
        if (onSuccess) onSuccess();
      } else {
        console.log('Registration failed');
        toast.error(
          language === 'en'
            ? "An account with this email already exists."
            : language === 'hi'
              ? "इस ईमेल वाला खाता पहले से मौजूद है।"
              : "Is email ka account pehle se maujood hai."
        );
      }
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('full-name')}</Label>
        <Input
          id="name"
          placeholder={language === 'en' ? "John Doe" : language === 'hi' ? "राम कुमार" : "John Doe"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          placeholder={language === 'en' ? "name@example.com" : language === 'hi' ? "नाम@उदाहरण.com" : "name@example.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">{t('password')}</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t('confirm-password')}</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-royal-blue hover:bg-royal-blue/90"
        disabled={isLoading}
      >
        {isLoading 
          ? (language === 'en' ? "Creating Account..." : language === 'hi' ? "खाता बना रहा है..." : "Account create ho raha hai...")
          : t('create-account')}
      </Button>
    </form>
  );
};

const AuthForms: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const location = useLocation();
  const { language, t } = useLanguage();
  // Check for defaultTab from navigation state or URL params
  const defaultTab = location.state?.defaultTab === 'signup' ? 'signup' : 'login';

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">{t('login')}</TabsTrigger>
        <TabsTrigger value="signup">{t('signup')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <LoginForm onSuccess={onSuccess} />
      </TabsContent>
      
      <TabsContent value="signup">
        <SignUpForm onSuccess={onSuccess} />
      </TabsContent>
    </Tabs>
  );
};

export default AuthForms;
