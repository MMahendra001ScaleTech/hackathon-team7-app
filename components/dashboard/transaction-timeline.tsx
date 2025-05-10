'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/lib/types';
import { TransactionItem } from '@/components/transactions/transaction-item';
import { formatCurrency } from '@/lib/utils/formatters';

interface TransactionTimelineProps {
  transactions: Transaction[];
}

export function TransactionTimeline({ transactions }: TransactionTimelineProps) {
  // Group transactions by date
  const groupedTransactions: Record<string, Transaction[]> = {};
  
  transactions.forEach((transaction) => {
    const date = transaction.date.substring(0, 10); // YYYY-MM-DD
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [];
    }
    groupedTransactions[date].push(transaction);
  });

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort().reverse();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedDates.length / itemsPerPage);
  
  const paginatedDates = sortedDates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {paginatedDates.map((date) => {
          const dailyTransactions = groupedTransactions[date];
          const formattedDate = format(new Date(date), 'EEEE, d MMMM yyyy');
          
          // Calculate daily total
          const dailyTotal = dailyTransactions.reduce((total, t) => {
            return total + (t.type === 'income' ? t.amount : -t.amount);
          }, 0);

          return (
            <div key={date} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{formattedDate}</h3>
                <span className={`text-sm font-medium ${dailyTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(dailyTotal)}
                </span>
              </div>
              <div className="space-y-3">
                {dailyTransactions.map((transaction) => (
                  <TransactionItem 
                    key={transaction.id} 
                    transaction={transaction} 
                  />
                ))}
              </div>
            </div>
          );
        })}

        {paginatedDates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No transactions found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}