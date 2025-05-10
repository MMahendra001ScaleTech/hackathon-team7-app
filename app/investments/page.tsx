'use client';

import { AppShell } from '@/components/layout/app-shell';
import { InvestmentTable } from '@/components/investments/investment-table';

import { mockInvestments } from '@/lib/utils/mockData';

export default function InvestmentsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Investments</h1>
        
        <InvestmentTable investments={mockInvestments} />
      </div>
    </AppShell>
  );
}