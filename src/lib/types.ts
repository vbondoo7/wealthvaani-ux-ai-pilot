
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would never be stored in plain text
  phone?: string;
  location?: string;
  occupation?: string;
  profileCreated: boolean;
  personalDetails?: PersonalDetails;
  financialDetails?: FinancialDetails;
  goals: Goal[];
  savedNudges: Nudge[];
  subscription: Subscription;
  transactions: Transaction[];
}

export interface PersonalDetails {
  age: number;
  familySize: number;
  maritalStatus: string;
  dependents: number;
  riskTolerance: 'low' | 'medium' | 'high';
  financialChallenges?: string[];
}

export interface FinancialDetails {
  totalIncome: number;
  incomeSources: {
    [key: string]: number;
  };
  expenses: {
    [key: string]: number;
  };
  savings: number;
  investments: {
    type: string;
    amount: number;
  }[];
  debts: {
    type: string;
    amount: number;
    interestRate: number;
    monthlyPayment: number;
    remainingTenure?: number;
  }[];
  debtToIncomeRatio?: number;
  savingsRate?: number;
}

export interface Goal {
  id: string;
  name: string;
  cost: number;
  timelineYears: number;
  monthlySavings: number;
  investment: string;
  progress?: number;
  savedAmount?: number;
}

export interface Nudge {
  id: string;
  goalId?: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  schedule: string;
  type: 'reminder' | 'opportunity' | 'risk' | 'tip';
  action?: string;
  saved: boolean;
  autoActionEnabled: boolean;
}

export interface Subscription {
  plan: 'Basic' | 'Pro' | 'Premium';
  pricePerMonth: number;
  features: string[];
  nudgesRemaining?: number;
  upgradeOptions: {
    plan: 'Pro' | 'Premium';
    pricePerMonth: number;
    features: string[];
  }[];
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'debit' | 'credit';
  category: string;
  description: string;
  account: 'savings' | 'current' | 'investment';
}

export interface BudgetAnalysis {
  surplusDeficit: number;
  debtToIncomeRatio: number;
  expenseBreakdown: {
    [key: string]: number;
  };
  recommendations: {
    action: string;
    amount: number;
    impact: string;
  }[];
  risks: string[];
  validation: string;
  categoryLimits: {
    [key: string]: number;
  };
  budgetAlerts: string[];
}
