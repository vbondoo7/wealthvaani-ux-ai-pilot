
import { User, Goal, Transaction } from './types';
import { sampleSubscriptions } from './mockData';

// Generate some historical transaction data for users (3 months)
const generateHistoricalTransactions = (userId: string, type: 'high' | 'medium' | 'low'): Transaction[] => {
  const transactions: Transaction[] = [];
  const currentDate = new Date();
  const multiplier = type === 'high' ? 1.5 : type === 'medium' ? 1 : 0.7;
  
  // Generate transactions for the last 3 months
  for (let month = 2; month >= 0; month--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - month);
    
    // Add salary - monthly income
    transactions.push({
      id: `${userId}-salary-${month}`,
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-05`,
      description: 'Monthly Salary',
      amount: Math.round(120000 * multiplier),
      category: 'salary',
      type: 'income'
    });
    
    // Add rent expense
    transactions.push({
      id: `${userId}-rent-${month}`,
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-07`,
      description: 'Monthly Rent',
      amount: Math.round(30000 * multiplier),
      category: 'rent',
      type: 'expense'
    });
    
    // Add grocery expenses (twice a month)
    transactions.push({
      id: `${userId}-grocery1-${month}`,
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-10`,
      description: 'Groceries',
      amount: Math.round(8000 * multiplier),
      category: 'groceries',
      type: 'expense'
    });
    
    transactions.push({
      id: `${userId}-grocery2-${month}`,
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-25`,
      description: 'Groceries',
      amount: Math.round(7000 * multiplier),
      category: 'groceries',
      type: 'expense'
    });
    
    // Add utility bills
    transactions.push({
      id: `${userId}-utility-${month}`,
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-15`,
      description: 'Utility Bills',
      amount: Math.round(5000 * multiplier),
      category: 'utilities',
      type: 'expense'
    });
    
    // Add entertainment expense
    transactions.push({
      id: `${userId}-entertainment-${month}`,
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-20`,
      description: 'Entertainment',
      amount: Math.round(3000 * multiplier),
      category: 'entertainment',
      type: 'expense'
    });
    
    // Add dining out
    transactions.push({
      id: `${userId}-dining-${month}`,
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-18`,
      description: 'Dining Out',
      amount: Math.round(4500 * multiplier),
      category: 'dining',
      type: 'expense'
    });
    
    // Add transportation
    transactions.push({
      id: `${userId}-transport-${month}`,
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-12`,
      description: 'Transportation',
      amount: Math.round(2500 * multiplier),
      category: 'transport',
      type: 'expense'
    });
    
    // Add investment if high or medium income
    if (type !== 'low') {
      transactions.push({
        id: `${userId}-investment-${month}`,
        date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-06`,
        description: 'Monthly Investment',
        amount: Math.round(15000 * multiplier),
        category: 'investment',
        type: 'expense'
      });
    }
  }
  
  return transactions;
};

// Predefined goals for different user profiles
const emergencyFundGoal: Goal = {
  id: 'goal-001',
  title: 'Emergency Fund',
  targetAmount: 300000,
  deadline: '2026-05-01',
  priority: 'high',
  category: 'emergency',
  progress: 25,
  savedAmount: 75000,
  description: 'Save for unexpected expenses and emergencies',
  name: 'emergency_fund',
  cost: 300000,
  timelineYears: 1,
  monthlySavings: 25000,
  investment: 'liquid_fund'
};

const homeGoal: Goal = {
  id: 'goal-002',
  title: 'Buy a Home',
  targetAmount: 5000000,
  deadline: '2031-01-01',
  priority: 'medium',
  category: 'housing',
  progress: 10,
  savedAmount: 500000,
  description: 'Save for down payment on a home',
  name: 'buy_home',
  cost: 5000000,
  timelineYears: 6,
  monthlySavings: 62500,
  investment: 'equity_sip'
};

const educationGoal: Goal = {
  id: 'goal-003',
  title: 'Child Education',
  targetAmount: 2000000,
  deadline: '2030-04-01',
  priority: 'high',
  category: 'education',
  progress: 15,
  savedAmount: 300000,
  description: 'Save for child\'s higher education',
  name: 'education_fund',
  cost: 2000000,
  timelineYears: 5,
  monthlySavings: 28333,
  investment: 'fixed_deposit'
};

const retirementGoal: Goal = {
  id: 'goal-004',
  title: 'Retirement',
  targetAmount: 10000000,
  deadline: '2045-01-01',
  priority: 'medium',
  category: 'retirement',
  progress: 5,
  savedAmount: 500000,
  description: 'Save for comfortable retirement',
  name: 'retirement_plan',
  cost: 10000000,
  timelineYears: 20,
  monthlySavings: 39583,
  investment: 'mutual_funds'
};

const vacationGoal: Goal = {
  id: 'goal-005',
  title: 'Dream Vacation',
  targetAmount: 500000,
  deadline: '2026-12-01',
  priority: 'low',
  category: 'travel',
  progress: 30,
  savedAmount: 150000,
  description: 'Save for a dream international vacation',
  name: 'vacation_fund',
  cost: 500000,
  timelineYears: 1.5,
  monthlySavings: 19444,
  investment: 'liquid_fund'
};

const carGoal: Goal = {
  id: 'goal-006',
  title: 'New Car',
  targetAmount: 1200000,
  deadline: '2027-06-01',
  priority: 'low',
  category: 'vehicle',
  progress: 20,
  savedAmount: 240000,
  description: 'Save to buy a new car',
  name: 'car_fund',
  cost: 1200000,
  timelineYears: 2,
  monthlySavings: 40000,
  investment: 'debt_fund'
};

// Predefined users for demonstration purposes
export const predefinedUsers: User[] = [
  {
    id: 'user-001',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    password: 'password123',
    profileCreated: true,
    goals: [emergencyFundGoal, homeGoal, retirementGoal, educationGoal],
    savedNudges: [],
    transactions: generateHistoricalTransactions('user-001', 'high'),
    personalDetails: {
      firstName: 'Rahul',
      lastName: 'Sharma',
      dateOfBirth: '1985-06-15',
      gender: 'male',
      occupation: 'Senior Software Engineer',
      income: 120000,
      location: 'Mumbai, Maharashtra',
      phone: '+91 98765 43210'
    },
    financialDetails: {
      monthlyIncome: 120000,
      monthlyExpenses: 75000,
      totalSavings: 1500000,
      investmentExperience: 'moderate',
      riskTolerance: 'moderate',
      debtAmount: 5000000,
      existingInvestments: [
        { type: 'Equity', value: 750000 },
        { type: 'Fixed Deposit', value: 500000 },
        { type: 'PPF', value: 250000 }
      ],
      insurancePolicies: [
        { type: 'Term Life', coverageAmount: 10000000 },
        { type: 'Health', coverageAmount: 1000000 }
      ]
    },
    familyMembers: [
      {
        id: 'family-001',
        name: 'Priya Sharma',
        relationship: 'spouse',
        dateOfBirth: '1988-09-12',
        financialDependence: false,
        annualExpenses: 300000
      },
      {
        id: 'family-002',
        name: 'Aryan Sharma',
        relationship: 'son',
        dateOfBirth: '2015-03-25',
        financialDependence: true,
        annualExpenses: 500000
      }
    ],
    subscription: sampleSubscriptions.Premium
  },
  {
    id: 'user-002',
    name: 'Priya Patel',
    email: 'priya@example.com',
    password: 'password123',
    profileCreated: true,
    goals: [homeGoal, vacationGoal, retirementGoal],
    savedNudges: [],
    transactions: generateHistoricalTransactions('user-002', 'medium'),
    personalDetails: {
      firstName: 'Priya',
      lastName: 'Patel',
      dateOfBirth: '1990-09-23',
      gender: 'female',
      occupation: 'Marketing Manager',
      income: 85000,
      location: 'Delhi, Delhi',
      phone: '+91 87654 32109'
    },
    financialDetails: {
      monthlyIncome: 85000,
      monthlyExpenses: 60000,
      totalSavings: 750000,
      investmentExperience: 'beginner',
      riskTolerance: 'aggressive',
      debtAmount: 800000,
      existingInvestments: [
        { type: 'Mutual Funds', value: 350000 },
        { type: 'Stocks', value: 400000 }
      ],
      insurancePolicies: [
        { type: 'Health', coverageAmount: 500000 }
      ]
    },
    subscription: sampleSubscriptions.Pro
  },
  {
    id: 'user-003',
    name: 'Vikram Malhotra',
    email: 'vikram@example.com',
    password: 'password123',
    profileCreated: true,
    goals: [emergencyFundGoal, carGoal],
    savedNudges: [],
    transactions: generateHistoricalTransactions('user-003', 'low'),
    personalDetails: {
      firstName: 'Vikram',
      lastName: 'Malhotra',
      dateOfBirth: '1992-04-18',
      gender: 'male',
      occupation: 'Freelance Designer',
      income: 60000,
      location: 'Bangalore, Karnataka',
      phone: '+91 76543 21098'
    },
    financialDetails: {
      monthlyIncome: 60000,
      monthlyExpenses: 45000,
      totalSavings: 250000,
      investmentExperience: 'novice',
      riskTolerance: 'conservative',
      debtAmount: 200000,
      existingInvestments: [
        { type: 'Fixed Deposit', value: 150000 },
        { type: 'RD', value: 100000 }
      ],
      insurancePolicies: [
        { type: 'Term Life', coverageAmount: 5000000 }
      ]
    },
    subscription: sampleSubscriptions.Basic
  }
];

// Admin user (handled separately)
export const adminUser = {
  id: 'admin-001',
  name: 'Admin',
  email: 'admin@wealthvani.com',
  password: 'Vishal#123',
  profileCreated: true,
  isAdmin: true,
  goals: [],
  savedNudges: [],
  transactions: [],
  subscription: sampleSubscriptions.Premium
};

// App Configuration
export const appConfig = {
  versionNumber: '1.0.0',
  buildDate: '2025-05-15',
  supportEmail: 'support@wealthvani.com',
  maxGoals: 10,
  maxNudges: 20,
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'hi', 'hinglish'],
  advisorAvailability: {
    weekdays: '9:00 AM - 7:00 PM',
    weekends: '10:00 AM - 5:00 PM'
  },
  festivalCalendar: [
    {
      name: 'Diwali',
      date: '2025-11-12',
      planningLeadTime: 60 // days in advance to start planning
    },
    {
      name: 'Holi',
      date: '2026-03-06',
      planningLeadTime: 30
    },
    {
      name: 'Durga Puja',
      date: '2025-10-02',
      planningLeadTime: 45
    },
    {
      name: 'Eid',
      date: '2025-07-01',
      planningLeadTime: 30
    }
  ],
  seasonalCalendar: [
    {
      name: 'Summer',
      startDate: '2025-04-01',
      endDate: '2025-06-30',
      planningLeadTime: 45
    },
    {
      name: 'Monsoon',
      startDate: '2025-07-01',
      endDate: '2025-09-30',
      planningLeadTime: 30
    },
    {
      name: 'Winter',
      startDate: '2025-11-01',
      endDate: '2026-02-28',
      planningLeadTime: 45
    }
  ]
};
