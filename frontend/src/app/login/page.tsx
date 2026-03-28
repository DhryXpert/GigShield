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
        // Redirect logic
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
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#0B0D17] relative min-h-screen">
      <Link href="/" className="absolute top-8 left-8 text-[#9CA3C0] hover:text-white flex items-center gap-2 transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-[#131626]/80 backdrop-blur-md border border-[#23273E] p-8 rounded-2xl shadow-xl z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#00CEC9] rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold font-sans text-white mb-2">
            {step === 'phone' ? 'Login or Register' : 'Verify OTP'}
          </h1>
          <p className="text-[#9CA3C0] text-sm">
            {step === 'phone' 
              ? 'Enter your phone number to continue' 
              : `Code sent to +91 ${phone}`}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Dynamic Form */}
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#9CA3C0] mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-[#5F6589] font-mono">+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-[#0A0D14] border border-[#23273E] rounded-xl py-3 pl-14 pr-4 text-white placeholder-[#454B6B] focus:outline-none focus:border-[#6C5CE7] transition-colors font-mono tracking-wider"
                  placeholder="9876543210"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="w-full bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] text-white rounded-full py-4 font-semibold text-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#9CA3C0] mb-2">
                One Time Password
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#0A0D14] border border-[#23273E] rounded-xl py-3 px-4 text-white placeholder-[#454B6B] focus:outline-none focus:border-[#00CEC9] transition-colors font-mono tracking-[0.5em] text-center text-xl"
                placeholder="000000"
                required
              />
              <p className="text-xs text-[#5F6589] text-center mt-3">
                Hackathon Demo: Use <strong className="text-[#00CEC9]">123456</strong>
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] text-white rounded-full py-4 font-semibold text-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setOtp('');
              }}
              className="w-full text-center text-[#9CA3C0] hover:text-white text-sm transition-colors py-2"
            >
              Change phone number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
