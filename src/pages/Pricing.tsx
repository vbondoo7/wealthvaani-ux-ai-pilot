import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';
import { isLanguage } from '@/lib/typeUtils';
import { PricingPlan } from '@/lib/types';

const PricingPlans: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);
  
  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: { monthly: 0, yearly: 0 },
      description: {
        en: 'Perfect for beginners starting their financial journey',
        hi: 'अपनी वित्तीय यात्रा शुरू करने वालों के लिए एकदम सही',
        hinglish: 'Financial journey shuru karne walon ke liye perfect'
      },
      features: [
        {
          en: 'Auto expense tracking', 
          hi: 'स्वचालित खर्च ट्रैकिंग', 
          hinglish: 'Auto expense tracking'
        },
        {
          en: 'Basic financial nudges (3 per month)', 
          hi: 'बेसिक वित्तीय नज (प्रति माह 3)', 
          hinglish: 'Basic financial nudges (month mein 3)'
        },
        {
          en: 'Auto-save suggestions', 
          hi: 'स्वचालित बचत सुझाव', 
          hinglish: 'Auto-save suggestions'
        },
        {
          en: 'Privacy-first approach', 
          hi: 'गोपनीयता-प्रथम दृष्टिकोण', 
          hinglish: 'Privacy-first approach'
        }
      ],
      recommended: false,
      color: 'bg-gray-100',
      popular: false,
      cta: {
        en: 'Get Started',
        hi: 'आरंभ करें',
        hinglish: 'Shuroo Karein'
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      price: { monthly: 199, yearly: 1999 },
      description: {
        en: 'Advanced features for individuals serious about financial planning',
        hi: 'वित्तीय नियोजन के बारे में गंभीर व्यक्तियों के लिए उन्नत सुविधाएँ',
        hinglish: 'Financial planning ke baare mein serious logon ke liye advanced features'
      },
      features: [
        {
          en: 'Everything in Basic', 
          hi: 'बेसिक में सब कुछ', 
          hinglish: 'Basic mein sab kuch'
        },
        {
          en: 'Unlimited financial nudges', 
          hi: 'असीमित वित्तीय नज', 
          hinglish: 'Unlimited financial nudges'
        },
        {
          en: 'Goal-based planning & tracking', 
          hi: 'लक्ष्य-आधारित योजना और ट्रैकिंग', 
          hinglish: 'Goal-based planning & tracking'
        },
        {
          en: 'Cash flow forecasting', 
          hi: 'कैश फ्लो पूर्वानुमान', 
          hinglish: 'Cash flow forecasting'
        },
        {
          en: 'Festival & seasonal planning', 
          hi: 'त्योहार और मौसमी योजना', 
          hinglish: 'Festival & seasonal planning'
        }
      ],
      recommended: true,
      color: 'bg-royal-blue',
      popular: true,
      cta: {
        en: 'Upgrade to Pro',
        hi: 'प्रो में अपग्रेड करें',
        hinglish: 'Pro Mein Upgrade Karein'
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      price: { monthly: 499, yearly: 4999 },
      description: {
        en: 'Comprehensive solution for families and serious investors',
        hi: 'परिवारों और गंभीर निवेशकों के लिए व्यापक समाधान',
        hinglish: 'Families aur serious investors ke liye comprehensive solution'
      },
      features: [
        {
          en: 'Everything in Pro', 
          hi: 'प्रो में सब कुछ', 
          hinglish: 'Pro mein sab kuch'
        },
        {
          en: 'Family profiles & management', 
          hi: 'परिवार प्रोफाइल और प्रबंधन', 
          hinglish: 'Family profiles & management'
        },
        {
          en: 'Advanced investment intelligence', 
          hi: 'उन्नत निवेश बुद्धिमत्ता', 
          hinglish: 'Advanced investment intelligence'
        },
        {
          en: 'Monthly detailed financial reports', 
          hi: 'मासिक विस्तृत वित्तीय रिपोर्ट', 
          hinglish: 'Monthly detailed financial reports'
        },
        {
          en: 'Priority advisor access', 
          hi: 'प्राथमिकता सलाहकार पहुंच', 
          hinglish: 'Priority advisor access'
        }
      ],
      recommended: false,
      color: 'bg-saffron-orange',
      popular: false,
      cta: {
        en: 'Get Premium',
        hi: 'प्रीमियम प्राप्त करें',
        hinglish: 'Premium Paayen'
      }
    }
  ];
  
  const getLocalizedFeature = (feature: string | Record<string, string>) => {
    if (typeof feature === 'string') return feature;
    
    return isLanguage(language, 'en')
      ? feature.en
      : isLanguage(language, 'hi')
        ? feature.hi
        : feature.hinglish || feature.en;
  };
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="link" 
            className="text-royal-blue"
            onClick={() => navigate('/')}
          >
            &larr; {isLanguage(language, 'en') ? 'Back to Home' : isLanguage(language, 'hi') ? 'होम पेज पर वापस जाएं' : 'Home Page Par Wapas Jaayen'}
          </Button>
        </div>
      </header>
      
      {/* Pricing Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            {isLanguage(language, 'en') 
              ? 'Simple, Transparent Pricing' 
              : isLanguage(language, 'hi') 
                ? 'सरल, पारदर्शी मूल्य निर्धारण' 
                : 'Simple, Transparent Pricing'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isLanguage(language, 'en')
              ? 'Choose the plan that best suits your financial journey.'
              : isLanguage(language, 'hi')
                ? 'वह प्लान चुनें जो आपकी वित्तीय यात्रा के लिए सबसे उपयुक्त हो।'
                : 'Wo plan chunein jo aapki financial journey ke liye sabse suitable ho.'}
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 ${isYearly ? 'text-muted-foreground' : 'font-medium'}`}>
              {isLanguage(language, 'en') ? 'Monthly' : isLanguage(language, 'hi') ? 'मासिक' : 'Monthly'}
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={`ml-3 ${isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
              {isLanguage(language, 'en') ? 'Yearly (Save 15%)' : isLanguage(language, 'hi') ? 'वार्षिक (15% बचाएं)' : 'Yearly (15% Bachayen)'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`border rounded-lg overflow-hidden transition-all ${
                plan.popular ? 'ring-2 ring-royal-blue transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-royal-blue text-white py-1 px-4 text-center text-sm font-medium">
                  {isLanguage(language, 'en') 
                    ? 'Most Popular' 
                    : isLanguage(language, 'hi') 
                      ? 'सबसे लोकप्रिय' 
                      : 'Sabse Popular'}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">
                  {typeof plan.description === 'string' 
                    ? plan.description 
                    : isLanguage(language, 'en')
                      ? plan.description.en
                      : isLanguage(language, 'hi')
                        ? plan.description.hi
                        : plan.description.hinglish || plan.description.en}
                </p>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">
                    ₹{isYearly 
                      ? (typeof plan.price === 'number' 
                          ? plan.price
                          : plan.price.yearly)
                      : (typeof plan.price === 'number'
                          ? plan.price
                          : plan.price.monthly)}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    /{isYearly 
                      ? (isLanguage(language, 'en') ? 'year' : isLanguage(language, 'hi') ? 'वर्ष' : 'saal')
                      : (isLanguage(language, 'en') ? 'month' : isLanguage(language, 'hi') ? 'माह' : 'mahina')}
                  </span>
                </div>
                
                <Button 
                  className={`w-full mb-6 ${
                    plan.recommended 
                      ? 'bg-royal-blue hover:bg-royal-blue/90' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  onClick={() => navigate('/login', { state: { defaultTab: 'signup' } })}
                >
                  {typeof plan.cta === 'string'
                    ? plan.cta
                    : isLanguage(language, 'en')
                      ? plan.cta.en
                      : isLanguage(language, 'hi')
                        ? plan.cta.hi
                        : (plan.cta.hinglish || plan.cta.en)}
                </Button>
                
                <div className="space-y-3">
                  {Array.isArray(plan.features) && plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{getLocalizedFeature(feature)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            {isLanguage(language, 'en') 
              ? 'Frequently Asked Questions' 
              : isLanguage(language, 'hi') 
                ? 'अक्सर पूछे जाने वाले प्रश्न' 
                : 'Aksar Puche Jaane Waale Questions'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-bold mb-2">
                {isLanguage(language, 'en')
                  ? 'Can I upgrade my plan later?'
                  : isLanguage(language, 'hi')
                    ? 'क्या मैं बाद में अपना प्लान अपग्रेड कर सकता हूं?'
                    : 'Kya main baad mein apna plan upgrade kar sakta hoon?'}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "Yes, you can upgrade your plan at any time. Your new benefits will be available immediately and we'll prorate your billing."
                  : isLanguage(language, 'hi')
                    ? 'हां, ���प किसी भी समय अपना प्लान अपग्रेड कर सकते हैं। आपके नए लाभ तुरंत उपलब्ध होंगे और हम आपके बिलिंग को आनुपातिक रूप से समायोजित करेंगे।'
                    : 'Haan, aap kisi bhi samay apna plan upgrade kar sakte hain. Aapke new benefits turant available honge aur hum aapke billing ko prorate karenge.'}
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-bold mb-2">
                {isLanguage(language, 'en')
                  ? 'Is there a free trial available?'
                  : isLanguage(language, 'hi')
                    ? 'क्या फ्री ट्रायल उपलब्ध है?'
                    : 'Kya free trial available hai?'}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? 'Our Basic plan is free forever. This gives you a chance to try out our core features before deciding to upgrade.'
                  : isLanguage(language, 'hi')
                    ? 'हमारा बेसिक प्लान हमेशा के लिए फ्री है। इससे आपको अपग्रेड करने का निर्णय लेने से पहले हमारी मुख्य सुविधाओं को आज़माने का अवसर मिलता है।'
                    : 'Hamara Basic plan hamesha ke liye free hai. Isse aapko upgrade karne ka decision lene se pehle hamari core features ko try karne ka mauka milta hai.'}
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-bold mb-2">
                {isLanguage(language, 'en')
                  ? 'Can I cancel my subscription?'
                  : isLanguage(language, 'hi')
                    ? 'क्या मैं अपनी सदस्यता रद्द कर सकता हूं?'
                    : 'Kya main apni subscription cancel kar sakta hoon?'}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your billing period."
                  : isLanguage(language, 'hi')
                    ? 'हां, आप किसी भी समय अपनी सदस्यता रद्द कर सकते हैं। आपके बिलिंग अवधि के अंत तक आपके पास अपने प्लान की एक्सेस रहेगी।'
                    : 'Haan, aap kisi bhi samay apni subscription cancel kar sakte hain. Aapke billing period ke end tak aapke paas apne plan ki access rahegi.'}
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-bold mb-2">
                {isLanguage(language, 'en')
                  ? 'Is my financial data secure?'
                  : isLanguage(language, 'hi')
                    ? 'क्या मेरा वित्तीय डेटा सुरक्षित है?'
                    : 'Kya mera financial data secure hai?'}
              </h3>
              <p className="text-muted-foreground">
                {isLanguage(language, 'en')
                  ? 'Absolutely. We use bank-level encryption and security protocols to ensure your data is always protected. We never share your information with third parties.'
                  : isLanguage(language, 'hi')
                    ? 'बिल्कुल। हम आपके डेटा की सुरक्षा सुनिश्चित करने के लिए बैंक-स्तरीय एन्क्रिप्शन और सुरक्षा प्रोटोकॉल का उपयोग करते हैं। हम आपकी जानकारी कभी भी तीसरे पक्ष के साथ साझा नहीं करते हैं।'
                    : 'Bilkul. Hum aapke data ki suraksha sunishchit karne ke liye bank-level encryption aur security protocols ka use karte hain. Hum aapki information kabhi bhi third parties ke saath share nahi karte hain.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
