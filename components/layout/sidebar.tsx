'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LucideHome,
  Wallet,
  TrendingUp,
  BarChart3,
  Settings,
  Lightbulb,
  LogOut,
  X,
  Users,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LucideHome,
    },
    {
      name: 'Transactions',
      href: '/transactions',
      icon: Wallet,
    },
    {
      name: 'Investments',
      href: '/investments',
      icon: TrendingUp,
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
    },
    {
      name: 'Family',
      href: '/family',
      icon: Users,
    },
    {
      name: 'Insights',
      href: '/insights',
      icon: Lightbulb,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-none',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/dashboard" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-orange-500 h-5 w-5"
              >
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">AI-vaala Galla</span>
          </Link>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-900"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all',
                pathname === item.href
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  pathname === item.href ? 'text-orange-600' : 'text-gray-500 group-hover:text-orange-600'
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <Link
            href="/auth/login"
            className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-500" />
            Log out
          </Link>
        </div>
      </div>
    </aside>
  );
}