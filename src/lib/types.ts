
// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profileCreated: boolean;
  personalDetails?: PersonalDetails;
  financialDetails?: FinancialDetails;
  goals: Goal[];
  savedNudges: Nudge[];
  transactions: Transaction[];
  subscription: Subscription;
  familyMembers?: FamilyMember[];
}

export interface PersonalDetails {
  age: number;
  familySize: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  dependents: number;
  riskTolerance: 'low' | 'medium' | 'high';
  occupation?: string;
  phoneNumber?: string;
  address?: string;
  financialChallenges?: string[];
}

export interface FinancialDetails {
  totalIncome: number;
  incomeSources: Record<string, number>;
  expenses: Record<string, number>;
  savings: number;
  investments: Investment[];
  debts: Debt[];
  debtToIncomeRatio: number;
  savingsRate: number;
  festivalPlanning?: Record<string, FestivalPlan>;
  seasonalPlanning?: Record<string, SeasonalPlan>;
  investmentIntelligence?: InvestmentIntelligence;
}

export interface Investment {
  type: string;
  amount: number;
}

export interface Debt {
  type: string;
  amount: number;
  interestRate: number;
  monthlyPayment: number;
  remainingTenure: number;
}

export interface FestivalPlan {
  budget: number;
  saved: number;
}

export interface SeasonalPlan {
  budget: number;
  saved: number;
  purpose: string;
}

export interface InvestmentIntelligence {
  riskScore: number;
  diversificationScore: number;
  recommendedAssetAllocation: Record<string, number>;
  upcomingIPOs?: UpcomingIPO[];
  portfolioPerformance: {
    lastMonth: number;
    lastQuarter: number;
    lastYear: number;
  };
}

export interface UpcomingIPO {
  name: string;
  expectedDate: string;
  interestRegistered: boolean;
}

export interface Goal {
  id: string;
  name: string;
  cost: number;
  timelineYears: number;
  monthlySavings: number;
  investment: string;
  progress: number;
  savedAmount: number;
}

export interface Nudge {
  id: string;
  goalId: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  schedule: string;
  type: 'reminder' | 'tip' | 'opportunity' | 'risk';
  action: string;
  saved: boolean;
  autoActionEnabled: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  description: string;
  account: string;
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

export interface FamilyMember {
  name: string;
  relationship: string;
  age: number;
  income: number;
  expenses: number;
}

// Language type for the app
export type LanguageOption = 'en' | 'hi' | 'hinglish';
