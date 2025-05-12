
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
      savingsRate: 0.375,
      festivalPlanning: {
        diwali: { budget: 15000, saved: 5000 },
        holi: { budget: 8000, saved: 3000 }
      }
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
      // Previous month transactions
      {
        id: '101-1',
        date: '2025-04-01',
        amount: 98000,
        type: 'credit',
        category: 'salary',
        description: 'Monthly Salary',
        account: 'current'
      },
      {
        id: '101-2',
        date: '2025-03-01',
        amount: 98000,
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
      // Previous months rental
      {
        id: '102-1',
        date: '2025-04-03',
        amount: 20000,
        type: 'credit',
        category: 'rental',
        description: 'Rental Income',
        account: 'savings'
      },
      {
        id: '102-2',
        date: '2025-03-03',
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
      // Previous months housing
      {
        id: '103-1',
        date: '2025-04-05',
        amount: 30000,
        type: 'debit',
        category: 'housing',
        description: 'Rent',
        account: 'current'
      },
      {
        id: '103-2',
        date: '2025-03-05',
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
      // Previous months food
      {
        id: '104-1',
        date: '2025-04-10',
        amount: 14000,
        type: 'debit',
        category: 'food',
        description: 'Monthly Groceries',
        account: 'current'
      },
      {
        id: '104-2',
        date: '2025-03-10',
        amount: 13500,
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
      // Previous months EMIs
      {
        id: '105-1',
        date: '2025-04-15',
        amount: 25000,
        type: 'debit',
        category: 'emis',
        description: 'Home Loan EMI',
        account: 'current'
      },
      {
        id: '105-2',
        date: '2025-03-15',
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
      // Previous months investments
      {
        id: '106-1',
        date: '2025-04-02',
        amount: 10000,
        type: 'debit',
        category: 'investment',
        description: 'PPF Investment',
        account: 'savings'
      },
      {
        id: '106-2',
        date: '2025-03-02',
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
      },
      // Previous months equity
      {
        id: '107-1',
        date: '2025-04-02',
        amount: 20000,
        type: 'debit',
        category: 'investment',
        description: 'Equity MF SIP',
        account: 'investment'
      },
      {
        id: '107-2',
        date: '2025-03-02',
        amount: 20000,
        type: 'debit',
        category: 'investment',
        description: 'Equity MF SIP',
        account: 'investment'
      },
      // Festival-related expense (Holi in March)
      {
        id: '108',
        date: '2025-03-20',
        amount: 8000,
        type: 'debit',
        category: 'festival',
        description: 'Holi Celebration',
        account: 'current'
      }
    ],
    familyMembers: [
      {
        name: "Nisha Sharma",
        relationship: "spouse",
        age: 30,
        income: 80000,
        expenses: 25000
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
      savingsRate: 0.32,
      festivalPlanning: {
        diwali: { budget: 25000, saved: 10000 },
        holi: { budget: 12000, saved: 6000 },
        navratri: { budget: 15000, saved: 5000 }
      },
      seasonalPlanning: {
        summer: { budget: 30000, saved: 15000, purpose: "Vacation" },
        monsoon: { budget: 10000, saved: 5000, purpose: "Home Repair" }
      }
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
      // Previous months
      {
        id: '201-1',
        date: '2025-04-01',
        amount: 150000,
        type: 'credit',
        category: 'salary',
        description: 'Monthly Salary',
        account: 'current'
      },
      {
        id: '201-2',
        date: '2025-03-01',
        amount: 145000,
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
      // Previous freelance
      {
        id: '202-1',
        date: '2025-04-12',
        amount: 25000,
        type: 'credit',
        category: 'freelance',
        description: 'Freelance Project',
        account: 'savings'
      },
      {
        id: '202-2',
        date: '2025-03-15',
        amount: 35000,
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
      // Previous housing
      {
        id: '203-1',
        date: '2025-04-05',
        amount: 45000,
        type: 'debit',
        category: 'housing',
        description: 'Rent',
        account: 'current'
      },
      {
        id: '203-2',
        date: '2025-03-05',
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
      // Previous food
      {
        id: '204-1',
        date: '2025-04-08',
        amount: 19000,
        type: 'debit',
        category: 'food',
        description: 'Monthly Groceries',
        account: 'current'
      },
      {
        id: '204-2',
        date: '2025-03-08',
        amount: 18500,
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
      // Previous EMIs
      {
        id: '205-1',
        date: '2025-04-12',
        amount: 40000,
        type: 'debit',
        category: 'emis',
        description: 'Home Loan EMI',
        account: 'current'
      },
      {
        id: '205-2',
        date: '2025-03-12',
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
      // Previous car EMIs
      {
        id: '206-1',
        date: '2025-04-12',
        amount: 15000,
        type: 'debit',
        category: 'emis',
        description: 'Car Loan EMI',
        account: 'current'
      },
      {
        id: '206-2',
        date: '2025-03-12',
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
      // Previous education
      {
        id: '207-1',
        date: '2025-04-15',
        amount: 25000,
        type: 'debit',
        category: 'education',
        description: 'School Fees',
        account: 'current'
      },
      {
        id: '207-2',
        date: '2025-03-15',
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
      // Previous investments
      {
        id: '208-1',
        date: '2025-04-02',
        amount: 25000,
        type: 'debit',
        category: 'investment',
        description: 'Equity MF SIP',
        account: 'investment'
      },
      {
        id: '208-2',
        date: '2025-03-02',
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
      },
      // Previous stock purchases
      {
        id: '209-1',
        date: '2025-04-03',
        amount: 15000,
        type: 'debit',
        category: 'investment',
        description: 'Stock Purchase',
        account: 'investment'
      },
      {
        id: '209-2',
        date: '2025-03-03',
        amount: 15000,
        type: 'debit',
        category: 'investment',
        description: 'Stock Purchase',
        account: 'investment'
      },
      // Festival expense - Holi
      {
        id: '210',
        date: '2025-03-20',
        amount: 12000,
        type: 'debit',
        category: 'festival',
        description: 'Holi Celebration',
        account: 'current'
      },
      // Seasonal expense - Summer vacation planning
      {
        id: '211',
        date: '2025-04-25',
        amount: 30000,
        type: 'debit',
        category: 'seasonal',
        description: 'Summer Vacation Booking',
        account: 'savings'
      }
    ],
    familyMembers: [
      {
        name: "Rajesh Patel",
        relationship: "spouse",
        age: 38,
        income: 120000,
        expenses: 40000
      },
      {
        name: "Anaya Patel",
        relationship: "daughter",
        age: 10,
        income: 0,
        expenses: 15000
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
      savingsRate: 0.42,
      festivalPlanning: {
        diwali: { budget: 50000, saved: 25000 },
        holi: { budget: 25000, saved: 25000 },
        navratri: { budget: 30000, saved: 30000 },
        raksha_bandhan: { budget: 15000, saved: 15000 }
      },
      seasonalPlanning: {
        summer: { budget: 150000, saved: 120000, purpose: "International Vacation" },
        winter: { budget: 80000, saved: 60000, purpose: "Holiday Home Visit" },
        monsoon: { budget: 25000, saved: 25000, purpose: "Home Maintenance" }
      },
      investmentIntelligence: {
        riskScore: 8.5,
        diversificationScore: 9.2,
        recommendedAssetAllocation: {
          equity: 60,
          debt: 20,
          gold: 5,
          realEstate: 15
        },
        upcomingIPOs: [
          { name: "TechStart Ltd", expectedDate: "2025-06-15", interestRegistered: true },
          { name: "Green Energy Co", expectedDate: "2025-07-10", interestRegistered: false }
        ],
        portfolioPerformance: {
          lastMonth: 2.3,
          lastQuarter: 6.8,
          lastYear: 14.5
        }
      }
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
      // Previous business income
      {
        id: '301-1',
        date: '2025-04-01',
        amount: 285000,
        type: 'credit',
        category: 'business',
        description: 'Business Income',
        account: 'current'
      },
      {
        id: '301-2',
        date: '2025-03-01',
        amount: 320000,
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
      // Previous dividends
      {
        id: '302-1',
        date: '2025-04-07',
        amount: 48000,
        type: 'credit',
        category: 'investment',
        description: 'Dividend Income',
        account: 'investment'
      },
      {
        id: '302-2',
        date: '2025-03-07',
        amount: 52000,
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
      // Previous housing
      {
        id: '303-1',
        date: '2025-04-05',
        amount: 60000,
        type: 'debit',
        category: 'housing',
        description: 'Home Mortgage',
        account: 'current'
      },
      {
        id: '303-2',
        date: '2025-03-05',
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
      // Previous food
      {
        id: '304-1',
        date: '2025-04-08',
        amount: 28000,
        type: 'debit',
        category: 'food',
        description: 'Monthly Groceries',
        account: 'current'
      },
      {
        id: '304-2',
        date: '2025-03-08',
        amount: 29500,
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
      // Previous EMIs
      {
        id: '305-1',
        date: '2025-04-10',
        amount: 70000,
        type: 'debit',
        category: 'emis',
        description: 'Home Loan EMI',
        account: 'current'
      },
      {
        id: '305-2',
        date: '2025-03-10',
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
      // Previous business EMIs
      {
        id: '306-1',
        date: '2025-04-10',
        amount: 50000,
        type: 'debit',
        category: 'emis',
        description: 'Business Loan EMI',
        account: 'current'
      },
      {
        id: '306-2',
        date: '2025-03-10',
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
      // Previous education fees
      {
        id: '307-1',
        date: '2025-04-15',
        amount: 50000,
        type: 'debit',
        category: 'education',
        description: 'School Fees',
        account: 'current'
      },
      {
        id: '307-2',
        date: '2025-03-15',
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
      // Previous equity investments
      {
        id: '308-1',
        date: '2025-04-02',
        amount: 50000,
        type: 'debit',
        category: 'investment',
        description: 'Equity MF SIP',
        account: 'investment'
      },
      {
        id: '308-2',
        date: '2025-03-02',
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
      // Previous stock purchases
      {
        id: '309-1',
        date: '2025-04-03',
        amount: 75000,
        type: 'debit',
        category: 'investment',
        description: 'Stock Purchase',
        account: 'investment'
      },
      {
        id: '309-2',
        date: '2025-03-03',
        amount: 85000,
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
      // Previous real estate investments
      {
        id: '310-1',
        date: '2025-04-20',
        amount: 100000,
        type: 'debit',
        category: 'investment',
        description: 'Real Estate Investment',
        account: 'investment'
      },
      {
        id: '310-2',
        date: '2025-03-20',
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
      },
      // Previous gold purchases
      {
        id: '311-1',
        date: '2025-04-22',
        amount: 20000,
        type: 'debit',
        category: 'investment',
        description: 'Gold Purchase',
        account: 'investment'
      },
      {
        id: '311-2',
        date: '2025-03-22',
        amount: 20000,
        type: 'debit',
        category: 'investment',
        description: 'Gold Purchase',
        account: 'investment'
      },
      // Festival expenses
      {
        id: '312',
        date: '2025-03-20',
        amount: 25000,
        type: 'debit',
        category: 'festival',
        description: 'Holi Celebration',
        account: 'current'
      },
      // Seasonal expenses
      {
        id: '313',
        date: '2025-04-10',
        amount: 80000,
        type: 'debit',
        category: 'seasonal',
        description: 'Summer Vacation Advance Booking',
        account: 'savings'
      }
    ],
    familyMembers: [
      {
        name: "Anita Malhotra",
        relationship: "spouse",
        age: 38,
        income: 0,
        expenses: 50000
      },
      {
        name: "Rohan Malhotra",
        relationship: "son",
        age: 18,
        income: 0,
        expenses: 30000
      },
      {
        name: "Riya Malhotra",
        relationship: "daughter",
        age: 16,
        income: 0,
        expenses: 25000
      },
      {
        name: "Ramesh Malhotra",
        relationship: "father",
        age: 70,
        income: 25000,
        expenses: 15000
      }
    ]
  }
];
