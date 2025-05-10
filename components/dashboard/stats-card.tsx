import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getChangeColor } from '@/lib/utils/formatters';

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  change?: number;
  loading?: boolean;
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  change,
  loading = false,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-9 w-24 animate-pulse rounded bg-gray-200" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {typeof change !== 'undefined' && (
          <p className={cn('mt-2 flex items-center text-xs', getChangeColor(change))}>
            {change > 0 ? '↑' : change < 0 ? '↓' : ''}
            {Math.abs(change)}%
            <span className="ml-1 text-muted-foreground">from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}