
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, ChartBar, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import RotatingText from '@/components/ui/RotatingText';
import { asLanguageOption } from '@/lib/typeUtils';

const Marketing: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
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
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
              <span>{language === 'en' ? "Transform Your" : language === 'hi' ? "अपने वित्त को बदलें" : "Apne Finance Ko Transform Karein"}</span> 
              <span className="text-royal-blue"> {language === 'en' ? "Financial Future" : language === 'hi' ? "वित्तीय भविष्य" : "Financial Future"}</span>
            </h1>
            
            <RotatingText phrases={rotatingPhrases} className="mb-8" />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-royal-blue hover:bg-royal-blue/90 text-white text-lg font-medium"
                onClick={handleLoginClick}
              >
                {t('get-started')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg border-royal-blue text-royal-blue hover:bg-royal-blue/10"
                onClick={handleSignupClick}
              >
                {t('create-account')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid Section */}
      <section className="py-16 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-charcoal">
            {language === 'en' 
              ? "Our Services" 
              : language === 'hi' 
                ? "हमारी सेवाएं" 
                : "Hamari Services"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="wealth-card">
              <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
                <ChartBar className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {language === 'en' 
                  ? "Financial Planning" 
                  : language === 'hi' 
                    ? "वित्तीय नियोजन" 
                    : "Financial Planning"}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Personalized financial plans that adapt to your life's changing needs."
                  : language === 'hi'
                    ? "व्यक्तिगत वित्तीय योजनाएं जो आपके जीवन की बदलती जरूरतों के अनुकूल होती हैं।"
                    : "Personalized financial plans jo aapki life ki changing needs ke saath adapt karte hain."}
              </p>
            </div>
            
            <div className="wealth-card">
              <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
                <Shield className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {language === 'en' 
                  ? "Investment Advisor" 
                  : language === 'hi' 
                    ? "निवेश सलाहकार" 
                    : "Investment Advisor"}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Smart investment recommendations based on your goals and risk tolerance."
                  : language === 'hi'
                    ? "आपके लक्ष्यों और जोखिम सहनशीलता के आधार पर स्मार्ट निवेश सिफारिशें।"
                    : "Smart investment recommendations based on aapke goals aur risk tolerance."}
              </p>
            </div>
            
            <div className="wealth-card">
              <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
                <MessageCircle className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {language === 'en' 
                  ? "Financial AI Assistant" 
                  : language === 'hi' 
                    ? "वित्तीय एआई सहायक" 
                    : "Financial AI Assistant"}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Chat with our AI assistant about any financial query in simple language."
                  : language === 'hi'
                    ? "सरल भाषा में किसी भी वित्तीय प्रश्न के बारे में हमारे एआई सहायक से चैट करें।"
                    : "Simple language mein kisi bhi financial query ke baare mein hamare AI assistant se chat karein."}
              </p>
            </div>
            
            <div className="wealth-card">
              <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
                <Sparkles className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {language === 'en' 
                  ? "Smart Recommendations" 
                  : language === 'hi' 
                    ? "स्मार्ट सिफारिशें" 
                    : "Smart Recommendations"}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Proactive insights and suggestions to optimize your finances."
                  : language === 'hi'
                    ? "आपके वित्त को अनुकूलित करने के लिए सक्रिय अंतर्दृष्टि और सुझाव।"
                    : "Aapke finances ko optimize karne ke liye proactive insights aur suggestions."}
              </p>
            </div>
            
            <div className="wealth-card">
              <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
                <ChartBar className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {language === 'en' 
                  ? "Financial Analytics" 
                  : language === 'hi' 
                    ? "वित्तीय विश्लेषिकी" 
                    : "Financial Analytics"}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Visualize and track your financial progress with intuitive dashboards."
                  : language === 'hi'
                    ? "सहज डैशबोर्ड के साथ अपनी वित्तीय प्रगति को देखें और ट्रैक करें।"
                    : "Intuitive dashboards ke saath apni financial progress ko visualize aur track karein."}
              </p>
            </div>
            
            <div className="wealth-card">
              <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
                <Shield className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {language === 'en' 
                  ? "Tax Planning" 
                  : language === 'hi' 
                    ? "कर नियोजन" 
                    : "Tax Planning"}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Optimize your taxes with personalized strategies and timely reminders."
                  : language === 'hi'
                    ? "व्यक्तिगत रणनीतियों और समय पर अनुस्मारकों के साथ अपने करों को अनुकूलित करें।"
                    : "Personalized strategies aur timely reminders ke saath apne taxes ko optimize karein."}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-charcoal">
            {language === 'en'
              ? "Ready to Transform Your Financial Future?"
              : language === 'hi'
                ? "क्या आप अपने वित्तीय भविष्य को बदलने के लिए तैयार हैं?"
                : "Kya Aap Apne Financial Future Ko Transform Karne Ke Liye Taiyaar Hain?"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? "Join thousands of Indian families who have already taken control of their finances with Wealthवाणी."
              : language === 'hi'
                ? "हजारों भारतीय परिवारों से जुड़ें जिन्होंने पहले ही Wealthवाणी के साथ अपने वित्त पर नियंत्रण ले लिया है।"
                : "Hazaaron Indian families se judein jinhone pehle hi Wealthवाणी ke saath apne finances pe control le liya hai."}
          </p>
          <Button 
            size="lg" 
            className="bg-saffron-orange hover:bg-saffron-orange/90 text-white font-medium"
            onClick={handleSignupClick}
          >
            {language === 'en'
              ? "Create Your Free Account"
              : language === 'hi'
                ? "अपना निःशुल्क खाता बनाएं"
                : "Apna Free Account Banayein"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Menu Links Section - Consistent with Landing page */}
      <section className="py-8 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="ghost" 
              className="flex flex-col items-center py-4"
              onClick={() => navigate('/about')}
            >
              <Shield className="h-6 w-6 mb-2 text-royal-blue" />
              <span>{language === 'en' ? "About Us" : language === 'hi' ? "हमारे बारे में" : "About Us"}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex flex-col items-center py-4"
              onClick={() => navigate('/services')}
            >
              <ChartBar className="h-6 w-6 mb-2 text-royal-blue" />
              <span>{language === 'en' ? "Services" : language === 'hi' ? "सेवाएं" : "Services"}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex flex-col items-center py-4"
              onClick={() => navigate('/features')}
            >
              <Sparkles className="h-6 w-6 mb-2 text-royal-blue" />
              <span>{language === 'en' ? "Features" : language === 'hi' ? "सुविधाएं" : "Features"}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex flex-col items-center py-4"
              onClick={() => navigate('/pricing')}
            >
              <MessageCircle className="h-6 w-6 mb-2 text-royal-blue" />
              <span>{language === 'en' ? "Pricing" : language === 'hi' ? "मूल्य निर्धारण" : "Pricing"}</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketing;
