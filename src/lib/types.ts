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
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  income: number;
  location: string;
  phone: string;
}

export interface FinancialDetails {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  investmentExperience: string;
  riskTolerance: string;
  debtAmount: number;
  existingInvestments: Investment[];
  insurancePolicies: InsurancePolicy[];
  festivalPlanning?: { [festival: string]: FestivalPlan };
  seasonalPlanning?: { [season: string]: SeasonalPlan };
}

export interface Investment {
  type: string;
  value: number;
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
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface SubscriptionPlan {
  plan: 'Basic' | 'Pro' | 'Premium';
  startDate: string;
  endDate: string;
  price: number;
  features: string[];
}

export interface LanguageOption {
  code: string;
  name: string;
  displayName: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  featuredImage: string;
  keywords: string[];
  title: { [key: string]: string };
  content: { [key: string]: string };
  excerpt: { [key: string]: string };
  metaDescription: { [key: string]: string };
}

export interface AdminUser {
  email: string;
  password?: string;
  isAdmin: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
  color?: string;
}

export interface FestivalPlan {
  budget: number;
  items: { name: string; cost: number; }[];
  notes?: string;
}

export interface SeasonalPlan {
  budget: number;
  items: { name: string; cost: number; }[];
  notes?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  financialDependence: boolean;
  annualExpenses: number;
}
