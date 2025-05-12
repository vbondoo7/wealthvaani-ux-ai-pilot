
import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import useUserStore from '@/lib/userStore';
import { Loader2, Phone, Calendar, MessageCircle, Clock } from "lucide-react";

type AdvisorType = 'financial' | 'investment' | 'tax' | 'retirement';

interface Advisor {
  id: string;
  name: string;
  type: AdvisorType;
  avatar: string;
  experience: number;
  rating: number;
  languages: string[];
  availableNow: boolean;
  specialization: string;
}

const advisors: Advisor[] = [
  {
    id: "1",
    name: "Rajiv Mehta",
    type: "financial",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    experience: 12,
    rating: 4.8,
    languages: ["English", "Hindi"],
    availableNow: true,
    specialization: "Personal Finance"
  },
  {
    id: "2",
    name: "Anjali Sharma",
    type: "investment",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    experience: 8,
    rating: 4.7,
    languages: ["English", "Hindi", "Gujarati"],
    availableNow: false,
    specialization: "Equity Investments"
  },
  {
    id: "3",
    name: "Karan Agarwal",
    type: "tax",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    experience: 15,
    rating: 4.9,
    languages: ["English", "Hindi", "Bengali"],
    availableNow: true,
    specialization: "Tax Planning"
  },
  {
    id: "4",
    name: "Priya Desai",
    type: "retirement",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    experience: 10,
    rating: 4.6,
    languages: ["English", "Hindi", "Marathi"],
    availableNow: false,
    specialization: "Retirement Planning"
  }
];

enum ConnectionState {
  INITIAL,
  CONNECTING,
  CONNECTED,
  COMPLETED
}

