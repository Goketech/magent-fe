"use client";

import Link from 'next/link';
import { ArrowLeft, Home, Search, Zap } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0aec] flex items-center justify-center px-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gray-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Number with glow effect */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-gray-400 to-purple-600 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30">
            <h1 className="text-8xl md:text-9xl font-bold text-purple-500">404</h1>
          </div>
        </div>

        {/* AI-themed icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16  rounded-lg flex items-center justify-center">
              <Image
                src="/magent.svg"
                alt="Magent Icon"
                width={100}
                height={100}
              />
            </div>
            {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-gray-500 rounded-lg blur-lg opacity-50 animate-pulse"></div> */}
          </div>
        </div>

        {/* Main heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-2 leading-relaxed">
          The AI couldn't locate the page you're looking for.
        </p>
        <p className="text-base text-gray-400 mb-12 leading-relaxed">
          It might have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-[#4F40C1] hover:from-purple-700 hover:to-gray-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-gray-500"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>

        {/* Search suggestion */}
        {/* <div className="mt-12 p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Looking for something specific?</h3>
          </div>
          <p className="text-gray-400 mb-6">Try searching our platform or explore our main features.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/dashboard"
              className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="text-purple-400 font-medium mb-1 group-hover:text-purple-300">Dashboard</div>
              <div className="text-sm text-gray-500">View your analytics</div>
            </Link>
            
            <Link
              href="/features"
              className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="text-purple-400 font-medium mb-1 group-hover:text-purple-300">Features</div>
              <div className="text-sm text-gray-500">Explore our tools</div>
            </Link>
            
            <Link
              href="/support"
              className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="text-purple-400 font-medium mb-1 group-hover:text-purple-300">Support</div>
              <div className="text-sm text-gray-500">Get help</div>
            </Link>
          </div>
        </div> */}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-gray-400 rounded-full animate-ping delay-700"></div>
      <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-1000"></div>
      <div className="absolute bottom-10 right-10 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-300"></div>
    </div>
  );
}