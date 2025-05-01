
import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  BellOff, 
  Info,
  ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  category: 'essential' | 'financial' | 'goals';
}

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "bills",
      title: "Bill Payment Reminders",
      description: "Get notified before bills are due",
      icon: <Clock className="h-4 w-4" />,
      enabled: true,
      category: 'essential'
    },
    {
      id: "unusual",
      title: "Unusual Transactions",
      description: "Alerts for suspicious activity",
      icon: <Info className="h-4 w-4" />,
      enabled: true,
      category: 'essential'
    },
    {
      id: "lowBalance",
      title: "Low Balance Alerts",
      description: "When accounts drop below threshold",
      icon: <ArrowDown className="h-4 w-4" />,
      enabled: true,
      category: 'essential'
    },
    {
      id: "spending",
      title: "Budget Alerts",
      description: "When you're approaching budget limits",
      icon: <DollarSign className="h-4 w-4" />,
      enabled: true,
      category: 'financial'
    },
    {
      id: "investment",
      title: "Investment Opportunities",
      description: "Personalized investment suggestions",
      icon: <TrendingUp className="h-4 w-4" />,
      enabled: false,
      category: 'financial'
    },
    {
      id: "goalProgress",
      title: "Goal Progress Updates",
      description: "Weekly updates on your financial goals",
      icon: <TrendingUp className="h-4 w-4" />,
      enabled: true,
      category: 'goals'
    },
    {
      id: "goalRisk",
      title: "Goal Risk Alerts",
      description: "When your goals are at risk",
      icon: <Info className="h-4 w-4" />,
      enabled: true,
      category: 'goals'
    }
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const getNotificationsByCategory = (category: string) => {
    return notifications.filter(notification => notification.category === category);
  };

  return (
    <div className="wv-container">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          Control how and when WealthVeda sends you alerts
        </p>
      </div>
      
      <div className="flex-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-wealthveda-indigo" />
          <h2 className="font-medium">All Notifications</h2>
        </div>
        <Switch 
          checked={notifications.every(n => n.enabled)}
          onCheckedChange={() => {
            const allEnabled = notifications.every(n => n.enabled);
            setNotifications(prev => 
              prev.map(notification => ({
                ...notification,
                enabled: !allEnabled
              }))
            );
          }}
        />
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">ESSENTIAL ALERTS</h3>
          <div className="space-y-4">
            {getNotificationsByCategory('essential').map(notification => (
              <div key={notification.id} className="flex-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex-center",
                    notification.enabled
                      ? "bg-wealthveda-teal/10 text-wealthveda-teal"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {notification.enabled ? notification.icon : <BellOff className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{notification.title}</div>
                    <div className="text-xs text-muted-foreground">{notification.description}</div>
                  </div>
                </div>
                <Switch 
                  checked={notification.enabled}
                  onCheckedChange={() => toggleNotification(notification.id)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">FINANCIAL INSIGHTS</h3>
          <div className="space-y-4">
            {getNotificationsByCategory('financial').map(notification => (
              <div key={notification.id} className="flex-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex-center",
                    notification.enabled
                      ? "bg-wealthveda-indigo/10 text-wealthveda-indigo"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {notification.enabled ? notification.icon : <BellOff className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{notification.title}</div>
                    <div className="text-xs text-muted-foreground">{notification.description}</div>
                  </div>
                </div>
                <Switch 
                  checked={notification.enabled}
                  onCheckedChange={() => toggleNotification(notification.id)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">GOAL TRACKING</h3>
          <div className="space-y-4">
            {getNotificationsByCategory('goals').map(notification => (
              <div key={notification.id} className="flex-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex-center",
                    notification.enabled
                      ? "bg-wealthveda-saffron/10 text-wealthveda-saffron"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {notification.enabled ? notification.icon : <BellOff className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{notification.title}</div>
                    <div className="text-xs text-muted-foreground">{notification.description}</div>
                  </div>
                </div>
                <Switch 
                  checked={notification.enabled}
                  onCheckedChange={() => toggleNotification(notification.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full mt-8 bg-wealthveda-teal hover:bg-wealthveda-teal/90"
      >
        Save Preferences
      </Button>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        You will still receive critical security alerts regardless of these settings
      </p>
    </div>
  );
};

export default NotificationSettings;
