'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (data.success) {
        setStep('otp');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Server error connecting to API');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();
      if (data.success) {
        login(data.rider);
        if (data.rider.isOnboarded) {
          router.push('/dashboard');
        } else {
          router.push('/onboarding');
        }
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Server error connecting to API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gs-bg-primary)] text-[var(--gs-text-primary)] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--gs-primary)] rounded-full opacity-[0.05] blur-[100px] gs-animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[var(--gs-accent)] rounded-full opacity-[0.05] blur-[80px] gs-animate-float" style={{ animationDelay: '2s' }} />

      <Link href="/" className="absolute top-8 left-8 text-[var(--gs-text-secondary)] hover:text-white flex items-center gap-2 transition-colors text-sm font-medium z-20">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
      
      <div className="w-full max-w-md gs-glass p-8 md:p-10 gs-animate-slide-up opacity-0 gs-delay-1 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--gs-primary)] to-[var(--gs-accent)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[rgba(108,92,231,0.2)]">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {step === 'phone' ? 'Welcome Back' : 'Verify Identity'}
          </h1>
          <p className="text-[var(--gs-text-secondary)] text-sm">
            {step === 'phone' 
              ? 'Securely login to your GigShield dashboard' 
              : `A 6-digit code has been sent to +91 ${phone}`}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[rgba(255,118,117,0.1)] border border-[rgba(255,118,117,0.2)] rounded-xl text-[var(--gs-danger)] text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* Dynamic Form */}
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--gs-text-muted)] mb-3">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--gs-text-muted)] font-mono text-sm">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-[var(--gs-bg-primary)] border border-[var(--gs-border)] focus:border-[var(--gs-primary)] rounded-xl py-4 pl-14 pr-4 text-white placeholder-[var(--gs-text-muted)] focus:outline-none transition-all font-mono tracking-widest text-lg"
                  placeholder="9876543210"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="gs-btn-primary !w-full justify-center !py-4 text-sm"
            >
              {loading ? 'Sending Request...' : 'Get Magic Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-[var(--gs-text-muted)] mb-3">
                Security Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[var(--gs-bg-primary)] border border-[var(--gs-border)] focus:border-[var(--gs-accent)] rounded-xl py-4 px-4 text-white placeholder-[var(--gs-text-muted)] focus:outline-none transition-all font-mono tracking-[0.5em] text-center text-2xl uppercase"
                placeholder="000000"
                required
              />
              <div className="mt-4 gs-glass !p-3 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--gs-accent)] animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-[var(--gs-accent)] font-bold">Hackathon Demo Mode: Code is 123456</span>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="gs-btn-primary !w-full justify-center !py-4 text-sm"
            >
              {loading ? 'Validating...' : 'Verify \u0026 Dashboard'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setOtp('');
                setError('');
              }}
              className="w-full text-center text-[var(--gs-text-muted)] hover:text-white text-xs font-medium transition-colors py-2 mt-2"
            >
              Use a different number
            </button>
          </form>
        )}
      </div>

      <p className="mt-10 text-[10px] text-[var(--gs-text-muted)] uppercase tracking-[0.2em] gs-animate-slide-up opacity-0 gs-delay-2 font-bold">
        Encrypted Endpoint Secure · BLINKIT PARTNER LOGIN
      </p>
    </div>
  );
}
