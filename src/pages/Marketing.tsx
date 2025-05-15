
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, ChartBar, MessageCircle, Sparkles, Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import Logo from '@/components/logo/Logo';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import RotatingText from '@/components/ui/RotatingText';
import { cn } from '@/lib/utils';

const Marketing: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  
  // Refs for scrolling
  const aboutRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const howWeDoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/login', { state: { defaultTab: 'signup' } });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    const refs = {
      'about': aboutRef,
      'products': productsRef,
      'services': servicesRef,
      'how-we-do': howWeDoRef,
      'contact': contactRef,
    };
    
    const selectedRef = refs[sectionId as keyof typeof refs];
    
    if (selectedRef && selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const navigateToBlog = () => {
    navigate('/blog');
  };
  
  const rotatingPhrases = [
    "Digital Wealth Brain for Bharat's Middle-Class.",
    "Empowering Every Indian Family with Personalised Financial Guidance",
    "Built on a SMART AI That Plans. Advises. Cares. Like Family",
    "Like a CA in Your Pocket — Smarter, Faster, Always Available",
    "Simplifying Wealth — Personally, Proactively, Powerfully"
  ];
  
  const features = [
    {
      icon: <ChartBar className="h-8 w-8 text-royal-blue" />,
      title: t("smart-planning"),
      description: language === 'en' 
        ? "AI-powered insights and personalized financial planning that grows with you."
        : language === 'hi'
          ? "एआई-संचालित अंतर्दृष्टि और व्यक्तिगत वित्तीय योजना जो आपके साथ बढ़ती है।"
          : "AI-powered insights aur personalized financial planning jo aapke saath badhti hai."
    },
    {
      icon: <Shield className="h-8 w-8 text-teal" />,
      title: t("secure-private"),
      description: language === 'en'
        ? "Your financial data stays encrypted and private with robust security measures."
        : language === 'hi'
          ? "आपका वित्तीय डेटा मजबूत सुरक्षा उपायों के साथ एन्क्रिप्टेड और निजी रहता है।"
          : "Aapka financial data strong security measures ke saath encrypted aur private rehta hai."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-saffron-orange" />,
      title: t("financial-companion"),
      description: language === 'en'
        ? "Chat with our AI assistant about budgets, investments, or financial queries in simple language."
        : language === 'hi'
          ? "सरल भाषा में बजट, निवेश या वित्तीय प्रश्नों के बारे में हमारे एआई सहायक से चैट करें।"
          : "Simple language mein budgets, investments, ya financial queries ke bare mein hamare AI assistant se chat karein."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-royal-blue" />,
      title: t("proactive-insights"),
      description: language === 'en'
        ? "Get proactive nudges and recommendations tailored to your spending patterns."
        : language === 'hi'
          ? "अपने खर्च पैटर्न के अनुरूप सक्रिय सुझाव और सिफारिशें प्राप्त करें।"
          : "Apne spending patterns ke hisaab se proactive nudges aur recommendations paayein."
    }
  ];

  const products = [
    {
      title: language === 'en' ? "Financial Goal Planning" : language === 'hi' ? "वित्तीय लक्ष्य योजना" : "Financial Goal Planning",
      description: language === 'en' 
        ? "Set and track your financial goals with AI-powered recommendations."
        : language === 'hi'
          ? "एआई-संचालित सिफारिशों के साथ अपने वित्तीय लक्ष्यों को निर्धारित करें और ट्रैक करें।"
          : "AI-powered recommendations ke saath apne financial goals ko set aur track karein."
    },
    {
      title: language === 'en' ? "Budget Analytics" : language === 'hi' ? "बजट विश्लेषिकी" : "Budget Analytics",
      description: language === 'en'
        ? "Get insights into your spending patterns and optimize your budget."
        : language === 'hi'
          ? "अपने खर्च पैटर्न में अंतर्दृष्टि प्राप्त करें और अपने बजट को अनुकूलित करें।"
          : "Apne spending patterns ke insights paayein aur apna budget optimize karein."
    },
    {
      title: language === 'en' ? "Investment Advisory" : language === 'hi' ? "निवेश सलाह" : "Investment Advisory",
      description: language === 'en'
        ? "Personalized investment recommendations based on your risk profile and goals."
        : language === 'hi'
          ? "आपके जोखिम प्रोफ़ाइल और लक्ष्यों के आधार पर व्यक्तिगत निवेश सिफारिशें।"
          : "Aapke risk profile aur goals ke basis par personalized investment recommendations."
    }
  ];

  const services = [
    {
      title: language === 'en' ? "AI Financial Chat" : language === 'hi' ? "एआई वित्तीय चैट" : "AI Financial Chat",
      description: language === 'en'
        ? "Ask any financial question and get instant, jargon-free answers."
        : language === 'hi'
          ? "कोई भी वित्तीय प्रश्न पूछें और तुरंत, जार्गन-मुक्त उत्तर प्राप्त करें।"
          : "Koi bhi financial question poochein aur turant, jargon-free answers paayein."
    },
    {
      title: language === 'en' ? "Smart Nudges" : language === 'hi' ? "स्मार्ट अनुस्मारक" : "Smart Nudges",
      description: language === 'en'
        ? "Receive timely financial suggestions based on your spending patterns."
        : language === 'hi'
          ? "अपने खर्च पैटर्न के आधार पर समय पर वित्तीय सुझाव प्राप्त करें।"
          : "Apne spending patterns ke basis par timely financial suggestions paayein."
    },
    {
      title: language === 'en' ? "Financial Learning" : language === 'hi' ? "वित्तीय शिक्षा" : "Financial Learning",
      description: language === 'en'
        ? "Access curated content to improve your financial literacy."
        : language === 'hi'
          ? "अपनी वित्तीय साक्षरता में सुधार के लिए क्यूरेट की गई सामग्री तक पहुंचें।"
          : "Apni financial literacy improve karne ke liye curated content access karein."
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-white mandala-pattern">
      {/* Navigation */}
      <nav className="py-4 px-6 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Logo size="md" variant="full" />
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('about')}
              className={cn("text-sm font-medium transition-colors", 
                activeSection === 'about' ? "text-royal-blue" : "text-gray-600 hover:text-royal-blue")}
            >
              {language === 'en' ? "About Us" : language === 'hi' ? "हमारे बारे में" : "About Us"}
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className={cn("text-sm font-medium transition-colors", 
                activeSection === 'products' ? "text-royal-blue" : "text-gray-600 hover:text-royal-blue")}
            >
              {language === 'en' ? "Products" : language === 'hi' ? "उत्पाद" : "Products"}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className={cn("text-sm font-medium transition-colors", 
                activeSection === 'services' ? "text-royal-blue" : "text-gray-600 hover:text-royal-blue")}
            >
              {language === 'en' ? "Services" : language === 'hi' ? "सेवाएँ" : "Services"}
            </button>
            <button 
              onClick={() => scrollToSection('how-we-do')}
              className={cn("text-sm font-medium transition-colors", 
                activeSection === 'how-we-do' ? "text-royal-blue" : "text-gray-600 hover:text-royal-blue")}
            >
              {language === 'en' ? "How We Do It" : language === 'hi' ? "हम यह कैसे करते हैं" : "How We Do It"}
            </button>
            <button 
              onClick={navigateToBlog}
              className="text-sm font-medium text-gray-600 hover:text-royal-blue transition-colors"
            >
              {language === 'en' ? "Blog" : language === 'hi' ? "ब्लॉग" : "Blog"}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={cn("text-sm font-medium transition-colors", 
                activeSection === 'contact' ? "text-royal-blue" : "text-gray-600 hover:text-royal-blue")}
            >
              {language === 'en' ? "Contact" : language === 'hi' ? "संपर्क" : "Contact"}
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <select 
                className="text-sm border-none bg-transparent focus:ring-0"
                value={language}
                onChange={(e) => changeLanguage(e.target.value as 'en' | 'hi' | 'hinglish')}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
            <Button 
              variant="outline"
              className="text-royal-blue border-royal-blue hover:bg-royal-blue/10"
              onClick={handleLoginClick}
            >
              {t('login')}
            </Button>
            <Button 
              className="bg-royal-blue hover:bg-royal-blue/90 text-white hidden md:inline-flex"
              onClick={handleSignupClick}
            >
              {t('signup')}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 transform scale-150">
              <Logo size="lg" variant="full" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
              <span>{language === 'en' ? "India's First" : language === 'hi' ? "भारत का पहला" : "India Ka Pehla"}</span> 
              <span className="text-royal-blue"> {language === 'en' ? "Proactive Wealth Companion" : language === 'hi' ? "सक्रिय धन साथी" : "Proactive Wealth Companion"}</span>
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
      
      {/* About Us Section */}
      <section ref={aboutRef} id="about" className="py-16 px-6 bg-white/60 backdrop-blur-sm scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-charcoal">
            {language === 'en' ? "About Us" : language === 'hi' ? "हमारे बारे में" : "About Us"}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="wealth-card-primary">
              <h3 className="text-2xl font-bold mb-3 text-royal-blue flex items-center gap-2">
                <div className="h-6 w-1 bg-royal-blue rounded-full"></div>
                {t('vision')}
              </h3>
              <p className="text-lg">
                {t('vision-text')}
              </p>
            </div>
            
            <div className="wealth-card-accent">
              <h3 className="text-2xl font-bold mb-3 text-saffron-orange flex items-center gap-2">
                <div className="h-6 w-1 bg-saffron-orange rounded-full"></div>
                {t('mission')}
              </h3>
              <p className="text-lg">
                {t('mission-text')}
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="wealth-card">
              <h3 className="text-2xl font-bold mb-4 text-charcoal">
                {language === 'en' ? "Our Story" : language === 'hi' ? "हमारी कहानी" : "Hamari Kahani"}
              </h3>
              <p className="mb-4">
                {language === 'en'
                  ? "Wealthवाणी was born out of a simple observation: while India's financial landscape is rapidly evolving, most families still lack the guidance and tools to navigate it effectively."
                  : language === 'hi'
                    ? "Wealthवाणी एक सरल अवलोकन से उत्पन्न हुआ था: जबकि भारत का वित्तीय परिदृश्य तेजी से विकसित हो रहा है, अधिकांश परिवारों के पास अभी भी इसे प्रभावी ढंग से नेविगेट करने के लिए मार्गदर्शन और उपकरणों की कमी है।"
                    : "Wealthवाणी ek simple observation se paida hua: jab ki India ka financial landscape rapidly evolve ho raha hai, most families ke paas abhi bhi ise effectively navigate karne ke liye guidance aur tools ki kami hai."}
              </p>
              <p>
                {language === 'en'
                  ? "Our team combines expertise in finance, AI, and cultural context to create a solution that's truly built for Indian families. We believe financial intelligence should be accessible to everyone, not just the wealthy or financially savvy."
                  : language === 'hi'
                    ? "हमारी टीम वित्त, एआई और सांस्कृतिक संदर्भ में विशेषज्ञता को जोड़कर एक ऐसा समाधान बनाती है जो वास्तव में भारतीय परिवारों के लिए बनाया गया है। हमारा मानना है कि वित्तीय बुद्धिमत्ता सभी के लिए सुलभ होनी चाहिए, न कि केवल अमीर या वित्तीय रूप से समझदार लोगों के लिए।"
                    : "Hamari team finance, AI, aur cultural context mein expertise ko combine karke ek solution banati hai jo truly Indian families ke liye designed hai. Hum believe karte hain ki financial intelligence sabke liye accessible honi chahiye, na ki sirf wealthy ya financially savvy logon ke liye."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} id="products" className="py-16 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-charcoal">
            {language === 'en' ? "Our Products" : language === 'hi' ? "हमारे उत्पाद" : "Hamare Products"}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="wealth-card hover:translate-y-[-5px] transition-transform duration-300">
                <h3 className="text-xl font-bold mb-3 text-royal-blue">{product.title}</h3>
                <p className="text-muted-foreground">{product.description}</p>
                <Button 
                  variant="link" 
                  className="mt-4 text-saffron-orange p-0 hover:text-saffron-orange/80"
                  onClick={handleSignupClick}
                >
                  {language === 'en' ? "Learn More" : language === 'hi' ? "और जानें" : "Learn More"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-16 px-6 bg-white/60 backdrop-blur-sm scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-charcoal">
            {language === 'en' ? "Our Services" : language === 'hi' ? "हमारी सेवाएँ" : "Hamari Services"}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="wealth-card hover:translate-y-[-5px] transition-transform duration-300">
                <h3 className="text-xl font-bold mb-3 text-royal-blue">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                <Button 
                  variant="link" 
                  className="mt-4 text-saffron-orange p-0 hover:text-saffron-orange/80"
                  onClick={handleSignupClick}
                >
                  {language === 'en' ? "Learn More" : language === 'hi' ? "और जानें" : "Learn More"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How We Do It Section */}
      <section ref={howWeDoRef} id="how-we-do" className="py-16 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-charcoal">
            {language === 'en' ? "How We Do It" : language === 'hi' ? "हम यह कैसे करते हैं" : "Hum Yeh Kaise Karte Hain"}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="wealth-card">
              <h3 className="text-2xl font-bold mb-4 text-royal-blue">
                {language === 'en' ? "AI-Driven Solutions" : language === 'hi' ? "एआई-संचालित समाधान" : "AI-Driven Solutions"}
              </h3>
              <p className="mb-4">
                {language === 'en'
                  ? "Our AI engine analyzes your financial data to provide personalized recommendations and insights. It learns from your behaviors and adapts to your changing needs over time."
                  : language === 'hi'
                    ? "हमारा एआई इंजन व्यक्तिगत सिफारिशें और अंतर्दृष्टि प्रदान करने के लिए आपके वित्तीय डेटा का विश्लेषण करता है। यह आपके व्यवहारों से सीखता है और समय के साथ आपकी बदलती जरूरतों के अनुकूल होता है।"
                    : "Hamara AI engine personalized recommendations aur insights provide karne ke liye aapke financial data ko analyze karta hai. Yeh aapke behaviors se seekhta hai aur time ke saath aapki changing needs ke hisaab se adapt karta hai."}
              </p>
              <p>
                {language === 'en'
                  ? "Privacy and security are paramount—your data is encrypted and never shared with third parties without your explicit consent."
                  : language === 'hi'
                    ? "गोपनीयता और सुरक्षा सर्वोपरि हैं—आपका डेटा एन्क्रिप्टेड है और आपकी स्पष्ट सहमति के बिना कभी भी तीसरे पक्ष के साथ साझा नहीं किया जाता है।"
                    : "Privacy aur security paramount hain—aapka data encrypted hai aur kabhi bhi third parties ke saath share nahin kiya jata hai without your explicit consent."}
              </p>
            </div>
            
            <div className="wealth-card">
              <h3 className="text-2xl font-bold mb-4 text-royal-blue">
                {language === 'en' ? "Cultural Context" : language === 'hi' ? "सांस्कृतिक संदर्भ" : "Cultural Context"}
              </h3>
              <p className="mb-4">
                {language === 'en'
                  ? "Unlike global financial apps, we understand the unique challenges of Indian households—from joint family finances to festival planning and cultural spending patterns."
                  : language === 'hi'
                    ? "वैश्विक वित्तीय ऐप्स के विपरीत, हम भारतीय परिवारों की अनूठी चुनौतियों को समझते हैं—संयुक्त परिवार के वित्त से लेकर त्योहार की योजना और सांस्कृतिक खर्च पैटर्न तक।"
                    : "Global financial apps ke unlike, hum Indian households ki unique challenges ko samajhte hain—joint family finances se lekar festival planning aur cultural spending patterns tak."}
              </p>
              <p>
                {language === 'en'
                  ? "Our solutions are designed with Indian tax laws, investment options, and social obligations in mind."
                  : language === 'hi'
                    ? "हमारे समाधान भारतीय कर कानूनों, निवेश विकल्पों और सामाजिक दायित्वों को ध्यान में रखकर डिज़ाइन किए गए हैं।"
                    : "Hamare solutions Indian tax laws, investment options, aur social obligations ko dhyan mein rakhkar design kiye gaye hain."}
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-royal-blue hover:bg-royal-blue/90 text-white text-lg font-medium"
              onClick={navigateToBlog}
            >
              {language === 'en' ? "Read Our Blog" : language === 'hi' ? "हमारा ब्लॉग पढ़ें" : "Hamara Blog Padhein"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-16 px-6 bg-white/60 backdrop-blur-sm scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-charcoal">
            {language === 'en' ? "Contact Us" : language === 'hi' ? "संपर्क करें" : "Contact Karein"}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="wealth-card">
              <h3 className="text-2xl font-bold mb-6 text-royal-blue">
                {language === 'en' ? "Get In Touch" : language === 'hi' ? "संपर्क में रहें" : "Get In Touch"}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-saffron-orange mt-0.5" />
                  <div>
                    <h4 className="font-medium text-charcoal">
                      {language === 'en' ? "Email Us" : language === 'hi' ? "हमें ईमेल करें" : "Email Karein"}
                    </h4>
                    <a href="mailto:contact@wealthvani.com" className="text-royal-blue hover:underline">
                      contact@wealthvani.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-saffron-orange mt-0.5" />
                  <div>
                    <h4 className="font-medium text-charcoal">
                      {language === 'en' ? "Call Us" : language === 'hi' ? "हमें कॉल करें" : "Call Karein"}
                    </h4>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-saffron-orange mt-0.5" />
                  <div>
                    <h4 className="font-medium text-charcoal">
                      {language === 'en' ? "Our Office" : language === 'hi' ? "हमारा कार्यालय" : "Hamara Office"}
                    </h4>
                    <p>
                      {language === 'en'
                        ? "123 Tech Park, HSR Layout, Bengaluru, Karnataka 560102"
                        : language === 'hi'
                          ? "123 टेक पार्क, एचएसआर लेआउट, बेंगलुरु, कर्नाटक 560102"
                          : "123 Tech Park, HSR Layout, Bengaluru, Karnataka 560102"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Instagram className="h-5 w-5 text-royal-blue" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Linkedin className="h-5 w-5 text-royal-blue" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Facebook className="h-5 w-5 text-royal-blue" />
                </a>
              </div>
            </div>
            
            <div className="wealth-card">
              <h3 className="text-2xl font-bold mb-6 text-royal-blue">
                {language === 'en' ? "Send Us a Message" : language === 'hi' ? "हमें संदेश भेजें" : "Message Bhejein"}
              </h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {language === 'en' ? "Your Name" : language === 'hi' ? "आपका नाम" : "Aapka Naam"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded-md"
                    placeholder={language === 'en' ? "Enter your name" : language === 'hi' ? "अपना नाम दर्ज करें" : "Apna naam darj karein"}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {language === 'en' ? "Email Address" : language === 'hi' ? "ईमेल पता" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-md"
                    placeholder={language === 'en' ? "Enter your email" : language === 'hi' ? "अपना ईमेल दर्ज करें" : "Apna email darj karein"}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {language === 'en' ? "Your Message" : language === 'hi' ? "आपका संदेश" : "Aapka Message"}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 border rounded-md"
                    placeholder={language === 'en' ? "How can we help you?" : language === 'hi' ? "हम आपकी कैसे मदद कर सकते हैं?" : "Hum aapki kaise madad kar sakte hain?"}
                  />
                </div>
                
                <Button 
                  className="bg-royal-blue hover:bg-royal-blue/90 text-white w-full"
                >
                  {language === 'en' ? "Send Message" : language === 'hi' ? "संदेश भेजें" : "Message Bhejein"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo variant="full" />
            <p className="mt-2 text-sm text-muted-foreground">
              {language === 'en'
                ? "Your AI-powered financial planner"
                : language === 'hi'
                  ? "आपका एआई-संचालित वित्तीय योजनाकार"
                  : "Aapka AI-powered financial planner"}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-4 mb-2">
              <select 
                className="text-sm border-none bg-transparent focus:ring-0"
                value={language}
                onChange={(e) => changeLanguage(e.target.value as 'en' | 'hi' | 'hinglish')}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
              <Button 
                variant="outline" 
                size="sm"
                className="text-royal-blue border-royal-blue hover:bg-royal-blue/10"
                onClick={navigateToBlog}
              >
                {language === 'en' ? "Visit Our Blog" : language === 'hi' ? "हमारा ब्लॉग देखें" : "Hamara Blog Dekhein"}
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; 2025 Wealthवाणी. {language === 'en' ? "All rights reserved." : language === 'hi' ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketing;
