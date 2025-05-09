
import { User, Goal, Nudge, Transaction } from './types';
import { sampleGoals, sampleNudges, sampleTransactions, sampleSubscriptions } from './mockData';

// Predefined user profiles with different use cases
export const predefinedUsers: User[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    password: 'password123',
    profileCreated: true,
    personalDetails: {
      age: 32,
      occupation: 'Software Engineer',
      familySize: 3,
      address: 'Koramangala, Bangalore',
      phoneNumber: '+91 9876543210',
      maritalStatus: 'married',
      dependents: 1,
      riskTolerance: 'medium',
      financialChallenges: ['Saving for retirement', 'Child education']
    },
    financialDetails: {
      totalIncome: 85000,
      incomeSources: {
        salary: 85000
      },
      expenses: {
        housing: 20000,
        food: 10000,
        transportation: 5000,
        utilities: 3000,
        entertainment: 5000,
        healthcare: 2000,
        education: 3000,
        misc: 4000
      },
      savings: 12000,
      investments: [
        { type: 'Mutual Funds', amount: 5000 },
        { type: 'PPF', amount: 3000 }
      ],
      debts: [
        { type: 'Home Loan', amount: 30000, interestRate: 8.5, monthlyPayment: 30000, remainingTenure: 180 }
      ],
      debtToIncomeRatio: 0.35,
      savingsRate: 0.14
    },
    goals: [...sampleGoals],
    savedNudges: sampleNudges.slice(0, 3),
    transactions: [...sampleTransactions],
    subscription: sampleSubscriptions.Basic
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    password: 'password123',
    profileCreated: true,
    personalDetails: {
      age: 28,
      occupation: 'Marketing Manager',
      familySize: 1,
      address: 'Indiranagar, Bangalore',
      phoneNumber: '+91 9988776655',
      maritalStatus: 'single',
      dependents: 0,
      riskTolerance: 'high',
      financialChallenges: ['Building emergency fund', 'Starting investments']
    },
    financialDetails: {
      totalIncome: 65000,
      incomeSources: {
        salary: 65000
      },
      expenses: {
        housing: 18000,
        food: 8000,
        transportation: 4000,
        utilities: 2500,
        entertainment: 6000,
        healthcare: 1500,
        education: 0,
        misc: 3000
      },
      savings: 10000,
      investments: [
        { type: 'Stocks', amount: 8000 },
        { type: 'Fixed Deposit', amount: 5000 }
      ],
      debts: [
        { type: 'Personal Loan', amount: 12000, interestRate: 12, monthlyPayment: 12000, remainingTenure: 24 }
      ],
      debtToIncomeRatio: 0.18,
      savingsRate: 0.15
    },
    goals: sampleGoals.slice(2, 5),
    savedNudges: sampleNudges.slice(3, 5),
    transactions: sampleTransactions.slice(3),
    subscription: sampleSubscriptions.Pro
  },
  {
    id: '3',
    name: 'Aditya Singh',
    email: 'aditya@example.com',
    password: 'password123',
    profileCreated: true,
    personalDetails: {
      age: 45,
      occupation: 'Business Owner',
      familySize: 4,
      address: 'HSR Layout, Bangalore',
      phoneNumber: '+91 9823456789',
      maritalStatus: 'married',
      dependents: 2,
      riskTolerance: 'medium',
      financialChallenges: ['Business expansion', 'Kids education']
    },
    financialDetails: {
      totalIncome: 150000,
      incomeSources: {
        business: 150000
      },
      expenses: {
        housing: 35000,
        food: 20000,
        transportation: 12000,
        utilities: 8000,
        entertainment: 15000,
        healthcare: 10000,
        education: 25000,
        misc: 10000
      },
      savings: 25000,
      investments: [
        { type: 'Real Estate', amount: 40000 },
        { type: 'Mutual Funds', amount: 15000 },
        { type: 'Gold', amount: 10000 }
      ],
      debts: [
        { type: 'Business Loan', amount: 50000, interestRate: 10, monthlyPayment: 50000, remainingTenure: 60 },
        { type: 'Car Loan', amount: 18000, interestRate: 9, monthlyPayment: 18000, remainingTenure: 36 }
      ],
      debtToIncomeRatio: 0.45,
      savingsRate: 0.17
    },
    goals: sampleGoals,
    savedNudges: sampleNudges.slice(0, 4),
    transactions: sampleTransactions,
    subscription: sampleSubscriptions.Premium
  }
];
