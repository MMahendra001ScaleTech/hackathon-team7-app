'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { SpendingChart } from '@/components/analytics/spending-chart';
import { NetWorthChart } from '@/components/analytics/net-worth-chart';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/formatters';
import { mockTransactions, mockInvestments } from '@/lib/utils/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  // Calculate spending by category
  const spendingByCategory = mockTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieChartData = Object.entries(spendingByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate spending by family member
  const spendingByFamilyMember = mockTransactions
    .filter((t) => t.type === 'expense' && t.familyMember)
    .reduce((acc, transaction) => {
      const member = transaction.familyMember || 'Unknown';
      if (!acc[member]) {
        acc[member] = 0;
      }
      acc[member] += transaction.amount;
      return acc;
    }, { 'Self': 0 } as Record<string, number>);

  const memberPieData = Object.entries(spendingByFamilyMember).map(([name, value]) => ({
    name,
    value,
  }));

  // Colors for charts
  const COLORS = ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#073B4C', '#F72585', '#7209B7'];

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <NetWorthChart transactions={mockTransactions} />
                <SpendingChart transactions={mockTransactions} />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Spending by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => 
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [formatCurrency(value), 'Amount']} 
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Spending by Family Member</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={memberPieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => 
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {memberPieData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [formatCurrency(value), 'Amount']} 
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="spending" className="space-y-6">
              <SpendingChart transactions={mockTransactions} />
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <NetWorthChart transactions={mockTransactions} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppShell>
  );
}