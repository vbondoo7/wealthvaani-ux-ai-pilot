import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowUp, TrendingUp, CalendarClock, Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import useUserStore from '@/lib/userStore';
import { Goal } from '@/lib/types';

const GoalTracker: React.FC = () => {
  const { currentUser, addGoal, updateGoal, deleteGoal } = useUserStore();
  const { toast } = useToast();
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalYears, setGoalYears] = useState('');
  const [goalMonthlySavings, setGoalMonthlySavings] = useState('');
  const [goalInvestment, setGoalInvestment] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  
  if (!currentUser) return null;
  
  const goals = currentUser.goals;
  
  if (goals.length > 0 && !activeTab) {
    setActiveTab(goals[0].id);
  }
  
  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };
  
  const handleAddGoal = () => {
    const newGoal = {
      name: goalName.trim(),
      cost: Number(goalAmount),
      timelineYears: Number(goalYears),
      monthlySavings: Number(goalMonthlySavings),
      investment: goalInvestment,
      progress: 0, // Adding the missing required property
      savedAmount: 0 // Adding the missing required property
    };
    
    addGoal(newGoal);
    
    toast({
      title: "Goal Added",
      description: `Your goal "${goalName}" has been added successfully.`,
    });
    
    // Reset form
    setGoalName('');
    setGoalAmount('');
    setGoalYears('');
    setGoalMonthlySavings('');
    setGoalInvestment('');
    setIsAddDialogOpen(false);
    
    // Set the active tab to the newly created goal
    setTimeout(() => {
      const newGoalId = currentUser.goals[currentUser.goals.length - 1]?.id;
      if (newGoalId) {
        setActiveTab(newGoalId);
      }
    }, 100);
  };
  
  const handleEditGoal = () => {
    if (!editingGoal) return;
    
    const updatedGoal = {
      ...editingGoal,
      name: goalName.trim(),
      cost: Number(goalAmount),
      timelineYears: Number(goalYears),
      monthlySavings: Number(goalMonthlySavings),
      investment: goalInvestment,
    };
    
    updateGoal(updatedGoal);
    
    toast({
      title: "Goal Updated",
      description: `Your goal "${goalName}" has been updated successfully.`,
    });
    
    // Reset form
    setEditingGoal(null);
    setGoalName('');
    setGoalAmount('');
    setGoalYears('');
    setGoalMonthlySavings('');
    setGoalInvestment('');
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteGoal = () => {
    if (!editingGoal) return;
    
    deleteGoal(editingGoal.id);
    
    toast({
      title: "Goal Deleted",
      description: `Your goal "${editingGoal.name}" has been deleted.`,
    });
    
    // Reset form
    setEditingGoal(null);
    setIsDeleteDialogOpen(false);
    
    // Set active tab to first goal or empty if no goals left
    setTimeout(() => {
      if (currentUser.goals.length > 0) {
        setActiveTab(currentUser.goals[0].id);
      } else {
        setActiveTab('');
      }
    }, 100);
  };
  
  const openEditDialog = (goal: Goal) => {
    setEditingGoal(goal);
    setGoalName(goal.name.replace(/_/g, ' '));
    setGoalAmount(goal.cost.toString());
    setGoalYears(goal.timelineYears.toString());
    setGoalMonthlySavings(goal.monthlySavings.toString());
    setGoalInvestment(goal.investment);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (goal: Goal) => {
    setEditingGoal(goal);
    setIsDeleteDialogOpen(true);
  };
  
  const adjustTarget = (goalId: string, increase: boolean) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    const updatedGoal = {
      ...goal,
      cost: increase ? Math.round(goal.cost * 1.1) : Math.round(goal.cost * 0.9)
    };
    
    updateGoal(updatedGoal);
    
    toast({
      title: increase ? "Target Increased" : "Target Decreased",
      description: `Your goal target amount has been adjusted to ${formatAmount(updatedGoal.cost)}.`,
    });
  };
  
  const increaseSIP = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    const updatedGoal = {
      ...goal,
      monthlySavings: Math.round(goal.monthlySavings * 1.2)
    };
    
    updateGoal(updatedGoal);
    
    toast({
      title: "SIP Increased",
      description: `Your monthly contribution has been increased to ₹${updatedGoal.monthlySavings}.`,
    });
  };

  return (
    <div className="wv-container py-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Your Financial Goals</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-wealthveda-indigo hover:bg-wealthveda-indigo/90 gap-1">
              <Plus size={16} />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
              <DialogDescription>
                Create a new financial goal and we'll help you track your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input 
                  id="goal-name" 
                  value={goalName} 
                  onChange={(e) => setGoalName(e.target.value)} 
                  placeholder="e.g., Buy a Home"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal-amount">Target Amount (₹)</Label>
                <Input 
                  id="goal-amount" 
                  value={goalAmount} 
                  onChange={(e) => setGoalAmount(e.target.value)} 
                  type="number"
                  placeholder="e.g., 1500000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="goal-years">Timeline (years)</Label>
                  <Input 
                    id="goal-years" 
                    value={goalYears} 
                    onChange={(e) => setGoalYears(e.target.value)} 
                    type="number"
                    placeholder="e.g., 5"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="goal-monthly">Monthly Savings (₹)</Label>
                  <Input 
                    id="goal-monthly" 
                    value={goalMonthlySavings} 
                    onChange={(e) => setGoalMonthlySavings(e.target.value)} 
                    type="number"
                    placeholder="e.g., 10000"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal-investment">Investment Type</Label>
                <Select onValueChange={setGoalInvestment} defaultValue={goalInvestment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equity_sip">Equity SIP</SelectItem>
                    <SelectItem value="mutual_funds">Mutual Funds</SelectItem>
                    <SelectItem value="fixed_deposit">Fixed Deposit</SelectItem>
                    <SelectItem value="ppf">PPF</SelectItem>
                    <SelectItem value="stocks">Stocks</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="real_estate">Real Estate</SelectItem>
                    <SelectItem value="liquid_fund">Liquid Fund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddGoal} disabled={!goalName || !goalAmount || !goalYears || !goalMonthlySavings || !goalInvestment}>
                Create Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">
        Track your progress and stay on target
      </p>
      
      {goals.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-6">
            {goals.map(goal => (
              <TabsTrigger 
                key={goal.id} 
                value={goal.id}
                className="flex-1"
              >
                {goal.name.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {goals.map(goal => (
            <TabsContent key={goal.id} value={goal.id} className="space-y-6">
              <div className="wv-card bg-gradient-to-br from-wealthveda-teal/10 to-wealthveda-indigo/10">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-bold text-lg">{goal.name.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</h2>
                  <span className="text-xs bg-wealthveda-indigo/10 text-wealthveda-indigo px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CalendarClock className="h-3 w-3" />
                    {new Date().getFullYear() + goal.timelineYears} Target
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-wealthveda-teal/10 flex-center">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {formatAmount(goal.cost)}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Target amount
                    </p>
                  </div>
                </div>
                
                <div className="mb-6 mt-2">
                  <div className="flex-between mb-1">
                    <span className="text-sm text-muted-foreground">
                      Saved: {formatAmount(goal.savedAmount || 0)}
                    </span>
                    <span className="text-sm font-medium">
                      {goal.progress}% Complete
                    </span>
                  </div>
                  
                  <Progress value={goal.progress} className="h-2.5 bg-muted" />
                </div>
                
                <div className="p-3 bg-background rounded-lg mb-4 border border-border/60">
                  <div className="flex-between mb-2">
                    <span className="text-sm">Monthly contribution</span>
                    <span className="font-medium">₹{goal.monthlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex-between">
                    <span className="text-sm">Months remaining</span>
                    <span className="font-medium">{goal.timelineYears * 12}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    size="sm"
                    onClick={() => adjustTarget(goal.id, false)}
                  >
                    Decrease Target
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    size="sm"
                    onClick={() => adjustTarget(goal.id, true)}
                  >
                    Increase Target
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-2">
                  <Button 
                    className="flex-1 bg-wealthveda-teal hover:bg-wealthveda-teal/90"
                    size="sm"
                    onClick={() => increaseSIP(goal.id)}
                  >
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Increase SIP
                  </Button>
                </div>
              </div>
              
              <div className="wv-card">
                <h3 className="font-medium mb-2">AI Recommendation</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {goal.name.includes('education') 
                    ? 'Consider tax-free education savings options like Sukanya Samriddhi Yojana for higher returns.' 
                    : goal.name.includes('home') || goal.name.includes('buy_home')
                    ? 'Increasing your SIP by ₹3,000 can help you reach your home buying goal 8 months earlier.'
                    : goal.name.includes('retirement') || goal.name.includes('retire')
                    ? 'Allocating 70% to equity now and gradually shifting to debt as you approach retirement can optimize returns.'
                    : 'Increasing your SIP by ₹2,000 can help you reach your goal 10 months earlier.'}
                </p>
                <Button 
                  className="w-full text-xs h-8 rounded-lg bg-wealthveda-indigo hover:bg-wealthveda-indigo/90"
                >
                  See Detailed Projection
                </Button>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => openEditDialog(goal)}
                  >
                    <Edit size={14} />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 text-destructive"
                    onClick={() => openDeleteDialog(goal)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-muted rounded-xl">
                <div className="w-10 h-10 rounded-full bg-background flex-center mr-3">
                  <TrendingUp className="h-4 w-4 text-wealthveda-teal" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Did you know?</h3>
                  <p className="text-xs text-muted-foreground">
                    Investing early helps you gain from the power of compounding. Each year of delay can reduce your final corpus by up to 15%.
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="py-8 flex flex-col items-center justify-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-medium">No Goals Set</h3>
          <p className="text-sm text-center text-muted-foreground">
            You haven't set any financial goals yet. <br />
            Add your first goal to start tracking your progress.
          </p>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-wealthveda-indigo hover:bg-wealthveda-indigo/90"
          >
            <Plus size={16} className="mr-2" />
            Create Your First Goal
          </Button>
        </div>
      )}
      
      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>
              Modify your financial goal details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-goal-name">Goal Name</Label>
              <Input 
                id="edit-goal-name" 
                value={goalName} 
                onChange={(e) => setGoalName(e.target.value)} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-goal-amount">Target Amount (₹)</Label>
              <Input 
                id="edit-goal-amount" 
                value={goalAmount} 
                onChange={(e) => setGoalAmount(e.target.value)} 
                type="number"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-goal-years">Timeline (years)</Label>
                <Input 
                  id="edit-goal-years" 
                  value={goalYears} 
                  onChange={(e) => setGoalYears(e.target.value)} 
                  type="number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-goal-monthly">Monthly Savings (₹)</Label>
                <Input 
                  id="edit-goal-monthly" 
                  value={goalMonthlySavings} 
                  onChange={(e) => setGoalMonthlySavings(e.target.value)} 
                  type="number"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-goal-investment">Investment Type</Label>
              <Select onValueChange={setGoalInvestment} defaultValue={goalInvestment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select investment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equity_sip">Equity SIP</SelectItem>
                  <SelectItem value="mutual_funds">Mutual Funds</SelectItem>
                  <SelectItem value="fixed_deposit">Fixed Deposit</SelectItem>
                  <SelectItem value="ppf">PPF</SelectItem>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="real_estate">Real Estate</SelectItem>
                  <SelectItem value="liquid_fund">Liquid Fund</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditGoal} disabled={!goalName || !goalAmount || !goalYears || !goalMonthlySavings || !goalInvestment}>
              Update Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Goal Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Goal</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this goal? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-medium">This will permanently delete the goal and its progress.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteGoal}>
              Delete Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalTracker;
