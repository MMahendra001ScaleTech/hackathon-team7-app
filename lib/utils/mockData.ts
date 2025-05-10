import { Transaction, Category, Investment, UpcomingPayment, AIInsight, DashboardData } from '../types';
import { addDays, subDays, format } from 'date-fns';

// Generate dates for the past 15 days
const getLast15Days = () => {
  return Array.from({ length: 15 }, (_, i) => {
    return format(subDays(new Date(), 14 - i), 'yyyy-MM-dd');
  });
};

const dates = getLast15Days();

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: 'user1',
    amount: 50000,
    type: 'income',
    category: 'salary',
    description: 'Monthly salary',
    date: dates[3],
    recurring: true,
    recurringFrequency: 'monthly',
  },
  {
    id: '2',
    userId: 'user1',
    amount: 2000,
    type: 'expense',
    category: 'food',
    description: 'Swiggy order',
    date: dates[5],
  },
  {
    id: '3',
    userId: 'user1',
    amount: 599,
    type: 'expense',
    category: 'subscriptions',
    description: 'Netflix subscription',
    date: dates[7],
    recurring: true,
    recurringFrequency: 'monthly',
  },
  {
    id: '4',
    userId: 'user1',
    amount: 15000,
    type: 'expense',
    category: 'rent',
    description: 'House rent',
    date: dates[8],
    recurring: true,
    recurringFrequency: 'monthly',
  },
  {
    id: '5',
    userId: 'user1',
    amount: 500,
    type: 'expense',
    category: 'groceries',
    description: 'Milk and bread',
    date: dates[9],
    familyMember: 'Mom',
  },
  {
    id: '6',
    userId: 'user1',
    amount: 10000,
    type: 'income',
    category: 'investment',
    description: 'Dividend from stocks',
    date: dates[10],
  },
  {
    id: '7',
    userId: 'user1',
    amount: 1200,
    type: 'expense',
    category: 'transport',
    description: 'Uber rides',
    date: dates[12],
  },
  {
    id: '8',
    userId: 'user1',
    amount: 5000,
    type: 'expense',
    category: 'shopping',
    description: 'New clothes',
    date: dates[13],
    familyMember: 'Dad',
  },
  {
    id: '9',
    userId: 'user1',
    amount: 20,
    type: 'expense',
    category: 'food',
    description: 'Tea at local shop',
    date: dates[14],
  },
];

// Mock investments data
export const mockInvestments: Investment[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'SBI Fixed Deposit',
    amount: 100000,
    type: 'FD',
    startDate: subDays(new Date(), 180).toISOString(),
    endDate: addDays(new Date(), 180).toISOString(),
    returnRate: 6.5,
    familyMember: 'Dad',
    goal: 'Emergency Fund',
  },
  {
    id: '2',
    userId: 'user1',
    name: 'HDFC Mutual Fund',
    amount: 50000,
    type: 'mutual_funds',
    startDate: subDays(new Date(), 365).toISOString(),
    returnRate: 12,
    familyMember: 'Self',
    goal: 'Retirement',
    growthRate: 15,
  },
  {
    id: '3',
    userId: 'user1',
    name: 'Reliance SIP',
    amount: 5000,
    type: 'SIP',
    startDate: subDays(new Date(), 400).toISOString(),
    returnRate: 10,
    familyMember: 'Mom',
    goal: 'Child Education',
    growthRate: 12,
  },
  {
    id: '4',
    userId: 'user1',
    name: 'TCS Stocks',
    amount: 75000,
    type: 'stocks',
    startDate: subDays(new Date(), 200).toISOString(),
    returnRate: 8,
    familyMember: 'Self',
    growthRate: 7,
  },
];

// Mock upcoming payments
export const mockUpcomingPayments: UpcomingPayment[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'House Rent',
    amount: 15000,
    dueDate: addDays(new Date(), 3).toISOString(),
    category: 'rent',
    isPaid: false,
    isRecurring: true,
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Electricity Bill',
    amount: 2500,
    dueDate: addDays(new Date(), 5).toISOString(),
    category: 'bills',
    isPaid: false,
    isRecurring: true,
  },
  {
    id: '3',
    userId: 'user1',
    title: 'SIP Investment',
    amount: 5000,
    dueDate: addDays(new Date(), 7).toISOString(),
    category: 'investment',
    isPaid: false,
    isRecurring: true,
  },
];

// Mock AI insights
export const mockInsights: AIInsight[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'spending',
    title: 'Food expenses increased',
    description: 'You spent 23% more on Swiggy this month. Shall we chill?',
    date: new Date().toISOString(),
    category: 'food',
    change: 23,
    isRead: false,
  },
  {
    id: '2',
    userId: 'user1',
    type: 'saving',
    title: 'Good job on saving!',
    description: 'You\'ve saved ₹10,000 more this month compared to last month.',
    date: new Date().toISOString(),
    change: 15,
    isRead: false,
  },
  {
    id: '3',
    userId: 'user1',
    type: 'suggestion',
    title: 'Consider investing in SIP',
    description: 'Based on your saving patterns, you can start a SIP of ₹5,000.',
    date: new Date().toISOString(),
    isRead: false,
  },
];

// Mock dashboard data
export const mockDashboardData: DashboardData = {
  transactions: mockTransactions,
  upcomingPayments: mockUpcomingPayments,
  insights: mockInsights,
  netWorth: {
    amount: 245000,
    change: 5.2,
  },
  monthlySpending: {
    amount: 24319,
    change: -3.5,
  },
  monthlySavings: {
    amount: 25681,
    change: 12.8,
  },
};