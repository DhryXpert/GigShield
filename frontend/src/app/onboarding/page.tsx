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
    city: 'Bengaluru',
    primaryZone: '',
    averageWeeklyEarnings: ''
  });
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && isAuthenticated && rider?.isOnboarded) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, rider, router]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/zones?city=${formData.city}`);
        const data = await res.json();
        if (data.success) {
          setZones(data.data);
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

  if (isLoading) return <div className="min-h-screen text-white flex items-center justify-center p-6 bg-[var(--gs-bg-primary)] font-sans">Loading Profile...</div>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[var(--gs-bg-primary)] text-[var(--gs-text-primary)] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--gs-primary)] rounded-full opacity-[0.05] blur-[100px] gs-animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[var(--gs-accent)] rounded-full opacity-[0.05] blur-[80px] gs-animate-float" style={{ animationDelay: '2s' }} />

      {/* Top Branding */}
      <div className="mb-8 flex flex-col items-center gap-4 gs-animate-slide-up opacity-0 gs-delay-1">
        <div className="w-14 h-14 bg-gradient-to-br from-[var(--gs-primary)] to-[var(--gs-accent)] rounded-2xl flex items-center justify-center shadow-lg shadow-[rgba(108,92,231,0.2)]">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="gs-gradient-text">Gig</span>Shield
        </h1>
      </div>

      {/* Onboarding Card */}
      <div className="w-full max-w-xl gs-glass p-8 md:p-10 gs-animate-slide-up opacity-0 gs-delay-2 relative z-10">
        <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
        <p className="text-[var(--gs-text-secondary)] mb-8 text-sm leading-relaxed">
          Setup your baseline <strong className="text-white">Income Stability Score (ISS)</strong> and select your preferred delivery zone.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-[rgba(255,118,117,0.1)] border border-[rgba(255,118,117,0.2)] rounded-xl text-[var(--gs-danger)] text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--gs-text-muted)] mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Raju Bhai"
                required
                className="w-full bg-[var(--gs-bg-primary)] border border-[var(--gs-border)] focus:border-[var(--gs-primary)] rounded-xl py-3 px-4 text-white placeholder-[var(--gs-text-muted)] focus:outline-none transition-all text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--gs-text-muted)] mb-2">Average Weekly Earnings (₹)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--gs-text-muted)] font-mono pointer-events-none text-sm">₹</span>
                <input
                  type="number"
                  name="averageWeeklyEarnings"
                  value={formData.averageWeeklyEarnings}
                  onChange={handleChange}
                  placeholder="6000"
                  required
                  min={100}
                  className="w-full bg-[var(--gs-bg-primary)] border border-[var(--gs-border)] focus:border-[var(--gs-accent)] rounded-xl py-3 pl-10 pr-4 text-white placeholder-[var(--gs-text-muted)] focus:outline-none transition-all font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--gs-text-muted)] mb-2">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-[var(--gs-bg-primary)] border border-[var(--gs-border)] focus:border-[var(--gs-primary)] rounded-xl py-3 px-4 text-white focus:outline-none appearance-none text-sm"
              >
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Gurugram">Gurugram</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--gs-text-muted)] mb-2">Delivery Zone</label>
              <select
                name="primaryZone"
                value={formData.primaryZone}
                onChange={handleChange}
                required
                className="w-full bg-[var(--gs-bg-primary)] border border-[var(--gs-border)] focus:border-[var(--gs-accent)] rounded-xl py-3 px-4 text-white focus:outline-none appearance-none disabled:opacity-50 text-sm"
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
              className="gs-btn-primary !w-full justify-center !py-4 text-sm"
            >
              <span>{submitLoading ? 'Generating ISS...' : 'Complete Setup \u0026 Enter Dashboard'}</span>
              {!submitLoading && (
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Footer Branding */}
      <p className="mt-8 text-xs text-[var(--gs-text-muted)] gs-animate-slide-up opacity-0 gs-delay-3 px-6 text-center">
        Secured by Parametric Intelligence · +91 {rider?.phone}
      </p>
    </div>
  );
}
