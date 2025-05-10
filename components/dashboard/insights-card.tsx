'use client';

import { useState } from 'react';
import { Lightbulb, LightbulbOff, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AIInsight } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDate, getChangeColor } from '@/lib/utils/formatters';

interface InsightsCardProps {
  insights: AIInsight[];
}

export function InsightsCard({ insights }: InsightsCardProps) {
  const [dismissedInsights, setDismissedInsights] = useState<Record<string, boolean>>({});

  const handleDismiss = (id: string) => {
    setDismissedInsights((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const activeInsights = insights.filter((insight) => !dismissedInsights[insight.id]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="text-xl">AI Insights</CardTitle>
        <Lightbulb className="ml-auto h-5 w-5 text-yellow-500" />
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        {activeInsights.length > 0 ? (
          activeInsights.map((insight) => (
            <div
              key={insight.id}
              className={cn(
                "relative rounded-lg border p-4",
                insight.type === 'spending' ? 'border-red-100 bg-red-50' :
                insight.type === 'saving' ? 'border-green-100 bg-green-50' :
                insight.type === 'investment' ? 'border-blue-100 bg-blue-50' :
                'border-yellow-100 bg-yellow-50'
              )}
            >
              <button
                onClick={() => handleDismiss(insight.id)}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-1 flex items-center">
                <h3 className="font-medium">{insight.title}</h3>
              </div>
              <p className="text-sm">{insight.description}</p>
              {insight.change !== undefined && (
                <div className={cn('mt-2 text-xs font-medium', getChangeColor(insight.change))}>
                  {insight.change > 0 ? '↑' : '↓'} {Math.abs(insight.change)}%
                </div>
              )}
              <div className="mt-1 text-xs text-gray-500">
                {formatDate(insight.date)}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <LightbulbOff className="mb-2 h-8 w-8 text-muted-foreground opacity-40" />
            <p className="text-muted-foreground">No insights available right now.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}