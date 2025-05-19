
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import useUserStore from '@/lib/userStore';
import { FestivalPlan, SeasonalPlan } from '@/lib/types';
import { Progress } from "@/components/ui/progress";
import { PlusIcon, Trash2Icon, SunIcon, CloudRainIcon, UmbrellaIcon, SnowflakeIcon } from "lucide-react";
import { formatCurrency } from '@/lib/utils';

interface FestivalItem {
  name: string;
  cost: number;
}

const festivals = [
  { id: 'diwali', name: 'Diwali', description: 'Festival of Lights', date: '2025-11-12', icon: '🪔' },
  { id: 'holi', name: 'Holi', description: 'Festival of Colors', date: '2026-03-10', icon: '🎨' },
  { id: 'rakhi', name: 'Raksha Bandhan', description: 'Celebration of Siblings', date: '2025-08-19', icon: '🧶' },
  { id: 'eid', name: 'Eid', description: 'Festival of Breaking the Fast', date: '2025-05-23', icon: '🌙' },
];

const seasons = [
  { id: 'summer', name: 'Summer', description: 'April - July', icon: <SunIcon className="h-4 w-4" /> },
  { id: 'monsoon', name: 'Monsoon', description: 'July - September', icon: <CloudRainIcon className="h-4 w-4" /> },
  { id: 'autumn', name: 'Autumn', description: 'October - November', icon: <UmbrellaIcon className="h-4 w-4" /> },
  { id: 'winter', name: 'Winter', description: 'December - February', icon: <SnowflakeIcon className="h-4 w-4" /> },
];

