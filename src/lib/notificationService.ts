
import { toast } from "@/hooks/use-toast";

// Financial insights for notifications
const financialInsights = [
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
  }
];

// Initialize notification service with configurable interval
export const initNotificationService = (intervalSeconds = 15) => {
  let intervalId: number | null = null;
  
  const start = () => {
    if (intervalId) return; // Don't start if already running
    
    intervalId = window.setInterval(() => {
      // Randomly select an insight
      const insight = financialInsights[Math.floor(Math.random() * financialInsights.length)];
      
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
