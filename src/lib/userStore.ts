
import { create } from 'zustand';
import { 
  User, Goal, Nudge, Transaction, PersonalDetails, FinancialDetails 
} from './types';
import { sampleGoals, sampleNudges, sampleTransactions, generateId, sampleSubscriptions } from './mockData';
import { predefinedUsers } from './config';

interface UserStore {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Authentication methods
  register: (email: string, password: string, name: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Profile methods
  updatePersonalDetails: (details: PersonalDetails) => void;
  updateFinancialDetails: (details: FinancialDetails) => void;
  
  // Goal methods
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goalId: string) => void;
  
  // Nudge methods
  saveNudge: (nudge: Nudge) => void;
  removeSavedNudge: (nudgeId: string) => void;
  toggleAutoAction: (nudgeId: string, enabled: boolean) => void;
  
  // Subscription
  upgradePlan: (plan: 'Pro' | 'Premium') => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  // Initialize with predefined users
  users: [...predefinedUsers],
  currentUser: null,
  isAuthenticated: false,
  
  register: (email, password, name) => {
    const { users } = get();
    console.log('Registering new user:', { name, email });
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      console.log('User already exists with email:', email);
      return false;
    }
    
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      profileCreated: false,
      goals: [],
      savedNudges: [],
      subscription: sampleSubscriptions.Basic,
      transactions: []
    };
    
    console.log('Created new user:', newUser);
    
    set(state => ({
      users: [...state.users, newUser],
      currentUser: newUser,
      isAuthenticated: true
    }));
    
    console.log('Updated store with new user, auth state:', true);
    return true;
  },
  
  login: (email, password) => {
    const { users } = get();
    const user = users.find(u => u.email === email && u.password === password);
    
    console.log('Login attempt for:', email, 'Found user:', !!user);
    
    if (user) {
      set({
        currentUser: user,
        isAuthenticated: true
      });
      console.log('Login successful, auth state:', true);
      return true;
    }
    
    console.log('Login failed');
    return false;
  },
  
  logout: () => {
    console.log('Logging out user');
    set({
      currentUser: null,
      isAuthenticated: false
    });
    console.log('User logged out, auth state:', false);
  },
  
  updatePersonalDetails: (details) => {
    set(state => {
      if (!state.currentUser) {
        console.log('Cannot update personal details: No current user');
        return state;
      }
      
      const updatedUser = {
        ...state.currentUser,
        personalDetails: details,
        profileCreated: true
      };
      
      console.log('Updated personal details for user:', updatedUser.id);
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  updateFinancialDetails: (details) => {
    set(state => {
      if (!state.currentUser) {
        console.log('Cannot update financial details: No current user');
        return state;
      }
      
      // If this is the first time setting financial details, also add sample goals and transactions
      const isFirstUpdate = !state.currentUser.financialDetails;
      
      const updatedUser = {
        ...state.currentUser,
        financialDetails: details,
        profileCreated: true,
        goals: isFirstUpdate ? [...sampleGoals] : state.currentUser.goals,
        transactions: isFirstUpdate ? [...sampleTransactions] : state.currentUser.transactions
      };
      
      console.log('Updated financial details for user:', updatedUser.id, 'First update:', isFirstUpdate);
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  addGoal: (goalData) => {
    const newGoal: Goal = {
      ...goalData,
      id: generateId(),
      progress: 0,
      savedAmount: 0
    };
    
    set(state => {
      if (!state.currentUser) {
        console.log('Cannot add goal: No current user');
        return state;
      }
      
      const updatedUser = {
        ...state.currentUser,
        goals: [...state.currentUser.goals, newGoal]
      };
      
      console.log('Added new goal for user:', updatedUser.id);
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  updateGoal: (goal) => {
    set(state => {
      if (!state.currentUser) {
        console.log('Cannot update goal: No current user');
        return state;
      }
      
      const updatedUser = {
        ...state.currentUser,
        goals: state.currentUser.goals.map(g => g.id === goal.id ? goal : g)
      };
      
      console.log('Updated goal for user:', updatedUser.id);
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  deleteGoal: (goalId) => {
    set(state => {
      if (!state.currentUser) {
        console.log('Cannot delete goal: No current user');
        return state;
      }
      
      const updatedUser = {
        ...state.currentUser,
        goals: state.currentUser.goals.filter(g => g.id !== goalId)
      };
      
      console.log('Deleted goal for user:', updatedUser.id);
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  saveNudge: (nudge) => {
    set(state => {
      if (!state.currentUser) {
        console.log('Cannot save nudge: No current user');
        return state;
      }
      
      const updatedNudge = { ...nudge, saved: true };
      
      const updatedUser = {
        ...state.currentUser,
        savedNudges: [...state.currentUser.savedNudges, updatedNudge]
      };
      
      console.log('Saved nudge for user:', updatedUser.id);
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  removeSavedNudge: (nudgeId) => {
    set(state => {
      if (!state.currentUser) {
        console.log('Cannot remove nudge: No current user');
        return state;
      }
      
      const updatedUser = {
        ...state.currentUser,
        savedNudges: state.currentUser.savedNudges.filter(n => n.id !== nudgeId)
      };
      
      console.log('Removed saved nudge for user:', updatedUser.id);
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  toggleAutoAction: (nudgeId, enabled) => {
    set(state => {
      if (!state.currentUser) {
        console.log('Cannot toggle auto action: No current user');
        return state;
      }
      
      const updatedUser = {
        ...state.currentUser,
        savedNudges: state.currentUser.savedNudges.map(n => 
          n.id === nudgeId ? { ...n, autoActionEnabled: enabled } : n
        )
      };
      
      console.log('Toggled auto action for nudge for user:', updatedUser.id);
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  upgradePlan: (plan) => {
    set(state => {
      if (!state.currentUser) {
        console.log('Cannot upgrade plan: No current user');
        return state;
      }
      
      const updatedUser = {
        ...state.currentUser,
        subscription: sampleSubscriptions[plan]
      };
      
      console.log('Upgraded plan for user:', updatedUser.id, 'to', plan);
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  }
}));

export default useUserStore;
