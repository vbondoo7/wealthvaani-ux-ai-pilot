
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUserStore from '@/lib/userStore';
import { User } from "@/lib/types";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Users,
  Heart, 
  Wallet, 
  TrendingUp, 
  BadgeIndianRupee, 
  ShieldCheck,
  Edit,
  LogOut 
} from "lucide-react";
import PersonalDetailsForm from './PersonalDetailsForm';
import FinancialDetailsForm from './FinancialDetailsForm';
import { useToast } from "@/hooks/use-toast";

const UserProfile: React.FC = () => {
  const { currentUser, logout } = useUserStore();
  const user = currentUser as User;
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();
  
  const handleEditComplete = () => {
    setEditMode(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
      variant: "default",
    });
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
      variant: "default",
    });
  };
  
  if (!user) return null;
  
  return (
    <div className="wv-container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">User Profile</h1>
        <div className="flex gap-2">
          {!editMode && (
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setEditMode(true)}
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
          <Button 
            variant="destructive" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {editMode ? (
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="financial">Financial Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <PersonalDetailsForm onNext={handleEditComplete} />
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-4">
            <FinancialDetailsForm onComplete={handleEditComplete} />
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-wealthveda-indigo" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-wealthveda-indigo/10 flex-center">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                    
                    {user.personalDetails && (
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Age</div>
                          <div className="font-medium flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {user.personalDetails.age} years
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Family Size</div>
                          <div className="font-medium flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {user.personalDetails.familySize} members
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Marital Status</div>
                          <div className="font-medium flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {user.personalDetails.maritalStatus.charAt(0).toUpperCase() + 
                              user.personalDetails.maritalStatus.slice(1)}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="text-muted-foreground">Risk Tolerance</div>
                          <div className="font-medium flex items-center">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            {user.personalDetails.riskTolerance.charAt(0).toUpperCase() + 
                              user.personalDetails.riskTolerance.slice(1)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-wealthveda-teal" />
                    Financial Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.financialDetails ? (
                    <div className="space-y-3">
                      <div className="flex justify-between py-1 border-b">
                        <div className="text-muted-foreground">Monthly Income</div>
                        <div className="font-medium">₹{user.financialDetails.totalIncome.toLocaleString()}</div>
                      </div>
                      
                      <div className="flex justify-between py-1 border-b">
                        <div className="text-muted-foreground">Monthly Expenses</div>
                        <div className="font-medium">
                          ₹{Object.values(user.financialDetails.expenses)
                            .reduce((sum, val) => sum + val, 0)
                            .toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex justify-between py-1 border-b">
                        <div className="text-muted-foreground">Monthly Savings</div>
                        <div className="font-medium">₹{user.financialDetails.savings.toLocaleString()}</div>
                      </div>
                      
                      <div className="flex justify-between py-1 border-b">
                        <div className="text-muted-foreground">Total Investments</div>
                        <div className="font-medium">
                          ₹{user.financialDetails.investments
                            .reduce((sum, inv) => sum + inv.amount, 0)
                            .toLocaleString()}
                        </div>
                      </div>
                      
                      {user.financialDetails.debts && user.financialDetails.debts.length > 0 && (
                        <div className="flex justify-between py-1">
                          <div className="text-muted-foreground">Total Debts</div>
                          <div className="font-medium">
                            ₹{user.financialDetails.debts
                              .reduce((sum, debt) => sum + debt.amount, 0)
                              .toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-muted-foreground p-4 text-center">
                      Financial details not yet provided.
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BadgeIndianRupee className="h-5 w-5 mr-2 text-wealthveda-saffron" />
                    Subscription Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-wealthveda-indigo/10 to-wealthveda-teal/10 rounded-lg p-4 flex-1">
                      <div className="text-xl font-bold mb-1">
                        {user.subscription.plan} Plan
                      </div>
                      <div className="text-wealthveda-indigo mb-2">
                        ₹{user.subscription.pricePerMonth}/month
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.subscription.plan === 'Basic' ? '3 nudges/month' : 
                          user.subscription.plan === 'Pro' ? 'Unlimited nudges, tax reports' : 
                          'Families, Auto-invest execution'}
                      </div>
                    </div>
                    
                    {user.subscription.plan !== 'Premium' && (
                      <div className="bg-gradient-to-r from-wealthveda-teal/10 to-wealthveda-saffron/10 rounded-lg p-4 flex-1 border border-dashed border-muted">
                        <div className="text-lg font-medium mb-1">
                          Upgrade to {user.subscription.upgradeOptions[0].plan}
                        </div>
                        <div className="text-wealthveda-teal mb-2">
                          ₹{user.subscription.upgradeOptions[0].plan === 'Pro' ? '199' : '499'}/month
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                          Unlock premium features and get more from your financial journey
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-wealthveda-teal to-wealthveda-indigo hover:opacity-90"
                          size="sm"
                        >
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Upgrade Now
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm font-medium mb-2">Current Plan Features:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {user.subscription.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center text-sm p-1.5 rounded-md bg-muted/30"
                      >
                        <div className="h-4 w-4 rounded-full bg-wealthveda-teal/20 flex-center mr-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-wealthveda-teal"></div>
                        </div>
                        {formatFeatureName(feature)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent>
                {user.personalDetails ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-muted-foreground text-sm">Full Name</label>
                        <div className="font-medium">{user.name}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-muted-foreground text-sm">Email Address</label>
                        <div className="font-medium">{user.email}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-muted-foreground text-sm">Age</label>
                        <div className="font-medium">{user.personalDetails.age} years</div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-muted-foreground text-sm">Marital Status</label>
                        <div className="font-medium">
                          {user.personalDetails.maritalStatus.charAt(0).toUpperCase() + 
                            user.personalDetails.maritalStatus.slice(1)}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-muted-foreground text-sm">Family Size</label>
                        <div className="font-medium">{user.personalDetails.familySize} members</div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-muted-foreground text-sm">Dependents</label>
                        <div className="font-medium">{user.personalDetails.dependents}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-muted-foreground text-sm">Risk Tolerance</label>
                        <div className="font-medium">
                          {user.personalDetails.riskTolerance.charAt(0).toUpperCase() + 
                            user.personalDetails.riskTolerance.slice(1)}
                        </div>
                      </div>
                    </div>
                    
                    {user.personalDetails.financialChallenges && 
                     user.personalDetails.financialChallenges.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-muted-foreground text-sm">Financial Challenges</label>
                        <ul className="list-disc list-inside space-y-1">
                          {user.personalDetails.financialChallenges.map((challenge, index) => (
                            <li key={index} className="text-sm">{challenge}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-4 text-muted-foreground">
                    Personal details not provided yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Details</CardTitle>
              </CardHeader>
              <CardContent>
                {user.financialDetails ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Income Sources</h3>
                      <div className="space-y-2">
                        {Object.entries(user.financialDetails.incomeSources).map(([source, amount]) => (
                          <div key={source} className="flex justify-between py-1 border-b last:border-0">
                            <div className="capitalize">{source}</div>
                            <div className="font-medium">₹{amount.toLocaleString()}/month</div>
                          </div>
                        ))}
                        <div className="flex justify-between py-1 bg-muted/30 rounded-md px-2">
                          <div className="font-medium">Total Income</div>
                          <div className="font-bold">₹{user.financialDetails.totalIncome.toLocaleString()}/month</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Monthly Expenses</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(user.financialDetails.expenses).map(([category, amount]) => (
                          <div key={category} className="flex justify-between py-1 border-b">
                            <div className="capitalize">{category.replace('_', ' ')}</div>
                            <div className="font-medium">₹{amount.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between py-2 mt-2 bg-muted/30 rounded-md px-2">
                        <div className="font-medium">Total Expenses</div>
                        <div className="font-bold">
                          ₹{Object.values(user.financialDetails.expenses)
                            .reduce((sum, val) => sum + val, 0)
                            .toLocaleString()}/month
                        </div>
                      </div>
                    </div>
                    
                    {user.financialDetails.investments.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-3">Investments</h3>
                        <div className="space-y-2">
                          {user.financialDetails.investments.map((investment, index) => (
                            <div key={index} className="flex justify-between py-1 border-b last:border-0">
                              <div>{investment.type}</div>
                              <div className="font-medium">₹{investment.amount.toLocaleString()}</div>
                            </div>
                          ))}
                          <div className="flex justify-between py-1 bg-muted/30 rounded-md px-2">
                            <div className="font-medium">Total Investments</div>
                            <div className="font-bold">
                              ₹{user.financialDetails.investments
                                .reduce((sum, inv) => sum + inv.amount, 0)
                                .toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {user.financialDetails.debts && user.financialDetails.debts.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-3">Debts & Loans</h3>
                        <div className="space-y-3">
                          {user.financialDetails.debts.map((debt, index) => (
                            <div key={index} className="p-3 border rounded-md">
                              <div className="flex justify-between mb-1">
                                <div className="font-medium">{debt.type}</div>
                                <div className="font-bold">₹{debt.amount.toLocaleString()}</div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                <div>Interest Rate: {debt.interestRate}%</div>
                                <div>Monthly Payment: ₹{debt.monthlyPayment.toLocaleString()}</div>
                                {debt.remainingTenure && (
                                  <div>Remaining Tenure: {debt.remainingTenure} months</div>
                                )}
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between py-1 bg-muted/30 rounded-md px-2">
                            <div className="font-medium">Total Debts</div>
                            <div className="font-bold">
                              ₹{user.financialDetails.debts
                                .reduce((sum, debt) => sum + debt.amount, 0)
                                .toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {user.financialDetails.debtToIncomeRatio !== undefined && (
                        <div className="p-3 border rounded-md">
                          <div className="text-sm text-muted-foreground mb-1">Debt to Income Ratio</div>
                          <div className="text-lg font-bold">
                            {(user.financialDetails.debtToIncomeRatio * 100).toFixed(2)}%
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {user.financialDetails.debtToIncomeRatio < 0.3 
                              ? 'Healthy debt level'
                              : user.financialDetails.debtToIncomeRatio < 0.5
                                ? 'Moderate debt level'
                                : 'High debt level - consider debt reduction strategies'}
                          </div>
                        </div>
                      )}
                      
                      {user.financialDetails.savingsRate !== undefined && (
                        <div className="p-3 border rounded-md">
                          <div className="text-sm text-muted-foreground mb-1">Savings Rate</div>
                          <div className="text-lg font-bold">
                            {(user.financialDetails.savingsRate * 100).toFixed(2)}%
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {user.financialDetails.savingsRate < 0.1
                              ? 'Low savings rate - consider increasing savings'
                              : user.financialDetails.savingsRate < 0.2
                                ? 'Moderate savings rate'
                                : 'Excellent savings rate - keep it up!'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 text-muted-foreground">
                    Financial details not provided yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

// Helper function to format feature names
const formatFeatureName = (feature: string): string => {
  return feature
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default UserProfile;