const TalkToAdvisor: React.FC = () => {
  const { currentUser } = useUserStore();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<AdvisorType | null>(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [query, setQuery] = useState("");
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.INITIAL);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Reset when type changes
    setSelectedAdvisor(null);
  }, [selectedType]);

  useEffect(() => {
    // Timer for call duration
    let timer: NodeJS.Timeout;
    if (connectionState === ConnectionState.CONNECTED) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [connectionState]);

  const filteredAdvisors = advisors.filter(
    advisor => !selectedType || advisor.type === selectedType
  );

  const handleConnect = () => {
    if (!selectedAdvisor) {
      toast({
        title: "Please select an advisor",
        description: "You need to select an advisor to connect",
        variant: "destructive"
      });
      return;
    }

    setConnectionState(ConnectionState.CONNECTING);
    
    // Simulate connection delay
    setTimeout(() => {
      setConnectionState(ConnectionState.CONNECTED);
      toast({
        title: "Connected with Advisor",
        description: `You are now connected with ${selectedAdvisor.name}`,
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnectionState(ConnectionState.COMPLETED);
    toast({
      title: "Call Completed",
      description: `Your call with ${selectedAdvisor?.name} has ended.`,
    });
    
    // Reset after a few seconds
    setTimeout(() => {
      setSelectedAdvisor(null);
      setSelectedType(null);
      setQuery("");
      setConnectionState(ConnectionState.INITIAL);
      setCallDuration(0);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderBasedOnConnectionState = () => {
    switch (connectionState) {
      case ConnectionState.CONNECTING:
        return (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-wealthveda-indigo mb-4" />
            <p className="text-lg font-medium">Connecting to {selectedAdvisor?.name}...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Preparing your financial information for the advisor
            </p>
          </div>
        );
      
      case ConnectionState.CONNECTED:
        return (
          <div className="flex flex-col">
            <div className="bg-wealthveda-indigo/10 p-4 rounded-lg mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={selectedAdvisor?.avatar} alt={selectedAdvisor?.name} />
                  <AvatarFallback>{selectedAdvisor?.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedAdvisor?.name}</p>
                  <div className="flex items-center text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatTime(callDuration)}</span>
                  </div>
                </div>
              </div>
              <div>
                <Button variant="destructive" size="sm" onClick={handleDisconnect}>
                  End Call
                </Button>
              </div>
            </div>
            
            <div className="flex-1 mb-4 bg-muted rounded-lg p-4 h-64 overflow-y-auto">
              <div className="mb-4">
                <p className="bg-wealthveda-indigo/20 text-wealthveda-indigo rounded-lg rounded-tl-none p-3 max-w-[80%] inline-block">
                  {selectedAdvisor?.name === "Rajiv Mehta" 
                    ? `Namaste ${currentUser?.name}! I'm reviewing your financial details. I see you have some goals related to ${currentUser?.goals[0]?.name.replace(/_/g, ' ')}. How can I help you today?` 
                    : selectedAdvisor?.name === "Anjali Sharma"
                      ? `Hello ${currentUser?.name}! Looking at your investment portfolio. Your current asset allocation seems to need some adjustments. What specific investment advice are you looking for?`
                      : selectedAdvisor?.name === "Karan Agarwal"
                        ? `Greetings ${currentUser?.name}! I've analyzed your tax situation. There are a few tax-saving opportunities we should discuss. What are your tax planning questions?`
                        : `Hi ${currentUser?.name}! I specialize in retirement planning. Based on your current savings rate, we might need to adjust your retirement strategy. What aspects would you like to discuss?`
                  }
                </p>
              </div>
              
              {query && (
                <div className="mb-4 text-right">
                  <p className="bg-wealthveda-teal/20 text-wealthveda-teal rounded-lg rounded-tr-none p-3 max-w-[80%] inline-block">
                    {query}
                  </p>
                </div>
              )}
              
              {query && (
                <div className="mb-4">
                  <p className="bg-wealthveda-indigo/20 text-wealthveda-indigo rounded-lg rounded-tl-none p-3 max-w-[80%] inline-block">
                    {selectedAdvisor?.name === "Rajiv Mehta"
                      ? `That's an excellent question about ${query.includes("SIP") ? "SIPs" : query.includes("loan") ? "loans" : "your finances"}. Based on your current income of ₹${currentUser?.financialDetails?.totalIncome.toLocaleString()}, I would recommend increasing your monthly savings by 15%. This would significantly accelerate your progress toward your goals.`
                      : selectedAdvisor?.name === "Anjali Sharma"
                        ? `Regarding your question about ${query.includes("stock") ? "stocks" : query.includes("mutual") ? "mutual funds" : "investments"}, I recommend a more diversified approach. With your risk tolerance, you could consider allocating 60% to equity, 30% to debt, and 10% to gold to optimize returns while managing risk.`
                        : selectedAdvisor?.name === "Karan Agarwal"
                          ? `About your ${query.includes("tax") ? "tax concerns" : "financial query"}, there are several options we can explore to optimize your tax liability. Given your income bracket, I suggest maximizing your Section 80C investments and exploring NPS contributions for additional tax benefits.`
                          : `I understand your concern about ${query.includes("retire") ? "retirement" : "long-term planning"}. With your current savings rate of ${currentUser?.financialDetails?.savingsRate * 100}%, you're on a good path. However, I recommend increasing your retirement allocation by at least 5% annually to meet your future needs.`
                    }
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Type your financial question..." 
                className="flex-1" 
              />
              <Button 
                onClick={() => {
                  if (!query.trim()) return;
                  // The response will appear automatically based on state
                  setQuery("");
                }}
              >
                Send
              </Button>
            </div>
          </div>
        );
      
      case ConnectionState.COMPLETED:
        return (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-lg font-medium">Call Completed</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your call with {selectedAdvisor?.name} lasted for {formatTime(callDuration)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              A summary of this discussion will be sent to your email.
            </p>
          </div>
        );
      
      default: // INITIAL
        return (
          <>
            <div className="space-y-4">
              {!selectedAdvisor ? (
                <>
                  <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                    <Button 
                      variant={selectedType === 'financial' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('financial')}
                      className={selectedType === 'financial' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : ''}
                    >
                      Financial
                    </Button>
                    <Button 
                      variant={selectedType === 'investment' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('investment')}
                      className={selectedType === 'investment' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : ''}
                    >
                      Investment
                    </Button>
                    <Button 
                      variant={selectedType === 'tax' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('tax')}
                      className={selectedType === 'tax' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : ''}
                    >
                      Tax
                    </Button>
                    <Button 
                      variant={selectedType === 'retirement' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('retirement')}
                      className={selectedType === 'retirement' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : ''}
                    >
                      Retirement
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {selectedType 
                        ? `${filteredAdvisors.length} ${selectedType} advisors available` 
                        : "Select an advisor type to get started"}
                    </p>
                    {filteredAdvisors.map((advisor) => (
                      <Card 
                        key={advisor.id} 
                        className={`cursor-pointer hover:border-wealthveda-indigo transition-all ${
                          selectedAdvisor?.id === advisor.id ? 'border-wealthveda-indigo shadow-md' : ''
                        }`}
                        onClick={() => setSelectedAdvisor(advisor)}
                      >
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarImage src={advisor.avatar} alt={advisor.name} />
                              <AvatarFallback>{advisor.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{advisor.name}</h4>
                              <p className="text-sm text-muted-foreground">{advisor.specialization}</p>
                              <div className="flex items-center text-xs mt-1">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span>{advisor.rating}</span>
                                <span className="mx-2">•</span>
                                <span>{advisor.experience} years exp.</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              advisor.availableNow 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {advisor.availableNow ? 'Available Now' : 'Available in 1 hr'}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={selectedAdvisor.avatar} alt={selectedAdvisor.name} />
                          <AvatarFallback>{selectedAdvisor.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{selectedAdvisor.name}</h4>
                          <p className="text-sm text-muted-foreground">{selectedAdvisor.specialization}</p>
                          <div className="flex items-center text-xs mt-1">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span>{selectedAdvisor.rating}</span>
                            <span className="mx-2">•</span>
                            <span>{selectedAdvisor.experience} years exp.</span>
                            <span className="mx-2">•</span>
                            <span>{selectedAdvisor.languages.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedAdvisor(null)}>
                        Change
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <div>
                    <h4 className="font-medium mb-2">How would you like to connect?</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="cursor-pointer hover:border-wealthveda-indigo">
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <Phone className="h-8 w-8 text-wealthveda-indigo mb-2" />
                          <p className="text-sm font-medium">Voice Call</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {selectedAdvisor.availableNow ? 'Connect Now' : 'Available in 1 hr'}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer hover:border-wealthveda-indigo">
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <Calendar className="h-8 w-8 text-wealthveda-indigo mb-2" />
                          <p className="text-sm font-medium">Schedule Call</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Book a time slot
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">What would you like to discuss?</h4>
                    <Textarea 
                      placeholder="Briefly describe your financial query or concern..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              {selectedAdvisor && (
                <Button 
                  className="bg-wealthveda-indigo hover:bg-wealthveda-indigo/90" 
                  onClick={handleConnect}
                  disabled={!selectedAdvisor.availableNow}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {selectedAdvisor.availableNow ? 'Connect Now' : 'Schedule Call'}
                </Button>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="wv-container py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Talk to Financial Advisor</h2>
      
      {renderBasedOnConnectionState()}
    </div>
  );
};

export default TalkToAdvisor;
