
import { User, Goal, Nudge, Transaction, SubscriptionPlan } from './types';

// Generate a unique ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Sample goals data
export const sampleGoals: Goal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 50000,
    deadline: '2027-05-19',
    priority: 'high',
    category: 'emergency',
    progress: 10,
    savedAmount: 5000,
    // For backwards compatibility
    name: 'emergency_fund',
    cost: 50000,
    timelineYears: 2,
    monthlySavings: 2000,
    investment: 'liquid_fund'
  },
  {
    id: '2',
    title: 'Buy Home',
    targetAmount: 4000000,
    deadline: '2032-05-19',
    priority: 'medium',
    category: 'housing',
    progress: 16,
    savedAmount: 640000,
    // For backwards compatibility
    name: 'buy_home',
    cost: 4000000,
    timelineYears: 7,
    monthlySavings: 5000,
    investment: 'equity_sip'
  },
  {
    id: '3',
    title: 'Education Fund',
    targetAmount: 500000,
    deadline: '2030-05-19',
    priority: 'medium',
    category: 'education',
    progress: 12,
    savedAmount: 60000,
    // For backwards compatibility
    name: 'education_fund',
    cost: 500000,
    timelineYears: 5,
    monthlySavings: 3000,
    investment: 'fixed_deposit'
  },
  {
    id: '4',
    title: 'Retirement Plan',
    targetAmount: 2000000,
    deadline: '2035-05-19',
    priority: 'low',
    category: 'retirement',
    progress: 8,
    savedAmount: 160000,
    // For backwards compatibility
    name: 'retirement_plan',
    cost: 2000000,
    timelineYears: 10,
    monthlySavings: 4000,
    investment: 'mutual_funds'
  }
];

// Sample nudges data
export const sampleNudges: Nudge[] = [
  {
    id: '1',
    title: 'Start Emergency Fund',
    description: 'Start your ₹500/month emergency fund today!',
    category: 'savings',
    relevanceScore: 9.5,
    actionLink: '/goals/emergency',
    isActionable: true,
    goalId: '1',
    message: 'Start your ₹500/month emergency fund today!',
    priority: 'high',
    schedule: '2025-05-10T10:00:00+00:00',
    type: 'reminder',
    action: 'Start Fund',
    saved: false,
    autoActionEnabled: false
  },
  {
    id: '2',
    title: 'Increase Emergency Fund',
    description: 'Contribute ₹2000/month to your emergency fund!',
    category: 'savings',
    relevanceScore: 8.7,
    actionLink: '/goals/emergency',
    isActionable: true,
    goalId: '1',
    message: 'Contribute ₹2000/month to your emergency fund!',
    priority: 'high',
    schedule: '2025-05-12T10:00:00+00:00',
    type: 'opportunity',
    action: 'Increase Contribution',
    saved: false,
    autoActionEnabled: false
  },
  {
    id: '3',
    title: 'Home Savings Plan',
    description: 'Save ₹5000/month towards your home in 7 years!',
    category: 'housing',
    relevanceScore: 9.0,
    actionLink: '/goals/housing',
    isActionable: true,
    goalId: '2',
    message: 'Save ₹5000/month towards your buy_home in 7 years!',
    priority: 'medium',
    schedule: '2025-05-14T10:00:00+00:00',
    type: 'reminder',
    action: 'Setup Auto-save',
    saved: false,
    autoActionEnabled: false
  },
  {
    id: '4',
    title: 'Housing Budget Options',
    description: 'Consider lowering price or choosing a cheaper location.',
    category: 'housing',
    relevanceScore: 7.5,
    actionLink: '/goals/housing',
    isActionable: true,
    goalId: '2',
    message: 'Consider lowering price or choosing a cheaper location. (for buy_home)',
    priority: 'high',
    schedule: '2025-05-20T10:00:00+00:00',
    type: 'tip',
    action: 'Explore Options',
    saved: false,
    autoActionEnabled: false
  },
  {
    id: '5',
    title: 'Education Savings Plan',
    description: 'Save ₹3000/month towards your education fund in 5 years!',
    category: 'education',
    relevanceScore: 8.2,
    actionLink: '/goals/education',
    isActionable: true,
    goalId: '3',
    message: 'Save ₹3000/month towards your education_fund in 5 years!',
    priority: 'medium',
    schedule: '2025-05-16T10:00:00+00:00',
    type: 'reminder',
    action: 'Setup SIP',
    saved: false,
    autoActionEnabled: false
  },
  {
    id: '6',
    title: 'Education Options',
    description: 'Consider lower-cost education options.',
    category: 'education',
    relevanceScore: 7.0,
    actionLink: '/goals/education',
    isActionable: true,
    goalId: '3',
    message: 'Consider lowering price or choosing a cheaper location. (for education_fund)',
    priority: 'high',
    schedule: '2025-05-22T10:00:00+00:00',
    type: 'risk',
    action: 'Review Options',
    saved: false,
    autoActionEnabled: false
  },
  {
    id: '7',
    title: 'Retirement Plan Setup',
    description: 'Save ₹4000/month towards your retirement in 10 years!',
    category: 'retirement',
    relevanceScore: 9.2,
    actionLink: '/goals/retirement',
    isActionable: true,
    goalId: '4',
    message: 'Save ₹4000/month towards your retirement_plan in 10 years!',
    priority: 'medium',
    schedule: '2025-05-18T10:00:00+00:00',
    type: 'opportunity',
    action: 'Setup SIP',
    saved: false,
    autoActionEnabled: false
  },
  {
    id: '8',
    title: 'Retirement Options',
    description: 'Consider optimizing your retirement strategy.',
    category: 'retirement',
    relevanceScore: 8.0,
    actionLink: '/goals/retirement',
    isActionable: true,
    goalId: '4',
    message: 'Consider lowering price or choosing a cheaper location. (for retirement_plan)',
    priority: 'high',
    schedule: '2025-05-24T10:00:00+00:00',
    type: 'tip',
    action: 'Explore Options',
    saved: false,
    autoActionEnabled: false
  }
];

