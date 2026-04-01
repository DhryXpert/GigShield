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
  city: string;
  primaryZone: ZoneData | null;
  issScore: number;
  weeklyEarningsEstimate: number;
}

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [activePolicy, setActivePolicy] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [quote, setQuote] = useState<any>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimMsg, setClaimMsg] = useState('');

  // Protect route
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchData = async () => {
    try {
      const [profileRes, policyRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/riders/profile`, { credentials: 'include' }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/policies/active`, { credentials: 'include' })
      ]);
      
      const pData = await profileRes.json();
      const polData = await policyRes.json();

      if (pData.success) {
        if (!pData.data.isOnboarded) return router.push('/onboarding');
        setProfile(pData.data);
      }
      if (polData.success && polData.data) {
        setActivePolicy(polData.data);
      } else {
        setActivePolicy(null);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const handleGenerateQuote = async () => {
    setQuoteLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/policies/quote`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setQuote(data.data);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setQuoteLoading(false);
    }
  };

  const handlePurchase = async () => {
    setPurchaseLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/policies/purchase`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ premium: quote.premium, coverage: quote.coverage })
      });
      const data = await res.json();
      if (data.success) {
        setQuote(null);
        await fetchData(); // Reload to show active policy
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPurchaseLoading(false);
    }
  };

  const handleSimulateDisruption = async () => {
    setClaimLoading(true);
    setClaimMsg('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/claims/trigger`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ zoneId: profile?.primaryZone?._id, eventType: 'Heavy Rain / Flood' })
      });
      const data = await res.json();
      if (data.success) {
        setClaimMsg(`🚨 DISRUPTION TRIGGERED: Auto-approved ${data.payouts.length} claims! You received ₹${data.payouts[0]?.amount || 0} payout directly to UPI! Fraud Check: PASSED.`);
        await fetchData(); // Reload to update policy status
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setClaimLoading(false);
    }
  };

  if (authLoading || loading) return <div className="text-center py-20 text-[#9CA3C0]">Loading AI GigShield...</div>;
  if (!profile) return null;

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Quote Modal */}
      {quote && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#131626] border border-[#23273E] rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(108,92,231,0.2)]">
            <h3 className="text-2xl font-bold text-white mb-2">Weekly Quote</h3>
            <p className="text-[#9CA3C0] text-sm mb-6">Generated by AI Engine based on ISS & {profile.primaryZone?.name} Risk Level.</p>
            <div className="bg-[#0A0D14] rounded-xl p-4 mb-6">
              <p className="text-[#5F6589] text-xs uppercase tracking-wider mb-1">Premium Price</p>
              <h2 className="text-4xl font-mono text-[#00CEC9] font-bold">₹{quote.premium}</h2>
              <p className="text-xs text-green-400 mt-2">Protects up to ₹{quote.coverage}/week</p>
            </div>
            <div className="flex gap-4">
              <button disabled={purchaseLoading} onClick={() => setQuote(null)} className="flex-1 py-3 text-[#9CA3C0] hover:text-white transition-colors">Cancel</button>
              <button disabled={purchaseLoading} onClick={handlePurchase} className="flex-1 bg-[#6C5CE7] hover:bg-[#5a4cd9] text-white py-3 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(108,92,231,0.4)]">
                {purchaseLoading ? 'Processing...' : 'Pay & Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ISS Card */}
        <div className="bg-[#131626]/80 backdrop-blur-md border border-[#23273E] rounded-2xl p-6">
          <p className="text-sm font-medium text-[#9CA3C0] mb-2">Income Stability Score</p>
          <h2 className="text-4xl font-bold text-white mb-4">{profile.issScore}<span className="text-sm font-normal text-[#5F6589]">/100</span></h2>
          <div className="w-full bg-[#0A0D14] h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#00CEC9] h-2.5 rounded-full" style={{ width: `${profile.issScore}%`}}></div>
          </div>
        </div>

        {/* Zone Risk */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
          <p className="text-sm font-medium text-[#9CA3C0] mb-2">Zone Risk</p>
          <h3 className="text-xl font-bold text-white mb-1">{profile.primaryZone?.name}</h3>
          <p className="text-orange-400 font-bold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></span> {profile.primaryZone?.riskLevel} RISK (x{profile.primaryZone?.riskMultiplier})
          </p>
        </div>

        {/* Claim Msg Banner / Coverage */}
        <div className="bg-[#131626]/80 backdrop-blur-md border border-[#23273E] rounded-2xl p-6">
           <p className="text-sm font-medium text-[#9CA3C0] mb-2">Target Weekly Income</p>
           <h2 className="text-3xl font-mono text-white mb-4">₹{profile.weeklyEarningsEstimate}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Policy Engine */}
        <div className="bg-gradient-to-br from-[#131626] to-[#0A0D14] border border-[#23273E] p-8 rounded-3xl">
          {activePolicy ? (
             <div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 uppercase">Active Coverage</span>
                <h2 className="text-2xl font-bold text-white mt-4 mb-2">You are fully protected.</h2>
                <div className="bg-[#0A0D14] p-4 rounded-xl mt-4 mb-4 border border-[#23273E]">
                   <p className="text-[#9CA3C0] text-sm">Policy ID: <span className="font-mono text-white">{activePolicy._id.substring(0,8)}</span></p>
                   <p className="text-[#9CA3C0] text-sm mt-1">Coverage: <span className="font-mono text-green-400 font-bold">₹{activePolicy.coverageAmount}</span></p>
                   <p className="text-[#9CA3C0] text-sm mt-1">Closes: {new Date(activePolicy.endDate).toLocaleDateString()}</p>
                </div>
                <p className="text-[#5F6589] text-sm">AI engine is actively monitoring {profile.primaryZone?.name} for disruptions.</p>
             </div>
          ) : (
            <div>
              <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full mb-4 inline-block uppercase border border-red-500/20">No Coverage</span>
              <h2 className="text-2xl font-bold text-white mb-2">Protect Your Earnings</h2>
              <p className="text-[#9CA3C0] mb-6">Monsoons predicted. Generate a custom quoted premium based on your {profile.issScore} ISS and zone risk instantly.</p>
              <button onClick={handleGenerateQuote} disabled={quoteLoading} className="w-full sm:w-auto bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] text-white px-8 py-3 rounded-full font-semibold">
                {quoteLoading ? 'Calculating AI Quote...' : 'Generate Custom Premium'}
              </button>
            </div>
          )}
        </div>

        {/* Hackathon Disruption Trigger (For Judges) */}
        <div className="bg-[#131626]/80 p-8 rounded-3xl border border-red-500/30 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5"><h1 className="text-6xl text-red-500">JUDGE PANEL</h1></div>
           <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
             <span>⚡</span> Simulate Parametric Event
           </h3>
           <p className="text-[#9CA3C0] text-sm mb-6">Instantly simulate a "Heavy Rain / Flood" event reading from the weather API for <b>{profile.primaryZone?.name}</b> to demonstrate auto-claims.</p>
           
           <button onClick={handleSimulateDisruption} disabled={!activePolicy || claimLoading} className={`w-full py-4 rounded-xl font-bold text-white transition-all ${activePolicy ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-[#23273E] text-[#5F6589] cursor-not-allowed'}`}>
             {claimLoading ? 'Simulating Storm & Checking Fraud...' : (activePolicy ? 'TRIGGER HEAVY RAIN IN ZONE' : 'Buy Policy First to Trigger Event')}
           </button>

           {claimMsg && (
             <div className="mt-4 p-4 bg-green-500/20 border border-green-500 text-green-400 rounded-xl text-sm font-mono animate-in slide-in-from-bottom-2">
               {claimMsg}
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
