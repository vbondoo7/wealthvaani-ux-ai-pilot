import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { loginUser, registerUser } from '@/lib/authService';
import { isLanguage } from '@/lib/typeUtils';

type DefaultTab = 'login' | 'signup';

const AuthForms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<DefaultTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form state for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form state for signup
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Initialize the active tab based on URL state
  useEffect(() => {
    if (location.state && location.state.defaultTab === 'signup') {
      setActiveTab('signup');
    }
  }, [location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const user = await loginUser(loginEmail, loginPassword);
      toast({
        title: isLanguage(language, 'en') 
          ? "Login successful" 
          : isLanguage(language, 'hi') 
            ? "लॉगिन सफल" 
            : "Login successful",
        description: isLanguage(language, 'en')
          ? "Welcome back to Wealthवाणी!"
          : isLanguage(language, 'hi')
            ? "वेल्थवाणी में आपका स्वागत है!"
            : "Wealthवाणी mein aapka swagat hai!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: isLanguage(language, 'en')
          ? "Failed to login"
          : isLanguage(language, 'hi')
            ? "लॉगिन विफल"
            : "Login fail ho gaya",
        description: typeof error === 'string' ? error : 
          isLanguage(language, 'en')
            ? "Please check your credentials and try again."
            : isLanguage(language, 'hi')
              ? "कृपया अपने क्रेडेंशियल्स की जांच करें और पुन: प्रयास करें।"
              : "Apne credentials check karein aur dobara try karein.",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: isLanguage(language, 'en')
          ? "Passwords do not match"
          : isLanguage(language, 'hi')
            ? "पासवर्ड मेल नहीं खाते"
            : "Passwords match nahi karte",
      });
      return;
    }

    setIsRegistering(true);

    try {
      await registerUser(fullName, signupEmail, signupPassword);
      toast({
        title: isLanguage(language, 'en')
          ? "Account created"
          : isLanguage(language, 'hi')
            ? "खाता बनाया गया"
            : "Account create ho gaya",
        description: isLanguage(language, 'en')
          ? "You can now login with your new account."
          : isLanguage(language, 'hi')
            ? "अब आप अपने नए खाते से लॉगिन कर सकते हैं।"
            : "Ab aap apne new account se login kar sakte hain.",
      });
      setActiveTab('login');
      setLoginEmail(signupEmail);
      setLoginPassword(signupPassword);
    } catch (error) {
      toast({
        variant: "destructive",
        title: isLanguage(language, 'en')
          ? "Failed to register"
          : isLanguage(language, 'hi')
            ? "पंजीकरण विफल"
            : "Registration fail ho gaya",
        description: typeof error === 'string' ? error :
          isLanguage(language, 'en') 
            ? "Please try again with different information."
            : isLanguage(language, 'hi')
              ? "कृपया अलग जानकारी के साथ पुनः प्रयास करें।"
              : "Doosri information ke saath dobara try karein.",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="max-w-md w-full">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DefaultTab)} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="login">
            {isLanguage(language, 'en') ? "Login" : isLanguage(language, 'hi') ? "लॉगिन" : "Login"}
          </TabsTrigger>
          <TabsTrigger value="signup">
            {isLanguage(language, 'en') ? "Sign Up" : isLanguage(language, 'hi') ? "साइन अप" : "Sign Up"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {isLanguage(language, 'en') ? "Email" : isLanguage(language, 'hi') ? "ईमेल" : "Email"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={
                    isLanguage(language, 'en') 
                      ? "Enter your email" 
                      : isLanguage(language, 'hi')
                        ? "अपना ईमेल दर्ज करें"
                        : "Apna email daalein"
                  }
                  className="pl-10"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                {isLanguage(language, 'en') ? "Password" : isLanguage(language, 'hi') ? "पासवर्ड" : "Password"}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    isLanguage(language, 'en') 
                      ? "Enter your password" 
                      : isLanguage(language, 'hi')
                        ? "अपना पासवर्ड दर्ज करें"
                        : "Apna password daalein"
                  }
                  className="pl-10"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-10" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-royal-blue hover:bg-royal-blue/90" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="animate-pulse">
                  {isLanguage(language, 'en') ? "Logging in..." : isLanguage(language, 'hi') ? "लॉग इन हो रहा है..." : "Logging in..."}
                </span>
              ) : (
                <span>
                  {isLanguage(language, 'en') ? "Log In" : isLanguage(language, 'hi') ? "लॉग इन" : "Log In"}
                </span>
              )}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">
                {isLanguage(language, 'en') ? "Full Name" : isLanguage(language, 'hi') ? "पूरा नाम" : "Full Name"}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="full-name" 
                  type="text" 
                  placeholder={
                    isLanguage(language, 'en') 
                      ? "Enter your full name" 
                      : isLanguage(language, 'hi')
                        ? "अपना पूरा नाम दर्ज करें"
                        : "Apna pura naam daalein"
                  }
                  className="pl-10"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">
                {isLanguage(language, 'en') ? "Email" : isLanguage(language, 'hi') ? "ईमेल" : "Email"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder={
                    isLanguage(language, 'en') 
                      ? "Enter your email" 
                      : isLanguage(language, 'hi')
                        ? "अपना ईमेल दर्ज करें"
                        : "Apna email daalein"
                  }
                  className="pl-10"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">
                {isLanguage(language, 'en') ? "Password" : isLanguage(language, 'hi') ? "पासवर्ड" : "Password"}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    isLanguage(language, 'en') 
                      ? "Create a password" 
                      : isLanguage(language, 'hi')
                        ? "एक पासवर्ड बनाएं"
                        : "Ek password banayein"
                  }
                  className="pl-10"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-10" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                {isLanguage(language, 'en') ? "Confirm Password" : isLanguage(language, 'hi') ? "पासवर्ड की पुष्टि करें" : "Confirm Password"}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={
                    isLanguage(language, 'en') 
                      ? "Confirm your password" 
                      : isLanguage(language, 'hi')
                        ? "अपने पासवर्ड की पुष्टि करें"
                        : "Apne password ki pusti karein"
                  }
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-10" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-saffron-orange hover:bg-saffron-orange/90" 
              disabled={isRegistering}
            >
              {isRegistering ? (
                <span className="animate-pulse">
                  {isLanguage(language, 'en') ? "Creating account..." : isLanguage(language, 'hi') ? "खाता बना रहा है..." : "Creating account..."}
                </span>
              ) : (
                <span>
                  {isLanguage(language, 'en') ? "Create Account" : isLanguage(language, 'hi') ? "खाता बनाएं" : "Create Account"}
                </span>
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForms;
