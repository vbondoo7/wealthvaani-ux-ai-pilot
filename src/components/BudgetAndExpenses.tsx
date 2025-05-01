
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowDown, ArrowUp, ChevronRight, DollarSign, Wallet } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const BudgetAndExpenses: React.FC = () => {
  const currentMonth = "May 2025";
  
  const categories = [
    { 
      name: "Food & Dining", 
      budget: 15000, 
      spent: 12450, 
      transactions: [
        { merchant: "Swiggy", amount: 1200, date: "May 1, 2025" },
        { merchant: "BigBasket", amount: 3800, date: "May 3, 2025" },
        { merchant: "Pizza Hut", amount: 2450, date: "May 8, 2025" },
        { merchant: "Local Groceries", amount: 5000, date: "May 12, 2025" }
      ] 
    },
    { 
      name: "Transportation", 
      budget: 8000, 
      spent: 6200,
      transactions: [
        { merchant: "Uber", amount: 1200, date: "May 2, 2025" },
        { merchant: "Petrol", amount: 3000, date: "May 5, 2025" },
        { merchant: "Metro Card Recharge", amount: 2000, date: "May 10, 2025" }
      ] 
    },
    { 
      name: "Entertainment", 
      budget: 5000, 
      spent: 5600, 
      isOverbudget: true,
      transactions: [
        { merchant: "PVR Cinemas", amount: 1800, date: "May 6, 2025" },
        { merchant: "Netflix", amount: 800, date: "May 7, 2025" },
        { merchant: "BookMyShow", amount: 3000, date: "May 15, 2025" }
      ] 
    },
    { 
      name: "Shopping", 
      budget: 10000, 
      spent: 4300,
      transactions: [
        { merchant: "Amazon", amount: 2500, date: "May 4, 2025" },
        { merchant: "H&M", amount: 1800, date: "May 14, 2025" }
      ] 
    }
  ];

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="wv-container py-6">
      <h1 className="text-xl font-bold mb-2">Budget & Expenses</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Track your spending for {currentMonth}
      </p>
      
      <Tabs defaultValue="budget">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="budget" className="flex-1">Budget</TabsTrigger>
          <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="budget" className="space-y-4">
          <div className="wv-card bg-gradient-to-br from-wealthveda-teal/10 to-wealthveda-indigo/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-wealthveda-teal/10 flex-center">
                <Wallet className="h-5 w-5 text-wealthveda-teal" />
              </div>
              <div>
                <h3 className="font-bold">Monthly Budget</h3>
                <p className="text-sm text-muted-foreground">
                  ₹38,000 total • ₹10,450 remaining
                </p>
              </div>
            </div>
            
            <Progress value={72} className="h-2.5 bg-muted mb-2" />
            
            <p className="text-xs text-muted-foreground mb-4">
              72% of your monthly budget used
            </p>
            
            <Button 
              size="sm" 
              className="w-full bg-wealthveda-indigo hover:bg-wealthveda-indigo/90"
            >
              Adjust Budget
            </Button>
          </div>
          
          {categories.map((category, index) => (
            <div 
              key={index}
              className="wv-card"
              onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
            >
              <div className="flex-between mb-2 cursor-pointer">
                <h3 className="font-medium">{category.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${category.isOverbudget ? 'text-destructive' : 'text-wealthveda-teal'}`}>
                    ₹{category.spent.toLocaleString()} / ₹{category.budget.toLocaleString()}
                  </span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${
                    activeCategory === category.name ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>
              
              <Progress 
                value={(category.spent / category.budget) * 100} 
                className={`h-2 ${category.isOverbudget ? 'bg-destructive/30' : 'bg-muted'}`} 
              />
              
              {activeCategory === category.name && (
                <div className="mt-4 space-y-2">
                  {category.transactions.map((transaction, tIdx) => (
                    <div key={tIdx} className="flex-between py-2 border-t border-border/30">
                      <div>
                        <p className="text-sm font-medium">{transaction.merchant}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <span className="font-medium">₹{transaction.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <div className="wv-card">
            <div className="flex-between mb-4">
              <h3 className="font-medium">Recent Transactions</h3>
              <Button variant="outline" size="sm" className="text-xs">Filter</Button>
            </div>
            
            <div className="space-y-3">
              {[
                { merchant: "BigBasket", amount: 3800, date: "May 3", category: "Groceries", icon: <ArrowUp className="h-3 w-3 text-destructive" /> },
                { merchant: "SBI Mutual Fund", amount: 5000, date: "May 2", category: "Investment", icon: <ArrowDown className="h-3 w-3 text-wealthveda-teal" /> },
                { merchant: "Uber", amount: 1200, date: "May 2", category: "Transport", icon: <ArrowUp className="h-3 w-3 text-destructive" /> },
                { merchant: "Amazon", amount: 2500, date: "May 1", category: "Shopping", icon: <ArrowUp className="h-3 w-3 text-destructive" /> },
                { merchant: "Salary", amount: 85000, date: "May 1", category: "Income", icon: <ArrowDown className="h-3 w-3 text-wealthveda-teal" /> }
              ].map((transaction, index) => (
                <div key={index} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-none">
                  <div className="w-8 h-8 rounded-full bg-muted flex-center">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex-between">
                      <h4 className="font-medium text-sm">{transaction.merchant}</h4>
                      <div className="flex items-center">
                        {transaction.icon}
                        <span className="font-medium ml-1">₹{transaction.amount.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex-between">
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      <span className="text-xs text-muted-foreground">{transaction.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-4 bg-wealthveda-indigo hover:bg-wealthveda-indigo/90" size="sm">
              View All Transactions
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetAndExpenses;
