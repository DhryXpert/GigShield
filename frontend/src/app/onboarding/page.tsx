'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ZoneOption {
  _id: string;
  name: string;
  city: string;
}

export default function OnboardingPage() {
  const { rider, isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();

  const [zones, setZones] = useState<ZoneOption[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    city: 'Bengaluru', // Default
    primaryZone: '',
    averageWeeklyEarnings: ''
  });
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  // Protect route and initialize
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && isAuthenticated && rider?.isOnboarded) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, rider, router]);

  // Fetch zones on mount
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/zones?city=${formData.city}`);
        const data = await res.json();
        if (data.success) {
          setZones(data.data);
          // Auto-select first zone
          if (data.data.length > 0) {
            setFormData(prev => ({ ...prev, primaryZone: data.data[0]._id }));
          }
        }
      } catch (err) {
        console.error('Failed to fetch zones');
      }
    };
    fetchZones();
  }, [formData.city]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/riders/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        // Update context with hydrated rider
        login({
          id: data.data._id,
          name: data.data.name,
          phone: data.data.phone,
          isOnboarded: data.data.isOnboarded,
          issScore: data.data.issScore,
        });
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('Server Error. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isLoading) return <div className="min-h-screen text-white flex items-center justify-center p-6 bg-[#0B0D17]">Loading Profile...</div>;
  if (!isAuthenticated) return null; // Avoid flicker

  return (
    <div className="flex-1 flex flex-col items-center p-6 bg-[#0B0D17] min-h-screen">
      
      {/* Top Navigation Bar / Branding */}
      <div className="w-full max-w-4xl py-6 flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#00CEC9] rounded-lg flex items-center justify-center shadow-lg shadow-[#6C5CE7]/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">GigShield</span>
        </div>
        <div className="text-sm font-mono text-[#9CA3C0] bg-[#131626] px-4 py-2 rounded-full border border-[#23273E]">
          +91 {rider?.phone || '**********'}
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-xl bg-[#131626]/80 backdrop-blur-md border border-[#23273E] p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C5CE7] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00CEC9] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-[#9CA3C0] mb-8 leading-relaxed">
            Welcome aboard! We need a few details to calculate your baseline <strong className="text-white">Income Stability Score (ISS)</strong> and set up your coverage zone.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3C0] mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Raju Bhai"
                required
                className="w-full bg-[#0A0D14] border border-[#23273E] focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] rounded-xl py-3 px-4 text-white placeholder-[#454B6B] focus:outline-none transition-all"
              />
            </div>

            {/* Average Earnings */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3C0] mb-2">Average Weekly Earnings (₹)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#5F6589] font-mono pointer-events-none">₹</span>
                <input
                  type="number"
                  name="averageWeeklyEarnings"
                  value={formData.averageWeeklyEarnings}
                  onChange={handleChange}
                  placeholder="6000"
                  required
                  min={100}
                  className="w-full bg-[#0A0D14] border border-[#23273E] focus:border-[#00CEC9] focus:ring-1 focus:ring-[#00CEC9] rounded-xl py-3 pl-10 pr-4 text-white placeholder-[#454B6B] focus:outline-none transition-all font-mono"
                />
              </div>
              <p className="text-xs text-[#5F6589] mt-2">Used to calculate potential payouts for disrupted weeks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City Selection */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3C0] mb-2">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-[#0A0D14] border border-[#23273E] focus:border-[#6C5CE7] rounded-xl py-3 px-4 text-white focus:outline-none appearance-none"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Gurugram">Gurugram</option>
                </select>
              </div>

              {/* Zone Selection */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3C0] mb-2">Delivery Zone</label>
                <select
                  name="primaryZone"
                  value={formData.primaryZone}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0D14] border border-[#23273E] focus:border-[#00CEC9] rounded-xl py-3 px-4 text-white focus:outline-none appearance-none disabled:opacity-50"
                  disabled={zones.length === 0}
                >
                  {zones.length === 0 && <option value="">Loading zones...</option>}
                  {zones.map(zone => (
                    <option key={zone._id} value={zone._id}>{zone.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitLoading || !formData.primaryZone}
                className="w-full group relative flex items-center justify-center bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] text-white rounded-xl py-4 font-bold text-[15px] shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-all hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <span>{submitLoading ? 'Generating ISS...' : 'Complete Setup & Enter Dashboard'}</span>
                {!submitLoading && (
                  <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
