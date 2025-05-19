
import React, { useState } from 'react';
import { 
  CalendarDays, 
  ArrowLeft, 
  Plus, 
  Home, 
  GraduationCap, 
  Car, 
  HeartPulse, 
  Plane, 
  Landmark,
  PenLine,
  BadgeIndianRupee,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import useUserStore from '@/lib/userStore';
import GoalForm from '@/components/goal/GoalForm';
import { BottomTabs } from './ui/bottom-tabs';

interface GoalTrackerProps {
  onChangeScreen?: (screen: string) => void;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ onChangeScreen }) => {
  const goals = useUserStore(state => state.goals);
  const { removeGoal } = useUserStore();
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'home':
        return <Home className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      case 'car':
        return <Car className="h-5 w-5" />;
      case 'emergency':
        return <HeartPulse className="h-5 w-5" />;
      case 'vacation':
        return <Plane className="h-5 w-5" />;
      case 'retirement':
        return <Landmark className="h-5 w-5" />;
      default:
        return <CalendarDays className="h-5 w-5" />;
    }
  };
  
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-500';
      case 'medium':
        return 'bg-orange-500/10 text-orange-500';
      case 'low':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  const handleEditClick = (goalId: string) => {
    setSelectedGoalId(goalId);
    setShowEditGoalModal(true);
  };
  
  const handleDeleteClick = (goalId: string) => {
    setSelectedGoalId(goalId);
    setShowDeleteAlert(true);
  };
  
  const handleDeleteConfirm = () => {
    if (selectedGoalId) {
      removeGoal(selectedGoalId);
    }
    setShowDeleteAlert(false);
  };
  
  return (
    <div className="pb-20">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onChangeScreen && onChangeScreen('dashboard')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Financial Goals</h1>
          </div>
          <Button 
            size="sm" 
            onClick={() => setShowAddGoalModal(true)}
            className="bg-wealthveda-teal hover:bg-wealthveda-teal/90"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Goal
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-muted rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No goals yet</h3>
            <p className="text-muted-foreground mb-6">
              Set financial goals to track your progress and plan for the future.
            </p>
            <Button 
              onClick={() => setShowAddGoalModal(true)}
              className="bg-wealthveda-teal hover:bg-wealthveda-teal/90"
            >
              <Plus className="h-4 w-4 mr-1" /> Create Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const deadline = goal.deadline ? new Date(goal.deadline) : new Date();
              const deadlineYear = deadline.getFullYear();
              const progress = goal.progress || 0;
              const category = goal.category || goal.name;
              const title = goal.title || goal.name.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
              
              return (
                <div 
                  key={goal.id || goal.name} 
                  className="bg-white border rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-${category}-100`}>
                          {getIconForCategory(category)}
                        </div>
                        <div>
                          <h3 className="font-medium">{title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            <span>Target: {deadlineYear}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-x-2">
                        <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                          {goal.priority || 'medium'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{formatCurrency(goal.savedAmount || 0)}</span>
                        <span className="font-medium">{formatCurrency(goal.targetAmount || goal.cost || 0)}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{`${Math.round(progress)}% completed`}</span>
                        <span>
                          Monthly: {formatCurrency(goal.monthlySavings || Math.round((goal.targetAmount || goal.cost || 0) / ((goal.timelineYears || 5) * 12)))}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleDeleteClick(goal.id || goal.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleEditClick(goal.id || goal.name)}
                      >
                        <PenLine className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      
      {/* Bottom Tabs */}
      {onChangeScreen && (
        <BottomTabs currentScreen="goals" onChangeScreen={onChangeScreen} />
      )}
      
      {/* Add Goal Modal */}
      <Dialog open={showAddGoalModal} onOpenChange={setShowAddGoalModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
          </DialogHeader>
          <GoalForm 
            onComplete={() => setShowAddGoalModal(false)}
            onCancel={() => setShowAddGoalModal(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Goal Modal */}
      <Dialog open={showEditGoalModal} onOpenChange={setShowEditGoalModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>
          {selectedGoalId && (
            <GoalForm 
              goalId={selectedGoalId}
              onComplete={() => {
                setShowEditGoalModal(false);
                setSelectedGoalId(null);
              }}
              onCancel={() => {
                setShowEditGoalModal(false);
                setSelectedGoalId(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Goal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this goal? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GoalTracker;
