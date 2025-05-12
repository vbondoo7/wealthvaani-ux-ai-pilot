import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useUserStore from '@/lib/userStore';
import { FinancialDetails } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, MinusCircle, Info } from "lucide-react";

const FinancialDetailsForm: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { currentUser, updateFinancialDetails } = useUserStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FinancialDetails>({
    totalIncome: currentUser?.financialDetails?.totalIncome || 50000,
    incomeSources: currentUser?.financialDetails?.incomeSources || { salary: 50000, other: 0 },
    expenses: currentUser?.financialDetails?.expenses || {
      rent: 12000,
      groceries: 5000,
      commute: 3000,
      emis: 12000,
      school_fees: 10000,
      utilities: 5000,
      misc: 5000
    },
    savings: currentUser?.financialDetails?.savings || 3000,
    investments: currentUser?.financialDetails?.investments || [],
    debts: currentUser?.financialDetails?.debts || [], 
    debtToIncomeRatio: currentUser?.financialDetails?.debtToIncomeRatio || 0,
    savingsRate: currentUser?.financialDetails?.savingsRate || 0
  });
  
  const [newInvestment, setNewInvestment] = useState({ type: '', amount: 0 });
  const [newDebt, setNewDebt] = useState({ 
    type: '', 
    amount: 0, 
    interestRate: 0, 
    monthlyPayment: 0,
    remainingTenure: 0
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number(value);
    
    setFormData(prev => {
      const updatedSources = {
        ...prev.incomeSources,
        [name]: numValue
      };
      
      const totalIncome = Object.values(updatedSources).reduce((sum, val) => sum + val, 0);
      
      return {
        ...prev,
        incomeSources: updatedSources,
        totalIncome
      };
    });
  };
  
  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number(value);
    
    setFormData(prev => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [name]: numValue
      }
    }));
  };
  
  const addInvestment = () => {
    if (newInvestment.type && newInvestment.amount > 0) {
      setFormData(prev => ({
        ...prev,
        investments: [...prev.investments, newInvestment]
      }));
      setNewInvestment({ type: '', amount: 0 });
    }
  };
  
  const removeInvestment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      investments: prev.investments.filter((_, i) => i !== index)
    }));
  };
  
  const addDebt = () => {
    if (
      newDebt.type && 
      newDebt.amount > 0 && 
      newDebt.interestRate > 0 && 
      newDebt.monthlyPayment > 0
    ) {
      setFormData(prev => ({
        ...prev,
        debts: [...(prev.debts || []), newDebt]
      }));
      setNewDebt({ 
        type: '', 
        amount: 0, 
        interestRate: 0, 
        monthlyPayment: 0,
        remainingTenure: 0
      });
    }
  };
  
  const removeDebt = (index: number) => {
    setFormData(prev => ({
      ...prev,
      debts: (prev.debts || []).filter((_, i) => i !== index)
    }));
  };
  
  const calculateTotalExpenses = () => {
    return Object.values(formData.expenses).reduce((sum, val) => sum + val, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Calculate derived metrics
    const totalExpenses = calculateTotalExpenses();
    const totalDebts = (formData.debts || []).reduce((sum, debt) => sum + debt.amount, 0);
    const debtToIncomeRatio = totalDebts > 0 ? totalDebts / (formData.totalIncome * 12) : 0;
    const savingsRate = (formData.totalIncome - totalExpenses) / formData.totalIncome;
    
    const updatedData = {
      ...formData,
      debtToIncomeRatio,
      savingsRate
    };
    
    setTimeout(() => {
      updateFinancialDetails(updatedData);
      setIsLoading(false);
      
      toast({
        title: "Financial details saved",
        description: "Your financial profile has been updated successfully.",
        variant: "default",
      });
      
      onComplete();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Income Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Income Details</h3>
        
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="salary">Monthly Salary/Primary Income (₹)</Label>
            <Input
              id="salary"
              name="salary"
              type="number"
              value={formData.incomeSources.salary}
              onChange={handleIncomeChange}
              min={0}
              required
              className="bg-muted/30"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="other">Other Income (₹)</Label>
            <Input
              id="other"
              name="other"
              type="number"
              value={formData.incomeSources.other}
              onChange={handleIncomeChange}
              min={0}
              className="bg-muted/30"
            />
          </div>
          
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex justify-between items-center">
              <Label>Total Monthly Income</Label>
              <span className="font-semibold">₹{formData.totalIncome.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expenses Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Monthly Expenses</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="rent">Rent/Housing (₹)</Label>
            <Input
              id="rent"
              name="rent"
              type="number"
              value={formData.expenses.rent}
              onChange={handleExpenseChange}
              min={0}
              required
              className="bg-muted/30"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="groceries">Groceries (₹)</Label>
            <Input
              id="groceries"
              name="groceries"
              type="number"
              value={formData.expenses.groceries}
              onChange={handleExpenseChange}
              min={0}
              required
              className="bg-muted/30"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="commute">Transportation/Commute (₹)</Label>
            <Input
              id="commute"
              name="commute"
              type="number"
              value={formData.expenses.commute}
              onChange={handleExpenseChange}
              min={0}
              required
              className="bg-muted/30"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="emis">Loan EMIs (₹)</Label>
            <Input
              id="emis"
              name="emis"
              type="number"
              value={formData.expenses.emis}
              onChange={handleExpenseChange}
              min={0}
              className="bg-muted/30"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="school_fees">Education/School Fees (₹)</Label>
            <Input
              id="school_fees"
              name="school_fees"
              type="number"
              value={formData.expenses.school_fees}
              onChange={handleExpenseChange}
              min={0}
              className="bg-muted/30"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="utilities">Utilities (₹)</Label>
            <Input
              id="utilities"
              name="utilities"
              type="number"
              value={formData.expenses.utilities}
              onChange={handleExpenseChange}
              min={0}
              className="bg-muted/30"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="misc">Miscellaneous (₹)</Label>
            <Input
              id="misc"
              name="misc"
              type="number"
              value={formData.expenses.misc}
              onChange={handleExpenseChange}
              min={0}
              required
              className="bg-muted/30"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="savings">Monthly Savings (₹)</Label>
            <Input
              id="savings"
              name="savings"
              type="number"
              value={formData.savings}
              onChange={(e) => setFormData(prev => ({ ...prev, savings: Number(e.target.value) }))}
              min={0}
              className="bg-muted/30"
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 rounded-lg bg-muted/50 p-3">
            <div className="flex justify-between items-center">
              <Label>Total Monthly Expenses</Label>
              <span className="font-semibold">₹{calculateTotalExpenses().toLocaleString()}</span>
            </div>
          </div>
          
          <div className={`flex-1 rounded-lg p-3 ${
            formData.totalIncome > calculateTotalExpenses() 
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}>
            <div className="flex justify-between items-center">
              <Label>Monthly Surplus/Deficit</Label>
              <span className="font-semibold">
                ₹{(formData.totalIncome - calculateTotalExpenses()).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Investments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Investments (Optional)</h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <Info className="h-3 w-3 mr-1" />
            <span>Add your existing investments</span>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="investment-type">Investment Type</Label>
                <Input
                  id="investment-type"
                  value={newInvestment.type}
                  onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value })}
                  placeholder="e.g., Mutual Fund, FD"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="investment-amount">Amount (₹)</Label>
                <Input
                  id="investment-amount"
                  type="number"
                  value={newInvestment.amount || ''}
                  onChange={(e) => setNewInvestment({ ...newInvestment, amount: Number(e.target.value) })}
                  min={0}
                  placeholder="10000"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  type="button" 
                  onClick={addInvestment}
                  disabled={!newInvestment.type || newInvestment.amount <= 0}
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Investment
                </Button>
              </div>
            </div>
            
            {formData.investments.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Current Investments</h4>
                <div className="space-y-2">
                  {formData.investments.map((investment, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
                    >
                      <div>
                        <span className="font-medium">{investment.type}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ₹{investment.amount.toLocaleString()}
                        </span>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInvestment(index)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Debts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Debts & Loans (Optional)</h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <Info className="h-3 w-3 mr-1" />
            <span>Add your existing loans</span>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="space-y-1">
                <Label htmlFor="debt-type">Loan Type</Label>
                <Input
                  id="debt-type"
                  value={newDebt.type}
                  onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value })}
                  placeholder="e.g., Home Loan"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="debt-amount">Outstanding Amount (₹)</Label>
                <Input
                  id="debt-amount"
                  type="number"
                  value={newDebt.amount || ''}
                  onChange={(e) => setNewDebt({ ...newDebt, amount: Number(e.target.value) })}
                  min={0}
                  placeholder="1000000"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="debt-interest">Interest Rate (%)</Label>
                <Input
                  id="debt-interest"
                  type="number"
                  value={newDebt.interestRate || ''}
                  onChange={(e) => setNewDebt({ ...newDebt, interestRate: Number(e.target.value) })}
                  min={0}
                  max={100}
                  step="0.01"
                  placeholder="8.5"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="debt-payment">Monthly Payment (₹)</Label>
                <Input
                  id="debt-payment"
                  type="number"
                  value={newDebt.monthlyPayment || ''}
                  onChange={(e) => setNewDebt({ ...newDebt, monthlyPayment: Number(e.target.value) })}
                  min={0}
                  placeholder="15000"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  type="button" 
                  onClick={addDebt}
                  disabled={
                    !newDebt.type || 
                    newDebt.amount <= 0 || 
                    newDebt.interestRate <= 0 ||
                    newDebt.monthlyPayment <= 0
                  }
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Debt
                </Button>
              </div>
            </div>
            
            {formData.debts && formData.debts.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Current Debts</h4>
                <div className="space-y-2">
                  {formData.debts.map((debt, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
                    >
                      <div className="flex-1">
                        <span className="font-medium">{debt.type}</span>
                        <div className="text-xs text-muted-foreground mt-1">
                          <span>Outstanding: ₹{debt.amount.toLocaleString()}</span>
                          <span className="mx-2">|</span>
                          <span>Rate: {debt.interestRate}%</span>
                          <span className="mx-2">|</span>
                          <span>EMI: ₹{debt.monthlyPayment.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDebt(index)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-6 bg-wealthveda-teal hover:bg-wealthveda-teal/90"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Complete Profile Setup"}
      </Button>
    </form>
  );
};

export default FinancialDetailsForm;
