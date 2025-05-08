
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, ChartBar, MessageCircle, Sparkles, Globe, Sun } from "lucide-react";
import Logo from '@/components/logo/Logo';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <ChartBar className="h-8 w-8 text-royal-blue" />,
      title: "Smart Financial Planning",
      description: "AI-powered insights and personalized financial planning that grows with you."
    },
    {
      icon: <Shield className="h-8 w-8 text-teal" />,
      title: "Secure & Private",
      description: "Your financial data stays encrypted and private with robust security measures."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-saffron-orange" />,
      title: "Financial AI Companion",
      description: "Chat with our AI assistant about budgets, investments, or financial queries in simple language."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-royal-blue" />,
      title: "Proactive Insights",
      description: "Get proactive nudges and recommendations tailored to your spending patterns."
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-white mandala-pattern">
      {/* Navigation */}
      <nav className="py-4 px-6 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Globe className="h-4 w-4 text-royal-blue" />
              <select className="text-sm border-none bg-transparent focus:ring-0">
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
            <Button 
              variant="outline"
              className="text-royal-blue border-royal-blue hover:bg-royal-blue/10"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 transform scale-150">
              <Logo size="lg" variant="full" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
              <span>India's First</span> 
              <span className="text-royal-blue"> Proactive Wealth Companion</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Your personal CA empowering every Indian family to achieve financial freedom.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-royal-blue hover:bg-royal-blue/90 text-white text-lg font-medium"
                onClick={() => navigate('/login')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg border-royal-blue text-royal-blue hover:bg-royal-blue/10"
                onClick={() => navigate('/login', { state: { defaultTab: 'signup' }})}
              >
                Create Account
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm py-1 px-4 rounded-full text-sm flex items-center gap-2">
                <Sun className="h-4 w-4 text-saffron-orange" />
                <span>Trusted by 10,000+ Indian families</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission Section */}
      <section className="py-16 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="wealth-card-primary">
              <h2 className="text-2xl font-bold mb-3 text-royal-blue flex items-center gap-2">
                <div className="h-6 w-1 bg-royal-blue rounded-full"></div>
                Our Vision
              </h2>
              <p className="text-lg">
                To make every Indian household financially intelligent and self-reliant using AI.
              </p>
            </div>
            
            <div className="wealth-card-accent">
              <h2 className="text-2xl font-bold mb-3 text-saffron-orange flex items-center gap-2">
                <div className="h-6 w-1 bg-saffron-orange rounded-full"></div>
                Our Mission
              </h2>
              <p className="text-lg">
                To democratize financial literacy and wealth management by offering an AI-powered financial planner that plans, advises, and acts.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-charcoal">How <span className="text-royal-blue">Wealth</span><span className="text-saffron-orange hindi-text">वाणी</span> Works for You</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Combining the wisdom of traditional Indian financial principles with cutting-edge AI technology
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="wealth-card hover:translate-y-[-5px] transition-transform duration-300">
                <div className="mb-4 bg-gradient-to-br from-ivory-white to-white p-3 rounded-lg inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-charcoal">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-saffron-orange hover:bg-saffron-orange/90 text-white font-medium"
              onClick={() => navigate('/login')}
            >
              Start Your Financial Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Your AI-powered financial planner
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <select className="text-sm border-none bg-transparent focus:ring-0 md:hidden">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="hinglish">Hinglish</option>
            </select>
            <div className="text-sm text-muted-foreground">
              &copy; 2025 Wealthवाणी. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
