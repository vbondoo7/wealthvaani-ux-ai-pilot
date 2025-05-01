
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Building, 
  Building2, 
  CreditCard, 
  Search, 
  ChevronRight, 
  Shield, 
  Link, 
  CheckCircle2, 
  Loader2,
  X
} from "lucide-react";

const BankConnection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);
  
  const banks = [
    { id: 'hdfc', name: 'HDFC Bank', icon: <Building className="h-6 w-6" /> },
    { id: 'sbi', name: 'State Bank of India', icon: <Building2 className="h-6 w-6" /> },
    { id: 'icici', name: 'ICICI Bank', icon: <Building className="h-6 w-6" /> },
    { id: 'axis', name: 'Axis Bank', icon: <Building2 className="h-6 w-6" /> },
    { id: 'kotak', name: 'Kotak Mahindra', icon: <Building className="h-6 w-6" /> },
    { id: 'hdfc_cc', name: 'HDFC Credit Card', icon: <CreditCard className="h-6 w-6" /> }
  ];
  
  const filteredBanks = searchQuery 
    ? banks.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : banks;

  const handleConnect = (bankId: string) => {
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      setConnected([...connected, bankId]);
    }, 1500);
  };

  const handleDisconnect = (bankId: string) => {
    setConnected(connected.filter(id => id !== bankId));
  };

  return (
    <div className="wv-container py-6">
      <h1 className="text-xl font-bold mb-2">Connect Your Accounts</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Securely link your financial accounts to get personalized insights
      </p>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          type="text" 
          placeholder="Search your bank or institution" 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-3 mb-6">
        {filteredBanks.map(bank => (
          <Card key={bank.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  {bank.icon}
                </div>
                <div>
                  <h3 className="font-medium">{bank.name}</h3>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Secure connection</span>
                  </div>
                </div>
              </div>
              
              {connected.includes(bank.id) ? (
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-wealthveda-teal/10 text-wealthveda-teal border-wealthveda-teal/30">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleDisconnect(bank.id)}
                    className="text-muted-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : connecting ? (
                <Button size="sm" className="bg-muted" disabled>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Connecting
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleConnect(bank.id)}
                  className="gap-1"
                >
                  <Link className="h-4 w-4" />
                  Connect
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {connected.length > 0 && (
        <div className="bg-wealthveda-indigo/5 rounded-xl p-4 border border-wealthveda-indigo/20">
          <div className="flex gap-3 items-center">
            <Shield className="h-5 w-5 text-wealthveda-indigo" />
            <div className="flex-1">
              <h3 className="text-sm font-medium">Your data is secure</h3>
              <p className="text-xs text-muted-foreground">
                We use bank-level encryption and never store your credentials
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankConnection;
