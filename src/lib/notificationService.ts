
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// Financial insights for notifications in multiple languages
const getFinancialInsights = (language: string) => {
  const insights = {
    en: [
      {
        title: "Spending Alert",
        message: "Your dining out expenses are 30% higher than last month. Want to create a budget?"
      },
      {
        title: "Investment Opportunity",
        message: "Based on your profile, an SIP in equity funds could help you reach your goals faster."
      },
      {
        title: "Bill Reminder",
        message: "Your electricity bill payment is due in 2 days. Would you like to schedule a payment?"
      },
      {
        title: "Budget Alert",
        message: "You've reached 80% of your monthly entertainment budget."
      },
      {
        title: "Savings Milestone",
        message: "Congratulations! You've saved ₹10,000 towards your emergency fund goal."
      },
      {
        title: "Tax Saving Tip",
        message: "You could save ₹15,000 in taxes by investing in tax-saving instruments before March."
      },
      {
        title: "Financial Insight",
        message: "Your credit card spending pattern suggests you might benefit from a different card with better rewards."
      },
      {
        title: "Goal Progress",
        message: "You're 15% ahead of schedule on your home down payment goal. Great job!"
      },
      {
        title: "Festival Planning",
        message: "Diwali is approaching. Would you like to set up a special festival savings goal?"
      },
      {
        title: "Family Protection",
        message: "Have you considered term insurance for your family's financial security?"
      }
    ],
    hi: [
      {
        title: "खर्च अलर्ट",
        message: "आपके बाहर खाने के खर्च पिछले महीने की तुलना में 30% अधिक हैं। क्या आप बजट बनाना चाहेंगे?"
      },
      {
        title: "निवेश अवसर",
        message: "आपकी प्रोफाइल के आधार पर, इक्विटी फंड में एक SIP आपको अपने लक्ष्यों तक तेजी से पहुंचने में मदद कर सकता है।"
      },
      {
        title: "बिल रिमाइंडर",
        message: "आपके बिजली बिल का भुगतान 2 दिनों में देय है। क्या आप भुगतान शेड्यूल करना चाहेंगे?"
      },
      {
        title: "बजट अलर्ट",
        message: "आप अपने मासिक मनोरंजन बजट का 80% तक पहुंच गए हैं।"
      },
      {
        title: "बचत मील का पत्थर",
        message: "बधाई हो! आपने अपने आपातकालीन फंड लक्ष्य के लिए ₹10,000 बचाए हैं।"
      },
      {
        title: "टैक्स बचत टिप",
        message: "मार्च से पहले टैक्स-सेविंग इंस्ट्रूमेंट्स में निवेश करके आप ₹15,000 टैक्स बचा सकते हैं।"
      },
      {
        title: "वित्तीय अंतर्दृष्टि",
        message: "आपके क्रेडिट कार्ड खर्च पैटर्न से पता चलता है कि आप बेहतर रिवॉर्ड्स वाले अलग कार्ड से लाभ उठा सकते हैं।"
      },
      {
        title: "लक्ष्य प्रगति",
        message: "आप अपने घर के डाउन पेमेंट लक्ष्य से 15% आगे चल रहे हैं। बहुत बढ़िया!"
      },
      {
        title: "त्योहार की योजना",
        message: "दिवाली आ रही है। क्या आप एक विशेष त्योहार बचत लक्ष्य स्थापित करना चाहेंगे?"
      },
      {
        title: "परिवार सुरक्षा",
        message: "क्या आपने अपने परिवार की वित्तीय सुरक्षा के लिए टर्म इंश्योरेंस पर विचार किया है?"
      }
    ],
    hinglish: [
      {
        title: "Kharcha Alert",
        message: "Aapka bahar khane ka kharcha pichle mahine se 30% zyada hai. Kya aap ek budget banana chahenge?"
      },
      {
        title: "Investment Opportunity",
        message: "Aapki profile ke aadhar par, equity funds me SIP aapko apne goals tak jaldi pahunchne me help kar sakta hai."
      },
      {
        title: "Bill Reminder",
        message: "Aapke bijli bill ka payment 2 din me due hai. Kya aap payment schedule karna chahenge?"
      },
      {
        title: "Budget Alert",
        message: "Aap apne monthly entertainment budget ka 80% tak pahunch gaye hain."
      },
      {
        title: "Savings Milestone",
        message: "Badhai ho! Aapne apne emergency fund goal ke liye ₹10,000 bachaye hain."
      },
      {
        title: "Tax Saving Tip",
        message: "March se pehle tax-saving instruments me invest karke aap ₹15,000 tax bacha sakte hain."
      },
      {
        title: "Financial Insight",
        message: "Aapke credit card spending pattern se pata chalta hai ki aap better rewards wale alag card se benefit utha sakte hain."
      },
      {
        title: "Goal Progress",
        message: "Aap apne ghar ke down payment goal se 15% aage chal rahe hain. Great job!"
      },
      {
        title: "Festival Planning",
        message: "Diwali aa rahi hai. Kya aap ek special festival savings goal set karna chahenge?"
      },
      {
        title: "Family Protection",
        message: "Kya aapne apne family ki financial security ke liye term insurance par vichar kiya hai?"
      }
    ]
  };

  return insights[language as keyof typeof insights] || insights.en;
};

// Initialize notification service with configurable interval
export const initNotificationService = (intervalSeconds = 20) => {
  let intervalId: number | null = null;
  
  const start = () => {
    if (intervalId) return; // Don't start if already running
    
    // Get stored language or default to English
    const storedLanguage = localStorage.getItem('wealthvani-language');
    const currentLanguage = storedLanguage && ['en', 'hi', 'hinglish'].includes(storedLanguage) ? 
                            storedLanguage : 'en';
    
    const insights = getFinancialInsights(currentLanguage);
    
    intervalId = window.setInterval(() => {
      // Randomly select an insight
      const insight = insights[Math.floor(Math.random() * insights.length)];
      
      // Show the toast notification
      toast({
        title: insight.title,
        description: insight.message,
        duration: 6000, // Show for 6 seconds
      });
    }, intervalSeconds * 1000);
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  };
  
  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
  
  return { start, stop };
};

// Singleton instance
export const notificationService = initNotificationService();
