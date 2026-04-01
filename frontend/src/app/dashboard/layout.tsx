'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { rider, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--gs-bg-primary)] text-[var(--gs-text-primary)] flex flex-col font-sans relative overflow-x-hidden">
      {/* Ambient background orbs — same style as landing page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-[var(--gs-primary)] rounded-full opacity-[0.04] blur-[120px] gs-animate-float" />
        <div className="absolute bottom-[15%] right-[8%] w-[350px] h-[350px] bg-[var(--gs-accent)] rounded-full opacity-[0.035] blur-[100px] gs-animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[50%] left-[40%] w-[300px] h-[300px] bg-[var(--gs-primary-light)] rounded-full opacity-[0.025] blur-[90px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(108,92,231,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-[var(--gs-bg-primary)]/80 backdrop-blur-xl border-b border-[var(--gs-border)] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--gs-primary)] to-[var(--gs-accent)] rounded-xl flex items-center justify-center shadow-lg shadow-[rgba(108,92,231,0.25)] group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              <span className="gs-gradient-text">Gig</span>Shield
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          {/* ISS Mini Badge */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full gs-glass">
            <div className="text-right">
              <p className="text-sm font-semibold text-[var(--gs-text-primary)]">{rider?.name || 'Rider'}</p>
              <p className="text-xs font-mono gs-gradient-text font-bold">ISS {rider?.issScore || 0}/100</p>
            </div>
            {/* Avatar circle */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gs-primary)] to-[var(--gs-accent)] flex items-center justify-center text-sm font-bold text-white">
              {(rider?.name || 'R').charAt(0).toUpperCase()}
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="p-2.5 text-[var(--gs-text-muted)] hover:text-white hover:bg-[var(--gs-bg-card)] rounded-xl transition-all hover:shadow-[var(--gs-shadow-sm)]"
            title="Logout"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
