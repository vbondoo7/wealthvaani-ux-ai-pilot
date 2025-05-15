
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/logo/Logo';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Terms: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
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
      
      <div className="max-w-4xl mx-auto p-6 py-12">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <FileText className="h-6 w-6 text-royal-blue" />
          {language === 'en' ? "Terms & Conditions" : 
           language === 'hi' ? "नियम और शर्तें" :
           "Terms & Conditions"}
        </h1>
        
        <div className="wealth-card mb-8">
          <h2 className="text-xl font-bold mb-4">
            {language === 'en' ? "1. Acceptance of Terms" : 
             language === 'hi' ? "1. शर्तों की स्वीकृति" :
             "1. Terms ki Acceptance"}
          </h2>
          <p className="mb-4">
            {language === 'en' 
              ? "By accessing and using Wealthवाणी's services, you agree to be bound by these Terms and Conditions, Privacy Policy, and all applicable laws and regulations."
              : language === 'hi' 
                ? "Wealthवाणी की सेवाओं का उपयोग करके, आप इन नियमों और शर्तों, गोपनीयता नीति, और सभी लागू कानूनों और नियमों से बंधे होने के लिए सहमत होते हैं।"
                : "Wealthवाणी ki services ka use karke, aap in Terms and Conditions, Privacy Policy, aur sabhi applicable laws and regulations se bound hone ke liye agree karte hain."}
          </p>
          <p>
            {language === 'en'
              ? "If you disagree with any part of these terms, please do not use our services."
              : language === 'hi'
                ? "यदि आप इन शर्तों के किसी भी हिस्से से असहमत हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।"
                : "Agar aap in terms ke kisi bhi part se disagree karte hain, to please hamari services ka use na karein."}
          </p>
        </div>
        
        <div className="wealth-card mb-8">
          <h2 className="text-xl font-bold mb-4">
            {language === 'en' ? "2. Description of Services" :
             language === 'hi' ? "2. सेवाओं का विवरण" :
             "2. Services ka Description"}
          </h2>
          <p className="mb-4">
            {language === 'en'
              ? "Wealthवाणी provides an AI-powered financial planning platform designed to help users manage their finances, set goals, and receive personalized recommendations."
              : language === 'hi'
                ? "Wealthवाणी एक AI-संचालित वित्तीय योजना मंच प्रदान करता है जो उपयोगकर्ताओं को अपने वित्त का प्रबंधन करने, लक्ष्य निर्धारित करने और व्यक्तिगत सिफारिशें प्राप्त करने में मदद करने के लिए डिज़ाइन किया गया है।"
                : "Wealthवाणी ek AI-powered financial planning platform provide karta hai jo users ko unke finances manage karne, goals set karne, aur personalized recommendations receive karne mein help karne ke liye design kiya gaya hai."}
          </p>
          <p>
            {language === 'en'
              ? "We do not provide professional financial advice, and our recommendations should not be considered as a substitute for advice from qualified financial advisors."
              : language === 'hi'
                ? "हम पेशेवर वित्तीय सलाह प्रदान नहीं करते हैं, और हमारी सिफारिशों को योग्य वित्तीय सलाहकारों से सलाह के विकल्प के रूप में नहीं माना जाना चाहिए।"
                : "Hum professional financial advice provide nahi karte hain, aur hamari recommendations ko qualified financial advisors se advice ke substitute ke roop mein nahi consider kiya jana chahiye."}
          </p>
        </div>
        
        <div className="wealth-card">
          <h2 className="text-xl font-bold mb-4">
            {language === 'en' ? "3. User Accounts" :
             language === 'hi' ? "3. उपयोगकर्ता खाते" :
             "3. User Accounts"}
          </h2>
          <p className="mb-4">
            {language === 'en'
              ? "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
              : language === 'hi'
                ? "आप अपने खाता प्रमाणपत्रों की गोपनीयता बनाए रखने और आपके खाते के तहत होने वाली सभी गतिविधियों के लिए जिम्मेदार हैं।"
                : "Aap apne account credentials ki confidentiality maintain karne ke liye aur apne account ke under hone wali sabhi activities ke liye responsible hain."}
          </p>
          <p>
            {language === 'en'
              ? "You agree to notify us immediately of any unauthorized use of your account or any other breach of security."
              : language === 'hi'
                ? "आप हमें अपने खाते के किसी भी अनधिकृत उपयोग या सुरक्षा के किसी अन्य उल्लंघन के बारे में तुरंत सूचित करने के लिए सहमत हैं।"
                : "Aap apne account ke kisi bhi unauthorized use ya security ke kisi bhi breach ke bare mein humein turant notify karne ke liye agree karte hain."}
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-10 px-6 border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Wealthवाणी. {language === 'en' ? "All rights reserved." : language === 'hi' ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terms;
