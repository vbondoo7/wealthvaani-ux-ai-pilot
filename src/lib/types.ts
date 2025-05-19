
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  profileCreated: boolean;
  personalDetails?: PersonalDetails;
  financialDetails?: FinancialDetails;
  goals: Goal[];
  savedNudges: Nudge[];
  transactions: Transaction[];
  subscription: SubscriptionPlan;
  isAdmin?: boolean;
  familyMembers?: FamilyMember[];
}

export interface PersonalDetails {
  age?: number;
  familySize?: number;
  maritalStatus?: string;
  dependents?: number;
  riskTolerance?: string;
  financialChallenges?: string[];
  occupation?: string;
  phoneNumber?: string;
  address?: string;
  // Legacy fields kept for compatibility
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  income?: number;
  location?: string;
  phone?: string;
}

export interface FinancialDetails {
  // Legacy fields kept for compatibility
  monthlyIncome?: number;
  monthlyExpenses?: number;
  totalSavings?: number;
  investmentExperience?: string;
  riskTolerance?: string;
  debtAmount?: number;
  existingInvestments?: Investment[];
  insurancePolicies?: InsurancePolicy[];
  // New fields
  totalIncome?: number;
  incomeSources?: { [source: string]: number };
  expenses?: { [category: string]: number };
  savings?: number;
  investments?: { type: string; amount: number }[];
  debts?: { type: string; amount: number; interestRate: number; monthlyPayment: number; remainingTenure?: number }[];
  debtToIncomeRatio?: number;
  savingsRate?: number;
  festivalPlanning?: { [festival: string]: FestivalPlan };
  seasonalPlanning?: { [season: string]: SeasonalPlan };
  investmentIntelligence?: any;
}

export interface Investment {
  type: string;
  value?: number;
  amount?: number;
}

export interface InsurancePolicy {
  type: string;
  coverageAmount: number;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  deadline: string;
  priority: string;
  description?: string;
  category: string;
  progress: number;
  savedAmount: number;
  // For backwards compatibility with existing code
  name?: string;
  cost?: number;
  timelineYears?: number;
  monthlySavings?: number;
  investment?: string;
}

export interface Nudge {
  id: string;
  title: string;
  description: string;
  category: string;
  relevanceScore: number;
  actionLink: string;
  isActionable: boolean;
  saved?: boolean;
  autoActionEnabled?: boolean;
  goalId?: string;
  message?: string;
  priority?: string;
  schedule?: string;
  type?: string;
  action?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense' | 'credit' | 'debit';
  account?: string;
}

export interface SubscriptionPlan {
  plan: 'Basic' | 'Pro' | 'Premium';
  startDate?: string;
  endDate?: string;
  price?: number | { monthly: number; yearly: number };
  features?: string[];
  pricePerMonth?: number;
  nudgesRemaining?: number;
  upgradeOptions?: UpgradeOption[];
}

export interface UpgradeOption {
  plan: string;
  pricePerMonth: number;
  features: string[];
}

// Updated LanguageOption to be a string literal type instead of an interface
export type LanguageOption = 'en' | 'hi' | 'hinglish' | 'bn' | 'ta' | 'te' | 'pa' | 'ml' | 'gu';

export interface BlogPost {
  id: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  featuredImage: string;
  imageAlt?: Record<string, string>;
  keywords: string[];
  categories: string[];
  title: Record<string, string>;
  content: Record<string, string>;
  excerpt: Record<string, string>;
  metaDescription: Record<string, string>;
}

export interface AdminUser {
  id: string;
  email: string;
  password?: string;
  name: string;
  isAdmin: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number | { monthly: number; yearly: number };
  features: string[] | Record<string, string>[];
  recommended?: boolean;
  color?: string;
  description?: string | Record<string, string>;
  popular?: boolean;
  cta?: string | Record<string, string>;
}

export interface FestivalPlan {
  budget: number;
  items?: { name: string; cost: number; }[];
  saved: number; // Changed from boolean to number
  notes?: string;
}

export interface SeasonalPlan {
  budget: number;
  items?: { name: string; cost: number; }[];
  saved: number; // Changed from boolean to number
  notes?: string;
  purpose?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  financialDependence: boolean;
  annualExpenses: number;
  age?: number;
  income?: number;
  expenses?: number;
}
