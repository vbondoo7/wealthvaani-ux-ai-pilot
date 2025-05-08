
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import useUserStore from '@/lib/userStore';
import { Nudge } from '@/lib/types';
import { Calendar, TrendingUp, Bell, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sampleNudges } from "@/lib/mockData";

const SavedNudges: React.FC = () => {
  const { currentUser, saveNudge, removeSavedNudge, toggleAutoAction } = useUserStore();
  const [availableNudges] = useState<Nudge[]>(
    sampleNudges.map(nudge => ({ ...nudge, saved: false, autoActionEnabled: false }))
  );
  const { toast } = useToast();
  
  const handleSaveNudge = (nudge: Nudge) => {
    saveNudge(nudge);
    toast({
      title: "Nudge saved",
      description: "This nudge has been added to your saved list.",
      variant: "default",
    });
  };
  
  const handleRemoveNudge = (nudgeId: string) => {
    removeSavedNudge(nudgeId);
    toast({
      title: "Nudge removed",
      description: "This nudge has been removed from your saved list.",
      variant: "default",
    });
  };
  
  const handleToggleAutoAction = (nudgeId: string, enabled: boolean) => {
    toggleAutoAction(nudgeId, enabled);
    toast({
      title: `Auto-action ${enabled ? 'enabled' : 'disabled'}`,
      description: enabled 
        ? "WealthVani will automatically execute this action for you."
        : "WealthVani will ask for your confirmation before taking action.",
      variant: "default",
    });
  };
  
  const getNudgeIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Calendar className="h-4 w-4" />;
      case 'opportunity':
        return <TrendingUp className="h-4 w-4" />;
      case 'risk':
        return <Bell className="h-4 w-4" />;
      case 'tip':
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  const getNudgeStyles = (type: string) => {
    switch (type) {
      case 'reminder':
        return {
          bg: 'bg-wealthveda-saffron/10',
          text: 'text-wealthveda-saffron'
        };
      case 'opportunity':
        return {
          bg: 'bg-wealthveda-teal/10',
          text: 'text-wealthveda-teal'
        };
      case 'risk':
        return {
          bg: 'bg-destructive/10',
          text: 'text-destructive'
        };
      case 'tip':
        return {
          bg: 'bg-wealthveda-indigo/10',
          text: 'text-wealthveda-indigo'
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-muted-foreground'
        };
    }
  };

  if (!currentUser) return null;
  
  const savedNudges = currentUser.savedNudges || [];
  
  return (
    <div className="wv-container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Saved Nudges</h1>
      </div>
      
      {savedNudges.length > 0 ? (
        <div className="space-y-4">
          {savedNudges.map((nudge) => {
            const { bg, text } = getNudgeStyles(nudge.type);
            
            return (
              <Card key={nudge.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`min-w-8 h-8 rounded-full flex-center ${bg}`}>
                      <div className={text}>{getNudgeIcon(nudge.type)}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{nudge.message}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${bg} ${text}`}>
                          {nudge.priority.charAt(0).toUpperCase() + nudge.priority.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex items-center mb-3 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(nudge.schedule).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        {nudge.action && (
                          <Button 
                            size="sm"
                            className="text-xs h-8 rounded-lg"
                          >
                            {nudge.action}
                          </Button>
                        )}
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`auto-${nudge.id}`}
                              checked={nudge.autoActionEnabled}
                              onCheckedChange={(checked) => handleToggleAutoAction(nudge.id, checked)}
                            />
                            <Label htmlFor={`auto-${nudge.id}`} className="text-xs">Auto-action</Label>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs"
                            onClick={() => handleRemoveNudge(nudge.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">No Saved Nudges</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p className="mb-4">You haven't saved any nudges yet.</p>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Available Nudges</h2>
        <div className="space-y-4">
          {availableNudges
            .filter(nudge => !savedNudges.some(saved => saved.id === nudge.id))
            .slice(0, 3)
            .map((nudge) => {
              const { bg, text } = getNudgeStyles(nudge.type);
              
              return (
                <Card key={nudge.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`min-w-8 h-8 rounded-full flex-center ${bg}`}>
                        <div className={text}>{getNudgeIcon(nudge.type)}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{nudge.message}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${bg} ${text}`}>
                            {nudge.priority.charAt(0).toUpperCase() + nudge.priority.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-3 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(nudge.schedule).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          {nudge.action && (
                            <Button 
                              size="sm"
                              className="text-xs h-8 rounded-lg"
                            >
                              {nudge.action}
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs"
                            onClick={() => handleSaveNudge(nudge)}
                          >
                            Save Nudge
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SavedNudges;
