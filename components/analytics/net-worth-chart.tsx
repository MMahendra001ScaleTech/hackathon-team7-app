'use client';

import { useMemo, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Transaction } from '@/lib/types';
import { formatCurrency, formatShortDate } from '@/lib/utils/formatters';
import { subDays, startOfDay, eachDayOfInterval } from 'date-fns';

interface NetWorthChartProps {
  transactions: Transaction[];
  initialBalance?: number;
}

export function NetWorthChart({ transactions, initialBalance = 100000 }: NetWorthChartProps) {
  const [timeRange, setTimeRange] = useState<'15d' | '30d' | '90d'>('15d');

  const days = timeRange === '15d' ? 15 : timeRange === '30d' ? 30 : 90;

  const data = useMemo(() => {
    const startDate = startOfDay(subDays(new Date(), days));
    const endDate = startOfDay(new Date());
    
    // Generate all dates in the selected interval
    const allDates = eachDayOfInterval({ start: startDate, end: endDate });
    
    // Create a map of dates to balance changes
    const dateMap: Record<string, number> = {};
    allDates.forEach(date => {
      const dateString = date.toISOString().split('T')[0];
      dateMap[dateString] = 0;
    });
    
    // Add transaction amounts to the appropriate dates
    transactions.forEach(transaction => {
      const transactionDate = transaction.date.split('T')[0];
      if (dateMap[transactionDate] !== undefined) {
        dateMap[transactionDate] += transaction.type === 'income' ? transaction.amount : -transaction.amount;
      }
    });
    
    // Convert to cumulative balance
    let balance = initialBalance;
    return Object.entries(dateMap).map(([date, change]) => {
      balance += change;
      return {
        date,
        balance,
        formattedDate: formatShortDate(date),
      };
    });
  }, [transactions, initialBalance, days]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">Net Worth Trend</CardTitle>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as '15d' | '30d' | '90d')}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15d">Last 15 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(value).replace('₹', '')}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value as number), 'Balance']}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' 
                }}
              />
              <ReferenceLine y={0} stroke="#666" />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#FF6B6B"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}