
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, User, Bot, ArrowUp, TrendingUp, Calendar } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'suggestion';
  content: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Namaste Rahul! How can I help you with your finances today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const suggestions = [
    { id: 's1', text: 'How much did I spend on restaurants this month?', icon: <TrendingUp className="h-3 w-3" /> },
    { id: 's2', text: 'When is my HDFC credit card payment due?', icon: <Calendar className="h-3 w-3" /> },
    { id: 's3', text: 'Increase my child\'s education SIP', icon: <ArrowUp className="h-3 w-3" /> }
  ];
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate assistant response
    setTimeout(() => {
      let response = '';
      
      if (inputValue.toLowerCase().includes('spend') && inputValue.toLowerCase().includes('restaurant')) {
        response = 'You\'ve spent ₹3,450 on restaurants this month, which is 40% higher than your monthly average. Would you like to see a breakdown of these expenses?';
      } else if (inputValue.toLowerCase().includes('credit card') || inputValue.toLowerCase().includes('payment')) {
        response = 'Your HDFC credit card payment of ₹12,450 is due on May 4th, 2025 (in 3 days). Would you like me to schedule this payment for you?';
      } else if (inputValue.toLowerCase().includes('sip') || inputValue.toLowerCase().includes('education')) {
        response = 'Your current SIP for your child\'s education is ₹5,000 per month. Based on your cash flow, you can increase it by ₹1,000 without impacting other expenses. Would you like me to make this change?';
      } else {
        response = 'I\'ve noted your question. Let me analyze your financial data and get back to you with the most accurate information.';
      }
      
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    
    // Focus the input after selecting a suggestion
    const inputElement = document.getElementById('chat-input');
    inputElement?.focus();
  };

  return (
    <div className="flex flex-col h-screen pb-16">
      <div className="p-4 border-b flex-shrink-0">
        <h1 className="text-lg font-bold">WealthVeda Assistant</h1>
        <p className="text-sm text-muted-foreground">Ask me anything about your finances</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Avatar className={`h-8 w-8 ${message.type === 'user' ? 'bg-wealthveda-indigo/20' : 'bg-wealthveda-teal/20'}`}>
                <AvatarFallback>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-wealthveda-indigo" />
                  ) : (
                    <Bot className="h-4 w-4 text-wealthveda-teal" />
                  )}
                </AvatarFallback>
              </Avatar>
              
              <div className={`rounded-xl p-3 ${
                message.type === 'user' 
                  ? 'bg-wealthveda-indigo text-white rounded-tr-none' 
                  : 'bg-muted rounded-tl-none'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4">
          <p className="text-xs text-muted-foreground mb-2">Suggested queries:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(suggestion => (
              <Button
                key={suggestion.id}
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-muted/50"
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                {suggestion.icon}
                <span className="ml-1">{suggestion.text}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2 items-center">
          <Input
            id="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your finances..."
            className="flex-1"
          />
          <Button 
            size="icon" 
            variant="outline" 
            className="rounded-full h-10 w-10"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim()}
            className="rounded-full bg-wealthveda-teal hover:bg-wealthveda-teal/90 h-10 w-10"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
