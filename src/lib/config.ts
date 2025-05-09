
import { User } from './types';
import { sampleGoals, sampleSubscriptions } from './mockData';

// Create different goals for different users
const basicUserGoals = sampleGoals.slice(0, 2); // First 2 goals
const proUserGoals = [
  ...sampleGoals.slice(1, 3), // 2nd and 3rd goals
  {
    id: '5',
    name: 'car_purchase',
    cost: 800000,
    timelineYears: 3,
    monthlySavings: 10000,
    investment: 'mutual_funds',
    progress: 25,
    savedAmount: 200000
  }
];
const premiumUserGoals = [
  ...sampleGoals.slice(2), // 3rd and 4th goals
  {
    id: '6',
    name: 'world_trip',
    cost: 1200000,
    timelineYears: 2,
    monthlySavings: 25000,
    investment: 'equity_sip',
    progress: 40,
    savedAmount: 480000
  },
  {
    id: '7',
    name: 'startup_funding',
    cost: 3000000,
    timelineYears: 5,
    monthlySavings: 30000,
    investment: 'stocks',
    progress: 15,
    savedAmount: 450000
  }
];

// Predefined users with different plans and goals
export const predefinedUsers: User[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    password: 'password',
    profileCreated: true,
    personalDetails: {
      age: 32,
      familySize: 3,
      maritalStatus: 'married',
      dependents: 1,
      riskTolerance: 'medium',
      occupation: 'Software Engineer',
      phoneNumber: '9876543210',
      address: 'Bangalore, Karnataka'
    },
    financialDetails: {
      totalIncome: 120000,
      incomeSources: {
        salary: 100000,
        rent: 20000
      },
      expenses: {
        housing: 30000,
        food: 15000,
        transport: 5000,
        utilities: 8000,
        entertainment: 7000,
        misc: 10000
      },
      savings: 45000,
      investments: [
        { type: 'equity_mutual_funds', amount: 20000 },
        { type: 'ppf', amount: 10000 },
        { type: 'fd', amount: 15000 }
      ],
      debts: [
        { type: 'home_loan', amount: 3000000, interestRate: 7.5, monthlyPayment: 25000, remainingTenure: 180 }
      ],
      debtToIncomeRatio: 0.25,
      savingsRate: 0.375
    },
    goals: basicUserGoals,
    savedNudges: [],
    subscription: sampleSubscriptions.Basic,
    transactions: [
      {
        id: '101',
        date: '2025-05-01',
        amount: 100000,
        type: 'credit',
        category: 'salary',
        description: 'Monthly Salary',
        account: 'current'
      },
      {
        id: '102',
        date: '2025-05-03',
        amount: 20000,
        type: 'credit',
        category: 'rental',
        description: 'Rental Income',
        account: 'savings'
      },
      {
        id: '103',
        date: '2025-05-05',
        amount: 30000,
        type: 'debit',
        category: 'housing',
        description: 'Rent',
        account: 'current'
      },
      {
        id: '104',
        date: '2025-05-10',
        amount: 15000,
        type: 'debit',
        category: 'food',
        description: 'Monthly Groceries',
        account: 'current'
      },
      {
        id: '105',
        date: '2025-05-15',
        amount: 25000,
        type: 'debit',
        category: 'emis',
        description: 'Home Loan EMI',
        account: 'current'
      },
      {
        id: '106',
        date: '2025-05-02',
        amount: 10000,
        type: 'debit',
        category: 'investment',
        description: 'PPF Investment',
        account: 'savings'
      },
      {
        id: '107',
        date: '2025-05-02',
        amount: 20000,
        type: 'debit',
        category: 'investment',
        description: 'Equity MF SIP',
        account: 'investment'
      }
    ]
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    password: 'password',
    profileCreated: true,
    personalDetails: {
      age: 35,
      familySize: 4,
      maritalStatus: 'married',
      dependents: 2,
      riskTolerance: 'medium',
      occupation: 'Marketing Manager',
      phoneNumber: '9876543211',
      address: 'Mumbai, Maharashtra'
    },
    financialDetails: {
      totalIncome: 180000,
      incomeSources: {
        salary: 150000,
        freelance: 30000
      },
      expenses: {
        housing: 45000,
        food: 20000,
        transport: 10000,
        utilities: 12000,
        entertainment: 15000,
        schoolFees: 25000,
        misc: 15000
      },
      savings: 38000,
      investments: [
        { type: 'equity_mutual_funds', amount: 25000 },
        { type: 'stocks', amount: 15000 },
        { type: 'fd', amount: 20000 }
      ],
      debts: [
        { type: 'home_loan', amount: 5000000, interestRate: 8, monthlyPayment: 40000, remainingTenure: 200 },
        { type: 'car_loan', amount: 800000, interestRate: 9, monthlyPayment: 15000, remainingTenure: 36 }
      ],
      debtToIncomeRatio: 0.35,
      savingsRate: 0.32
    },
    goals: proUserGoals,
    savedNudges: [],
    subscription: sampleSubscriptions.Pro,
    transactions: [
      {
        id: '201',
        date: '2025-05-01',
        amount: 150000,
        type: 'credit',
        category: 'salary',
        description: 'Monthly Salary',
        account: 'current'
      },
      {
        id: '202',
        date: '2025-05-10',
        amount: 30000,
        type: 'credit',
        category: 'freelance',
        description: 'Freelance Project',
        account: 'savings'
      },
      {
        id: '203',
        date: '2025-05-05',
        amount: 45000,
        type: 'debit',
        category: 'housing',
        description: 'Rent',
        account: 'current'
      },
      {
        id: '204',
        date: '2025-05-08',
        amount: 20000,
        type: 'debit',
        category: 'food',
        description: 'Monthly Groceries',
        account: 'current'
      },
      {
        id: '205',
        date: '2025-05-12',
        amount: 40000,
        type: 'debit',
        category: 'emis',
        description: 'Home Loan EMI',
        account: 'current'
      },
      {
        id: '206',
        date: '2025-05-12',
        amount: 15000,
        type: 'debit',
        category: 'emis',
        description: 'Car Loan EMI',
        account: 'current'
      },
      {
        id: '207',
        date: '2025-05-15',
        amount: 25000,
        type: 'debit',
        category: 'education',
        description: 'School Fees',
        account: 'current'
      },
      {
        id: '208',
        date: '2025-05-02',
        amount: 25000,
        type: 'debit',
        category: 'investment',
        description: 'Equity MF SIP',
        account: 'investment'
      },
      {
        id: '209',
        date: '2025-05-03',
        amount: 15000,
        type: 'debit',
        category: 'investment',
        description: 'Stock Purchase',
        account: 'investment'
      }
    ]
  },
  {
    id: '3',
    name: 'Vikram Malhotra',
    email: 'vikram@example.com',
    password: 'password',
    profileCreated: true,
    personalDetails: {
      age: 42,
      familySize: 5,
      maritalStatus: 'married',
      dependents: 3,
      riskTolerance: 'high',
      occupation: 'Business Owner',
      phoneNumber: '9876543212',
      address: 'Delhi, NCR'
    },
    financialDetails: {
      totalIncome: 350000,
      incomeSources: {
        business: 300000,
        investment: 50000
      },
      expenses: {
        housing: 60000,
        food: 30000,
        transport: 20000,
        utilities: 15000,
        entertainment: 25000,
        schoolFees: 50000,
        misc: 30000
      },
      savings: 120000,
      investments: [
        { type: 'equity_mutual_funds', amount: 50000 },
        { type: 'stocks', amount: 80000 },
        { type: 'real_estate', amount: 100000 },
        { type: 'fd', amount: 30000 },
        { type: 'gold', amount: 20000 }
      ],
      debts: [
        { type: 'home_loan', amount: 8000000, interestRate: 7, monthlyPayment: 70000, remainingTenure: 150 },
        { type: 'business_loan', amount: 3000000, interestRate: 12, monthlyPayment: 50000, remainingTenure: 48 }
      ],
      debtToIncomeRatio: 0.28,
      savingsRate: 0.42
    },
    goals: premiumUserGoals,
    savedNudges: [],
    subscription: sampleSubscriptions.Premium,
    transactions: [
      {
        id: '301',
        date: '2025-05-01',
        amount: 300000,
        type: 'credit',
        category: 'business',
        description: 'Business Income',
        account: 'current'
      },
      {
        id: '302',
        date: '2025-05-07',
        amount: 50000,
        type: 'credit',
        category: 'investment',
        description: 'Dividend Income',
        account: 'investment'
      },
      {
        id: '303',
        date: '2025-05-05',
        amount: 60000,
        type: 'debit',
        category: 'housing',
        description: 'Home Mortgage',
        account: 'current'
      },
      {
        id: '304',
        date: '2025-05-08',
        amount: 30000,
        type: 'debit',
        category: 'food',
        description: 'Monthly Groceries',
        account: 'current'
      },
      {
        id: '305',
        date: '2025-05-10',
        amount: 70000,
        type: 'debit',
        category: 'emis',
        description: 'Home Loan EMI',
        account: 'current'
      },
      {
        id: '306',
        date: '2025-05-10',
        amount: 50000,
        type: 'debit',
        category: 'emis',
        description: 'Business Loan EMI',
        account: 'current'
      },
      {
        id: '307',
        date: '2025-05-15',
        amount: 50000,
        type: 'debit',
        category: 'education',
        description: 'School Fees',
        account: 'current'
      },
      {
        id: '308',
        date: '2025-05-02',
        amount: 50000,
        type: 'debit',
        category: 'investment',
        description: 'Equity MF SIP',
        account: 'investment'
      },
      {
        id: '309',
        date: '2025-05-03',
        amount: 80000,
        type: 'debit',
        category: 'investment',
        description: 'Stock Purchase',
        account: 'investment'
      },
      {
        id: '310',
        date: '2025-05-20',
        amount: 100000,
        type: 'debit',
        category: 'investment',
        description: 'Real Estate Investment',
        account: 'investment'
      },
      {
        id: '311',
        date: '2025-05-22',
        amount: 20000,
        type: 'debit',
        category: 'investment',
        description: 'Gold Purchase',
        account: 'investment'
      }
    ]
  }
];
