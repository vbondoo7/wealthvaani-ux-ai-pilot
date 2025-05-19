
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { asLanguageOption, isLanguage } from '@/lib/typeUtils';
import { TestimonialCard } from '@/components/marketing/TestimonialCard';
import { FeatureCard } from '@/components/marketing/FeatureCard';
import { SectionCard } from '@/components/marketing/SectionCard';
import { 
  CalculatorOutlined, 
  LockOutlined, 
  NotificationOutlined, 
  TeamOutlined 
} from '@/components/marketing/Icons';
import Logo from '@/components/logo/Logo';
import { ArrowRight, CheckCircle, Globe, MoveRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('personal');
  
  const getStarted = () => {
    navigate('/login', { state: { defaultTab: 'signup' } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo size="md" variant="full" /> 
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <Button 
                variant="link"
                onClick={() => navigate('/features')}
              >
                {isLanguage(language, 'en') ? "Features" : isLanguage(language, 'hi') ? "विशेषताएँ" : "Features"}
              </Button>
              
              <Button 
                variant="link"
                onClick={() => navigate('/pricing')}
              >
                {isLanguage(language, 'en') ? "Pricing" : isLanguage(language, 'hi') ? "मूल्य निर्धारण" : "Pricing"}
              </Button>
              
              <Button 
                variant="link"
                onClick={() => navigate('/blog')}
              >
                {isLanguage(language, 'en') ? "Blog" : isLanguage(language, 'hi') ? "ब्लॉग" : "Blog"}
              </Button>
              
              <Button 
                variant="link"
                onClick={() => navigate('/about')}
              >
                {isLanguage(language, 'en') ? "About" : isLanguage(language, 'hi') ? "हमारे बारे में" : "About"}
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
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-royal-blue/5 to-saffron-orange/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] opacity-5 bg-cover bg-center"></div>
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 md:pr-12 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-royal-blue to-saffron-orange bg-clip-text text-transparent inline-block">
                  {isLanguage(language, 'en')
                    ? "India's First Proactive"
                    : isLanguage(language, 'hi')
                      ? "भारत का पहला सक्रिय"
                      : "India Ka Pehla Proactive"}
                </span>
                <br />
                {isLanguage(language, 'en')
                  ? "Wealth Companion"
                  : isLanguage(language, 'hi')
                    ? "धन सहायक"
                    : "Wealth Companion"}
              </h1>
              
              <p className="text-xl mb-8 text-gray-600">
                {isLanguage(language, 'en')
                  ? "Your family's digital CA that helps you plan, decide, and act on your financial goals."
                  : isLanguage(language, 'hi')
                    ? "आपका पारिवारिक डिजिटल CA जो आपको वित्तीय लक्ष्यों पर योजना बनाने, निर्णय लेने और कार्य करने में मदद करता है।"
                    : "Aapka family digital CA jo aapko financial goals par plan karne, decide karne aur act karne mein madad karta hai."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  className="bg-royal-blue hover:bg-royal-blue/90 text-lg h-12 px-8"
                  onClick={getStarted}
                >
                  {isLanguage(language, 'en')
                    ? "Get Started"
                    : isLanguage(language, 'hi')
                      ? "शुरू करें"
                      : "Start Karein"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="text-lg h-12 px-8 border-royal-blue text-royal-blue hover:bg-royal-blue/10"
                  onClick={() => navigate('/marketing')}
                >
                  {isLanguage(language, 'en')
                    ? "Learn More"
                    : isLanguage(language, 'hi')
                      ? "और जानें"
                      : "Aur Janein"}
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Wealthवाणी Dashboard" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold">Smart Financial Dashboard</h3>
                      <p className="text-white/80">Track all your finances in one place</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 -bottom-4 bg-saffron-orange/90 text-white rounded-lg p-3 shadow-lg">
                  <div className="font-bold text-xl">₹12.4L</div>
                  <div className="text-xs">Goal Progress</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isLanguage(language, 'en')
                ? "Why Choose Wealthवाणी?"
                : isLanguage(language, 'hi')
                  ? "Wealthवाणी को क्यों चुनें?"
                  : "Wealthवाणी Ko Kyun Chunein?"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<CalculatorOutlined />}
                title={isLanguage(language, 'en') ? "Smart Planning" : isLanguage(language, 'hi') ? "स्मार्ट योजना" : "Smart Planning"}
                description={isLanguage(language, 'en')
                  ? "AI-powered financial planning that adapts to your goals and lifestyle"
                  : isLanguage(language, 'hi')
                    ? "AI-संचालित वित्तीय योजना जो आपके लक्ष्यों और जीवनशैली के अनुकूल है"
                    : "AI-powered financial planning jo aapke goals aur lifestyle ke according adapt karta hai"}
              />
              
              <FeatureCard
                icon={<NotificationOutlined />}
                title={isLanguage(language, 'en') ? "Timely Nudges" : isLanguage(language, 'hi') ? "समय पर सुझाव" : "Time Par Suggestions"}
                description={isLanguage(language, 'en')
                  ? "Get personalized financial nudges and alerts at the right time"
                  : isLanguage(language, 'hi')
                    ? "सही समय पर व्यक्तिगत वित्तीय सुझाव और अलर्ट प्राप्त करें"
                    : "Sahi samay par personalized financial nudges aur alerts paayein"}
              />
              
              <FeatureCard
                icon={<LockOutlined />}
                title={isLanguage(language, 'en') ? "Bank-Grade Security" : isLanguage(language, 'hi') ? "बैंक-स्तरीय सुरक्षा" : "Bank-Level Security"}
                description={isLanguage(language, 'en')
                  ? "Your financial data is protected with enterprise-grade encryption"
                  : isLanguage(language, 'hi')
                    ? "आपका वित्तीय डेटा एंटरप्राइज-स्तरीय एन्क्रिप्शन के साथ सुरक्षित है"
                    : "Aapka financial data enterprise-grade encryption ke saath surakshit hai"}
              />
              
              <FeatureCard
                icon={<TeamOutlined />}
                title={isLanguage(language, 'en') ? "Family Management" : isLanguage(language, 'hi') ? "परिवार प्रबंधन" : "Family Management"}
                description={isLanguage(language, 'en')
                  ? "Manage finances for your entire family with multi-user access"
                  : isLanguage(language, 'hi')
                    ? "मल्टी-यूजर एक्सेस के साथ अपने पूरे परिवार के लिए वित्त का प्रबंधन करें"
                    : "Multi-user access ke saath pure parivar ke liye finances manage karein"}
              />
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 bg-gradient-to-br from-royal-blue/5 to-saffron-orange/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {isLanguage(language, 'en')
                  ? "Key Features"
                  : isLanguage(language, 'hi')
                    ? "प्रमुख विशेषताएँ"
                    : "Key Features"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isLanguage(language, 'en')
                  ? "Discover the powerful tools that make Wealthवाणी your perfect financial companion"
                  : isLanguage(language, 'hi')
                    ? "उन शक्तिशाली उपकरणों की खोज करें जो Wealthवाणी को आपका आदर्श वित्तीय साथी बनाते हैं"
                    : "Un powerful tools ko discover karein jo Wealthवाणी ko aapka perfect financial companion banate hain"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SectionCard
                title={isLanguage(language, 'en') ? "Goal Planning" : isLanguage(language, 'hi') ? "लक्ष्य योजना" : "Goal Planning"}
                description={isLanguage(language, 'en') 
                  ? "Set and track your financial goals with smart recommendations" 
                  : isLanguage(language, 'hi')
                    ? "स्मार्ट अनुशंसाओं के साथ अपने वित्तीय लक्ष्यों को निर्धारित करें और ट्रैक करें"
                    : "Smart recommendations ke saath apne financial goals set aur track karein"}
              >
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Goal Planning" 
                  className="rounded-lg mt-4 w-full h-40 object-cover" 
                />
              </SectionCard>
              
              <SectionCard
                title={isLanguage(language, 'en') ? "Festival Planning" : isLanguage(language, 'hi') ? "त्योहार योजना" : "Festival Planning"}
                description={isLanguage(language, 'en')
                  ? "Plan your finances for special occasions and festivals"
                  : isLanguage(language, 'hi')
                    ? "विशेष अवसरों और त्योहारों के लिए अपने वित्त की योजना बनाएं"
                    : "Special occasions aur festivals ke liye apne finances plan karein"}
              >
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                  alt="Festival Planning" 
                  className="rounded-lg mt-4 w-full h-40 object-cover" 
                />
              </SectionCard>
              
              <SectionCard
                title={isLanguage(language, 'en') ? "Investment Intelligence" : isLanguage(language, 'hi') ? "निवेश बुद्धिमत्ता" : "Investment Intelligence"}
                description={isLanguage(language, 'en')
                  ? "Get smart recommendations tailored to your risk profile"
                  : isLanguage(language, 'hi')
                    ? "अपने जोखिम प्रोफ़ाइल के अनुसार स्मार्ट अनुशंसाएँ प्राप्त करें"
                    : "Apne risk profile ke hisaab se smart recommendations paayein"}
              >
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
                  alt="Investment Intelligence" 
                  className="rounded-lg mt-4 w-full h-40 object-cover" 
                />
              </SectionCard>
              
              <SectionCard
                title={isLanguage(language, 'en') ? "Financial Analytics" : isLanguage(language, 'hi') ? "वित्तीय विश्लेषण" : "Financial Analytics"}
                description={isLanguage(language, 'en')
                  ? "Visualize your spending patterns and identify saving opportunities"
                  : isLanguage(language, 'hi')
                    ? "अपने खर्च पैटर्न को विज़ुअलाइज़ करें और बचत के अवसरों की पहचान करें"
                    : "Apne spending patterns visualize karein aur saving opportunities identify karein"}
              >
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                  alt="Financial Analytics" 
                  className="rounded-lg mt-4 w-full h-40 object-cover" 
                />
              </SectionCard>
              
              <SectionCard
                title={isLanguage(language, 'en') ? "Budget Management" : isLanguage(language, 'hi') ? "बजट प्रबंधन" : "Budget Management"}
                description={isLanguage(language, 'en')
                  ? "Create and manage budgets that adapt to your changing needs"
                  : isLanguage(language, 'hi')
                    ? "बजट बनाएं और प्रबंधित करें जो आपकी बदलती जरूरतों के अनुकूल हों"
                    : "Create aur manage karein budgets jo aapki changing needs ke according adapt karein"}
              >
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                  alt="Budget Management" 
                  className="rounded-lg mt-4 w-full h-40 object-cover" 
                />
              </SectionCard>
              
              <SectionCard
                title={isLanguage(language, 'en') ? "Advisory Chat" : isLanguage(language, 'hi') ? "सलाहकार चैट" : "Advisory Chat"}
                description={isLanguage(language, 'en')
                  ? "Get instant answers to all your financial queries"
                  : isLanguage(language, 'hi')
                    ? "अपने सभी वित्तीय प्रश्नों के तत्काल उत्तर प्राप्त करें"
                    : "Apne sabhi financial questions ke turant answers paayein"}
              >
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Advisory Chat" 
                  className="rounded-lg mt-4 w-full h-40 object-cover" 
                />
              </SectionCard>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                className="text-royal-blue border-royal-blue hover:bg-royal-blue/10 flex items-center"
                onClick={() => navigate('/features')}
              >
                {isLanguage(language, 'en')
                  ? "Explore All Features"
                  : isLanguage(language, 'hi')
                    ? "सभी विशेषताएं एक्सप्लोर करें"
                    : "Explore All Features"}
                <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Pricing Teaser */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {isLanguage(language, 'en')
                  ? "Simple, Transparent Pricing"
                  : isLanguage(language, 'hi')
                    ? "सरल, पारदर्शी मूल्य निर्धारण"
                    : "Simple, Transparent Pricing"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isLanguage(language, 'en')
                  ? "Choose the plan that best fits your financial journey"
                  : isLanguage(language, 'hi')
                    ? "वह प्लान चुनें जो आपकी वित्तीय यात्रा के लिए सबसे उपयुक्त हो"
                    : "Wo plan chunein jo aapki financial journey ke liye sabse suitable ho"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Basic</h3>
                  <div className="text-3xl font-bold mb-6">
                    ₹0 <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Auto expense tracking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Basic financial nudges (3/month)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Auto-save suggestions</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Privacy-first approach</span>
                    </li>
                  </ul>
                  
                  <Button 
                    className="w-full"
                    onClick={getStarted}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              
              {/* Pro Plan */}
              <div className="border rounded-lg overflow-hidden shadow-lg relative transform scale-105 bg-white">
                <div className="bg-royal-blue text-white text-center py-1">
                  <span className="text-sm font-medium">Most Popular</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Pro</h3>
                  <div className="text-3xl font-bold mb-6">
                    ₹199 <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Everything in Basic</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Unlimited financial nudges</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Goal-based planning & tracking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Cash flow forecasting</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Festival & seasonal planning</span>
                    </li>
                  </ul>
                  
                  <Button 
                    className="w-full bg-royal-blue hover:bg-royal-blue/90"
                    onClick={getStarted}
                  >
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
              
              {/* Premium Plan */}
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Premium</h3>
                  <div className="text-3xl font-bold mb-6">
                    ₹499 <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Family profiles & management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Advanced investment intelligence</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Monthly detailed financial reports</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Priority advisor access</span>
                    </li>
                  </ul>
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={getStarted}
                  >
                    Get Premium
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button 
                variant="outline" 
                className="text-royal-blue border-royal-blue hover:bg-royal-blue/10"
                onClick={() => navigate('/pricing')}
              >
                {isLanguage(language, 'en')
                  ? "View Full Pricing Details"
                  : isLanguage(language, 'hi')
                    ? "पूरी कीमत विवरण देखें"
                    : "Full Pricing Details Dekhein"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-br from-royal-blue/5 to-saffron-orange/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isLanguage(language, 'en')
                ? "What Our Users Say"
                : isLanguage(language, 'hi')
                  ? "हमारे उपयोगकर्ता क्या कहते हैं"
                  : "Hamare Users Kya Kehte Hain"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote={isLanguage(language, 'en')
                  ? "Wealthवाणी helped me save for my son's education while managing daily expenses. The goal tracking feature is fantastic!"
                  : isLanguage(language, 'hi')
                    ? "Wealthवाणी ने मुझे दैनिक खर्चों का प्रबंधन करते हुए अपने बेटे की शिक्षा के लिए बचत करने में मदद की। लक्ष्य ट्रैकिंग फ़ीचर शानदार है!"
                    : "Wealthवाणी ne mujhe daily expenses manage karte hue apne bete ki education ke liye save karne mein madad ki. Goal tracking feature fantastic hai!"}
                name="Rahul Singh"
                role="Software Engineer"
              />
              
              <TestimonialCard
                quote={isLanguage(language, 'en')
                  ? "The festival planning feature is a lifesaver. Now I'm never caught off guard by seasonal expenses and celebrations."
                  : isLanguage(language, 'hi')
                    ? "फेस्टिवल प्लानिंग फीचर एक जीवनरक्षक है। अब मैं कभी भी मौसमी खर्चों और उत्सवों से अनजान नहीं रहता।"
                    : "Festival planning feature ek lifesaver hai. Ab main kabhi bhi seasonal expenses aur celebrations se unprepared nahi hota."}
                name="Priya Patel"
                role="Marketing Manager"
              />
              
              <TestimonialCard
                quote={isLanguage(language, 'en')
                  ? "As someone who knew nothing about investing, the app's simple explanations and personalized suggestions helped me grow my savings significantly."
                  : isLanguage(language, 'hi')
                    ? "एक ऐसे व्यक्ति के रूप में जो निवेश के बारे में कुछ नहीं जानता था, ऐप के सरल स्पष्टीकरण और व्यक्तिगत सुझावों ने मुझे अपनी बचत को काफी बढ़ाने में मदद की।"
                    : "Ek aise insaan ke roop mein jo investing ke baare mein kuch nahi jaanta tha, app ke simple explanations aur personalized suggestions ne mujhe apni savings significantly grow karne mein madad ki."}
                name="Arjun Mehta"
                role="School Teacher"
              />
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-royal-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {isLanguage(language, 'en')
                ? "Ready to Take Control of Your Financial Future?"
                : isLanguage(language, 'hi')
                  ? "अपने वित्तीय भविष्य का नियंत्रण लेने के लिए तैयार हैं?"
                  : "Apne financial future ka control lene ke liye ready hain?"}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {isLanguage(language, 'en')
                ? "Join thousands of Indian families who are achieving their financial goals with Wealthवाणी."
                : isLanguage(language, 'hi')
                  ? "हजारों भारतीय परिवारों से जुड़ें जो Wealthवाणी के साथ अपने वित्तीय लक्ष्यों को प्राप्त कर रहे हैं।"
                  : "Hazaaron Indian families se judein jo Wealthवाणी ke saath apne financial goals achieve kar rahe hain."}
            </p>
            <Button 
              className="bg-white text-royal-blue hover:bg-white/90 text-lg h-12 px-8"
              onClick={getStarted}
            >
              {isLanguage(language, 'en')
                ? "Get Started - It's Free"
                : isLanguage(language, 'hi')
                  ? "शुरू करें - यह मुफ्त है"
                  : "Start Karein - Yeh Free Hai"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" variant="light" />
              <p className="mt-4 text-gray-400">
                India's first agentic Wealth Operating System designed to be your family's trusted financial companion.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/security" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                <li><a href="/roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/security-policy" className="text-gray-400 hover:text-white transition-colors">Security Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between">
            <p className="text-gray-400">© {new Date().getFullYear()} Wealthवाणी. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
