
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/logo/Logo';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Careers: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
  const positions = [
    {
      title: {
        en: "Senior AI Engineer",
        hi: "सीनियर एआई इंजीनियर",
        hinglish: "Senior AI Engineer",
      }[language] || "Senior AI Engineer",
      department: {
        en: "Technology",
        hi: "प्रौद्योगिकी",
        hinglish: "Technology",
      }[language] || "Technology",
      location: {
        en: "Bangalore, India",
        hi: "बैंगलोर, भारत",
        hinglish: "Bangalore, India",
      }[language] || "Bangalore, India",
      type: {
        en: "Full-time",
        hi: "पूर्णकालिक",
        hinglish: "Full-time",
      }[language] || "Full-time",
    },
    {
      title: {
        en: "Financial Analyst",
        hi: "वित्तीय विश्लेषक",
        hinglish: "Financial Analyst",
      }[language] || "Financial Analyst",
      department: {
        en: "Finance",
        hi: "वित्त",
        hinglish: "Finance",
      }[language] || "Finance",
      location: {
        en: "Mumbai, India",
        hi: "मुंबई, भारत",
        hinglish: "Mumbai, India",
      }[language] || "Mumbai, India",
      type: {
        en: "Full-time",
        hi: "पूर्णकालिक",
        hinglish: "Full-time",
      }[language] || "Full-time",
    },
    {
      title: {
        en: "UX Designer",
        hi: "यूएक्स डिजाइनर",
        hinglish: "UX Designer",
      }[language] || "UX Designer",
      department: {
        en: "Design",
        hi: "डिज़ाइन",
        hinglish: "Design",
      }[language] || "Design",
      location: {
        en: "Remote",
        hi: "रिमोट",
        hinglish: "Remote",
      }[language] || "Remote",
      type: {
        en: "Contract",
        hi: "अनुबंध",
        hinglish: "Contract",
      }[language] || "Contract",
    },
  ];
  
  return (
    <div className="min-h-screen bg-ivory-white">
      {/* Navigation */}
      <nav className="py-4 px-6 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Logo size="md" variant="full" onClick={() => navigate('/')} className="cursor-pointer" />
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? "Join Our Team" : 
             language === 'hi' ? "हमारी टीम से जुड़ें" :
             "Hamari Team Se Judein"}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {language === 'en' ? "Help us revolutionize financial planning for millions of Indian families" : 
             language === 'hi' ? "लाखों भारतीय परिवारों के लिए वित्तीय योजना में क्रांति लाने में हमारी मदद करें" :
             "Lakho Indian families ke liye financial planning mein kranti lane mein hamari help karein"}
          </p>
        </div>
      </section>
      
      {/* Open Positions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-charcoal">
            {language === 'en' ? "Open Positions" : 
             language === 'hi' ? "खुली पोजीशन" :
             "Open Positions"}
          </h2>
          
          <div className="space-y-6">
            {positions.map((position, index) => (
              <div key={index} className="wealth-card hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{position.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{position.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-royal-blue hover:bg-royal-blue/90 text-white mt-4 sm:mt-0"
                  >
                    {language === 'en' ? "Apply Now" : 
                     language === 'hi' ? "अभी आवेदन करें" :
                     "Apply Now"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="wealth-card mt-12">
            <h3 className="text-xl font-bold mb-4">
              {language === 'en' ? "Don't see a position that fits your skills?" : 
               language === 'hi' ? "क्या आपको अपने कौशल के अनुरूप कोई पद नहीं दिखा?" :
               "Kya aapko apne skills ke according koi position nahi dikha?"}
            </h3>
            <p className="mb-6">
              {language === 'en'
                ? "We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute."
                : language === 'hi'
                  ? "हम हमेशा प्रतिभाशाली व्यक्तियों को अपनी टीम में शामिल करने के लिए तत्पर रहते हैं। हमें अपना बायोडाटा भेजें और हमें बताएं कि आप कैसे योगदान दे सकते हैं।"
                  : "Hum hamesha talented individuals ko apni team mein shamil karne ke liye looking rehte hain. Humein apna resume bhejein aur batayein ki aap kaise contribute kar sakte hain."}
            </p>
            <Button 
              variant="outline"
              className="border-royal-blue text-royal-blue hover:bg-royal-blue/10"
            >
              {language === 'en' ? "Send Your Resume" : 
               language === 'hi' ? "अपना बायोडाटा भेजें" :
               "Apna Resume Bhejein"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
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

export default Careers;
