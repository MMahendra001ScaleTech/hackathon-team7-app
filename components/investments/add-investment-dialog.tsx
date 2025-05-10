'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Investment } from '@/lib/types';
import { toast } from 'sonner';

interface AddInvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  amount: z.coerce.number().positive('Amount must be positive'),
  type: z.enum([
    'FD',
    'SIP',
    'stocks',
    'mutual_funds',
    'real_estate',
    'gold',
    'other',
  ]),
  startDate: z.string(),
  endDate: z.string().optional(),
  returnRate: z.coerce.number().min(0).max(100).optional(),
  familyMember: z.string().optional(),
  goal: z.string().optional(),
  growthRate: z.coerce.number().min(0).max(100).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddInvestmentDialog({
  open,
  onOpenChange,
}: AddInvestmentDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 0,
      type: 'FD',
      startDate: new Date().toISOString().split('T')[0],
      returnRate: 0,
      growthRate: 0,
    },
  });

  const onSubmit = (values: FormValues) => {
    // Create new investment
    const newInvestment: Partial<Investment> = {
      name: values.name,
      amount: values.amount,
      type: values.type,
      startDate: values.startDate,
      endDate: values.endDate,
      returnRate: values.returnRate,
      familyMember: values.familyMember,
      goal: values.goal,
      growthRate: values.growthRate,
    };

    console.log('New investment:', newInvestment);

    // Show success toast
    toast.success('Investment added successfully!');

    // Reset form and close dialog
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Investment</DialogTitle>
          <DialogDescription>
            Record your investment details to track your portfolio.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter investment name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      className="text-right text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select investment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FD">Fixed Deposit</SelectItem>
                      <SelectItem value="SIP">SIP</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="mutual_funds">Mutual Funds</SelectItem>
                      <SelectItem value="real_estate">Real Estate</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="returnRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Rate (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        className="text-right"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="growthRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Growth Rate (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        className="text-right"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="familyMember"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Member (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select family member" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Self">Self</SelectItem>
                      <SelectItem value="Spouse">Spouse</SelectItem>
                      <SelectItem value="Dad">Dad</SelectItem>
                      <SelectItem value="Mom">Mom</SelectItem>
                      <SelectItem value="Son">Son</SelectItem>
                      <SelectItem value="Daughter">Daughter</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Goal (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter investment goal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Investment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
