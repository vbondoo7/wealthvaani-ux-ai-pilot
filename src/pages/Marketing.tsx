
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, BarChart, Users, ShieldCheck, Gift, MessageCircle } from "lucide-react";

const Marketing: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-royal-blue/10 to-saffron-orange/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {language === 'en' 
                ? "Your Proactive Wealth Companion" 
                : language === 'hi' 
                  ? "आपका सक्रिय धन साथी" 
                  : "Aapka Proactive Wealth Companion"}
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              {language === 'en' 
                ? "India's first agentic Wealth Operating System, designed to help you plan, decide, and act on your financial goals." 
                : language === 'hi' 
                  ? "भारत का पहला एजेंटिक वेल्थ ऑपरेटिंग सिस्टम, आपको अपने वित्तीय लक्ष्यों की योजना बनाने, निर्णय लेने और कार्य करने में मदद करने के लिए डिज़ाइन किया गया है।" 
                  : "India ka pehla agentic Wealth Operating System, aapko apne financial goals ke planning, decisions, aur actions mein madad karne ke liye."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-royal-blue hover:bg-royal-blue/90 min-w-[160px]">
                  {language === 'en' ? "Get Started" : language === 'hi' ? "शुरू करें" : "Start karein"}
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  {language === 'en' ? "View Plans" : language === 'hi' ? "प्लान देखें" : "Plans dekhein"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'en' 
                  ? "Designed for Indian Families" 
                  : language === 'hi' 
                    ? "भारतीय परिवारों के लिए डिज़ाइन किया गया" 
                    : "Indian Families ke liye design kiya gaya"}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {language === 'en' 
                  ? "Features that understand your unique financial needs and cultural context." 
                  : language === 'hi' 
                    ? "ऐसी विशेषताएँ जो आपकी अनूठी वित्तीय आवश्यकताओं और सांस्कृतिक संदर्भ को समझती हैं।" 
                    : "Aisi features jo aapki unique financial zarooraton aur cultural context ko samajhti hain."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border border-gray-200 hover:border-royal-blue/30 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-royal-blue/10 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="w-6 h-6 text-royal-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? "Goal-Based Planning" : language === 'hi' ? "लक्ष्य-आधारित योजना" : "Goal-Based Planning"}
                  </h3>
                  <p className="text-gray-700">
                    {language === 'en' 
                      ? "Set and track financial goals for education, retirement, home, or festivals." 
                      : language === 'hi' 
                        ? "शिक्षा, सेवानिवृत्ति, घर या त्योहारों के लिए वित्तीय लक्ष्य निर्धारित करें और उनका ट्रैक रखें।" 
                        : "Education, retirement, ghar ya festivals ke liye financial goals set aur track karein."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-royal-blue/30 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-royal-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-royal-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? "Family Management" : language === 'hi' ? "परिवार प्रबंधन" : "Family Management"}
                  </h3>
                  <p className="text-gray-700">
                    {language === 'en' 
                      ? "Manage finances for your entire family with custom profiles and goals." 
                      : language === 'hi' 
                        ? "कस्टम प्रोफाइल और लक्ष्यों के साथ अपने पूरे परिवार के लिए वित्त का प्रबंधन करें।" 
                        : "Custom profiles aur goals ke saath apne pure family ke finances manage karein."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-royal-blue/30 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-royal-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Gift className="w-6 h-6 text-royal-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? "Festival Planning" : language === 'hi' ? "त्योहार योजना" : "Festival Planning"}
                  </h3>
                  <p className="text-gray-700">
                    {language === 'en' 
                      ? "Smart budgeting for Indian festivals and special occasions." 
                      : language === 'hi' 
                        ? "भारतीय त्योहारों और विशेष अवसरों के लिए स्मार्ट बजटिंग।" 
                        : "Indian festivals aur special occasions ke liye smart budgeting."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-royal-blue/30 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-royal-blue/10 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-royal-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? "Investment Intelligence" : language === 'hi' ? "निवेश बुद्धिमत्ता" : "Investment Intelligence"}
                  </h3>
                  <p className="text-gray-700">
                    {language === 'en' 
                      ? "AI-powered insights tailored for the Indian investment landscape." 
                      : language === 'hi' 
                        ? "भारतीय निवेश परिदृश्य के लिए AI-संचालित अंतर्दृष्टि।" 
                        : "Indian investment landscape ke liye AI-powered insights."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-royal-blue/30 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-royal-blue/10 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-royal-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? "Advisor Chat" : language === 'hi' ? "सलाहकार चैट" : "Advisor Chat"}
                  </h3>
                  <p className="text-gray-700">
                    {language === 'en' 
                      ? "Get personalized advice through our AI advisor or connect with experts." 
                      : language === 'hi' 
                        ? "हमारे AI सलाहकार के माध्यम से व्यक्तिगत सलाह प्राप्त करें या विशेषज्ञों से जुड़ें।" 
                        : "Humare AI advisor ke zariye personalized advice paayein ya experts se connect karein."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 hover:border-royal-blue/30 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-royal-blue/10 rounded-full flex items-center justify-center mb-4">
                    <BadgeCheck className="w-6 h-6 text-royal-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? "Smart Nudges" : language === 'hi' ? "स्मार्ट नज़र" : "Smart Nudges"}
                  </h3>
                  <p className="text-gray-700">
                    {language === 'en' 
                      ? "Timely, contextual recommendations that help you make better financial decisions." 
                      : language === 'hi' 
                        ? "समय पर, संदर्भित सिफारिशें जो आपको बेहतर वित्तीय निर्णय लेने में मदद करती हैं।" 
                        : "Timely, contextual recommendations jo aapko better financial decisions lene mein help karti hain."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-royal-blue/10 to-saffron-orange/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'en' 
                ? "Ready to Transform Your Financial Future?" 
                : language === 'hi' 
                  ? "अपने वित्तीय भविष्य को बदलने के लिए तैयार हैं?" 
                  : "Apne financial future ko badalne ke liye taiyaar?"}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              {language === 'en' 
                ? "Join thousands of Indian families who are already using Wealthवाणी to achieve their financial goals." 
                : language === 'hi' 
                  ? "हजारों भारतीय परिवारों से जुड़ें जो पहले से ही अपने वित्तीय लक्ष्यों को प्राप्त करने के लिए Wealthवाणी का उपयोग कर रहे हैं।" 
                  : "Hazaaron Indian families se judein jo pehle se hi apne financial goals ko achieve karne ke liye Wealthवाणी ka use kar rahe hain."}
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-royal-blue hover:bg-royal-blue/90 min-w-[180px]">
                {language === 'en' ? "Start Free" : language === 'hi' ? "मुफ्त शुरू करें" : "Free mein start karein"}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketing;
