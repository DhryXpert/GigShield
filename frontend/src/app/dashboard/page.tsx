'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface ZoneData {
  _id: string;
  name: string;
  city: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskMultiplier: number;
}

interface ProfileData {
  _id: string;
  name: string;
  phone: string;
  city: string;
  primaryZone: ZoneData | null;
  issScore: number;
  weeklyEarningsEstimate: number;
}

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Protect route
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch full profile (with populated Zone)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/riders/profile`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          if (!data.data.isOnboarded) {
            router.push('/onboarding');
            return;
          }
          setProfile(data.data);
        } else {
          setError(data.error || 'Failed to load profile');
        }
      } catch (err) {
        setError('Server error loading dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, router]);

  if (authLoading || loading) return <div className="text-center py-20 text-[#9CA3C0]">Loading Dashboard...</div>;
  if (error) return <div className="text-center py-20 text-red-400">{error}</div>;
  if (!profile) return null;

  // Render helpers
  const getRiskColor = (level?: string) => {
    switch(level) {
      case 'LOW': return 'text-green-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'HIGH': return 'text-orange-500';
      case 'CRITICAL': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getRiskBg = (level?: string) => {
    switch(level) {
      case 'LOW': return 'bg-green-400/10 border-green-400/20';
      case 'MEDIUM': return 'bg-yellow-400/10 border-yellow-400/20';
      case 'HIGH': return 'bg-orange-500/10 border-orange-500/20';
      case 'CRITICAL': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <header>
        <h1 className="text-3xl font-bold font-sans text-white">Hello, {profile.name.split(' ')[0]} 👋</h1>
        <p className="text-[#9CA3C0] mt-1">Here is your active protection overview for {profile.city}.</p>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Income Stability Score (ISS) Card */}
        <div className="bg-[#131626]/80 backdrop-blur-md border border-[#23273E] rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#00CEC9] rounded-full mix-blend-screen filter blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-medium text-[#9CA3C0]">Income Stability Score</p>
              <h2 className="text-4xl font-bold text-white mt-2 flex items-baseline gap-1">
                {profile.issScore} <span className="text-sm text-[#5F6589] font-normal">/ 100</span>
              </h2>
            </div>
            <div className={`p-2 rounded-lg ${profile.issScore >= 70 ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="w-full bg-[#0A0D14] rounded-full h-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] h-2.5 rounded-full" style={{ width: `${profile.issScore}%` }}></div>
          </div>
          <p className="text-xs text-[#5F6589] mt-3 tracking-wide uppercase">Based on your activity & zone</p>
        </div>

        {/* Current Zone Risk Card */}
        <div className={`backdrop-blur-md border rounded-2xl p-6 relative flex flex-col justify-between ${getRiskBg(profile.primaryZone?.riskLevel)}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-[#9CA3C0]">Current Zone Risk</p>
              <h3 className="text-xl font-bold text-white mt-1">{profile.primaryZone?.name || 'Unknown Zone'}</h3>
            </div>
            <div className="p-2 border border-white/10 rounded-lg bg-black/20 backdrop-blur-md">
              <svg className="w-5 h-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current ${getRiskColor(profile.primaryZone?.riskLevel)}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 bg-current ${getRiskColor(profile.primaryZone?.riskLevel)}`}></span>
              </span>
              <span className={`font-bold tracking-wider ${getRiskColor(profile.primaryZone?.riskLevel)}`}>
                {profile.primaryZone?.riskLevel} RISK
              </span>
            </div>
            <p className="text-xs font-mono text-[#9CA3C0] mt-2">Multiplier: {profile.primaryZone?.riskMultiplier}x</p>
          </div>
        </div>

        {/* Weekly Earnings Estimate (For Parametric calculation) */}
        <div className="bg-[#131626]/80 backdrop-blur-md border border-[#23273E] rounded-2xl p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-[#9CA3C0]">Protected Target Income</p>
              <h2 className="text-3xl font-bold text-white mt-2 font-mono flex items-center">
                <span className="text-[#5F6589] mr-1">₹</span>{profile.weeklyEarningsEstimate}
              </h2>
            </div>
            <div className="p-2 bg-[#6C5CE7]/10 text-[#6C5CE7] rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex justify-between text-xs text-[#9CA3C0] mb-1">
              <span>Coverage Base</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-[#0A0D14] rounded-full h-1.5 flex overflow-hidden border border-[#23273E]">
              <div className="bg-[#6C5CE7] h-1.5 w-full"></div>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Policy Area (Upsell for now) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#131626] to-[#0A0D14] border border-[#23273E] rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:-translate-y-4 transition-transform duration-700">
            <svg className="w-48 h-48 text-[#6C5CE7]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full mb-4 uppercase tracking-wider border border-red-500/20">
              No Active Coverage
            </span>
            <h2 className="text-2xl font-bold text-white mb-2">Protect Your Earnings This Week</h2>
            <p className="text-[#9CA3C0] max-w-md mb-8 leading-relaxed">
              Monsoons and heavy traffic are predicted for {profile.city}. Buy your weekly GigShield to guarantee your income even if disruptions halt your deliveries.
            </p>
            
            <button className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] text-white px-8 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(108,92,231,0.2)] hover:shadow-[0_0_30px_rgba(108,92,231,0.4)] transition-all transform hover:-translate-y-0.5">
              Generate Custom Weekly Premium
            </button>
            <p className="text-xs text-[#5F6589] mt-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Payouts are instantly credited via UPI based on AI triggers.
            </p>
          </div>
        </div>

        {/* AI Environment Prediction */}
        <div className="bg-[#131626]/80 backdrop-blur-md border border-[#23273E] rounded-3xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#23273E]">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Prediction</h3>
              <p className="text-xs text-[#9CA3C0]">Next 48 Hours</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
             <div className="text-center">
              <p className="text-[#9CA3C0] text-sm">Condition in {profile.primaryZone?.name}</p>
              <h4 className="text-2xl font-bold text-white mt-1">Light Rain</h4>
              <p className="text-sm font-mono text-[#00CEC9] mt-2">+15% traffic congestion expected</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-[#23273E] text-center">
            <p className="text-xs text-[#5F6589]">Powered by OpenWeather & Traffic API</p>
          </div>
        </div>

      </div>

    </div>
  );
}
