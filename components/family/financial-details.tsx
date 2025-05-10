import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  PiggyBank,
  CreditCard,
  TrendingUp,
} from 'lucide-react';

interface FinancialDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
}

// Mock financial data
const mockFinancialData = {
  totalBalance: 25000,
  monthlyIncome: 5000,
  monthlyExpenses: 3500,
  savings: {
    total: 15000,
    monthly: 1500,
    goal: 50000,
  },
  investments: [
    {
      id: 1,
      name: 'Fixed Deposit',
      amount: 10000,
      return: 7.5,
      maturity: '2025-01-01',
    },
    {
      id: 2,
      name: 'Mutual Funds',
      amount: 5000,
      return: 12.5,
      maturity: '2026-01-01',
    },
  ],
  expenses: [
    {
      id: 1,
      category: 'Housing',
      amount: 1500,
      percentage: 42.8,
    },
    {
      id: 2,
      category: 'Food',
      amount: 800,
      percentage: 22.8,
    },
    {
      id: 3,
      category: 'Transportation',
      amount: 500,
      percentage: 14.3,
    },
    {
      id: 4,
      category: 'Utilities',
      amount: 400,
      percentage: 11.4,
    },
    {
      id: 5,
      category: 'Entertainment',
      amount: 300,
      percentage: 8.7,
    },
  ],
};

export function FinancialDetails({
  isOpen,
  onClose,
  memberId,
}: FinancialDetailsProps) {
  // In the future, you can fetch real data using memberId
  const data = mockFinancialData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Financial Overview</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Balance
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{data.totalBalance.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Income
                </CardTitle>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{data.monthlyIncome.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Expenses
                </CardTitle>
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{data.monthlyExpenses.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Savings
                </CardTitle>
                <PiggyBank className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{data.savings.monthly.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="savings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="savings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Savings Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Current Savings</span>
                      <span className="font-medium">
                        ₹{data.savings.total.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={(data.savings.total / data.savings.goal) * 100}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Goal: ₹{data.savings.goal.toLocaleString()}</span>
                      <span>
                        {Math.round(
                          (data.savings.total / data.savings.goal) * 100
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.investments.map((investment) => (
                      <div
                        key={investment.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{investment.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Maturity:{' '}
                            {new Date(investment.maturity).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ₹{investment.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-green-500">
                            +{investment.return}% return
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.expenses.map((expense) => (
                      <div key={expense.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{expense.category}</span>
                          <span className="font-medium">
                            ₹{expense.amount.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={expense.percentage} />
                        <div className="text-right text-sm text-muted-foreground">
                          {expense.percentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