const FestivalPlanning: React.FC = () => {
  const { currentUser, updateFestivalPlan, updateSeasonalPlan } = useUserStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('festivals');
  
  const festivalPlans = currentUser?.financialDetails?.festivalPlanning || {};
  const seasonalPlans = currentUser?.financialDetails?.seasonalPlanning || {};
  
  // Active festival/season states
  const [activeFestival, setActiveFestival] = useState<string>('');
  const [activeSeason, setActiveSeason] = useState<string>('');
  
  // Festival planning state
  const [festivalBudget, setFestivalBudget] = useState<number>(0);
  const [festivalItems, setFestivalItems] = useState<FestivalItem[]>([]);
  const [newFestivalItem, setNewFestivalItem] = useState<FestivalItem>({ name: '', cost: 0 });
  const [festivalSaved, setFestivalSaved] = useState<number>(0);
  const [festivalNotes, setFestivalNotes] = useState<string>('');
  
  // Season planning state
  const [seasonBudget, setSeasonBudget] = useState<number>(0);
  const [seasonItems, setSeasonItems] = useState<FestivalItem[]>([]);
  const [newSeasonItem, setNewSeasonItem] = useState<FestivalItem>({ name: '', cost: 0 });
  const [seasonSaved, setSeasonSaved] = useState<number>(0);
  const [seasonNotes, setSeasonNotes] = useState<string>('');
  const [seasonPurpose, setSeasonPurpose] = useState<string>('');
  
  // Load festival data when active festival changes
  useEffect(() => {
    if (!activeFestival) return;
    
    const plan = festivalPlans[activeFestival];
    if (plan) {
      setFestivalBudget(plan.budget || 0);
      setFestivalItems(plan.items || []);
      setFestivalSaved(plan.saved || 0); // Using number for saved amount
      setFestivalNotes(plan.notes || '');
    } else {
      // Default values for new festival plan
      setFestivalBudget(5000);
      setFestivalItems([]);
      setFestivalSaved(0);
      setFestivalNotes('');
    }
  }, [activeFestival, festivalPlans]);
  
  // Load season data when active season changes
  useEffect(() => {
    if (!activeSeason) return;
    
    const plan = seasonalPlans[activeSeason];
    if (plan) {
      setSeasonBudget(plan.budget || 0);
      setSeasonItems(plan.items || []);
      setSeasonSaved(plan.saved || 0); // Using number for saved amount
      setSeasonNotes(plan.notes || '');
      setSeasonPurpose(plan.purpose || '');
    } else {
      // Default values for new season plan
      setSeasonBudget(10000);
      setSeasonItems([]);
      setSeasonSaved(0);
      setSeasonNotes('');
      setSeasonPurpose('');
    }
  }, [activeSeason, seasonalPlans]);
  
  // Set defaults on component mount
  useEffect(() => {
    if (festivals.length > 0 && activeFestival === '') {
      setActiveFestival(festivals[0].id);
    }
    if (seasons.length > 0 && activeSeason === '') {
      setActiveSeason(seasons[0].id);
    }
  }, []);
  
  const handleAddFestivalItem = () => {
    if (newFestivalItem.name && newFestivalItem.cost > 0) {
      setFestivalItems([...festivalItems, newFestivalItem]);
      setNewFestivalItem({ name: '', cost: 0 });
    }
  };
  
  const handleRemoveFestivalItem = (index: number) => {
    const updatedItems = [...festivalItems];
    updatedItems.splice(index, 1);
    setFestivalItems(updatedItems);
  };
  
  const handleAddSeasonItem = () => {
    if (newSeasonItem.name && newSeasonItem.cost > 0) {
      setSeasonItems([...seasonItems, newSeasonItem]);
      setNewSeasonItem({ name: '', cost: 0 });
    }
  };
  
  const handleRemoveSeasonItem = (index: number) => {
    const updatedItems = [...seasonItems];
    updatedItems.splice(index, 1);
    setSeasonItems(updatedItems);
  };
  
  const handleSaveFestivalPlan = () => {
    if (!activeFestival) return;
    
    const plan: FestivalPlan = {
      budget: festivalBudget,
      items: festivalItems,
      saved: festivalSaved, // Number value
      notes: festivalNotes
    };
    
    updateFestivalPlan(activeFestival, plan);
    
    toast({
      title: `${getActiveFestivalName()} plan saved`,
      description: `Your budget of ₹${festivalBudget.toLocaleString()} has been saved.`,
      variant: "default",
    });
  };
  
  const handleSaveSeasonalPlan = () => {
    if (!activeSeason) return;
    
    const plan: SeasonalPlan = {
      budget: seasonBudget,
      items: seasonItems,
      saved: seasonSaved, // Number value
      notes: seasonNotes,
      purpose: seasonPurpose
    };
    
    updateSeasonalPlan(activeSeason, plan);
    
    toast({
      title: `${getActiveSeasonName()} plan saved`,
      description: `Your budget of ₹${seasonBudget.toLocaleString()} has been saved.`,
      variant: "default",
    });
  };
  
  const calculateFestivalProgress = () => {
    if (festivalBudget <= 0) return 0;
    const progress = (festivalSaved / festivalBudget) * 100;
    return Math.min(progress, 100);
  };
  
  const calculateSeasonProgress = () => {
    if (seasonBudget <= 0) return 0;
    const progress = (seasonSaved / seasonBudget) * 100;
    return Math.min(progress, 100);
  };
  
  const getActiveFestivalName = () => {
    const festival = festivals.find(f => f.id === activeFestival);
    return festival ? festival.name : '';
  };
  
  const getActiveSeasonName = () => {
    const season = seasons.find(s => s.id === activeSeason);
    return season ? season.name : '';
  };
  
  const getTotalCost = (items: FestivalItem[]) => {
    return items.reduce((total, item) => total + item.cost, 0);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Budget Planning</h1>
        <p className="text-muted-foreground">
          Plan your budget for festivals and seasons to avoid unexpected expenses.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="festivals">Festival Planning</TabsTrigger>
          <TabsTrigger value="seasons">Seasonal Planning</TabsTrigger>
        </TabsList>
        
        {/* Festival Planning Tab */}
        <TabsContent value="festivals" className="space-y-6">
          {/* Festival Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {festivals.map(festival => (
              <Card 
                key={festival.id}
                className={`cursor-pointer transition-all ${
                  activeFestival === festival.id ? 'ring-2 ring-royal-blue' : ''
                }`}
                onClick={() => setActiveFestival(festival.id)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="text-4xl">{festival.icon}</div>
                  <div>
                    <h3 className="font-medium">{festival.name}</h3>
                    <p className="text-sm text-muted-foreground">{festival.description}</p>
                    <p className="text-xs mt-1">Date: {festival.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Active Festival Planning */}
          {activeFestival && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {getActiveFestivalName()} Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="festival-budget">Budget (₹)</Label>
                      <Input
                        id="festival-budget"
                        type="number"
                        value={festivalBudget}
                        onChange={(e) => setFestivalBudget(Number(e.target.value))}
                        min={0}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="festival-saved">Saved So Far (₹)</Label>
                      <Input
                        id="festival-saved"
                        type="number"
                        value={festivalSaved}
                        onChange={(e) => setFestivalSaved(Number(e.target.value))}
                        min={0}
                        max={festivalBudget}
                      />
                      <div className="mt-2">
                        <Progress value={calculateFestivalProgress()} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {`${formatCurrency(festivalSaved)} of ${formatCurrency(festivalBudget)} (${Math.round(calculateFestivalProgress())}%)`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Planned Expenses</Label>
                        <span className="text-sm">
                          Total: {formatCurrency(getTotalCost(festivalItems))}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="col-span-2">
                          <Input
                            placeholder="Item name"
                            value={newFestivalItem.name}
                            onChange={(e) => setNewFestivalItem({ ...newFestivalItem, name: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Cost"
                            value={newFestivalItem.cost || ''}
                            onChange={(e) => setNewFestivalItem({ ...newFestivalItem, cost: Number(e.target.value) })}
                            min={0}
                          />
                          <Button 
                            size="icon" 
                            className="shrink-0" 
                            onClick={handleAddFestivalItem}
                            disabled={!newFestivalItem.name || newFestivalItem.cost <= 0}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {festivalItems.length > 0 ? (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {festivalItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                              <span className="font-medium">{item.name}</span>
                              <div className="flex items-center gap-2">
                                <span>₹{item.cost.toLocaleString()}</span>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-6 w-6" 
                                  onClick={() => handleRemoveFestivalItem(index)}
                                >
                                  <Trash2Icon className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-4 text-muted-foreground">
                          <p>No expenses added yet.</p>
                          <p className="text-sm">Add items to plan your budget.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="festival-notes">Notes</Label>
                      <textarea
                        id="festival-notes"
                        className="w-full h-24 p-2 border rounded-md resize-none"
                        value={festivalNotes}
                        onChange={(e) => setFestivalNotes(e.target.value)}
                        placeholder="Add any notes about your festival planning..."
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleSaveFestivalPlan}
                    >
                      Save Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{getActiveFestivalName()} Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Budget Status</h3>
                      <div className="text-2xl font-bold">{formatCurrency(festivalBudget)}</div>
                      <Progress value={calculateFestivalProgress()} className="h-2 mt-2" />
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Remaining to Save</h3>
                      <div className="text-2xl font-bold">
                        {formatCurrency(Math.max(0, festivalBudget - festivalSaved))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Saved so far: {formatCurrency(festivalSaved)}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Budget vs Expenses</h3>
                      <div className={`text-xl font-bold ${
                        getTotalCost(festivalItems) > festivalBudget ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCurrency(festivalBudget - getTotalCost(festivalItems))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getTotalCost(festivalItems) > festivalBudget ? 
                          'Your planned expenses exceed your budget' : 
                          'Your budget covers all planned expenses'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        {/* Seasonal Planning Tab */}
        <TabsContent value="seasons" className="space-y-6">
          {/* Season Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasons.map(season => (
              <Card 
                key={season.id}
                className={`cursor-pointer transition-all ${
                  activeSeason === season.id ? 'ring-2 ring-royal-blue' : ''
                }`}
                onClick={() => setActiveSeason(season.id)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-9 w-9 bg-muted rounded-full flex items-center justify-center">
                    {season.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{season.name}</h3>
                    <p className="text-sm text-muted-foreground">{season.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Active Season Planning */}
          {activeSeason && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {getActiveSeasonName()} Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="season-purpose">Purpose</Label>
                      <Input
                        id="season-purpose"
                        value={seasonPurpose}
                        onChange={(e) => setSeasonPurpose(e.target.value)}
                        placeholder="e.g., Summer Vacation, Back to School, Winter Clothes"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="season-budget">Budget (₹)</Label>
                      <Input
                        id="season-budget"
                        type="number"
                        value={seasonBudget}
                        onChange={(e) => setSeasonBudget(Number(e.target.value))}
                        min={0}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="season-saved">Saved So Far (₹)</Label>
                      <Input
                        id="season-saved"
                        type="number"
                        value={seasonSaved}
                        onChange={(e) => setSeasonSaved(Number(e.target.value))}
                        min={0}
                        max={seasonBudget}
                      />
                      <div className="mt-2">
                        <Progress value={calculateSeasonProgress()} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {`${formatCurrency(seasonSaved)} of ${formatCurrency(seasonBudget)} (${Math.round(calculateSeasonProgress())}%)`}
                        </p>
                      </div>
                    </div>
                    
                    {/* Season items entry and list */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Planned Expenses</Label>
                        <span className="text-sm">
                          Total: {formatCurrency(getTotalCost(seasonItems))}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="col-span-2">
                          <Input
                            placeholder="Item name"
                            value={newSeasonItem.name}
                            onChange={(e) => setNewSeasonItem({ ...newSeasonItem, name: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Cost"
                            value={newSeasonItem.cost || ''}
                            onChange={(e) => setNewSeasonItem({ ...newSeasonItem, cost: Number(e.target.value) })}
                            min={0}
                          />
                          <Button 
                            size="icon" 
                            className="shrink-0" 
                            onClick={handleAddSeasonItem}
                            disabled={!newSeasonItem.name || newSeasonItem.cost <= 0}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {seasonItems.length > 0 ? (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {seasonItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                              <span className="font-medium">{item.name}</span>
                              <div className="flex items-center gap-2">
                                <span>₹{item.cost.toLocaleString()}</span>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-6 w-6" 
                                  onClick={() => handleRemoveSeasonItem(index)}
                                >
                                  <Trash2Icon className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-4 text-muted-foreground">
                          <p>No expenses added yet.</p>
                          <p className="text-sm">Add items to plan your seasonal budget.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="season-notes">Notes</Label>
                      <textarea
                        id="season-notes"
                        className="w-full h-24 p-2 border rounded-md resize-none"
                        value={seasonNotes}
                        onChange={(e) => setSeasonNotes(e.target.value)}
                        placeholder="Add any notes about your seasonal planning..."
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleSaveSeasonalPlan}
                    >
                      Save Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{getActiveSeasonName()} Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {seasonPurpose && (
                      <div>
                        <h3 className="text-sm font-medium mb-1">Purpose</h3>
                        <div className="text-base">{seasonPurpose}</div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Budget Status</h3>
                      <div className="text-2xl font-bold">{formatCurrency(seasonBudget)}</div>
                      <Progress value={calculateSeasonProgress()} className="h-2 mt-2" />
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Remaining to Save</h3>
                      <div className="text-2xl font-bold">
                        {formatCurrency(Math.max(0, seasonBudget - seasonSaved))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Saved so far: {formatCurrency(seasonSaved)}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Budget vs Expenses</h3>
                      <div className={`text-xl font-bold ${
                        getTotalCost(seasonItems) > seasonBudget ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCurrency(seasonBudget - getTotalCost(seasonItems))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getTotalCost(seasonItems) > seasonBudget ? 
                          'Your planned expenses exceed your budget' : 
                          'Your budget covers all planned expenses'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FestivalPlanning;
