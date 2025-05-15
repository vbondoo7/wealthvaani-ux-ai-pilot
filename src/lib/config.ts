
import { User } from './types';
import { sampleGoals, sampleNudges, sampleTransactions, sampleSubscriptions } from './mockData';

// Predefined users for demonstration purposes
export const predefinedUsers: User[] = [
  {
    id: 'user-001',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    password: 'password123',
    profileCreated: true,
    goals: [...sampleGoals],
    savedNudges: [...sampleNudges.slice(0, 2)],
    transactions: [...sampleTransactions],
    personalDetails: {
      fullName: 'Rahul Sharma',
      dateOfBirth: '1985-06-15',
      gender: 'male',
      address: 'B-104, Sunshine Apartments, Powai, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400076',
      occupation: 'Software Engineer',
      phoneNumber: '+91 98765 43210'
    },
    financialDetails: {
      monthlyIncome: 120000,
      monthlySavings: 25000,
      monthlyExpenses: 75000,
      existingLoans: [
        {
          type: 'Home Loan',
          amount: 5000000,
          interestRate: 7.5,
          duration: 20,
          emi: 40000
        }
      ],
      investments: [
        {
          type: 'Fixed Deposit',
          amount: 500000,
          returns: 6.5
        },
        {
          type: 'Equity',
          amount: 750000,
          returns: 12
        }
      ],
      bankAccounts: [
        {
          bank: 'HDFC Bank',
          accountType: 'Savings',
          balance: 250000
        },
        {
          bank: 'ICICI Bank',
          accountType: 'Current',
          balance: 180000
        }
      ],
      riskTolerance: 'moderate',
      financialGoals: ['retirement', 'education', 'home']
    },
    familyMembers: [
      {
        name: 'Priya Sharma',
        relation: 'spouse',
        age: 32,
        occupation: 'Doctor',
        income: 90000,
        financialDependents: false
      },
      {
        name: 'Aryan Sharma',
        relation: 'child',
        age: 8,
        occupation: 'Student',
        income: 0,
        financialDependents: true
      }
    ],
    subscription: sampleSubscriptions.Basic
  },
  {
    id: 'user-002',
    name: 'Priya Gupta',
    email: 'priya@example.com',
    password: 'password123',
    profileCreated: true,
    goals: [sampleGoals[0], sampleGoals[2]],
    savedNudges: [...sampleNudges.slice(2, 4)],
    transactions: [...sampleTransactions.slice(0, 5)],
    personalDetails: {
      fullName: 'Priya Gupta',
      dateOfBirth: '1990-09-23',
      gender: 'female',
      address: '42, Green Park Avenue, Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      pinCode: '110016',
      occupation: 'Marketing Manager',
      phoneNumber: '+91 87654 32109'
    },
    financialDetails: {
      monthlyIncome: 85000,
      monthlySavings: 15000,
      monthlyExpenses: 60000,
      existingLoans: [
        {
          type: 'Car Loan',
          amount: 800000,
          interestRate: 9,
          duration: 5,
          emi: 16500
        }
      ],
      investments: [
        {
          type: 'Mutual Funds',
          amount: 350000,
          returns: 10.5
        }
      ],
      bankAccounts: [
        {
          bank: 'Axis Bank',
          accountType: 'Savings',
          balance: 175000
        }
      ],
      riskTolerance: 'aggressive',
      financialGoals: ['early_retirement', 'travel', 'investment_property']
    },
    subscription: sampleSubscriptions.Pro
  },
  {
    id: 'user-003',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    password: 'password123',
    profileCreated: true,
    goals: [sampleGoals[1], sampleGoals[3]],
    savedNudges: [...sampleNudges.slice(4, 6)],
    transactions: [...sampleTransactions.slice(5)],
    personalDetails: {
      fullName: 'Vikram Singh',
      dateOfBirth: '1978-02-05',
      gender: 'male',
      address: '201, Shivaji Nagar, Near MG Road, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560001',
      occupation: 'Business Owner',
      phoneNumber: '+91 76543 21098'
    },
    financialDetails: {
      monthlyIncome: 200000,
      monthlySavings: 50000,
      monthlyExpenses: 120000,
      existingLoans: [],
      investments: [
        {
          type: 'Real Estate',
          amount: 10000000,
          returns: 8
        },
        {
          type: 'Gold',
          amount: 2000000,
          returns: 7
        },
        {
          type: 'Stocks',
          amount: 1500000,
          returns: 15
        }
      ],
      bankAccounts: [
        {
          bank: 'HDFC Bank',
          accountType: 'Current',
          balance: 950000
        },
        {
          bank: 'SBI',
          accountType: 'Savings',
          balance: 350000
        }
      ],
      riskTolerance: 'high',
      financialGoals: ['wealth_creation', 'childrens_education', 'business_expansion'],
      festivalPlanning: {
        diwali: {
          budget: 100000,
          savingsGoal: 80000,
          currentSavings: 45000,
          expenses: [
            {
              category: 'Gifts',
              amount: 40000
            },
            {
              category: 'Decoration',
              amount: 15000
            },
            {
              category: 'Celebration',
              amount: 25000
            }
          ]
        }
      },
      seasonalPlanning: {
        summer: {
          budget: 150000,
          savingsGoal: 120000,
          currentSavings: 75000,
          expenses: [
            {
              category: 'Vacation',
              amount: 100000
            },
            {
              category: 'Summer Clothes',
              amount: 20000
            },
            {
              category: 'Activities',
              amount: 30000
            }
          ]
        }
      }
    },
    familyMembers: [
      {
        name: 'Neha Singh',
        relation: 'spouse',
        age: 40,
        occupation: 'Teacher',
        income: 50000,
        financialDependents: false
      },
      {
        name: 'Riya Singh',
        relation: 'child',
        age: 16,
        occupation: 'Student',
        income: 0,
        financialDependents: true
      },
      {
        name: 'Rohan Singh',
        relation: 'child',
        age: 12,
        occupation: 'Student',
        income: 0,
        financialDependents: true
      }
    ],
    subscription: sampleSubscriptions.Premium
  }
];

// App Configuration
export const appConfig = {
  versionNumber: '1.0.0',
  buildDate: '2025-05-15',
  supportEmail: 'support@wealthvani.com',
  maxGoals: 10,
  maxNudges: 20,
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'hi', 'hinglish', 'bn', 'ta', 'te', 'pa', 'ml', 'gu'],
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