// Sample transactions data
export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-05-01',
    amount: 52000,
    type: 'credit',
    category: 'salary',
    description: 'Monthly Salary',
    account: 'current'
  },
  {
    id: '2',
    date: '2025-05-03',
    amount: 12000,
    type: 'debit',
    category: 'rent',
    description: 'Monthly Rent',
    account: 'current'
  },
  {
    id: '3',
    date: '2025-05-05',
    amount: 5000,
    type: 'debit',
    category: 'groceries',
    description: 'Monthly Groceries',
    account: 'current'
  },
  {
    id: '4',
    date: '2025-05-07',
    amount: 3000,
    type: 'debit',
    category: 'commute',
    description: 'Monthly Transport',
    account: 'current'
  },
  {
    id: '5',
    date: '2025-05-10',
    amount: 12000,
    type: 'debit',
    category: 'emis',
    description: 'Car Loan EMI',
    account: 'current'
  },
  {
    id: '6',
    date: '2025-05-15',
    amount: 10000,
    type: 'debit',
    category: 'school_fees',
    description: 'School Fees',
    account: 'current'
  },
  {
    id: '7',
    date: '2025-05-20',
    amount: 5000,
    type: 'debit',
    category: 'utilities',
    description: 'Electricity & Water Bills',
    account: 'current'
  },
  {
    id: '8',
    date: '2025-05-25',
    amount: 5000,
    type: 'debit',
    category: 'misc',
    description: 'Miscellaneous Expenses',
    account: 'current'
  },
  {
    id: '9',
    date: '2025-05-02',
    amount: 2000,
    type: 'debit',
    category: 'investment',
    description: 'Emergency Fund SIP',
    account: 'savings'
  },
  {
    id: '10',
    date: '2025-05-02',
    amount: 5000,
    type: 'debit',
    category: 'investment',
    description: 'Home Fund SIP',
    account: 'investment'
  }
];

// Sample subscription data
export const sampleSubscriptions: Record<string, SubscriptionPlan> = {
  Basic: {
    plan: 'Basic',
    pricePerMonth: 0,
    features: [
      'auto_tracking_expenses_cash_flow',
      'limited_proactive_nudges',
      'auto_save_suggestions',
      'affordable_financial_advisory_on_demand',
      'privacy_first_non_advisory'
    ],
    nudgesRemaining: 3,
    upgradeOptions: [
      {
        plan: 'Pro',
        pricePerMonth: 199,
        features: [
          'goal_based_suggestions_actions',
          'cash_flow_forecasting',
          'income_aware_advice',
          'unlimited_nudges',
          'festival_season_based_planning',
          'one_tap_actions',
          'tax_reports'
        ]
      },
      {
        plan: 'Premium',
        pricePerMonth: 499,
        features: [
          'works_for_families',
          'monthly_reports_detailed_analytics',
          'investment_intelligence_execution'
        ]
      }
    ]
  },
  Pro: {
    plan: 'Pro',
    pricePerMonth: 199,
    features: [
      'auto_tracking_expenses_cash_flow',
      'limited_proactive_nudges',
      'auto_save_suggestions',
      'affordable_financial_advisory_on_demand',
      'privacy_first_non_advisory',
      'goal_based_suggestions_actions',
      'cash_flow_forecasting',
      'income_aware_advice',
      'unlimited_nudges',
      'festival_season_based_planning',
      'one_tap_actions',
      'tax_reports'
    ],
    upgradeOptions: [
      {
        plan: 'Premium',
        pricePerMonth: 499,
        features: [
          'works_for_families',
          'monthly_reports_detailed_analytics',
          'investment_intelligence_execution'
        ]
      }
    ]
  },
  Premium: {
    plan: 'Premium',
    pricePerMonth: 499,
    features: [
      'auto_tracking_expenses_cash_flow',
      'limited_proactive_nudges',
      'auto_save_suggestions',
      'affordable_financial_advisory_on_demand',
      'privacy_first_non_advisory',
      'goal_based_suggestions_actions',
      'cash_flow_forecasting',
      'income_aware_advice',
      'unlimited_nudges',
      'festival_season_based_planning',
      'one_tap_actions',
      'tax_reports',
      'works_for_families',
      'monthly_reports_detailed_analytics',
      'investment_intelligence_execution'
    ],
    upgradeOptions: []
  }
};
