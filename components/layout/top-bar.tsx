'use client';

import { useState } from 'react';
import { Menu, Bell, PlusCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddTransactionDialog } from '@/components/transactions/add-transaction-dialog';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        className="text-gray-500 hover:text-gray-900 lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="text-gray-500 hover:text-gray-900"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <Button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-full bg-orange-600 hover:bg-orange-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full border border-gray-200 p-0"
            >
              <User className="h-5 w-5 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AddTransactionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}