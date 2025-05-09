
import { toast } from "sonner";
import useUserStore from "./userStore";
import { sampleNudges } from "./mockData";
import { Nudge } from "./types";

class NotificationService {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private shownNudges: Set<string> = new Set();
  private showingNotification = false;
  private lastShownTime = 0;
  private minIntervalBetweenNotifications = 20000; // 20 seconds minimum between notifications
  
  // Get random nudge
  private getRandomNudge(): Nudge | null {
    const user = useUserStore.getState().currentUser;
    if (!user) return null;
    
    // Filter out nudges that have been shown already, if possible
    let eligibleNudges = sampleNudges.filter(nudge => !this.shownNudges.has(nudge.id));
    
    // If all nudges have been shown, reset and start over
    if (eligibleNudges.length === 0) {
      console.log('All nudges have been shown, resetting');
      this.shownNudges.clear();
      eligibleNudges = sampleNudges;
    }
    
    // Get a random nudge from eligible ones
    const randomIndex = Math.floor(Math.random() * eligibleNudges.length);
    const selectedNudge = eligibleNudges[randomIndex];
    
    if (selectedNudge) {
      this.shownNudges.add(selectedNudge.id);
    }
    
    return selectedNudge;
  }
  
  // Show a notification
  private showNotification(): void {
    // Check if it's too soon since last notification
    const now = Date.now();
    if (now - this.lastShownTime < this.minIntervalBetweenNotifications) {
      console.log('Too soon for another notification, skipping');
      return;
    }
    
    this.lastShownTime = now;
    
    // Check if current user exists
    const user = useUserStore.getState().currentUser;
    if (!user || this.showingNotification) return;
    
    this.showingNotification = true;
    
    // Get random nudge
    const nudge = this.getRandomNudge();
    if (!nudge) {
      this.showingNotification = false;
      return;
    }
    
    // Show notification using toast
    toast(
      <div className="flex flex-col gap-1">
        <h4 className="font-medium">{this.getNudgeTitle(nudge)}</h4>
        <p className="text-sm text-muted-foreground">{nudge.message}</p>
      </div>,
      {
        duration: 8000,
        action: {
          label: "Save",
          onClick: () => this.saveNudge(nudge)
        },
        cancel: {
          label: "Dismiss",
          onClick: () => {}
        },
        onDismiss: () => {
          this.showingNotification = false;
        },
        onAutoClose: () => {
          this.showingNotification = false;
        }
      }
    );
  }
  
  // Get appropriate title based on nudge type
  private getNudgeTitle(nudge: Nudge): string {
    switch (nudge.type) {
      case 'reminder':
        return 'Reminder';
      case 'opportunity':
        return 'Investment Opportunity';
      case 'risk':
        return 'Risk Alert';
      case 'tip':
        return 'Financial Tip';
      default:
        return 'Notification';
    }
  }
  
  // Save a nudge to the user's saved nudges
  private saveNudge(nudge: Nudge): void {
    const { saveNudge } = useUserStore.getState();
    saveNudge(nudge);
    
    toast.success('Nudge saved to your collection');
  }
  
  // Start the notification service
  start(): void {
    if (this.intervalId) return;
    
    console.log('Starting notification service');
    
    // Show first notification after a short delay
    setTimeout(() => {
      this.showNotification();
    }, 5000); // 5 seconds initial delay
    
    // Set interval for future notifications (between 25-35 seconds)
    this.intervalId = setInterval(() => {
      const randomInterval = Math.floor(Math.random() * 10000) + 25000; // 25-35 seconds
      setTimeout(() => {
        this.showNotification();
      }, randomInterval);
    }, 60000); // Check every minute
  }
  
  // Stop the notification service
  stop(): void {
    if (this.intervalId) {
      console.log('Stopping notification service');
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Export a singleton instance
export const notificationService = new NotificationService();
