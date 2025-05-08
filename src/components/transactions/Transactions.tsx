
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import useUserStore from '@/lib/userStore';
import { Transaction } from '@/lib/types';
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

const Transactions: React.FC = () => {
  const { currentUser } = useUserStore();
  const [accountFilter, setAccountFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  if (!currentUser) return null;
  
  const transactions = currentUser.transactions || [];
  
  const filteredTransactions = transactions.filter(transaction => {
    const matchAccount = accountFilter === 'all' || transaction.account === accountFilter;
    const matchType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchAccount && matchType;
  });
  
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'salary':
        return 'bg-green-100 text-green-800';
      case 'rent':
        return 'bg-orange-100 text-orange-800';
      case 'groceries':
        return 'bg-blue-100 text-blue-800';
      case 'commute':
        return 'bg-purple-100 text-purple-800';
      case 'emis':
        return 'bg-red-100 text-red-800';
      case 'school_fees':
        return 'bg-yellow-100 text-yellow-800';
      case 'utilities':
        return 'bg-teal-100 text-teal-800';
      case 'misc':
        return 'bg-gray-100 text-gray-800';
      case 'investment':
        return 'bg-wealthveda-indigo/20 text-wealthveda-indigo';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="wv-container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Transactions</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Account Type</label>
              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="current">Current Account</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="investment">Investment Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Transaction Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Income</SelectItem>
                  <SelectItem value="debit">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableCaption>
                {filteredTransactions.length > 0 
                  ? `Showing ${filteredTransactions.length} transactions`
                  : 'No transactions found'}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(transaction.category)}>
                        {transaction.category.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{transaction.account}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        {transaction.type === 'credit' ? (
                          <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                        )}
                        <span 
                          className={transaction.type === 'credit' 
                            ? 'text-green-600 font-medium' 
                            : 'text-red-600 font-medium'}
                        >
                          {transaction.amount.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{transactions
                .filter(tx => tx.type === 'credit')
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ₹{transactions
                .filter(tx => tx.type === 'debit')
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Net Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(
                transactions
                  .filter(tx => tx.type === 'credit')
                  .reduce((sum, tx) => sum + tx.amount, 0) -
                transactions
                  .filter(tx => tx.type === 'debit')
                  .reduce((sum, tx) => sum + tx.amount, 0)
              ).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
