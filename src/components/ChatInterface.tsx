
import React, { useState } from 'react';
import { 
  Send, 
  Mic, 
  ArrowUp, 
  MessageCircle, 
  X, 
  Clock,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  type: 'user' | 'assistant' | 'suggestion';
  content: string;
  timestamp?: string;
}

const suggestions = [
  "How much did I spend on food last month?",
  "When is my credit card bill due?",
  "How can I save more for my child's education?",
  "What's my current investment allocation?"
];

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.type === 'user';
  const isSuggestion = message.type === 'suggestion';
  
  if (isSuggestion) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="mr-2 mb-2 text-xs whitespace-normal h-auto py-1.5 text-left justify-start font-normal"
      >
        {message.content}
      </Button>
    );
  }

  return (
    <div className={cn(
      "mb-4 max-w-[85%]",
      isUser ? "ml-auto" : "mr-auto"
    )}>
      <div className={cn(
        "rounded-2xl p-3",
        isUser 
          ? "bg-wealthveda-indigo text-white rounded-tr-none" 
          : "bg-muted rounded-tl-none"
      )}>
        <p className="text-sm">{message.content}</p>
      </div>
      {message.timestamp && (
        <p className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp}
        </p>
      )}
    </div>
  );
};

interface AssistantCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

const AssistantCard: React.FC<AssistantCardProps> = ({
  icon,
  title,
  value,
  change,
  isPositive = true
}) => {
  return (
    <div className="border rounded-xl p-3 mb-4">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-8 h-8 rounded-full bg-muted flex-center">
          {icon}
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="text-lg font-bold">{value}</div>
      {change && (
        <div className={cn(
          "flex items-center text-xs",
          isPositive ? "text-wealthveda-teal" : "text-destructive"
        )}>
          <ArrowUp className={cn(
            "h-3 w-3 mr-1",
            !isPositive && "transform rotate-180"
          )} />
          {change}
        </div>
      )}
    </div>
  );
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      type: 'assistant', 
      content: 'Namaste Rahul! How can I help you with your finances today?',
      timestamp: '11:23 AM'
    }
  ]);
  const [input, setInput] = useState('');
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newUserMessage]);
    setInput('');
    
    // Simulate assistant response
    setTimeout(() => {
      if (input.toLowerCase().includes('spend')) {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            type: 'assistant',
            content: 'Here\'s your spending breakdown for last month:',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            type: 'assistant',
            content: 'I understand you want to know more about your finances. Let me help you with that.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="border-b border-border p-4 flex-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-wealthveda-teal/10 text-wealthveda-teal flex-center">
            <MessageCircle className="h-4 w-4" />
          </div>
          <div>
            <h1 className="font-medium">WealthVeda Assistant</h1>
            <div className="text-xs text-wealthveda-teal flex items-center">
              <span className="w-1.5 h-1.5 bg-wealthveda-teal rounded-full mr-1"></span>
              Online
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages */}
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {/* Sample visualization for demo */}
        {messages.some(m => m.content.toLowerCase().includes('spend')) && (
          <div className="mb-4 max-w-[85%] mr-auto">
            <div className="mb-2 text-sm font-medium">April 2025 Spending</div>
            
            <div className="space-y-3 bg-muted p-3 rounded-2xl rounded-tl-none mb-1">
              <AssistantCard 
                icon={<DollarSign className="h-4 w-4 text-wealthveda-saffron" />} 
                title="Total Spent" 
                value="₹42,850"
                change="+18% vs March"
                isPositive={false}
              />
              
              <div className="space-y-2">
                <div className="flex-between text-xs">
                  <span>Food & Dining</span>
                  <span className="font-medium">₹12,450</span>
                </div>
                <div className="h-2 bg-muted-foreground/20 rounded-full">
                  <div className="h-full bg-wealthveda-saffron rounded-full" style={{ width: '29%' }}></div>
                </div>
                
                <div className="flex-between text-xs">
                  <span>Shopping</span>
                  <span className="font-medium">₹9,800</span>
                </div>
                <div className="h-2 bg-muted-foreground/20 rounded-full">
                  <div className="h-full bg-wealthveda-indigo rounded-full" style={{ width: '23%' }}></div>
                </div>
                
                <div className="flex-between text-xs">
                  <span>Bills & Utilities</span>
                  <span className="font-medium">₹7,600</span>
                </div>
                <div className="h-2 bg-muted-foreground/20 rounded-full">
                  <div className="h-full bg-wealthveda-teal rounded-full" style={{ width: '18%' }}></div>
                </div>
                
                <div className="flex-between text-xs">
                  <span>Others</span>
                  <span className="font-medium">₹13,000</span>
                </div>
                <div className="h-2 bg-muted-foreground/20 rounded-full">
                  <div className="h-full bg-muted-foreground/60 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 px-1">
              11:24 AM
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap mb-2 mt-4">
          <div className="text-xs text-muted-foreground w-full mb-2">Try asking:</div>
          {suggestions.map((suggestion, index) => (
            <ChatBubble 
              key={`suggestion-${index}`} 
              message={{ id: 1000 + index, type: 'suggestion', content: suggestion }}
            />
          ))}
        </div>
      </div>
      
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Mic className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input 
              type="text"
              placeholder="Ask me anything about your finances..."
              className="pr-10 h-11 rounded-full bg-muted border-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-wealthveda-indigo hover:bg-wealthveda-indigo/90"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
