
import { create } from 'zustand';
import { 
  User, Goal, Nudge, Transaction, PersonalDetails, FinancialDetails 
} from './types';
import { sampleGoals, sampleNudges, sampleTransactions, generateId, sampleSubscriptions } from './mockData';

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
  users: [],
  currentUser: null,
  isAuthenticated: false,
  
  register: (email, password, name) => {
    const { users } = get();
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return false;
    }
    
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password, // In a real app, this would be hashed
      profileCreated: false,
      goals: [],
      savedNudges: [],
      subscription: sampleSubscriptions.Basic,
      transactions: []
    };
    
    set(state => ({
      users: [...state.users, newUser],
      currentUser: newUser,
      isAuthenticated: true
    }));
    
    return true;
  },
  
  login: (email, password) => {
    const { users } = get();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      set({
        currentUser: user,
        isAuthenticated: true
      });
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({
      currentUser: null,
      isAuthenticated: false
    });
  },
  
  updatePersonalDetails: (details) => {
    set(state => {
      if (!state.currentUser) return state;
      
      const updatedUser = {
        ...state.currentUser,
        personalDetails: details,
        profileCreated: true
      };
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  updateFinancialDetails: (details) => {
    set(state => {
      if (!state.currentUser) return state;
      
      // If this is the first time setting financial details, also add sample goals and transactions
      const isFirstUpdate = !state.currentUser.financialDetails;
      
      const updatedUser = {
        ...state.currentUser,
        financialDetails: details,
        profileCreated: true,
        goals: isFirstUpdate ? [...sampleGoals] : state.currentUser.goals,
        transactions: isFirstUpdate ? [...sampleTransactions] : state.currentUser.transactions
      };
      
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
      if (!state.currentUser) return state;
      
      const updatedUser = {
        ...state.currentUser,
        goals: [...state.currentUser.goals, newGoal]
      };
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  updateGoal: (goal) => {
    set(state => {
      if (!state.currentUser) return state;
      
      const updatedUser = {
        ...state.currentUser,
        goals: state.currentUser.goals.map(g => g.id === goal.id ? goal : g)
      };
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  deleteGoal: (goalId) => {
    set(state => {
      if (!state.currentUser) return state;
      
      const updatedUser = {
        ...state.currentUser,
        goals: state.currentUser.goals.filter(g => g.id !== goalId)
      };
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  saveNudge: (nudge) => {
    set(state => {
      if (!state.currentUser) return state;
      
      const updatedNudge = { ...nudge, saved: true };
      
      const updatedUser = {
        ...state.currentUser,
        savedNudges: [...state.currentUser.savedNudges, updatedNudge]
      };
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  removeSavedNudge: (nudgeId) => {
    set(state => {
      if (!state.currentUser) return state;
      
      const updatedUser = {
        ...state.currentUser,
        savedNudges: state.currentUser.savedNudges.filter(n => n.id !== nudgeId)
      };
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  toggleAutoAction: (nudgeId, enabled) => {
    set(state => {
      if (!state.currentUser) return state;
      
      const updatedUser = {
        ...state.currentUser,
        savedNudges: state.currentUser.savedNudges.map(n => 
          n.id === nudgeId ? { ...n, autoActionEnabled: enabled } : n
        )
      };
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  },
  
  upgradePlan: (plan) => {
    set(state => {
      if (!state.currentUser) return state;
      
      const updatedUser = {
        ...state.currentUser,
        subscription: sampleSubscriptions[plan]
      };
      
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      };
    });
  }
}));

export default useUserStore;
