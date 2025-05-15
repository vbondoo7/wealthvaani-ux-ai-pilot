
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/logo/Logo';

const Privacy: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-ivory-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <Button 
            variant="ghost" 
            className="flex items-center text-royal-blue"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back to Home' : language === 'hi' ? 'होम पर वापस जाएँ' : 'Home par wapas jayen'}
          </Button>
          
          <Logo variant="compact" />
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-royal-blue">
            {language === 'en' ? 'Privacy Policy' : language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              {language === 'en' 
                ? 'Last Updated: May 15, 2025' 
                : language === 'hi' 
                  ? 'आखिरी अपडेट: 15 मई, 2025'
                  : 'Last Updated: May 15, 2025'}
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-charcoal">
              {language === 'en' 
                ? '1. Introduction'
                : language === 'hi'
                  ? '1. परिचय'
                  : '1. Introduction'}
            </h2>
            <p>
              {language === 'en'
                ? 'Wealthवाणी ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application or website (collectively, the "Service").'
                : language === 'hi'
                  ? 'Wealthवाणी ("हम", "हमारा", या "हमें") आपकी गोपनीयता की रक्षा के लिए प्रतिबद्ध है। यह गोपनीयता नीति बताती है कि हम आपकी जानकारी को कैसे एकत्र करते हैं, उपयोग करते हैं, प्रकट करते हैं और सुरक्षित रखते हैं जब आप हमारे मोबाइल एप्लिकेशन या वेबसाइट (सामूहिक रूप से, "सेवा") का उपयोग करते हैं।'
                  : 'Wealthवाणी ("hum", "hamara", ya "humein") aapki privacy ki raksha ke liye committed hai. Yeh Privacy Policy batati hai ki hum aapki information ko kaise collect karte hain, use karte hain, disclose karte hain, aur safeguard karte hain jab aap hamare mobile application ya website (collectively, "Service") ka use karte hain.'}
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-charcoal">
              {language === 'en'
                ? '2. Information We Collect'
                : language === 'hi'
                  ? '2. हम जो जानकारी एकत्र करते हैं'
                  : '2. Information Jo Hum Collect Karte Hain'}
            </h2>
            <p>
              {language === 'en'
                ? 'We may collect several types of information from and about users of our Service, including:'
                : language === 'hi'
                  ? 'हम अपनी सेवा के उपयोगकर्ताओं से और उनके बारे में कई प्रकार की जानकारी एकत्र कर सकते हैं, जिनमें शामिल हैं:'
                  : 'Hum apne Service ke users se aur unke bare mein kai prakar ki information collect kar sakte hain, jismein shamil hain:'}
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>
                {language === 'en'
                  ? 'Personal Identifiers: Name, email address, phone number, and other similar identifiers.'
                  : language === 'hi'
                    ? 'व्यक्तिगत पहचानकर्ता: नाम, ईमेल पता, फोन नंबर और अन्य समान पहचानकर्ता।'
                    : 'Personal Identifiers: Name, email address, phone number, aur doosre similar identifiers.'}
              </li>
              <li>
                {language === 'en'
                  ? 'Financial Information: Income details, expenses, investments, and other financial data necessary to provide personalized financial guidance.'
                  : language === 'hi'
                    ? 'वित्तीय जानकारी: आय विवरण, खर्च, निवेश और अन्य वित्तीय डेटा जो व्यक्तिगत वित्तीय मार्गदर्शन प्रदान करने के लिए आवश्यक है।'
                    : 'Financial Information: Income details, expenses, investments, aur doosra financial data jo personalized financial guidance provide karne ke liye zaroori hai.'}
              </li>
              <li>
                {language === 'en'
                  ? 'Usage Data: Information on how you interact with our Service, including features you use, time spent on the application, and other diagnostic data.'
                  : language === 'hi'
                    ? 'उपयोग डेटा: इस बारे में जानकारी कि आप हमारी सेवा के साथ कैसे बातचीत करते हैं, जिसमें आपके द्वारा उपयोग की जाने वाली सुविधाएँ, एप्लिकेशन पर बिताया गया समय और अन्य नैदानिक डेटा शामिल हैं।'
                    : 'Usage Data: Information about how aap hamare Service ke saath interact karte hain, jismein features jo aap use karte hain, application par spend kiya gaya time, aur doosra diagnostic data shamil hai.'}
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-charcoal">
              {language === 'en'
                ? '3. How We Use Your Information'
                : language === 'hi'
                  ? '3. हम आपकी जानकारी का उपयोग कैसे करते हैं'
                  : '3. Hum Aapki Information Ka Use Kaise Karte Hain'}
            </h2>
            <p>
              {language === 'en'
                ? 'We use the information we collect to:'
                : language === 'hi'
                  ? 'हम जो जानकारी एकत्र करते हैं उसका उपयोग करते हैं:'
                  : 'Hum jo information collect karte hain uska use karte hain:'}
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>
                {language === 'en'
                  ? 'Provide, maintain, and improve our Service.'
                  : language === 'hi'
                    ? 'हमारी सेवा प्रदान करने, बनाए रखने और सुधारने के लिए।'
                    : 'Hamari Service provide, maintain, aur improve karne ke liye.'}
              </li>
              <li>
                {language === 'en'
                  ? 'Generate personalized financial recommendations and insights.'
                  : language === 'hi'
                    ? 'व्यक्तिगत वित्तीय सिफारिशें और अंतर्दृष्टि उत्पन्न करने के लिए।'
                    : 'Personalized financial recommendations aur insights generate karne ke liye.'}
              </li>
              <li>
                {language === 'en'
                  ? 'Respond to your inquiries and provide customer support.'
                  : language === 'hi'
                    ? 'आपकी पूछताछ का जवाब देने और ग्राहक सहायता प्रदान करने के लिए।'
                    : 'Aapke inquiries ka response dene aur customer support provide karne ke liye.'}
              </li>
              <li>
                {language === 'en'
                  ? 'Send you important notices and updates about our Service.'
                  : language === 'hi'
                    ? 'आपको हमारी सेवा के बारे में महत्वपूर्ण नोटिस और अपडेट भेजने के लिए।'
                    : 'Aapko hamare Service ke bare mein important notices aur updates bhejne ke liye.'}
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-charcoal">
              {language === 'en'
                ? '4. Security'
                : language === 'hi'
                  ? '4. सुरक्षा'
                  : '4. Security'}
            </h2>
            <p>
              {language === 'en'
                ? 'We implement appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure, or destruction of data. These include internal reviews of our data collection, storage, and processing practices and security measures, as well as physical security measures to guard against unauthorized access to systems.'
                : language === 'hi'
                  ? 'हम डेटा तक अनधिकृत पहुंच या अनधिकृत परिवर्तन, प्रकटीकरण, या विनाश के खिलाफ सुरक्षा के लिए उचित सुरक्षा उपायों को लागू करते हैं। इनमें हमारे डेटा संग्रह, भंडारण और प्रसंस्करण प्रथाओं और सुरक्षा उपायों की आंतरिक समीक्षा के साथ-साथ प्रणालियों तक अनधिकृत पहुंच के खिलाफ सुरक्षा के लिए भौतिक सुरक्षा उपाय शामिल हैं।'
                  : 'Hum data tak unauthorized access ya unauthorized alteration, disclosure, ya destruction ke khilaaf protection ke liye appropriate security measures implement karte hain. Ismein hamare data collection, storage, aur processing practices aur security measures ki internal reviews, aur systems tak unauthorized access ke khilaaf protection ke liye physical security measures shamil hain.'}
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-charcoal">
              {language === 'en'
                ? '5. Changes to this Privacy Policy'
                : language === 'hi'
                  ? '5. इस गोपनीयता नीति में परिवर्तन'
                  : '5. Is Privacy Policy Mein Changes'}
            </h2>
            <p>
              {language === 'en'
                ? 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.'
                : language === 'hi'
                  ? 'हम समय-समय पर अपनी गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई गोपनीयता नीति पोस्ट करके और "अंतिम अपडेट" की तारीख को अपडेट करके आपको किसी भी परिवर्तन की सूचना देंगे।'
                  : 'Hum samay-samay par apni Privacy Policy ko update kar sakte hain. Hum aapko kisi bhi changes ke bare mein is page par nayi Privacy Policy post karke aur "Last Updated" date ko update karke notify karenge.'}
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-charcoal">
              {language === 'en'
                ? '6. Contact Us'
                : language === 'hi'
                  ? '6. हमसे संपर्क करें'
                  : '6. Contact Us'}
            </h2>
            <p>
              {language === 'en'
                ? 'If you have any questions about this Privacy Policy, please contact us at:'
                : language === 'hi'
                  ? 'अगर आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:'
                  : 'Agar aapke paas is Privacy Policy ke bare mein koi questions hain, toh please humse contact karein:'}
            </p>
            <p className="font-medium">
              privacy@wealthvani.com<br />
              {language === 'en'
                ? '123 Tech Park, HSR Layout, Bengaluru, Karnataka 560102'
                : language === 'hi'
                  ? '123 टेक पार्क, एचएसआर लेआउट, बेंगलुरु, कर्नाटक 560102'
                  : '123 Tech Park, HSR Layout, Bengaluru, Karnataka 560102'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
