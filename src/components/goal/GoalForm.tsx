
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Target, BadgeIndianRupee } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import useUserStore from '@/lib/userStore';

interface GoalFormProps {
  goalId?: string;
  onComplete: () => void;
  onCancel?: () => void;
}

const goalSchema = z.object({
  title: z.string().min(1, 'Goal name is required'),
  category: z.string().min(1, 'Category is required'),
  targetAmount: z.coerce.number().min(1, 'Amount must be greater than 0'),
  deadline: z.date({
    required_error: "Please select a target date.",
  }),
  priority: z.enum(['low', 'medium', 'high']),
  description: z.string().optional()
});

type GoalFormValues = z.infer<typeof goalSchema>;

const GoalForm: React.FC<GoalFormProps> = ({ goalId, onComplete, onCancel }) => {
  const { addGoal, updateGoal } = useUserStore();
  const goals = useUserStore(state => state.goals);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: '',
      category: 'home',
      targetAmount: 0,
      deadline: new Date(new Date().setFullYear(new Date().getFullYear() + 5)),
      priority: 'medium',
      description: ''
    }
  });

  useEffect(() => {
    if (goalId) {
      const goal = goals.find(g => g.id === goalId);
      if (goal) {
        setIsEditing(true);
        
        const deadline = goal.deadline 
          ? new Date(goal.deadline) 
          : new Date(new Date().setFullYear(new Date().getFullYear() + (goal.timelineYears || 5)));
        
        form.reset({
          title: goal.title || goal.name,
          category: goal.category || goal.name,
          targetAmount: goal.targetAmount || goal.cost || 0,
          deadline,
          priority: goal.priority || 'medium',
          description: goal.description || `Goal to ${goal.name.replace(/_/g, ' ')}`
        });
      }
    }
  }, [goalId, goals, form]);

  const handleSubmit = (values: GoalFormValues) => {
    const timelineYears = Math.ceil((values.deadline.getTime() - new Date().getTime()) / (365 * 24 * 60 * 60 * 1000));
    
    // Calculate monthly savings needed
    const monthlySavings = Math.round(values.targetAmount / (timelineYears * 12));
    
    const goalData = {
      id: goalId || `goal-${Date.now()}`,
      title: values.title,
      name: values.category,
      category: values.category,
      targetAmount: values.targetAmount,
      cost: values.targetAmount,
      deadline: format(values.deadline, 'yyyy-MM-dd'),
      timelineYears,
      priority: values.priority,
      description: values.description || `Goal to ${values.title.toLowerCase()}`,
      progress: isEditing ? (goals.find(g => g.id === goalId)?.progress || 0) : 0,
      savedAmount: isEditing ? (goals.find(g => g.id === goalId)?.savedAmount || 0) : 0,
      monthlySavings,
      investment: 'mutual_funds'
    };
    
    if (isEditing && goalId) {
      updateGoal(goalId, goalData);
    } else {
      addGoal(goalData);
    }
    
    onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., New Home, Child's Education" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="emergency">Emergency Fund</SelectItem>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="retirement">Retirement</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="targetAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Amount (₹)</FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background">
                  <div className="pl-3 text-muted-foreground">
                    <BadgeIndianRupee className="h-4 w-4" />
                  </div>
                  <Input 
                    type="number" 
                    placeholder="0"
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Target Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Brief description of your goal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-3 pt-4">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1" 
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" className="flex-1 bg-wealthveda-teal hover:bg-wealthveda-teal/90">
            {isEditing ? 'Update Goal' : 'Create Goal'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GoalForm;
