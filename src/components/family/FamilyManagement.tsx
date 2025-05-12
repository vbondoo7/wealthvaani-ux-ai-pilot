
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import useUserStore from '@/lib/userStore';
import { User, Users, Trash, UserPlus, ArrowRightLeft, ChevronRight, PieChart, BadgeIndianRupee } from "lucide-react";
import { FamilyMember } from '@/lib/types';

const FamilyManagement: React.FC = () => {
  const { currentUser, updateFamilyMembers } = useUserStore();
  const { toast } = useToast();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    relationship: '',
    age: 0,
    income: 0,
    expenses: 0
  });
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const handleAddMember = () => {
    if (!newMember.name || !newMember.relationship) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const fullMember = newMember as FamilyMember;
    
    if (currentUser && currentUser.familyMembers) {
      const updatedMembers = [...currentUser.familyMembers, fullMember];
      updateFamilyMembers(updatedMembers);
      toast({
        title: "Family Member Added",
        description: `${fullMember.name} has been added to your family`,
      });
    } else if (currentUser) {
      updateFamilyMembers([fullMember]);
      toast({
        title: "Family Member Added",
        description: `${fullMember.name} has been added to your family`,
      });
    }
    
    setIsAddingMember(false);
    setNewMember({
      name: '',
      relationship: '',
      age: 0,
      income: 0,
      expenses: 0
    });
  };

  const handleRemoveMember = (member: FamilyMember) => {
    if (currentUser && currentUser.familyMembers) {
      const updatedMembers = currentUser.familyMembers.filter(m => m.name !== member.name);
      updateFamilyMembers(updatedMembers);
      toast({
        title: "Family Member Removed",
        description: `${member.name} has been removed from your family`,
      });
    }
  };

  const getTotalFamilyIncome = () => {
    if (!currentUser?.familyMembers) return currentUser?.financialDetails?.totalIncome || 0;
    
    return (currentUser.financialDetails?.totalIncome || 0) + 
      currentUser.familyMembers.reduce((sum, member) => sum + member.income, 0);
  };

  const getTotalFamilyExpenses = () => {
    if (!currentUser?.familyMembers) return 0;
    
    const userExpenses = Object.values(currentUser.financialDetails?.expenses || {})
      .reduce((sum, expense) => sum + expense, 0);
      
    const familyExpenses = currentUser.familyMembers.reduce((sum, member) => sum + member.expenses, 0);
    
    return userExpenses + familyExpenses;
  };

  const isPremiumUser = currentUser?.subscription.plan === "Premium";

  if (!currentUser) return null;

  return (
    <div className="wv-container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Family Finance Management</h1>
          <p className="text-muted-foreground">
            {isPremiumUser 
              ? "Manage your family's finances together" 
              : "Upgrade to Premium to unlock full family management features"}
          </p>
        </div>
        
        {!isPremiumUser && (
          <Button 
            className="bg-wealthveda-teal hover:bg-wealthveda-teal/90"
            onClick={() => {
              toast({
                title: "Premium Feature",
                description: "Upgrade to Premium to unlock full family management features",
              });
            }}
          >
            Upgrade to Premium
          </Button>
        )}
      </div>

      {/* Family Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Family Size</CardDescription>
            <CardTitle className="text-2xl">
              {currentUser.familyMembers ? currentUser.familyMembers.length + 1 : 1} members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {currentUser.personalDetails?.familySize} in household
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Family Income</CardDescription>
            <CardTitle className="text-2xl">
              ₹{getTotalFamilyIncome().toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowRightLeft className="h-4 w-4 mr-1" />
              Monthly combined income
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Family Expenses</CardDescription>
            <CardTitle className="text-2xl">
              ₹{getTotalFamilyExpenses().toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <BadgeIndianRupee className="h-4 w-4 mr-1" />
              Monthly combined expenses
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Family Members */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Family Members</CardTitle>
          <CardDescription>
            {currentUser.familyMembers && currentUser.familyMembers.length > 0 
              ? "Manage your family members' financial information" 
              : "Add family members to manage finances together"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Self */}
            <Card className="bg-wealthveda-indigo/5 border-wealthveda-indigo/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-wealthveda-indigo/20 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-wealthveda-indigo" />
                  </div>
                  <div>
                    <h3 className="font-medium">{currentUser.name} (You)</h3>
                    <p className="text-xs text-muted-foreground">
                      {currentUser.personalDetails?.age} years • {currentUser.personalDetails?.occupation}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">₹{currentUser.financialDetails?.totalIncome.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">monthly income</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Family members */}
            {currentUser.familyMembers?.map((member, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedMember(member)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-wealthveda-indigo/10 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-wealthveda-indigo" />
                    </div>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {member.age} years • {member.relationship}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium">₹{member.income.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">monthly income</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add member button */}
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 border-dashed"
              onClick={() => setIsAddingMember(true)}
              disabled={!isPremiumUser}
            >
              <UserPlus className="h-5 w-5" />
              Add Family Member
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Family Financial Health */}
      {isPremiumUser && (currentUser.familyMembers?.length || 0) > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Family Financial Health</CardTitle>
            <CardDescription>Insights and recommendations for your family</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="mt-0.5">
                  <PieChart className="h-5 w-5 text-wealthveda-teal" />
                </div>
                <div>
                  <h4 className="font-medium">Family Income Distribution</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Primary earner contributes {Math.round((currentUser.financialDetails?.totalIncome || 0) / getTotalFamilyIncome() * 100)}% of total family income
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="mt-0.5">
                  <BadgeIndianRupee className="h-5 w-5 text-wealthveda-teal" />
                </div>
                <div>
                  <h4 className="font-medium">Expense Optimization</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your family could save an additional ₹{Math.round(getTotalFamilyExpenses() * 0.15).toLocaleString()} monthly by consolidating subscriptions and utilities
                  </p>
                </div>
              </div>
              
              <Button className="w-full bg-wealthveda-teal hover:bg-wealthveda-teal/90">
                Generate Family Financial Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Add Member Dialog */}
      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>
              Add details about your family member to include them in financial planning
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={newMember.name} 
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Select 
                onValueChange={(value) => setNewMember({...newMember, relationship: value})}
                value={newMember.relationship}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                value={newMember.age?.toString() || ''} 
                onChange={(e) => setNewMember({...newMember, age: parseInt(e.target.value) || 0})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income (₹)</Label>
              <Input 
                id="income" 
                type="number" 
                value={newMember.income?.toString() || ''} 
                onChange={(e) => setNewMember({...newMember, income: parseInt(e.target.value) || 0})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expenses">Monthly Expenses (₹)</Label>
              <Input 
                id="expenses" 
                type="number" 
                value={newMember.expenses?.toString() || ''} 
                onChange={(e) => setNewMember({...newMember, expenses: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingMember(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember}>
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Member Details Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMember?.name}</DialogTitle>
            <DialogDescription>
              {selectedMember?.relationship} • {selectedMember?.age} years old
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Monthly Income</CardDescription>
                  <CardTitle>₹{selectedMember?.income.toLocaleString()}</CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Monthly Expenses</CardDescription>
                  <CardTitle>₹{selectedMember?.expenses.toLocaleString()}</CardTitle>
                </CardHeader>
              </Card>
            </div>
            
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-medium mb-2">Financial Recommendations</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-wealthveda-teal/20 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-wealthveda-teal"></div>
                  </div>
                  <span>Consider adding {selectedMember?.name} to a joint investment plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-wealthveda-teal/20 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-wealthveda-teal"></div>
                  </div>
                  <span>Optimize tax planning by allocating investments efficiently</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-wealthveda-teal/20 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-wealthveda-teal"></div>
                  </div>
                  <span>Review insurance coverage to ensure adequate protection</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="destructive" 
              className="flex items-center" 
              onClick={() => {
                if (selectedMember) {
                  handleRemoveMember(selectedMember);
                  setSelectedMember(null);
                }
              }}
            >
              <Trash className="h-4 w-4 mr-2" />
              Remove Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyManagement;
