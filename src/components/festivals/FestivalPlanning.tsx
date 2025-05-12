
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import useUserStore from '@/lib/userStore';
import { ChevronRight, CalendarDays, Sparkles, BadgeIndianRupee, Gift, Plus } from "lucide-react";

interface Festival {
  name: string;
  date: string;
  description: string;
  imageUrl: string;
}

interface Season {
  name: string;
  months: string;
  description: string;
  imageUrl: string;
}

const festivals: Festival[] = [
  {
    name: "Diwali",
    date: "2025-10-23",
    description: "The festival of lights symbolizing the victory of light over darkness",
    imageUrl: "https://images.unsplash.com/photo-1513545581296-caf398111853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGl3YWxpfGVufDB8fDB8fHww"
  },
  {
    name: "Holi",
    date: "2026-03-14",
    description: "The festival of colors celebrating the arrival of spring",
    imageUrl: "https://images.unsplash.com/photo-1585644156283-71c754ee7d83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9saXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Navratri",
    date: "2025-09-25",
    description: "Nine nights dedicated to the worship of Goddess Durga",
    imageUrl: "https://images.unsplash.com/photo-1633074795278-3c349def69a4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF2cmF0cml8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Raksha Bandhan",
    date: "2025-08-09",
    description: "Celebrates the bond between brothers and sisters",
    imageUrl: "https://images.unsplash.com/photo-1628106645640-080c1675171c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFrc2hhJTIwYmFuZGhhbnxlbnwwfHwwfHx8MA%3D%3D"
  }
];

const seasons: Season[] = [
  {
    name: "Summer",
    months: "March - June",
    description: "Plan for vacations, home improvements, and summer expenditures",
    imageUrl: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyfGVufDB8fDB8fHww"
  },
  {
    name: "Monsoon",
    months: "July - September",
    description: "Save for maintenance, repairs, and health expenses during rainy season",
    imageUrl: "https://images.unsplash.com/photo-1501691223387-dd0500403074?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Winter",
    months: "November - February",
    description: "Budget for winter clothing, heating costs, and winter travel",
    imageUrl: "https://images.unsplash.com/photo-1452697620382-f6543ead73b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2ludGVyfGVufDB8fDB8fHww"
  }
];

