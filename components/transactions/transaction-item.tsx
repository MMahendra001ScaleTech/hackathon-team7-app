'use client';

import { Transaction } from '@/lib/types';
import { formatCurrency, formatTime, getCategoryEmoji } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';

interface TransactionItemProps {
  transaction: Transaction;
  showDate?: boolean;
}

export function TransactionItem({ transaction, showDate = false }: TransactionItemProps) {
  const { type, amount, category, description, date, familyMember } = transaction;

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 transition-all hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-lg">
          {getCategoryEmoji(category)}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{description}</h4>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="capitalize">{category}</span>
            {familyMember && (
              <span className="ml-2">• {familyMember}</span>
            )}
            {showDate && (
              <span className="ml-2">• {formatTime(date)}</span>
            )}
          </div>
        </div>
      </div>
      <div className={cn(
        'font-medium',
        type === 'income' ? 'text-green-600' : 'text-red-600'
      )}>
        {type === 'income' ? '+' : '-'} {formatCurrency(amount)}
      </div>
    </div>
  );
}