
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { asLanguageOption, isLanguage } from '@/lib/typeUtils';
import { SectionCard } from '@/components/marketing/SectionCard';
import { TestimonialCard } from '@/components/marketing/TestimonialCard';
import { FeatureCard } from '@/components/marketing/FeatureCard';
import { CalculatorOutlined, LockOutlined, NotificationOutlined, TeamOutlined } from '@/components/marketing/Icons';
import Logo from '@/components/logo/Logo';
import { Globe } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('personal');
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo size="md" variant="full" /> {/* Added proper logo with name */}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <Button variant="link" onClick={() => navigate('/features')}>
                {isLanguage(language, 'en') 
                  ? "Features" 
                  : isLanguage(language, 'hi')
                    ? "विशेषताएँ"
                    : "Features"}
              </Button>
              <Button variant="link" onClick={() => navigate('/pricing')}>
                {isLanguage(language, 'en') 
                  ? "Pricing" 
                  : isLanguage(language, 'hi')
                    ? "मूल्य निर्धारण"
                    : "Pricing"}
              </Button>
              <Button variant="link" onClick={() => navigate('/blog')}>
                {isLanguage(language, 'en') 
                  ? "Blog" 
                  : isLanguage(language, 'hi')
                    ? "ब्लॉग"
                    : "Blog"}
              </Button>
              <Button variant="link" onClick={() => navigate('/about')}>
                {isLanguage(language, 'en') 
                  ? "About" 
                  : isLanguage(language, 'hi')
                    ? "हमारे बारे में"
                    : "About"}
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-royal-blue" />
              <select 
                className="text-sm border-none bg-transparent focus:ring-0"
                value={language}
                onChange={(e) => changeLanguage(asLanguageOption(e.target.value))}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="border-royal-blue text-royal-blue hover:bg-royal-blue/5"
                onClick={() => navigate('/login')}
              >
                {isLanguage(language, 'en') 
                  ? "Login" 
                  : isLanguage(language, 'hi')
                    ? "लॉगिन"
                    : "Login"}
              </Button>
              <Button 
                className="bg-royal-blue hover:bg-royal-blue/90"
                onClick={() => navigate('/login', { state: { defaultTab: 'signup' } })}
              >
                {isLanguage(language, 'en') 
                  ? "Sign Up" 
                  : isLanguage(language, 'hi')
                    ? "साइन अप"
                    : "Sign Up"}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-royal-blue/10 to-saffron-orange/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center rounded-full border border-royal-blue/30 bg-royal-blue/5 px-3 py-1 text-sm">
                <span className="flex items-center gap-1 text-royal-blue font-medium">
                  {isLanguage(language, 'en')
                    ? "Launching Now"
                    : isLanguage(language, 'hi')
                      ? "अब लॉन्च हो रहा है"
                      : "Ab Launch Ho Raha Hai"}
                  <span className="ml-1 text-xs text-royal-blue">✨</span>
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold">
                {isLanguage(language, 'en')
                  ? "Your Family's Financial Companion"
                  : isLanguage(language, 'hi')
                    ? "आपके परिवार का वित्तीय साथी"
                    : "Aapke Parivar Ka Finance Partner"}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground">
                {isLanguage(language, 'en')
                  ? "India's first agentic wealth operating system designed to be your family's digital CA."
                  : isLanguage(language, 'hi')
                    ? "भारत का पहला एजेंटिक वेल्थ ऑपरेटिंग सिस्टम जो आपके परिवार का डिजिटल CA बनने के लिए डिज़ाइन किया गया है।"
                    : "India ka pehla agentic wealth operating system jo aapke parivar ka digital CA banne ke liye design kiya gaya hai."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  size="lg"
                  className="bg-royal-blue hover:bg-royal-blue/90 text-white"
                  onClick={() => navigate('/login', { state: { defaultTab: 'signup' } })}
                >
                  {isLanguage(language, 'en')
                    ? "Start For Free"
                    : isLanguage(language, 'hi')
                      ? "निःशुल्क शुरू करें"
                      : "Free Mein Start Karein"}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-royal-blue text-royal-blue hover:bg-royal-blue/5"
                  onClick={() => navigate('/features')}
                >
                  {isLanguage(language, 'en')
                    ? "See How It Works"
                    : isLanguage(language, 'hi')
                      ? "देखें कैसे काम करता है"
                      : "Dekhein Kaise Kaam Karta Hai"}
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <div className="bg-gradient-to-r from-royal-blue to-saffron-orange p-1 rounded-xl shadow-xl">
                  <div className="bg-background rounded-lg overflow-hidden">
                    <img 
                      src="/assets/dashboard-preview.png" 
                      alt="Wealth Vaani Dashboard" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-3 border border-muted">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <span>✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {isLanguage(language, 'en')
                          ? "Goal tracking active"
                          : isLanguage(language, 'hi')
                            ? "लक्ष्य ट्रैकिंग सक्रिय"
                            : "Goal tracking active"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isLanguage(language, 'en')
                          ? "Emergency fund on track"
                          : isLanguage(language, 'hi')
                            ? "आपातकालीन फंड ट्रैक पर है"
                            : "Emergency fund on track"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isLanguage(language, 'en')
                ? "Your Financial Journey, Simplified"
                : isLanguage(language, 'hi')
                  ? "आपकी वित्तीय यात्रा, सरल बनाई गई"
                  : "Aapki Financial Journey, Simplified"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isLanguage(language, 'en')
                ? "We combine the expertise of financial advisors with the power of AI to provide personalized guidance for your unique financial goals."
                : isLanguage(language, 'hi')
                  ? "हम आपके अनूठे वित्तीय लक्ष्यों के लिए व्यक्तिगत मार्गदर्शन प्रदान करने के लिए वित्तीय सलाहकारों की विशेषज्ञता को AI की शक्ति के साथ जोड़ते हैं।"
                  : "Hum aapke unique financial goals ke liye personalized guidance provide karne ke liye financial advisors ki expertise ko AI ki power ke saath combine karte hain."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<CalculatorOutlined />} 
              title={
                isLanguage(language, 'en')
                  ? "Simplified Money Management"
                  : isLanguage(language, 'hi')
                    ? "सरलीकृत धन प्रबंधन"
                    : "Simple Money Management"
              } 
              description={
                isLanguage(language, 'en')
                  ? "Track expenses, set budgets, and manage your finances all in one place."
                  : isLanguage(language, 'hi')
                    ? "एक ही जगह पर खर्चों को ट्रैक करें, बजट सेट करें और अपने वित्त का प्रबंधन करें।"
                    : "Ek hi jagah par expenses track karein, budget set karein aur apne finances manage karein."
              }
            />
            <FeatureCard 
              icon={<NotificationOutlined />} 
              title={
                isLanguage(language, 'en')
                  ? "Smart Financial Nudges"
                  : isLanguage(language, 'hi')
                    ? "स्मार्ट वित्तीय नज़"
                    : "Smart Financial Nudges"
              } 
              description={
                isLanguage(language, 'en')
                  ? "Receive personalized suggestions to improve your financial health."
                  : isLanguage(language, 'hi')
                    ? "अपने वित्तीय स्वास्थ्य में सुधार के लिए व्यक्तिगत सुझाव प्राप्त करें।"
                    : "Apne financial health mein sudhar ke liye personalized suggestions paayen."
              }
            />
            <FeatureCard 
              icon={<LockOutlined />} 
              title={
                isLanguage(language, 'en')
                  ? "Privacy Focused"
                  : isLanguage(language, 'hi')
                    ? "गोपनीयता केंद्रित"
                    : "Privacy Focused"
              } 
              description={
                isLanguage(language, 'en')
                  ? "Your financial data stays private and secure with bank-level encryption."
                  : isLanguage(language, 'hi')
                    ? "आपका वित्तीय डेटा बैंक-स्तरीय एन्क्रिप्शन के साथ निजी और सुरक्षित रहता है।"
                    : "Aapka financial data bank-level encryption ke saath private aur secure rehta hai."
              }
            />
            <FeatureCard 
              icon={<TeamOutlined />} 
              title={
                isLanguage(language, 'en')
                  ? "Family Financial Planning"
                  : isLanguage(language, 'hi')
                    ? "परिवार वित्तीय योजना"
                    : "Family Financial Planning"
              } 
              description={
                isLanguage(language, 'en')
                  ? "Plan for your family's financial future with goals-based saving tools."
                  : isLanguage(language, 'hi')
                    ? "लक्ष्य-आधारित बचत उपकरणों के साथ अपने परिवार के वित्तीय भविष्य की योजना बनाएं।"
                    : "Goal-based saving tools ke saath apne parivar ke financial future ki planning karein."
              }
            />
          </div>
        </div>
      </section>
      
      {/* Tabs Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isLanguage(language, 'en')
                ? "Tailored For Your Needs"
                : isLanguage(language, 'hi')
                  ? "आपकी आवश्यकताओं के अनुसार"
                  : "Aapki Needs Ke Hisaab Se"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isLanguage(language, 'en')
                ? "Whether you're an individual, a family, or a business - we've got you covered."
                : isLanguage(language, 'hi')
                  ? "चाहे आप एक व्यक्ति हों, एक परिवार हों, या एक व्यवसाय - हमने आपको कवर किया है।"
                  : "Chahe aap ek individual hon, family hon, ya business - humne aapko cover kiya hai."}
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Button 
                variant={activeTab === 'personal' ? 'default' : 'outline'}
                onClick={() => setActiveTab('personal')}
                className={activeTab === 'personal' ? 'bg-royal-blue' : ''}
              >
                {isLanguage(language, 'en')
                  ? "Personal Finance"
                  : isLanguage(language, 'hi')
                    ? "व्यक्तिगत वित्त"
                    : "Personal Finance"}
              </Button>
              <Button 
                variant={activeTab === 'family' ? 'default' : 'outline'}
                onClick={() => setActiveTab('family')}
                className={activeTab === 'family' ? 'bg-royal-blue' : ''}
              >
                {isLanguage(language, 'en')
                  ? "Family Finance"
                  : isLanguage(language, 'hi')
                    ? "परिवार वित्त"
                    : "Family Finance"}
              </Button>
              <Button 
                variant={activeTab === 'festival' ? 'default' : 'outline'}
                onClick={() => setActiveTab('festival')}
                className={activeTab === 'festival' ? 'bg-royal-blue' : ''}
              >
                {isLanguage(language, 'en')
                  ? "Festival Planning"
                  : isLanguage(language, 'hi')
                    ? "त्योहार योजना"
                    : "Festival Planning"}
              </Button>
            </div>
          </div>
          
          <div className="mt-12">
            {activeTab === 'personal' && (
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">
                    {isLanguage(language, 'en')
                      ? "Take Control of Your Finances"
                      : isLanguage(language, 'hi')
                        ? "अपने वित्त का नियंत्रण लें"
                        : "Apne Finances Ka Control Lein"}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-1 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue">✓</div>
                      <div>
                        <p className="font-medium">
                          {isLanguage(language, 'en')
                            ? "Personalized Goal Planning"
                            : isLanguage(language, 'hi')
                              ? "व्यक्तिगत लक्ष्य योजना"
                              : "Personalized Goal Planning"}
                        </p>
                        <p className="text-muted-foreground">
                          {isLanguage(language, 'en')
                            ? "Set financial goals and track your progress with customized plans."
                            : isLanguage(language, 'hi')
                              ? "अनुकूलित योजनाओं के साथ वित्तीय लक्ष्य निर्धारित करें और अपनी प्रगति को ट्रैक करें।"
                              : "Customized plans ke saath financial goals set karein aur apni progress track karein."}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-1 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue">✓</div>
                      <div>
                        <p className="font-medium">
                          {isLanguage(language, 'en')
                            ? "Smart Expense Tracking"
                            : isLanguage(language, 'hi')
                              ? "स्मार्ट व्यय ट्रैकिंग"
                              : "Smart Expense Tracking"}
                        </p>
                        <p className="text-muted-foreground">
                          {isLanguage(language, 'en')
                            ? "Automatically categorize and analyze your spending patterns."
                            : isLanguage(language, 'hi')
                              ? "अपने खर्च पैटर्न को स्वचालित रूप से वर्गीकृत और विश्लेषण करें।"
                              : "Automatically apne spending patterns ko categorize aur analyze karein."}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-1 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue">✓</div>
                      <div>
                        <p className="font-medium">
                          {isLanguage(language, 'en')
                            ? "Investment Recommendations"
                            : isLanguage(language, 'hi')
                              ? "निवेश सिफारिशें"
                              : "Investment Recommendations"}
                        </p>
                        <p className="text-muted-foreground">
                          {isLanguage(language, 'en')
                            ? "Get AI-powered investment suggestions based on your risk profile."
                            : isLanguage(language, 'hi')
                              ? "अपने जोखिम प्रोफ़ाइल के आधार पर AI-संचालित निवेश सुझाव प्राप्त करें।"
                              : "Apne risk profile ke basis par AI-powered investment suggestions paayen."}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <img 
                    src="/assets/personal-finance.png" 
                    alt="Personal Finance Dashboard" 
                    className="rounded-lg shadow-lg border border-muted w-full" 
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'family' && (
              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">
                    {isLanguage(language, 'en')
                      ? "Manage Your Family's Financial Future"
                      : isLanguage(language, 'hi')
                        ? "अपने परिवार के वित्तीय भविष्य का प्रबंधन करें"
                        : "Apne Family Ke Financial Future Ko Manage Karein"}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-1 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue">✓</div>
                      <div>
                        <p className="font-medium">
                          {isLanguage(language, 'en')
                            ? "Family Member Profiles"
                            : isLanguage(language, 'hi')
                              ? "परिवार के सदस्य प्रोफाइल"
                              : "Family Member Profiles"}
                        </p>
                        <p className="text-muted-foreground">
                          {isLanguage(language, 'en')
                            ? "Create profiles for each family member with their financial needs."
                            : isLanguage(language, 'hi')
                              ? "परिवार के प्रत्येक सदस्य के लिए उनकी वित्तीय जरूरतों के साथ प्रोफाइल बनाएं।"
                              : "Har family member ke liye unki financial needs ke saath profiles create karein."}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-1 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue">✓</div>
                      <div>
                        <p className="font-medium">
                          {isLanguage(language, 'en')
                            ? "Education Planning"
                            : isLanguage(language, 'hi')
                              ? "शिक्षा योजना"
                              : "Education Planning"}
                        </p>
                        <p className="text-muted-foreground">
                          {isLanguage(language, 'en')
                            ? "Plan and save for your children's education with tailored recommendations."
                            : isLanguage(language, 'hi')
                              ? "अनुकूलित सिफारिशों के साथ अपने बच्चों की शिक्षा के लिए योजना बनाएं और बचत करें।"
                              : "Tailored recommendations ke saath apne bachchon ki education ke liye plan karein aur save karein."}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-1 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue">✓</div>
                      <div>
                        <p className="font-medium">
                          {isLanguage(language, 'en')
                            ? "Shared Financial Goals"
                            : isLanguage(language, 'hi')
                              ? "साझा वित्तीय लक्ष्य"
                              : "Shared Financial Goals"}
                        </p>
                        <p className="text-muted-foreground">
                          {isLanguage(language, 'en')
                            ? "Set goals as a family and track contributions from each member."
                            : isLanguage(language, 'hi')
                              ? "एक परिवार के रूप में लक्ष्य निर्धारित करें और प्रत्येक सदस्य से योगदान को ट्रैक करें।"
                              : "Ek family ke roop mein goals set karein aur har member se contribution track karein."}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <img 
                    src="/assets/family-finance.png" 
                    alt="Family Finance Planning" 
                    className="rounded-lg shadow-lg border border-muted w-full" 
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'festival' && (
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">
                    {isLanguage(language, 'en')
                      ? "Plan Ahead for Festivals & Seasons"
                      : isLanguage(language, 'hi')
                        ? "त्योहारों और मौसमों के लिए पहले से योजना बनाएं"
                        : "Festivals & Seasons Ke Liye Pehle Se Plan Karein"}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-1 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue">✓</div>
                      <div>
                        <p className="font-medium">
                          {isLanguage(language, 'en')
                            ? "Festival Budget Planning"
                            : isLanguage(language, 'hi')
                              ? "त्योहार बजट योजना"
                              : "Festival Budget Planning"}
                        </p>
                        <p className="text-muted-foreground">
                          {isLanguage(language, 'en')
                            ? "Create budgets for Diwali, Eid, Holi and other important festivals."
                            : isLanguage(language, 'hi')
                              ? "दिवाली, ईद, होली और अन्य महत्वपूर्ण त्योहारों के लिए बजट बनाएं।"
                              : "Diwali, Eid, Holi aur doosre important festivals ke liye budget create karein."}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-1 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue">✓</div>
                      <div>
                        <p className="font-medium">
                          {isLanguage(language, 'en')
                            ? "Seasonal Expense Planning"
                            : isLanguage(language, 'hi')
                              ? "मौसमी खर्च योजना"
                              : "Seasonal Expense Planning"}
                        </p>
                        <p className="text-muted-foreground">
                          {isLanguage(language, 'en')
                            ? "Plan for seasonal expenses like summer vacation or monsoon repairs."
                            : isLanguage(language, 'hi')
                              ? "गर्मी की छुट्टियों या मानसून की मरम्मत जैसे मौसमी खर्चों के लिए योजना बनाएं।"
                              : "Summer vacation ya monsoon repairs jaise seasonal expenses ke liye plan karein."}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 mt-1 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue">✓</div>
                      <div>
                        <p className="font-medium">
                          {isLanguage(language, 'en')
                            ? "Automated Saving Reminders"
                            : isLanguage(language, 'hi')
                              ? "स्वचालित बचत अनुस्मारक"
                              : "Automated Saving Reminders"}
                        </p>
                        <p className="text-muted-foreground">
                          {isLanguage(language, 'en')
                            ? "Get reminders to set aside money for upcoming cultural events."
                            : isLanguage(language, 'hi')
                              ? "आगामी सांस्कृतिक कार्यक्रमों के लिए पैसे अलग रखने के लिए अनुस्मारक प्राप्त करें।"
                              : "Upcoming cultural events ke liye paise alag rakhne ke reminders paayen."}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <img 
                    src="/assets/festival-planning.png" 
                    alt="Festival Planning" 
                    className="rounded-lg shadow-lg border border-muted w-full" 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {isLanguage(language, 'en')
              ? "What Our Users Say"
              : isLanguage(language, 'hi')
                ? "हमारे उपयोगकर्ता क्या कहते हैं"
                : "Hamare Users Kya Kehte Hain"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard 
              quote={
                isLanguage(language, 'en')
                  ? "Wealthवाणी helped me plan for my daughter's education in a way I never could before."
                  : isLanguage(language, 'hi')
                    ? "वेल्थवाणी ने मुझे अपनी बेटी की शिक्षा के लिए ऐसे योजना बनाने में मदद की, जैसे मैं पहले कभी नहीं कर सकता था।"
                    : "Wealthवाणी ne mujhe apni beti ki education ke liye aise plan karne mein help ki, jaise main pehle kabhi nahi kar sakta tha."
              }
              name="Vishal Sharma"
              role="IT Professional, Bengaluru"
            />
            <TestimonialCard 
              quote={
                isLanguage(language, 'en')
                  ? "The nudges and reminders have helped me save 20% more each month without feeling any pinch!"
                  : isLanguage(language, 'hi')
                    ? "नज और रिमाइंडर ने मुझे बिना किसी परेशानी के हर महीने 20% अधिक बचत करने में मदद की है!"
                    : "Nudges aur reminders ne mujhe bina kisi pareshani ke har month 20% zyada save karne mein help ki hai!"
              }
              name="Priya Patel"
              role="Teacher, Mumbai"
            />
            <TestimonialCard 
              quote={
                isLanguage(language, 'en')
                  ? "Finally an app that understands Indian financial needs and our festival planning requirements."
                  : isLanguage(language, 'hi')
                    ? "आखिरकार एक ऐसा ऐप जो भारतीय वित्तीय जरूरतों और हमारी त्योहार योजना आवश्यकताओं को समझता है।"
                    : "Finally ek aisa app jo Indian financial needs aur humare festival planning requirements ko samajhta hai."
              }
              name="Rahul Mehra"
              role="Business Owner, Delhi"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-royal-blue to-saffron-orange py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {isLanguage(language, 'en')
                ? "Ready to Transform Your Financial Future?"
                : isLanguage(language, 'hi')
                  ? "अपने वित्तीय भविष्य को बदलने के लिए तैयार हैं?"
                  : "Apne Financial Future Ko Transform Karne Ke Liye Ready?"}
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              {isLanguage(language, 'en')
                ? "Join thousands of Indian families who are taking control of their finances with Wealthवाणी."
                : isLanguage(language, 'hi')
                  ? "हजारों भारतीय परिवारों से जुड़ें जो वेल्थवाणी के साथ अपने वित्त का नियंत्रण ले रहे हैं।"
                  : "Hazaron Indian families se judein jo Wealthवाणी ke saath apne finances ka control le rahe hain."}
            </p>
            <Button 
              size="lg"
              className="bg-white text-royal-blue hover:bg-white/90"
              onClick={() => navigate('/login', { state: { defaultTab: 'signup' } })}
            >
              {isLanguage(language, 'en')
                ? "Start Your Free Account"
                : isLanguage(language, 'hi')
                  ? "अपना निःशुल्क खाता शुरू करें"
                  : "Apna Free Account Start Karein"}
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted/40 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <Logo size="lg" variant="full" /> {/* Added proper logo with name */}
              <p className="mt-4 text-muted-foreground max-w-xs">
                {isLanguage(language, 'en')
                  ? "India's first agentic wealth operating system for families."
                  : isLanguage(language, 'hi')
                    ? "परिवारों के लिए भारत का पहला एजेंटिक वेल्थ ऑपरेटिंग सिस्टम।"
                    : "Families ke liye India ka pehla agentic wealth operating system."}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-medium mb-3">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/features" className="hover:text-foreground">Features</a></li>
                  <li><a href="/pricing" className="hover:text-foreground">Pricing</a></li>
                  <li><a href="/testimonials" className="hover:text-foreground">Testimonials</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/about" className="hover:text-foreground">About Us</a></li>
                  <li><a href="/careers" className="hover:text-foreground">Careers</a></li>
                  <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/blog" className="hover:text-foreground">Blog</a></li>
                  <li><a href="/guides" className="hover:text-foreground">Guides</a></li>
                  <li><a href="/help" className="hover:text-foreground">Help Center</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/privacy" className="hover:text-foreground">Privacy</a></li>
                  <li><a href="/terms" className="hover:text-foreground">Terms</a></li>
                  <li><a href="/security" className="hover:text-foreground">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-muted flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Wealthवाणी. All rights reserved.
            </p>
            <div className="flex mt-4 md:mt-0">
              <a href="#" className="mx-2">
                <svg className="h-6 w-6 text-muted-foreground hover:text-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="mx-2">
                <svg className="h-6 w-6 text-muted-foreground hover:text-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="mx-2">
                <svg className="h-6 w-6 text-muted-foreground hover:text-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
