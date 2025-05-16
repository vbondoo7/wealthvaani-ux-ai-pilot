
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, ChartBar, MessageCircle, Sparkles, Info, BookOpen, Briefcase } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import RotatingText from '@/components/ui/RotatingText';
import { isLanguage } from '@/lib/typeUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Marketing: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("vision");
  const [animatedSections, setAnimatedSections] = useState<string[]>([]);

  // Intersection observer for animations
  useEffect(() => {
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
      {/* Sticky Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b py-4">
        <div className="container mx-auto">
          <Tabs 
            defaultValue="vision" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-between sm:justify-start sm:gap-4">
              <TabsTrigger value="vision" onClick={() => document.getElementById('vision-section')?.scrollIntoView({ behavior: 'smooth' })}>
                <Info className="h-4 w-4 mr-2" />
                {isLanguage(language, 'en') ? "Our Vision" : isLanguage(language, 'hi') ? "हमारी दृष्टि" : "Hamara Vision"}
              </TabsTrigger>
              <TabsTrigger value="about" onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}>
                <Shield className="h-4 w-4 mr-2" />
                {isLanguage(language, 'en') ? "About Us" : isLanguage(language, 'hi') ? "हमारे बारे में" : "About Us"}
              </TabsTrigger>
              <TabsTrigger value="services" onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}>
                <Briefcase className="h-4 w-4 mr-2" />
                {isLanguage(language, 'en') ? "Services" : isLanguage(language, 'hi') ? "सेवाएं" : "Services"}
              </TabsTrigger>
              <TabsTrigger value="features" onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}>
                <Sparkles className="h-4 w-4 mr-2" />
                {isLanguage(language, 'en') ? "Features" : isLanguage(language, 'hi') ? "सुविधाएं" : "Features"}
              </TabsTrigger>
              <TabsTrigger value="blog" onClick={() => navigate('/blog')}>
                <BookOpen className="h-4 w-4 mr-2" />
                {isLanguage(language, 'en') ? "Blog" : isLanguage(language, 'hi') ? "ब्लॉग" : "Blog"}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
  
      {/* Hero Section */}
      <section id="hero-section" className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
              <span>{isLanguage(language, 'en') ? "Transform Your" : isLanguage(language, 'hi') ? "अपने वित्त को बदलें" : "Apne Finance Ko Transform Karein"}</span> 
              <span className="text-royal-blue"> {isLanguage(language, 'en') ? "Financial Future" : isLanguage(language, 'hi') ? "वित्तीय भविष्य" : "Financial Future"}</span>
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
      
      {/* Vision & Mission Section */}
      <section 
        id="vision-section" 
        className={`py-16 px-6 bg-white/60 backdrop-blur-sm transition-all duration-700 ${
          animatedSections.includes('vision-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        onMouseEnter={() => setActiveTab("vision")}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-charcoal">
            {isLanguage(language, 'en') ? "Our Vision & Mission" : isLanguage(language, 'hi') ? "हमारी दृष्टि और मिशन" : "Hamara Vision & Mission"}
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="wealth-card-primary transition-transform duration-500" style={{transitionDelay: "200ms"}}>
              <h3 className="text-2xl font-bold mb-3 text-royal-blue flex items-center gap-2">
                <div className="h-6 w-1 bg-royal-blue rounded-full"></div>
                {t('vision')}
              </h3>
              <p className="text-lg">
                {isLanguage(language, 'en')
                  ? "To make every Indian household financially intelligent and self-reliant using AI."
                  : isLanguage(language, 'hi')
                    ? "AI का उपयोग करके हर भारतीय परिवार को वित्तीय रूप से समझदार और आत्मनिर्भर बनाना।"
                    : "AI ka use karke har Indian family ko financially intelligent aur aatmanirbhar banana."}
              </p>
            </div>
            
            <div className="wealth-card-accent transition-transform duration-500" style={{transitionDelay: "400ms"}}>
              <h3 className="text-2xl font-bold mb-3 text-saffron-orange flex items-center gap-2">
                <div className="h-6 w-1 bg-saffron-orange rounded-full"></div>
                {t('mission')}
              </h3>
              <p className="text-lg">
                {isLanguage(language, 'en')
                  ? "To democratize financial literacy and wealth management by offering an AI-powered financial planner that plans, advises, and acts."
                  : isLanguage(language, 'hi')
                    ? "AI-संचालित वित्तीय योजनाकार के माध्यम से वित्तीय साक्षरता और धन प्रबंधन को सुलभ बनाना जो योजना बनाता है, सलाह देता है, और कार्य करता है।"
                    : "Financial literacy aur wealth management ko AI-powered financial planner ke madhyam se accessible banana jo plan kare, advise de, aur action le."}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section 
        id="about-section" 
        className={`py-16 px-6 transition-all duration-700 ${
          animatedSections.includes('about-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        onMouseEnter={() => setActiveTab("about")}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-charcoal">
            {isLanguage(language, 'en') ? "About Us" : isLanguage(language, 'hi') ? "हमारे बारे में" : "About Us"}
          </h2>
          <div className="wealth-card">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 text-royal-blue">
                  {isLanguage(language, 'en') ? "India's First Agentic Wealth OS" : isLanguage(language, 'hi') ? "भारत का पहला एजेंटिक वेल्थ OS" : "India's First Agentic Wealth OS"}
                </h3>
                <p className="mb-4">
                  {isLanguage(language, 'en') 
                    ? "Wealthवाणी is designed to act as a Proactive Wealth Companion for Indian families — like a digital family Chartered Accountant (CA)."
                    : isLanguage(language, 'hi')
                      ? "वेल्थवाणी भारतीय परिवारों के लिए एक सक्रिय धन साथी के रूप में कार्य करने के लिए डिज़ाइन किया गया है — डिजिटल परिवार चार्टर्ड अकाउंटेंट (सीए) की तरह।"
                      : "Wealthवाणी Indian families ke liye ek Proactive Wealth Companion ke roop mein kaam karne ke liye design kiya gaya hai — digital family Chartered Accountant (CA) ki tarah."}
                </p>
                <p>
                  {isLanguage(language, 'en') 
                    ? "It helps users plan, decide, and act on their financial goals in a simple, culturally relatable way."
                    : isLanguage(language, 'hi')
                      ? "यह उपयोगकर्ताओं को उनके वित्तीय लक्ष्यों की योजना बनाने, निर्णय लेने और कार्य करने में एक सरल, सांस्कृतिक रूप से संबंधित तरीके से मदद करता है।"
                      : "Yeh users ko unke financial goals ki planning, decision aur action mein ek simple, culturally relatable tarike se help karta hai."}
                </p>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 text-saffron-orange">
                  {isLanguage(language, 'en') ? "Our Story" : isLanguage(language, 'hi') ? "हमारी कहानी" : "Hamari Kahani"}
                </h3>
                <p className="mb-4">
                  {isLanguage(language, 'en') 
                    ? "Founded by a team of financial experts and AI specialists, Wealthवाणी was born from a vision to transform how Indian families approach their finances."
                    : isLanguage(language, 'hi')
                      ? "वित्तीय विशेषज्ञों और एआई विशेषज्ञों की एक टीम द्वारा स्थापित, वेल्थवाणी का जन्म भारतीय परिवारों के वित्त के प्रति दृष्टिकोण को बदलने के विजन से हुआ था।"
                      : "Financial experts aur AI specialists ki ek team dwara founded, Wealthवाणी ka janam Indian families ke finances ke approach ko transform karne ke vision se hua tha."}
                </p>
                <p>
                  {isLanguage(language, 'en') 
                    ? "Our unique approach combines ancient Indian financial wisdom with cutting-edge AI technology, creating a solution that's both innovative and culturally relevant."
                    : isLanguage(language, 'hi')
                      ? "हमारा अनूठा दृष्टिकोण प्राचीन भारतीय वित्तीय ज्ञान को अत्याधुनिक एआई तकनीक के साथ जोड़ता है, जो एक ऐसा समाधान बनाता है जो नवीन और सांस्कृतिक रूप से प्रासंगिक दोनों है।"
                      : "Hamara unique approach ancient Indian financial wisdom ko cutting-edge AI technology ke saath combine karta hai, jo ek aisa solution create karta hai jo innovative aur culturally relevant dono hai."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section 
        id="services-section" 
        className={`py-16 px-6 bg-white/60 backdrop-blur-sm transition-all duration-700 ${
          animatedSections.includes('services-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        onMouseEnter={() => setActiveTab("services")}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-charcoal">
            {isLanguage(language, 'en') ? "Our Services" : isLanguage(language, 'hi') ? "हमारी सेवाएं" : "Hamari Services"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="wealth-card transition-transform duration-500 hover:-translate-y-2" style={{transitionDelay: "200ms"}}>
              <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
                <ChartBar className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {isLanguage(language, 'en') ? "Financial Planning" : isLanguage(language, 'hi') ? "वित्तीय नियोजन" : "Financial Planning"}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "Personalized financial plans that adapt to your life's changing needs."
                  : isLanguage(language, 'hi')
                    ? "व्यक्तिगत वित्तीय योजनाएं जो आपके जीवन की बदलती जरूरतों के अनुकूल होती हैं।"
                    : "Personalized financial plans jo aapki life ki changing needs ke saath adapt karte hain."}
              </p>
            </div>
            
            <div className="wealth-card transition-transform duration-500 hover:-translate-y-2" style={{transitionDelay: "400ms"}}>
              <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
                <Shield className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {isLanguage(language, 'en') ? "Investment Advisor" : isLanguage(language, 'hi') ? "निवेश सलाहकार" : "Investment Advisor"}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "Smart investment recommendations based on your goals and risk tolerance."
                  : isLanguage(language, 'hi')
                    ? "आपके लक्ष्यों और जोखिम सहनशीलता के आधार पर स्मार्ट निवेश सिफारिशें।"
                    : "Smart investment recommendations based on aapke goals aur risk tolerance."}
              </p>
            </div>
            
            <div className="wealth-card transition-transform duration-500 hover:-translate-y-2" style={{transitionDelay: "600ms"}}>
              <div className="mb-4 p-3 rounded-lg inline-block bg-royal-blue/10">
                <MessageCircle className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {isLanguage(language, 'en') ? "Financial AI Assistant" : isLanguage(language, 'hi') ? "वित्तीय एआई सहायक" : "Financial AI Assistant"}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "Chat with our AI assistant about any financial query in simple language."
                  : isLanguage(language, 'hi')
                    ? "सरल भाषा में किसी भी वित्तीय प्रश्न के बारे में हमारे एआई सहायक से चैट करें।"
                    : "Simple language mein kisi bhi financial query ke baare mein hamare AI assistant se chat karein."}
              </p>
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
        onMouseEnter={() => setActiveTab("features")}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-charcoal">
            {isLanguage(language, 'en') ? "Key Features" : isLanguage(language, 'hi') ? "मुख्य विशेषताएं" : "Key Features"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="wealth-card transition-transform duration-500 hover:-translate-y-2" style={{transitionDelay: "200ms"}}>
              <div className="mb-4 bg-gradient-to-br from-ivory-white to-white p-3 rounded-lg inline-block">
                <Sparkles className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {isLanguage(language, 'en') ? "Smart Recommendations" : isLanguage(language, 'hi') ? "स्मार्ट सिफारिशें" : "Smart Recommendations"}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "Proactive insights and suggestions to optimize your finances."
                  : isLanguage(language, 'hi')
                    ? "आपके वित्त को अनुकूलित करने के लिए सक्रिय अंतर्दृष्टि और सुझाव।"
                    : "Aapke finances ko optimize karne ke liye proactive insights aur suggestions."}
              </p>
            </div>
            
            <div className="wealth-card transition-transform duration-500 hover:-translate-y-2" style={{transitionDelay: "400ms"}}>
              <div className="mb-4 bg-gradient-to-br from-ivory-white to-white p-3 rounded-lg inline-block">
                <ChartBar className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {isLanguage(language, 'en') ? "Financial Analytics" : isLanguage(language, 'hi') ? "वित्तीय विश्लेषिकी" : "Financial Analytics"}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "Visualize and track your financial progress with intuitive dashboards."
                  : isLanguage(language, 'hi')
                    ? "सहज डैशबोर्ड के साथ अपनी वित्तीय प्रगति को देखें और ट्रैक करें।"
                    : "Intuitive dashboards ke saath apni financial progress ko visualize aur track karein."}
              </p>
            </div>
            
            <div className="wealth-card transition-transform duration-500 hover:-translate-y-2" style={{transitionDelay: "600ms"}}>
              <div className="mb-4 bg-gradient-to-br from-ivory-white to-white p-3 rounded-lg inline-block">
                <Shield className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {isLanguage(language, 'en') ? "Tax Planning" : isLanguage(language, 'hi') ? "कर नियोजन" : "Tax Planning"}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "Optimize your taxes with personalized strategies and timely reminders."
                  : isLanguage(language, 'hi')
                    ? "व्यक्तिगत रणनीतियों और समय पर अनुस्मारकों के साथ अपने करों को अनुकूलित करें।"
                    : "Personalized strategies aur timely reminders ke saath apne taxes ko optimize karein."}
              </p>
            </div>
            
            <div className="wealth-card transition-transform duration-500 hover:-translate-y-2" style={{transitionDelay: "800ms"}}>
              <div className="mb-4 bg-gradient-to-br from-ivory-white to-white p-3 rounded-lg inline-block">
                <MessageCircle className="h-8 w-8 text-royal-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-charcoal">
                {isLanguage(language, 'en') ? "Multi-language Support" : isLanguage(language, 'hi') ? "बहु-भाषा समर्थन" : "Multi-language Support"}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "Use our platform in English, Hindi, Hinglish and other Indian languages."
                  : isLanguage(language, 'hi')
                    ? "हमारे प्लेटफॉर्म का उपयोग अंग्रेजी, हिंदी, हिंग्लिश और अन्य भारतीय भाषाओं में करें।"
                    : "Hamare platform ko English, Hindi, Hinglish aur doosri Indian languages mein use karein."}
              </p>
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
            onClick={handleSignupClick}
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

export default Marketing;
