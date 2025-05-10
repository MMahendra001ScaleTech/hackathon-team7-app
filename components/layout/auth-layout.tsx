import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function AuthLayout({ children, title, description, className }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100 p-4">
      <div 
        className={cn(
          "w-full max-w-md rounded-2xl bg-white p-8 shadow-lg",
          className
        )}
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-orange-100 p-3 flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-orange-500 h-8 w-8"
            >
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-center text-sm text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}