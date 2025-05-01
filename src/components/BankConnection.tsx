
import React from 'react';
import { Shield, Check, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BankProps {
  name: string;
  logo: string;
  isConnected?: boolean;
}

const banks: BankProps[] = [
  { name: "HDFC Bank", logo: "HDFC" },
  { name: "SBI", logo: "SBI" },
  { name: "ICICI Bank", logo: "ICICI" },
  { name: "Axis Bank", logo: "Axis" },
  { name: "Kotak Mahindra", logo: "Kotak" },
  { name: "Bank of Baroda", logo: "BOB" },
  { name: "Yes Bank", logo: "Yes" },
  { name: "IndusInd Bank", logo: "IIB" },
];

const BankCard: React.FC<BankProps> = ({ name, logo, isConnected }) => {
  return (
    <div className={cn(
      "border rounded-xl p-3 flex-between",
      isConnected ? "border-wealthveda-teal bg-wealthveda-teal/5" : "border-border"
    )}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-muted flex-center">
          <span className="text-sm font-bold text-wealthveda-indigo">{logo}</span>
        </div>
        <span className="font-medium text-sm">{name}</span>
      </div>
      
      {isConnected ? (
        <div className="h-6 w-6 rounded-full bg-wealthveda-teal/10 flex-center text-wealthveda-teal">
          <Check className="h-4 w-4" />
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs"
        >
          Connect
        </Button>
      )}
    </div>
  );
};

const BankConnection: React.FC = () => {
  return (
    <div className="wv-container">
      <div className="space-y-4 mb-8">
        <h1 className="text-2xl font-bold">Connect Your Banks</h1>
        <p className="text-muted-foreground">
          Securely connect your accounts using Account Aggregator framework
        </p>
      </div>
      
      <div className="wv-card mb-6 bg-wealthveda-teal/5 border-wealthveda-teal/30 border-dashed">
        <div className="flex items-start gap-3">
          <div className="min-w-8 h-8 rounded-full flex-center bg-wealthveda-teal/10">
            <Shield className="h-4 w-4 text-wealthveda-teal" />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">RBI Regulated & Secure</h3>
            <p className="text-xs text-muted-foreground">
              WealthVeda uses the Account Aggregator framework regulated by RBI. We never store your credentials.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-8">
        {banks.map((bank, index) => (
          <BankCard 
            key={index} 
            {...bank} 
            isConnected={index === 0 || index === 2}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-2 justify-center mb-6">
        <Lock className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Your data is encrypted with bank-level security</span>
      </div>
      
      <div className="wv-card bg-muted/50">
        <div className="flex items-start gap-3">
          <div className="min-w-8 h-8 rounded-full flex-center bg-muted">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">Don't see your bank?</h3>
            <p className="text-xs text-muted-foreground mb-2">
              We're adding more banks every week. Request yours below.
            </p>
            <Button 
              variant="outline"
              size="sm"
              className="text-xs w-full"
            >
              Request Bank
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankConnection;
