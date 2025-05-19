
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, ChartBar, MessageCircle, Sparkles } from "lucide-react";
import Logo from '@/components/logo/LogoExtended';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { isLanguage } from '@/lib/typeUtils';
import RotatingText from '@/components/ui/RotatingText';

const LandingPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [animatedSections, setAnimatedSections] = useState<string[]>([]);

  // Intersection observer for animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimatedSections(prev => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };
  
  const handleSignup = () => {
    navigate('/login', { state: { defaultTab: 'signup' } });
  };

  // Define the rotating phrases
  const rotatingPhrases = [
    "Digital Wealth Brain for Bharat's Middle-Class.",
    "Empowering Every Indian Family with Personalised Financial Guidance",
    "Built on a SMART AI That Plans. Advises. Cares. Like Family",
    "Like a CA in Your Pocket — Smarter, Faster, Always Available",
    "Simplifying Wealth — Personally, Proactively, Powerfully"
  ];

  return (
    <div className="min-h-screen bg-ivory-white mandala-pattern">
      {/* Hero Section */}
      <section id="hero-section" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-royal-blue/10 to-saffron-orange/10 py-16 md:py-24 px-6 relative">
        <div className="absolute inset-0 bg-[url('/assets/mandala-watermark.png')] bg-center bg-no-repeat bg-cover opacity-10 z-0"></div>
        <div className="max-w-5xl mx-auto z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <Logo size="lg" variant="full" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
              <span>{isLanguage(language, 'en') ? "Transform Your" : isLanguage(language, 'hi') ? "अपने वित्त को बदलें" : "Apne Finance Ko Transform Karein"}</span> 
              <span className="text-royal-blue"> {isLanguage(language, 'en') ? "Financial Future" : isLanguage(language, 'hi') ? "वित्तीय भविष्य" : "Financial Future"}</span>
            </h1>
            
            <RotatingText phrases={rotatingPhrases} className="mb-8" />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-royal-blue hover:bg-royal-blue/90 text-white text-lg font-medium"
                onClick={handleGetStarted}
              >
                {isLanguage(language, 'en') ? "Get Started" : isLanguage(language, 'hi') ? "शुरू करें" : "Shuru Karen"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg border-royal-blue text-royal-blue hover:bg-royal-blue/10"
                onClick={handleSignup}
              >
                {isLanguage(language, 'en') ? "Create Account" : isLanguage(language, 'hi') ? "खाता बनाएं" : "Account Banayein"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features-section" 
        className={`py-16 px-6 transition-all duration-700 ${
          animatedSections.includes('features-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-charcoal">
            {isLanguage(language, 'en') ? "Key Features" : isLanguage(language, 'hi') ? "मुख्य विशेषताएं" : "Key Features"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Sparkles />} 
              title={isLanguage(language, 'en') ? "Smart Recommendations" : isLanguage(language, 'hi') ? "स्मार्ट सिफारिशें" : "Smart Recommendations"}
              description={isLanguage(language, 'en')
                ? "Proactive insights and suggestions to optimize your finances."
                : isLanguage(language, 'hi')
                  ? "आपके वित्त को अनुकूलित करने के लिए सक्रिय अंतर्दृष्टि और सुझाव।"
                  : "Aapke finances ko optimize karne ke liye proactive insights aur suggestions."}
            />
            
            <FeatureCard 
              icon={<ChartBar />}
              title={isLanguage(language, 'en') ? "Financial Analytics" : isLanguage(language, 'hi') ? "वित्तीय विश्लेषिकी" : "Financial Analytics"}
              description={isLanguage(language, 'en')
                ? "Visualize and track your financial progress with intuitive dashboards."
                : isLanguage(language, 'hi')
                  ? "सहज डैशबोर्ड के साथ अपनी वित्तीय प्रगति को देखें और ट्रैक करें।"
                  : "Intuitive dashboards ke saath apni financial progress ko visualize aur track karein."}
            />
            
            <FeatureCard 
              icon={<Shield />}
              title={isLanguage(language, 'en') ? "Tax Planning" : isLanguage(language, 'hi') ? "कर नियोजन" : "Tax Planning"}
              description={isLanguage(language, 'en')
                ? "Optimize your taxes with personalized strategies and timely reminders."
                : isLanguage(language, 'hi')
                  ? "व्यक्तिगत रणनीतियों और समय पर अनुस्मारकों के साथ अपने करों को अनुकूलित करें।"
                  : "Personalized strategies aur timely reminders ke saath apne taxes ko optimize karein."}
            />
            
            <FeatureCard 
              icon={<MessageCircle />}
              title={isLanguage(language, 'en') ? "Multi-language Support" : isLanguage(language, 'hi') ? "बहु-भाषा समर्थन" : "Multi-language Support"}
              description={isLanguage(language, 'en')
                ? "Use our platform in English, Hindi, Hinglish and other Indian languages."
                : isLanguage(language, 'hi')
                  ? "हमारे प्लेटफॉर्म का उपयोग अंग्रेजी, हिंदी, हिंग्लिश और अन्य भारतीय भाषाओं में करें।"
                  : "Hamare platform ko English, Hindi, Hinglish aur doosri Indian languages mein use karein."}
            />
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-royal-blue/5 to-saffron-orange/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-charcoal">
            {isLanguage(language, 'en') ? "Your Personalized Financial Dashboard" : isLanguage(language, 'hi') ? "आपका व्यक्तिगत वित्तीय डैशबोर्ड" : "Aapka Personalized Financial Dashboard"}
          </h2>
          <p className="text-lg text-center mb-10 max-w-2xl mx-auto text-muted-foreground">
            {isLanguage(language, 'en')
              ? "Get a 360° view of your finances with our intelligent dashboard"
              : isLanguage(language, 'hi')
                ? "हमारे इंटेलिजेंट डैशबोर्ड के साथ अपने वित्त का 360° दृश्य प्राप्त करें"
                : "Hamare intelligent dashboard ke saath apne finances ka 360° view paayen"}
          </p>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
            <div className="aspect-[16/9] bg-[url('/assets/dashboard-preview.png')] bg-cover bg-center flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-t from-black/50 to-transparent p-8">
                <Button 
                  size="lg" 
                  className="bg-saffron-orange hover:bg-saffron-orange/90 text-white font-medium"
                  onClick={handleGetStarted}
                >
                  {isLanguage(language, 'en')
                    ? "Try It Now"
                    : isLanguage(language, 'hi')
                      ? "अभी आज़माएं"
                      : "Abhi Try Karein"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-charcoal">
            {isLanguage(language, 'en')
              ? "Ready to Transform Your Financial Future?"
              : isLanguage(language, 'hi')
                ? "क्या आप अपने वित्तीय भविष्य को बदलने के लिए तैयार हैं?"
                : "Kya Aap Apne Financial Future Ko Transform Karne Ke Liye Taiyaar Hain?"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {isLanguage(language, 'en')
              ? "Join thousands of Indian families who have already taken control of their finances with Wealthवाणी."
              : isLanguage(language, 'hi')
                ? "हजारों भारतीय परिवारों से जुड़ें जिन्होंने पहले ही Wealthवाणी के साथ अपने वित्त पर नियंत्रण ले लिया है।"
                : "Hazaaron Indian families se judein jinhone pehle hi Wealthवाणी ke saath apne finances pe control le liya hai."}
          </p>
          <Button 
            size="lg" 
            className="bg-saffron-orange hover:bg-saffron-orange/90 text-white font-medium"
            onClick={handleSignup}
          >
            {isLanguage(language, 'en')
              ? "Create Your Free Account"
              : isLanguage(language, 'hi')
                ? "अपना निःशुल्क खाता बनाएं"
                : "Apna Free Account Banayein"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm transition-transform duration-500 hover:-translate-y-2">
      <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
        <div className="h-6 w-6 text-royal-blue">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-charcoal">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default LandingPage;
