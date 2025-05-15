
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/logo/Logo';
import { Button } from "@/components/ui/button";
import { CheckCircle, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PricingPlan } from '@/lib/types';

const Pricing: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [annual, setAnnual] = React.useState(false);
  
  const pricingPlans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      description: {
        en: 'Perfect for individuals just starting their financial journey',
        hi: 'वित्तीय यात्रा शुरू करने वाले व्यक्तियों के लिए एकदम सही',
        hinglish: 'Financial journey shuru karne wale individuals ke liye ekdum sahi',
      },
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        {
          en: 'Basic budget tracking',
          hi: 'बेसिक बजट ट्रैकिंग',
          hinglish: 'Basic budget tracking',
        },
        {
          en: 'Limited personalized recommendations',
          hi: 'सीमित व्यक्तिगत सिफारिशें',
          hinglish: 'Limited personalized recommendations',
        },
        {
          en: 'Up to 3 financial goals',
          hi: '3 वित्तीय लक्ष्यों तक',
          hinglish: '3 financial goals tak',
        },
      ],
      cta: {
        en: 'Get Started Free',
        hi: 'मुफ्त शुरू करें',
        hinglish: 'Free mein shuru karein',
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      description: {
        en: 'For individuals serious about financial growth',
        hi: 'वित्तीय विकास के प्रति गंभीर व्यक्तियों के लिए',
        hinglish: 'Financial growth ke prati serious individuals ke liye',
      },
      price: {
        monthly: 199,
        yearly: 1999,
      },
      features: [
        {
          en: 'Advanced budget tracking',
          hi: 'एडवांस्ड बजट ट्रैकिंग',
          hinglish: 'Advanced budget tracking',
        },
        {
          en: 'Unlimited personalized recommendations',
          hi: 'असीमित व्यक्तिगत सिफारिशें',
          hinglish: 'Unlimited personalized recommendations',
        },
        {
          en: 'Up to 10 financial goals',
          hi: '10 वित्तीय लक्ष्यों तक',
          hinglish: '10 financial goals tak',
        },
        {
          en: 'AI-powered wealth insights',
          hi: 'AI-संचालित धन अंतर्दृष्टि',
          hinglish: 'AI-powered wealth insights',
        },
      ],
      popular: true,
      cta: {
        en: 'Upgrade to Pro',
        hi: 'प्रो पर अपग्रेड करें',
        hinglish: 'Pro par upgrade karein',
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      description: {
        en: 'For families seeking comprehensive financial management',
        hi: 'व्यापक वित्तीय प्रबंधन की तलाश करने वाले परिवारों के लिए',
        hinglish: 'Comprehensive financial management ki talash karne wale families ke liye',
      },
      price: {
        monthly: 499,
        yearly: 4999,
      },
      features: [
        {
          en: 'Everything in Pro',
          hi: 'प्रो में सब कुछ',
          hinglish: 'Pro mein sab kuch',
        },
        {
          en: 'Family account management',
          hi: 'परिवार खाता प्रबंधन',
          hinglish: 'Family account management',
        },
        {
          en: 'Unlimited financial goals',
          hi: 'असीमित वित्तीय लक्ष्य',
          hinglish: 'Unlimited financial goals',
        },
        {
          en: 'Priority support',
          hi: 'प्राथमिकता समर्थन',
          hinglish: 'Priority support',
        },
        {
          en: 'Quarterly consultation with financial expert',
          hi: 'वित्तीय विशेषज्ञ के साथ त्रैमासिक परामर्श',
          hinglish: 'Financial expert ke saath quarterly consultation',
        },
      ],
      cta: {
        en: 'Go Premium',
        hi: 'प्रीमियम चुनें',
        hinglish: 'Premium chunein',
      }
    },
  ];
  
  return (
    <div className="min-h-screen bg-ivory-white">
      {/* Navigation */}
      <nav className="py-4 px-6 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <Logo size="md" variant="full" />
          </div>
          <Button 
            variant="outline"
            className="text-royal-blue border-royal-blue hover:bg-royal-blue/10"
            onClick={() => navigate('/login')}
          >
            {t('login')}
          </Button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-royal-blue to-saffron-orange text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-2">
            <DollarSign className="h-8 w-8" />
            {language === 'en' ? "Simple, Transparent Pricing" : 
             language === 'hi' ? "सरल, पारदर्शी मूल्य निर्धारण" :
             "Simple, Transparent Pricing"}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {language === 'en' ? "Choose the plan that's right for your financial journey" : 
             language === 'hi' ? "अपनी वित्तीय यात्रा के लिए सही योजना चुनें" :
             "Apni financial journey ke liye sahi plan chunein"}
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`${!annual ? 'text-white' : 'text-white/70'}`}>
              {language === 'en' ? "Monthly" : 
               language === 'hi' ? "मासिक" :
               "Monthly"}
            </span>
            <button 
              onClick={() => setAnnual(!annual)}
              className={`w-16 h-8 rounded-full flex items-center p-1 transition-colors ${annual ? 'bg-white justify-end' : 'bg-white/30 justify-start'}`}
            >
              <div className="w-6 h-6 rounded-full bg-saffron-orange"></div>
            </button>
            <span className={`${annual ? 'text-white' : 'text-white/70'}`}>
              {language === 'en' ? "Yearly (Save 15%)" : 
               language === 'hi' ? "वार्षिक (15% की बचत)" :
               "Yearly (15% bachaye)"}
            </span>
          </div>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`wealth-card relative ${plan.popular ? 'border-2 border-royal-blue shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-royal-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                    {language === 'en' ? "Most Popular" : 
                     language === 'hi' ? "सबसे लोकप्रिय" :
                     "Sabse Popular"}
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description[language as keyof typeof plan.description]}</p>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold">₹</span>
                  <span className="text-5xl font-bold">
                    {annual ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-muted-foreground ml-2">
                      /{language === 'en' ? (annual ? 'year' : 'month') : 
                        language === 'hi' ? (annual ? 'साल' : 'महीना') :
                        (annual ? 'saal' : 'month')}
                    </span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-royal-blue shrink-0 mt-0.5" />
                      <span>{feature[language as keyof typeof feature]}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-royal-blue hover:bg-royal-blue/90' 
                    : 'bg-saffron-orange hover:bg-saffron-orange/90'} text-white`}
                >
                  {plan.cta[language as keyof typeof plan.cta]}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {language === 'en' ? "Frequently Asked Questions" : 
             language === 'hi' ? "अक्सर पूछे जाने वाले प्रश्न" :
             "Frequently Asked Questions"}
          </h2>
          
          <div className="space-y-6">
            <div className="wealth-card">
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? "Can I change plans later?" : 
                 language === 'hi' ? "क्या मैं बाद में योजनाएं बदल सकता हूं?" :
                 "Kya main baad mein plans change kar sakta hoon?"}
              </h3>
              <p>
                {language === 'en'
                  ? "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
                  : language === 'hi'
                    ? "हां, आप किसी भी समय अपनी योजना को अपग्रेड या डाउनग्रेड कर सकते हैं। आपके अगले बिलिंग चक्र की शुरुआत में परिवर्तन प्रभावी होते हैं।"
                    : "Haan, aap kisi bhi samay apne plan ko upgrade ya downgrade kar sakte hain. Changes aapke next billing cycle ki shuruat mein effective hote hain."}
              </p>
            </div>
            
            <div className="wealth-card">
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? "Is my financial data secure?" : 
                 language === 'hi' ? "क्या मेरा वित्तीय डेटा सुरक्षित है?" :
                 "Kya mera financial data secure hai?"}
              </h3>
              <p>
                {language === 'en'
                  ? "Absolutely. We use bank-level encryption to protect your data and never sell your information to third parties."
                  : language === 'hi'
                    ? "बिल्कुल। हम आपके डेटा की सुरक्षा के लिए बैंक-स्तरीय एन्क्रिप्शन का उपयोग करते हैं और आपकी जानकारी को कभी भी तीसरे पक्ष को नहीं बेचते हैं।"
                    : "Bilkul. Hum aapke data ki suraksha ke liye bank-level encryption use karte hain aur aapki information kabhi bhi third parties ko nahi bechte hain."}
              </p>
            </div>
            
            <div className="wealth-card">
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? "Can I cancel my subscription?" : 
                 language === 'hi' ? "क्या मैं अपनी सदस्यता रद्द कर सकता हूँ?" :
                 "Kya main apni subscription cancel kar sakta hoon?"}
              </h3>
              <p>
                {language === 'en'
                  ? "Yes, you can cancel at any time. If you cancel, you'll still have access to your current plan until the end of your billing period."
                  : language === 'hi'
                    ? "हाँ, आप किसी भी समय रद्द कर सकते हैं। यदि आप रद्द करते हैं, तो आपके बिलिंग अवधि के अंत तक आपके पास अपनी वर्तमान योजना तक पहुंच बनी रहेगी।"
                    : "Haan, aap kisi bhi samay cancel kar sakte hain. Agar aap cancel karte hain, to aapke billing period ke end tak aapke paas apne current plan tak access bana rahega."}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-royal-blue to-saffron-orange text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            {language === 'en' ? "Ready to take control of your finances?" : 
             language === 'hi' ? "अपने वित्त का नियंत्रण लेने के लिए तैयार हैं?" :
             "Apne finances ka control lene ke liye ready hain?"}
          </h2>
          <p className="text-xl mb-8">
            {language === 'en' 
              ? "Join thousands of Indians who are transforming their financial future with Wealthवाणी" 
              : language === 'hi' 
                ? "हजारों भारतीयों से जुड़ें जो Wealthवाणी के साथ अपने वित्तीय भविष्य को बदल रहे हैं" 
                : "Hazaaron Indians se judein jo Wealthवाणी ke saath apne financial future ko badal rahe hain"}
          </p>
          <Button 
            onClick={() => navigate('/signup')}
            size="lg" 
            className="bg-white text-royal-blue hover:bg-white/90"
          >
            {language === 'en' ? "Start Free Trial" : 
             language === 'hi' ? "फ्री ट्रायल शुरू करें" :
             "Free Trial Start Karein"}
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Wealthवाणी. {language === 'en' ? "All rights reserved." : language === 'hi' ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button 
                variant="link" 
                className="text-sm text-muted-foreground p-0 h-auto"
                onClick={() => navigate('/terms')}
              >
                {language === 'en' ? "Terms & Conditions" : 
                 language === 'hi' ? "नियम और शर्तें" :
                 "Terms & Conditions"}
              </Button>
              <Button 
                variant="link" 
                className="text-sm text-muted-foreground p-0 h-auto"
                onClick={() => navigate('/careers')}
              >
                {language === 'en' ? "Careers" : 
                 language === 'hi' ? "करियर" :
                 "Careers"}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
