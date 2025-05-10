'use client';

import { useMemo, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Transaction, Category } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatters';

interface SpendingChartProps {
  transactions: Transaction[];
}

export function SpendingChart({ transactions }: SpendingChartProps) {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const data = useMemo(() => {
    // Filter expenses only
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Group expenses by category
    const expensesByCategory: Record<Category, number> = {} as Record<Category, number>;
    
    expenses.forEach(expense => {
      if (!expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] = 0;
      }
      expensesByCategory[expense.category] += expense.amount;
    });
    
    // Transform into chart data
    return Object.entries(expensesByCategory)
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5); // Top 5 categories
  }, [transactions, period]);

  const colors = [
    '#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#073B4C',
    '#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">Spending by Category</CardTitle>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as 'week' | 'month' | 'year')}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 30,
              }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="category" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value).replace('₹', '')}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Amount']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' 
                }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}