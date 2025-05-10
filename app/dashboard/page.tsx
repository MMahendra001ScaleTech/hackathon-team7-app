'use client';

import { formatCurrency } from '@/lib/utils/formatters';
import { AppShell } from '@/components/layout/app-shell';
import { StatsCard } from '@/components/dashboard/stats-card';
import { TransactionTimeline } from '@/components/dashboard/transaction-timeline';
import { UpcomingPaymentsCard } from '@/components/dashboard/upcoming-payments-card';
import { InsightsCard } from '@/components/dashboard/insights-card';
import { SpendingChart } from '@/components/analytics/spending-chart';
import { Wallet, TrendingUp, ArrowDownRight, Landmark } from 'lucide-react';

import { mockDashboardData } from '@/lib/utils/mockData';

export default function DashboardPage() {
  const {
    transactions,
    upcomingPayments,
    insights,
    netWorth,
    monthlySpending,
    monthlySavings,
  } = mockDashboardData;

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* <StatsCard
            title="Net Worth"
            value={formatCurrency(netWorth.amount)}
            change={netWorth.change}
            icon={<Landmark className="h-5 w-5 text-orange-500" />}
          /> */}
          <StatsCard
            title="Monthly Spending"
            value={formatCurrency(monthlySpending.amount)}
            change={monthlySpending.change}
            icon={<ArrowDownRight className="h-5 w-5 text-orange-500" />}
          />
          <StatsCard
            title="Monthly Savings"
            value={formatCurrency(monthlySavings.amount)}
            change={monthlySavings.change}
            icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
          />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Left Column: Timeline */}
          <div className="lg:col-span-4 space-y-6">
            <TransactionTimeline transactions={transactions} />
            <SpendingChart transactions={transactions} />
          </div>

          {/* Right Column: Upcoming Payments & Insights */}
          <div className="lg:col-span-3 space-y-6">
            <UpcomingPaymentsCard payments={upcomingPayments} />
            <InsightsCard insights={insights} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
