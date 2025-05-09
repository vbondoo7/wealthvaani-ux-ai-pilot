import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import useUserStore from '@/lib/userStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for charts
const generateMonthlyData = (base: number, variance: number, months: number = 6) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  return Array.from({ length: months }, (_, i) => {
    const monthIndex = (currentMonth - months + i + 1 + 12) % 12;
    return {
      name: monthNames[monthIndex],
      amount: Math.round(base + (Math.random() * variance * 2) - variance)
    };
  });
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

interface FinancialAnalyticsProps {
  onAction?: (action: string) => void;
}

const FinancialAnalytics: React.FC<FinancialAnalyticsProps> = ({ onAction }) => {
  const { toast } = useToast();
  const { currentUser } = useUserStore();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!currentUser) return null;
  
  // Generate data based on user's subscription
  const baseExpense = currentUser.subscription.plan === 'Basic' ? 25000 :
                      currentUser.subscription.plan === 'Pro' ? 32000 : 45000;
                      
  const baseSavings = currentUser.subscription.plan === 'Basic' ? 8000 :
                     currentUser.subscription.plan === 'Pro' ? 12000 : 18000;
  
  const monthlyExpenseData = generateMonthlyData(baseExpense, 5000);
  const savingsData = generateMonthlyData(baseSavings, 3000);

  // Create expense breakdown based on user plan
  const expenseBreakdown = currentUser.subscription.plan === 'Basic' ? 
    [
      { name: 'Housing', value: 45 },
      { name: 'Food', value: 25 },
      { name: 'Transport', value: 15 },
      { name: 'Others', value: 15 }
    ] : 
    currentUser.subscription.plan === 'Pro' ?
    [
      { name: 'Housing', value: 40 },
      { name: 'Food', value: 20 },
      { name: 'Transport', value: 10 },
      { name: 'Entertainment', value: 15 },
      { name: 'Others', value: 15 }
    ] :
    [
      { name: 'Housing', value: 35 },
      { name: 'Food', value: 18 },
      { name: 'Transport', value: 12 },
      { name: 'Entertainment', value: 15 },
      { name: 'Investments', value: 10 },
      { name: 'Others', value: 10 }
    ];

  const handleChartClick = () => {
    toast({
      title: "Insight Available",
      description: "Your spending on entertainment has increased by 15% this month. Consider setting a budget.",
    });
    if (onAction) onAction('budget');
  };
  
  const handleDownload = (format: string) => {
    toast({
      title: `Downloading ${format.toUpperCase()} Report`,
      description: `Your financial report is being prepared and will download shortly.`,
    });
  };
  
  return (
    <div className="wv-container space-y-6 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Financial Analytics</h2>
          <p className="text-muted-foreground">Review your financial performance and gain insights</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Download Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleDownload('pdf')} className="flex items-center gap-2">
              <FileText size={16} />
              PDF Report
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload('xlsx')} className="flex items-center gap-2">
              <FileSpreadsheet size={16} />
              Excel Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button 
          variant={activeTab === 'overview' ? 'default' : 'outline'}
          className={activeTab === 'overview' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : ''}
          onClick={() => setActiveTab('overview')}
          size="sm"
        >
          Overview
        </Button>
        <Button 
          variant={activeTab === 'expenses' ? 'default' : 'outline'}
          className={activeTab === 'expenses' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : ''}
          onClick={() => setActiveTab('expenses')}
          size="sm"
        >
          Expenses
        </Button>
        <Button 
          variant={activeTab === 'savings' ? 'default' : 'outline'}
          className={activeTab === 'savings' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : ''}
          onClick={() => setActiveTab('savings')}
          size="sm"
        >
          Savings
        </Button>
        {currentUser.subscription.plan !== 'Basic' && (
          <Button 
            variant={activeTab === 'trends' ? 'default' : 'outline'}
            className={activeTab === 'trends' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : ''}
            onClick={() => setActiveTab('trends')}
            size="sm"
          >
            Trends
          </Button>
        )}
        {currentUser.subscription.plan === 'Premium' && (
          <Button 
            variant={activeTab === 'investments' ? 'default' : 'outline'}
            className={activeTab === 'investments' ? 'bg-wealthveda-indigo hover:bg-wealthveda-indigo/90' : ''}
            onClick={() => setActiveTab('investments')}
            size="sm"
          >
            Investments
          </Button>
        )}
      </div>
      
      {/* Expense Trend */}
      <Card className="p-4">
        <h3 className="font-medium mb-3">Monthly Expense Trend</h3>
        <div className="h-64 w-full" onClick={handleChartClick}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyExpenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Savings Growth */}
      <Card className="p-4">
        <h3 className="font-medium mb-3">Savings Growth</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Expense Breakdown */}
      <Card className="p-4">
        <h3 className="font-medium mb-3">Expense Breakdown</h3>
        <div className="h-64 w-full flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Premium features */}
      {currentUser.subscription.plan === 'Premium' && (
        <Card className="p-4 border-wealthveda-teal">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-wealthveda-teal/20 flex items-center justify-center">
              <Download size={14} className="text-wealthveda-teal" />
            </div>
            <h3 className="font-medium text-wealthveda-teal">Premium Analysis</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Enhanced financial analysis with AI-powered insights and recommendations.
          </p>
          <Button 
            className="w-full bg-wealthveda-teal hover:bg-wealthveda-teal/90"
            onClick={() => handleDownload('premium')}
          >
            Generate Detailed Report
          </Button>
        </Card>
      )}
    </div>
  );
};

export default FinancialAnalytics;
