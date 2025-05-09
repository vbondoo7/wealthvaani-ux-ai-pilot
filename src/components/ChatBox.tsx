
import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string}[]>([
    {type: 'ai', content: 'Hello! I\'m your financial assistant. How can I help you today?'}
  ]);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {type: 'user', content: message}]);
    
    // Simulate thinking
    setTimeout(() => {
      // Add AI response based on keyword matching
      let response = "I'm analyzing your question. Let me get back to you shortly.";
      
      if (message.toLowerCase().includes('investment') || message.toLowerCase().includes('invest')) {
        response = "Based on your risk profile and goals, I recommend allocating 60% to equity mutual funds, 30% to debt, and 10% to gold. Would you like more specific fund recommendations?";
      } else if (message.toLowerCase().includes('loan') || message.toLowerCase().includes('debt')) {
        response = "Your debt-to-income ratio is currently 34%, which is moderately high. I suggest focusing on paying high-interest debts first before taking on new loans.";
      } else if (message.toLowerCase().includes('tax') || message.toLowerCase().includes('saving')) {
        response = "You can save up to ₹46,800 in taxes by maximizing your 80C deductions through ELSS funds, PPF, and insurance premiums. Would you like to see a detailed tax-saving plan?";
      } else if (message.toLowerCase().includes('retire') || message.toLowerCase().includes('retirement')) {
        response = "For a comfortable retirement, aim to build a corpus of approximately 20-25 times your annual expenses. With your current saving rate, you'll need to increase monthly investments by ₹8,000 to meet your retirement goal.";
      } else if (message.toLowerCase().includes('goal') || message.toLowerCase().includes('plan')) {
        response = "I see you have a goal for education funding. Based on current inflation in education costs, you should increase your monthly SIP by ₹1,500 to stay on track for this goal.";
      } else {
        response = "Thank you for your question. Let me analyze your financial situation and get back with tailored advice for your specific needs.";
      }
      
      setMessages(prev => [...prev, {type: 'ai', content: response}]);
    }, 1500);
    
    // Clear input
    setMessage('');
    
    // Show toast notification
    toast({
      title: "Question received",
      description: "Our AI is analyzing your financial situation",
    });
  };
  
  return (
    <div className="fixed bottom-20 right-4 w-[320px] bg-white rounded-lg shadow-lg border z-50 flex flex-col h-[400px]">
      <div className="p-3 border-b flex items-center justify-between bg-wealthveda-indigo text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} />
          <h3 className="font-medium">Financial Assistant</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-white hover:text-white/80 hover:bg-wealthveda-indigo/80"
          onClick={onClose}
        >
          <X size={18} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-2 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-wealthveda-indigo text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about your finances..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