const FestivalPlanning: React.FC = () => {
  const { currentUser, updateFestivalPlan, updateSeasonalPlan } = useUserStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("festivals");
  const [isAddingFestival, setIsAddingFestival] = useState(false);
  const [isAddingSeason, setIsAddingSeason] = useState(false);
  const [newBudget, setNewBudget] = useState({
    name: "",
    budget: 0,
    saved: 0
  });

  if (!currentUser) return null;

  const festivalPlans = currentUser.financialDetails?.festivalPlanning || {};
  const seasonalPlans = currentUser.financialDetails?.seasonalPlanning || {};
  
  const isPremiumOrPro = currentUser.subscription.plan === 'Premium' || currentUser.subscription.plan === 'Pro';

  const handleAddFestivalPlan = () => {
    if (!newBudget.name || newBudget.budget <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select a festival and enter a budget greater than zero",
        variant: "destructive"
      });
      return;
    }
    
    updateFestivalPlan(
      newBudget.name.toLowerCase().replace(/\s/g, '_'), 
      { budget: newBudget.budget, saved: newBudget.saved || 0 }
    );
    
    toast({
      title: "Festival Plan Added",
      description: `Budget for ${newBudget.name} has been set successfully`,
    });
    
    setIsAddingFestival(false);
    setNewBudget({ name: "", budget: 0, saved: 0 });
  };

  const handleAddSeasonalPlan = () => {
    if (!newBudget.name || newBudget.budget <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select a season and enter a budget greater than zero",
        variant: "destructive"
      });
      return;
    }
    
    updateSeasonalPlan(
      newBudget.name.toLowerCase(), 
      { 
        budget: newBudget.budget, 
        saved: newBudget.saved || 0,
        purpose: newBudget.name === "Summer" 
          ? "Vacation" 
          : newBudget.name === "Monsoon" 
            ? "Home Maintenance" 
            : "Winter Expenses"
      }
    );
    
    toast({
      title: "Seasonal Plan Added",
      description: `Budget for ${newBudget.name} has been set successfully`,
    });
    
    setIsAddingSeason(false);
    setNewBudget({ name: "", budget: 0, saved: 0 });
  };
  
  const getTimeUntil = (dateString: string) => {
    const targetDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(targetDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 30 
      ? `${diffDays} days away`
      : diffDays <= 60
        ? "In about 2 months"
        : diffDays <= 90
          ? "In about 3 months"
          : diffDays <= 180
            ? "In about 6 months"
            : "Later this year";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleAddToSavings = (type: 'festival' | 'season', name: string, amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount greater than zero",
        variant: "destructive"
      });
      return;
    }
    
    if (type === 'festival') {
      const festival = festivalPlans[name];
      if (festival) {
        updateFestivalPlan(name, { 
          budget: festival.budget, 
          saved: festival.saved + amount 
        });
        
        toast({
          title: "Amount Added",
          description: `₹${amount} added to your ${name.replace(/_/g, ' ')} budget`,
        });
      }
    } else {
      const season = seasonalPlans[name];
      if (season) {
        updateSeasonalPlan(name, { 
          budget: season.budget, 
          saved: season.saved + amount,
          purpose: season.purpose
        });
        
        toast({
          title: "Amount Added",
          description: `₹${amount} added to your ${name} budget`,
        });
      }
    }
  };
  
  return (
    <div className="wv-container py-6">
      <h2 className="text-2xl font-bold mb-2">Festival & Season Planning</h2>
      <p className="text-muted-foreground mb-6">
        Plan ahead for festivals and seasonal expenses to avoid financial strain
      </p>

      <Tabs defaultValue="festivals" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 max-w-xs mb-6">
          <TabsTrigger value="festivals">Festivals</TabsTrigger>
          <TabsTrigger value="seasons">Seasons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="festivals">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Your Festival Plans</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => setIsAddingFestival(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Festival
                </Button>
              </div>
              
              <div className="space-y-4">
                {Object.entries(festivalPlans).length > 0 ? (
                  Object.entries(festivalPlans).map(([key, plan]) => {
                    const festival = festivals.find(f => f.name.toLowerCase() === key.replace(/_/g, ' '));
                    const progress = (plan.saved / plan.budget) * 100;
                    
                    return (
                      <Card key={key} className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          <div className="h-48 md:h-auto w-full bg-muted">
                            {festival?.imageUrl && (
                              <img 
                                src={festival.imageUrl} 
                                alt={festival.name} 
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="md:col-span-2 p-4">
                            <h4 className="font-semibold text-lg">
                              {key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                            </h4>
                            
                            {festival && (
                              <>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                  <CalendarDays className="h-4 w-4" />
                                  <span>{formatDate(festival.date)}</span>
                                  <span className="px-1.5 py-0.5 rounded-full text-xs bg-wealthveda-indigo/10 text-wealthveda-indigo">
                                    {getTimeUntil(festival.date)}
                                  </span>
                                </div>
                                
                                <p className="text-sm mt-2">{festival.description}</p>
                              </>
                            )}
                            
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Savings Progress</span>
                                <span>₹{plan.saved.toLocaleString()} of ₹{plan.budget.toLocaleString()}</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                              
                              <div className="flex items-center gap-2 mt-4">
                                <Input 
                                  type="number"
                                  placeholder="Amount"
                                  className="max-w-[120px]"
                                  onChange={(e) => setNewBudget({
                                    ...newBudget,
                                    saved: parseInt(e.target.value) || 0
                                  })}
                                />
                                <Button 
                                  size="sm"
                                  onClick={() => handleAddToSavings('festival', key, newBudget.saved)}
                                >
                                  Add to Savings
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <Card className="p-6 flex flex-col items-center text-center">
                    <Gift className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="font-semibold text-lg">No Festival Plans Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start planning for upcoming festivals to manage your expenses better
                    </p>
                    <Button onClick={() => setIsAddingFestival(true)}>
                      Add Your First Festival
                    </Button>
                  </Card>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Upcoming Festivals</h3>
              <div className="space-y-3">
                {festivals.map((festival, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-28 relative">
                      <img 
                        src={festival.imageUrl} 
                        alt={festival.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <h4 className="font-semibold text-white">{festival.name}</h4>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          <span>{formatDate(festival.date)}</span>
                        </div>
                        <span className="text-xs bg-wealthveda-indigo/10 text-wealthveda-indigo px-2 py-0.5 rounded-full">
                          {getTimeUntil(festival.date)}
                        </span>
                      </div>
                      
                      {!Object.keys(festivalPlans).some(key => 
                        key.toLowerCase().replace(/_/g, ' ') === festival.name.toLowerCase()
                      ) && (
                        <Button 
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => {
                            setNewBudget({
                              name: festival.name,
                              budget: 0,
                              saved: 0
                            });
                            setIsAddingFestival(true);
                          }}
                        >
                          Create Budget
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {isPremiumOrPro && (
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Festival Tips</CardTitle>
                    <CardDescription>Financial advice for festivals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-wealthveda-teal mt-1" />
                      <p className="text-sm">Start saving at least 3-4 months before major festivals</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-wealthveda-teal mt-1" />
                      <p className="text-sm">Set aside 5-10% of monthly income for festival expenses</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-wealthveda-teal mt-1" />
                      <p className="text-sm">Look for pre-festival sales to save on gifts and decorations</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="seasons">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Your Seasonal Plans</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => setIsAddingSeason(true)}
                  disabled={!isPremiumOrPro}
                >
                  <Plus className="h-4 w-4" />
                  Add Season
                </Button>
              </div>
              
              {isPremiumOrPro ? (
                <div className="space-y-4">
                  {Object.entries(seasonalPlans).length > 0 ? (
                    Object.entries(seasonalPlans).map(([key, plan]) => {
                      const season = seasons.find(s => s.name.toLowerCase() === key);
                      const progress = (plan.saved / plan.budget) * 100;
                      
                      return (
                        <Card key={key} className="overflow-hidden">
                          <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="h-48 md:h-auto w-full bg-muted">
                              {season?.imageUrl && (
                                <img 
                                  src={season.imageUrl} 
                                  alt={season.name} 
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="md:col-span-2 p-4">
                              <h4 className="font-semibold text-lg">{season?.name || key}</h4>
                              
                              {season && (
                                <>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <CalendarDays className="h-4 w-4" />
                                    <span>{season.months}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-sm mt-1">
                                    <span className="font-medium">Purpose:</span>
                                    <span>{plan.purpose}</span>
                                  </div>
                                  
                                  <p className="text-sm mt-2">{season.description}</p>
                                </>
                              )}
                              
                              <div className="mt-4">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Savings Progress</span>
                                  <span>₹{plan.saved.toLocaleString()} of ₹{plan.budget.toLocaleString()}</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                                
                                <div className="flex items-center gap-2 mt-4">
                                  <Input 
                                    type="number"
                                    placeholder="Amount"
                                    className="max-w-[120px]"
                                    onChange={(e) => setNewBudget({
                                      ...newBudget,
                                      saved: parseInt(e.target.value) || 0
                                    })}
                                  />
                                  <Button 
                                    size="sm"
                                    onClick={() => handleAddToSavings('season', key, newBudget.saved)}
                                  >
                                    Add to Savings
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })
                  ) : (
                    <Card className="p-6 flex flex-col items-center text-center">
                      <CalendarDays className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="font-semibold text-lg">No Seasonal Plans Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Plan for seasonal expenses like vacations, home maintenance, and more
                      </p>
                      <Button onClick={() => setIsAddingSeason(true)}>
                        Add Your First Season
                      </Button>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="p-6 flex flex-col items-center text-center">
                  <BadgeIndianRupee className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="font-semibold text-lg">Premium Feature</h3>
                  <p className="text-muted-foreground mb-4">
                    Upgrade to Pro or Premium to access seasonal planning features
                  </p>
                  <Button 
                    className="bg-wealthveda-teal hover:bg-wealthveda-teal/90"
                    onClick={() => {
                      toast({
                        title: "Premium Feature",
                        description: "Please upgrade your subscription to access seasonal planning",
                      });
                    }}
                  >
                    Upgrade Now
                  </Button>
                </Card>
              )}
            </div>
            
            {isPremiumOrPro && (
              <div>
                <h3 className="font-semibold mb-4">Seasonal Planning</h3>
                <div className="space-y-3">
                  {seasons.map((season, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-28 relative">
                        <img 
                          src={season.imageUrl} 
                          alt={season.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                          <h4 className="font-semibold text-white">{season.name}</h4>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          <span>{season.months}</span>
                        </div>
                        <p className="text-xs line-clamp-2">{season.description}</p>
                        
                        {!Object.keys(seasonalPlans).some(key => key === season.name.toLowerCase()) && (
                          <Button 
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => {
                              setNewBudget({
                                name: season.name,
                                budget: 0,
                                saved: 0
                              });
                              setIsAddingSeason(true);
                            }}
                          >
                            Create Budget
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Seasonal Tips</CardTitle>
                    <CardDescription>Financial advice for seasonal planning</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-wealthveda-teal mt-1" />
                      <p className="text-sm">Book summer vacations 3-4 months in advance for better deals</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-wealthveda-teal mt-1" />
                      <p className="text-sm">Allocate funds for monsoon home maintenance to avoid costly repairs</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-wealthveda-teal mt-1" />
                      <p className="text-sm">Create a winter fund for heating costs and seasonal shopping</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add Festival Dialog */}
      <Dialog open={isAddingFestival} onOpenChange={setIsAddingFestival}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Festival Budget</DialogTitle>
            <DialogDescription>
              Create a savings plan for an upcoming festival
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Festival</Label>
              <div className="grid grid-cols-2 gap-2">
                {festivals.map((festival, index) => (
                  <div
                    key={index}
                    className={`p-2 border rounded-md cursor-pointer transition-colors ${
                      newBudget.name === festival.name 
                        ? 'border-wealthveda-indigo bg-wealthveda-indigo/5' 
                        : 'border-border hover:border-wealthveda-indigo/50'
                    }`}
                    onClick={() => setNewBudget({...newBudget, name: festival.name})}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                        <img 
                          src={festival.imageUrl} 
                          alt={festival.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{festival.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Amount (₹)</Label>
              <Input 
                id="budget"
                type="number" 
                value={newBudget.budget || ''} 
                onChange={(e) => setNewBudget({...newBudget, budget: parseInt(e.target.value) || 0})}
                placeholder="Enter budget amount"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="saved">Already Saved (₹)</Label>
              <Input 
                id="saved"
                type="number" 
                value={newBudget.saved || ''} 
                onChange={(e) => setNewBudget({...newBudget, saved: parseInt(e.target.value) || 0})}
                placeholder="Amount already saved (optional)"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingFestival(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFestivalPlan}>
              Create Budget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Season Dialog */}
      <Dialog open={isAddingSeason} onOpenChange={setIsAddingSeason}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Seasonal Budget</DialogTitle>
            <DialogDescription>
              Create a savings plan for seasonal expenses
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Season</Label>
              <div className="grid grid-cols-1 gap-2">
                {seasons.map((season, index) => (
                  <div
                    key={index}
                    className={`p-2 border rounded-md cursor-pointer transition-colors ${
                      newBudget.name === season.name 
                        ? 'border-wealthveda-indigo bg-wealthveda-indigo/5' 
                        : 'border-border hover:border-wealthveda-indigo/50'
                    }`}
                    onClick={() => setNewBudget({...newBudget, name: season.name})}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                        <img 
                          src={season.imageUrl} 
                          alt={season.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium">{season.name}</span>
                        <p className="text-xs text-muted-foreground">{season.months}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Amount (₹)</Label>
              <Input 
                id="budget"
                type="number" 
                value={newBudget.budget || ''} 
                onChange={(e) => setNewBudget({...newBudget, budget: parseInt(e.target.value) || 0})}
                placeholder="Enter budget amount"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="saved">Already Saved (₹)</Label>
              <Input 
                id="saved"
                type="number" 
                value={newBudget.saved || ''} 
                onChange={(e) => setNewBudget({...newBudget, saved: parseInt(e.target.value) || 0})}
                placeholder="Amount already saved (optional)"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingSeason(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSeasonalPlan}>
              Create Budget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FestivalPlanning;
