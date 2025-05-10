'use client';

import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Investment } from '@/lib/types';
import { formatCurrency, formatDate, formatPercentage } from '@/lib/utils/formatters';
import { ChevronDown, Filter, Search, MoreHorizontal } from 'lucide-react';

interface InvestmentTableProps {
  investments: Investment[];
}

export function InvestmentTable({ investments }: InvestmentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

  // Get unique investment types
  const investmentTypes = useMemo(() => {
    const types = new Set<string>();
    investments.forEach(investment => {
      types.add(investment.type);
    });
    return Array.from(types);
  }, [investments]);

  // Get unique family members
  const familyMembers = useMemo(() => {
    const members = new Set<string>();
    investments.forEach(investment => {
      if (investment.familyMember) {
        members.add(investment.familyMember);
      }
    });
    return Array.from(members);
  }, [investments]);

  // Get unique goals
  const goals = useMemo(() => {
    const goalSet = new Set<string>();
    investments.forEach(investment => {
      if (investment.goal) {
        goalSet.add(investment.goal);
      }
    });
    return Array.from(goalSet);
  }, [investments]);

  // Filter investments
  const filteredInvestments = useMemo(() => {
    return investments.filter(investment => {
      // Apply search term filter
      if (searchTerm && !investment.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Apply investment type filter
      if (filterType && investment.type !== filterType) {
        return false;
      }

      return true;
    });
  }, [investments, searchTerm, filterType]);

  // Calculate total investment amount
  const totalInvestment = useMemo(() => {
    return filteredInvestments.reduce((total, investment) => total + investment.amount, 0);
  }, [filteredInvestments]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Investments</CardTitle>
            <CardDescription>
              Track and manage all your investments in one place
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search investments..."
                className="pl-9 w-full sm:w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterType(null)}>
                  All Types
                </DropdownMenuItem>
                {investmentTypes.map((type) => (
                  <DropdownMenuItem 
                    key={type} 
                    onClick={() => setFilterType(type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Add Investment
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[130px]">Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Family Member</TableHead>
              <TableHead className="hidden md:table-cell">Start Date</TableHead>
              <TableHead className="hidden md:table-cell">Return Rate</TableHead>
              <TableHead className="hidden lg:table-cell">Goal</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvestments.length > 0 ? (
              filteredInvestments.map((investment) => (
                <TableRow key={investment.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{investment.name}</TableCell>
                  <TableCell>{formatCurrency(investment.amount)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset">
                      {investment.type}
                    </span>
                  </TableCell>
                  <TableCell>{investment.familyMember || '-'}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(investment.startDate)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {investment.returnRate ? formatPercentage(investment.returnRate) : '-'}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{investment.goal || '-'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No investments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Total {filteredInvestments.length} investments
          </div>
          <div className="text-sm font-medium">
            Total Value: {formatCurrency(totalInvestment)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}