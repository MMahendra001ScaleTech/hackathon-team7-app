'use client';

import { useState } from 'react';
import { CalendarIcon, CheckCircle2, Clock } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { UpcomingPayment } from '@/lib/types';
import { formatCurrency, formatDate, getCategoryEmoji } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface UpcomingPaymentsCardProps {
  payments: UpcomingPayment[];
}

export function UpcomingPaymentsCard({ payments }: UpcomingPaymentsCardProps) {
  const [markedAsPaid, setMarkedAsPaid] = useState<Record<string, boolean>>({});

  const handleMarkAsPaid = (id: string) => {
    setMarkedAsPaid((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Sort payments by due date
  const sortedPayments = [...payments].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="text-xl">Upcoming Payments</CardTitle>
        <CalendarIcon className="ml-auto h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        {sortedPayments.length > 0 ? (
          sortedPayments.map((payment) => {
            const isPaid = markedAsPaid[payment.id] || payment.isPaid;
            
            return (
              <div 
                key={payment.id} 
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-lg">
                    {getCategoryEmoji(payment.category)}
                  </div>
                  <div>
                    <h4 className="font-medium">{payment.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" /> 
                      Due {formatDate(payment.dueDate)}
                      {payment.isRecurring && (
                        <Badge variant="outline" className="ml-2 text-xs">Recurring</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-right">
                    <div className="font-medium">{formatCurrency(payment.amount)}</div>
                  </div>
                  {isPaid ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleMarkAsPaid(payment.id)}
                      className="h-7 text-xs"
                    >
                      Pay
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-muted-foreground">No upcoming payments.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}