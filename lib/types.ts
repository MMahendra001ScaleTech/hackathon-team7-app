export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  category: Category;
  description: string;
  date: string;
  recurring?: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  familyMember?: string;
}

export type Category = 
  | 'salary' 
  | 'investment' 
  | 'gift' 
  | 'food' 
  | 'transport' 
  | 'entertainment' 
  | 'shopping' 
  | 'bills' 
  | 'rent' 
  | 'healthcare' 
  | 'education' 
  | 'groceries' 
  | 'subscriptions' 
  | 'savings' 
  | 'other';

export interface Investment {
  id: string;
  userId: string;
  name: string;
  amount: number;
  type: 'FD' | 'SIP' | 'stocks' | 'mutual_funds' | 'real_estate' | 'gold' | 'other';
  startDate: string;
  endDate?: string;
  returnRate?: number;
  familyMember?: string;
  goal?: string;
  growthRate?: number;
}

export interface UpcomingPayment {
  id: string;
  userId: string;
  title: string;
  amount: number;
  dueDate: string;
  category: Category;
  isPaid: boolean;
  isRecurring: boolean;
}

export interface AIInsight {
  id: string;
  userId: string;
  type: 'spending' | 'saving' | 'investment' | 'suggestion';
  title: string;
  description: string;
  date: string;
  category?: Category;
  change?: number;
  isRead: boolean;
}

export interface DashboardData {
  transactions: Transaction[];
  upcomingPayments: UpcomingPayment[];
  insights: AIInsight[];
  netWorth: {
    amount: number;
    change: number;
  };
  monthlySpending: {
    amount: number;
    change: number;
  };
  monthlySavings: {
    amount: number;
    change: number;
  };
}