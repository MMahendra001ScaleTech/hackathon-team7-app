'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
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
        </div>
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#features" className="text-gray-600 hover:text-orange-600">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-orange-600">How it Works</a>
          <a href="#testimonials" className="text-gray-600 hover:text-orange-600">Testimonials</a>
        </nav>
        <div className="flex items-center space-x-3">
          <Link href="/auth/login">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Excel and Tally? Bhai, those are for CA uncles 👴
            </h1>
            <p className="mt-6 text-lg text-gray-700">
              We built a personal finance manager that feels like family — not a spreadsheet. 
              Our AI-vaala Galla 💱 tracks your OTT, doodh 🥛, and even ₹20 daily savings 💰.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/auth/register">
                <Button className="w-full sm:w-auto text-lg py-6 bg-orange-600 hover:bg-orange-700">
                  Start for Free
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto text-lg py-6">
                See How it Works
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative h-[500px]">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-orange-100 rounded-3xl overflow-hidden shadow-xl">
              <Image 
                src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg"
                alt="Financial Management"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[350px] h-[300px] bg-blue-100 rounded-3xl overflow-hidden shadow-xl">
              <Image 
                src="https://images.pexels.com/photos/6694622/pexels-photo-6694622.jpeg"
                alt="Family Finance"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            More than just a Finance App
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            We don't just show numbers — we help real Indian families 👨‍👩‍👧‍👦 build smarter habits, not just boring charts. 😎
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-orange-500 h-6 w-6"
              >
                <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                <line x1="2" x2="22" y1="20" y2="20" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick & Easy Tracking</h3>
            <p className="text-gray-700">
              Add income or expenses in less than 10 seconds. Our AI automatically categorizes your entries.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-orange-500 h-6 w-6"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Insightful Analytics</h3>
            <p className="text-gray-700">
              Visual breakdowns of your spending habits and trends to help you understand where your money goes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-orange-500 h-6 w-6"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Reminders</h3>
            <p className="text-gray-700">
              Never miss a payment again. Get friendly reminders for upcoming bills and subscription renewals.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-orange-500 h-6 w-6"
              >
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
            <p className="text-gray-700">
              Get personalized suggestions based on your spending patterns to help you save more and spend wisely.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-orange-500 h-6 w-6"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Friendly</h3>
            <p className="text-gray-700">
              Track expenses for the whole family. See who's spending what and manage family budgets together.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-orange-500 h-6 w-6"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Investment Tracking</h3>
            <p className="text-gray-700">
              Keep track of all your investments in one place, whether they're fixed deposits, SIPs, or stocks.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-orange-600 text-white rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to level up your family finances?
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Join thousands of families who are building better financial habits with AI-vaala Galla.
            </p>
            <Link href="/auth/register">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 hover:text-orange-700 text-lg py-6 px-8">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
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
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-orange-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h4v4h-4v-4zm0-14h4v12h-4V2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2023 AI-vaala Galla. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-orange-600 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}