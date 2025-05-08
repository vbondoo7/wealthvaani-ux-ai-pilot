
import React from 'react';
import { Card } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

// Mock data for charts
const monthlyExpenseData = [
  { name: 'Jan', amount: 32000 },
  { name: 'Feb', amount: 34000 },
  { name: 'Mar', amount: 28000 },
  { name: 'Apr', amount: 30000 },
  { name: 'May', amount: 25000 },
  { name: 'Jun', amount: 27000 },
];

const savingsData = [
  { name: 'Jan', amount: 8000 },
  { name: 'Feb', amount: 9000 },
  { name: 'Mar', amount: 11000 },
  { name: 'Apr', amount: 10000 },
  { name: 'May', amount: 12000 },
  { name: 'Jun', amount: 15000 },
];

const expenseBreakdown = [
  { name: 'Housing', value: 40 },
  { name: 'Food', value: 20 },
  { name: 'Transport', value: 10 },
  { name: 'Entertainment', value: 15 },
  { name: 'Others', value: 15 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

interface FinancialAnalyticsProps {
  onAction?: (action: string) => void;
}

const FinancialAnalytics: React.FC<FinancialAnalyticsProps> = ({ onAction }) => {
  const { toast } = useToast();

  const handleChartClick = () => {
    toast({
      title: "Insight Available",
      description: "Your spending on entertainment has increased by 15% this month. Consider setting a budget.",
    });
    if (onAction) onAction('budget');
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Financial Analytics</h2>
      <p className="text-muted-foreground">Review your financial performance and gain insights</p>
      
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
    </div>
  );
};

export default FinancialAnalytics;
