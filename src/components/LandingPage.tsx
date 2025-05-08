
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, ChartBar, MessageCircle, Sparkles } from "lucide-react";
import Logo from '@/components/logo/Logo';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <ChartBar className="h-8 w-8 text-wealthveda-teal" />,
      title: "Smart Financial Planning",
      description: "AI-powered insights and personalized financial planning that grows with you."
    },
    {
      icon: <Shield className="h-8 w-8 text-wealthveda-indigo" />,
      title: "Secure & Private",
      description: "Your financial data stays encrypted and private with robust security measures."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-wealthveda-saffron" />,
      title: "Financial AI Companion",
      description: "Chat with our AI assistant about budgets, investments, or financial queries in simple language."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-wealthveda-teal" />,
      title: "Proactive Insights",
      description: "Get proactive nudges and recommendations tailored to your spending patterns."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wealthveda-indigo/5 to-wealthveda-teal/5">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 transform scale-150">
              <Logo size="lg" variant="full" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your AI-Powered Financial Partner
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Making every Indian household financially intelligent and self-reliant using AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-wealthveda-indigo hover:bg-wealthveda-indigo/90 text-lg"
                onClick={() => navigate('/login')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg"
                onClick={() => navigate('/login', { state: { defaultTab: 'signup' }})}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-6 border rounded-xl bg-wealthveda-indigo/5">
              <h2 className="text-2xl font-bold mb-3 text-wealthveda-indigo">Our Vision</h2>
              <p className="text-lg">
                To make every Indian household financially intelligent and self-reliant using AI.
              </p>
            </div>
            
            <div className="p-6 border rounded-xl bg-wealthveda-teal/5">
              <h2 className="text-2xl font-bold mb-3 text-wealthveda-teal">Our Mission</h2>
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
          <h2 className="text-3xl font-bold text-center mb-12">How Wealthवाणी Works for You</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-wealthveda-teal hover:bg-wealthveda-teal/90"
              onClick={() => navigate('/login')}
            >
              Start Your Financial Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Your AI-powered financial planner
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; 2025 Wealthवाणी. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
