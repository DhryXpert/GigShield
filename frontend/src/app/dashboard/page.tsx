'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/* ────── Types ────── */
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

/* ────── Small SVG Icons (inline, no deps) ────── */
type IconProps = { className?: string; style?: React.CSSProperties };

const ShieldIcon = ({ className = 'w-5 h-5', style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const ZapIcon = ({ className = 'w-5 h-5', style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const TrendingUpIcon = ({ className = 'w-5 h-5', style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
);
const WalletIcon = ({ className = 'w-5 h-5', style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><circle cx="17" cy="14" r="1.5" /></svg>
);
const MapPinIcon = ({ className = 'w-5 h-5', style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 4.418-9 13-9 13S3 14.418 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const CloudRainIcon = ({ className = 'w-5 h-5', style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16" y1="13" x2="16" y2="21" /><line x1="8" y1="13" x2="8" y2="21" /><line x1="12" y1="15" x2="12" y2="23" /><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" /></svg>
);
const CheckCircleIcon = ({ className = 'w-5 h-5', style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

/* ────── Risk level helpers ────── */
const riskConfig: Record<string, { color: string; glow: string; bg: string; label: string }> = {
  LOW:      { color: 'var(--gs-risk-low)',      glow: 'rgba(0,184,148,0.25)',   bg: 'rgba(0,184,148,0.08)',   label: 'LOW RISK' },
  MEDIUM:   { color: 'var(--gs-risk-medium)',    glow: 'rgba(253,203,110,0.25)', bg: 'rgba(253,203,110,0.08)', label: 'MEDIUM RISK' },
  HIGH:     { color: 'var(--gs-risk-high)',      glow: 'rgba(255,118,117,0.25)', bg: 'rgba(255,118,117,0.08)', label: 'HIGH RISK' },
  CRITICAL: { color: 'var(--gs-risk-critical)',  glow: 'rgba(214,48,49,0.3)',    bg: 'rgba(214,48,49,0.1)',    label: 'CRITICAL' },
};

/* ============================================================
   DASHBOARD PAGE
   ============================================================ */
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
  const [claimResult, setClaimResult] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Protect route
  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/login');
  }, [isAuthenticated, authLoading, router]);

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const fetchData = async () => {
    try {
      const [profileRes, policyRes] = await Promise.all([
        fetch(`${API}/riders/profile`, { credentials: 'include' }),
        fetch(`${API}/policies/active`, { credentials: 'include' }),
      ]);
      const pData = await profileRes.json();
      const polData = await policyRes.json();
      if (pData.success) {
        if (!pData.data.isOnboarded) return router.push('/onboarding');
        setProfile(pData.data);
      }
      if (polData.success && polData.data) setActivePolicy(polData.data);
      else setActivePolicy(null);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (isAuthenticated) fetchData(); }, [isAuthenticated]);

  /* ── Handlers ── */
  const handleGenerateQuote = async () => {
    setQuoteLoading(true);
    try {
      const res = await fetch(`${API}/policies/quote`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) setQuote(data.data);
      else alert(data.error);
    } catch (err) { console.error(err); }
    finally { setQuoteLoading(false); }
  };

  const handlePurchase = async () => {
    setPurchaseLoading(true);
    try {
      const res = await fetch(`${API}/policies/purchase`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ premium: quote.premium, coverage: quote.coverage }),
      });
      const data = await res.json();
      if (data.success) { setQuote(null); await fetchData(); }
      else alert(data.error);
    } catch (err) { console.error(err); }
    finally { setPurchaseLoading(false); }
  };

  const handleSimulateDisruption = async () => {
    setClaimLoading(true);
    setClaimResult(null);
    try {
      const res = await fetch(`${API}/claims/trigger`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ zoneId: profile?.primaryZone?._id, eventType: 'Heavy Rain / Flood' }),
      });
      const data = await res.json();
      if (data.success) {
        setClaimResult({ msg: `🎉 Auto-approved ${data.payouts.length} claim(s)! ₹${data.payouts[0]?.amount || 0} credited to your UPI instantly. Fraud Engine: PASSED ✓`, type: 'success' });
        await fetchData();
      } else {
        setClaimResult({ msg: data.error || 'Claim processing failed.', type: 'error' });
      }
    } catch (err) { console.error(err); }
    finally { setClaimLoading(false); }
  };

  /* ── Loading & guards ── */
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-[var(--gs-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--gs-text-muted)] text-sm">Loading AI GigShield...</p>
        </div>
      </div>
    );
  }
  if (!profile) return null;

  const risk = riskConfig[profile.primaryZone?.riskLevel || 'MEDIUM'];

  return (
    <>
      {/* ═══════ QUOTE MODAL ═══════ */}
      {quote && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div
            className="gs-glass p-8 max-w-sm w-full text-center gs-animate-scale-in"
            style={{ boxShadow: '0 0 60px rgba(108,92,231,0.2), 0 0 120px rgba(0,206,201,0.08)' }}
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[var(--gs-primary)] to-[var(--gs-accent)] flex items-center justify-center shadow-lg shadow-[rgba(108,92,231,0.3)]">
              <ShieldIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Your AI Quote</h3>
            <p className="text-[var(--gs-text-muted)] text-sm mb-6">
              Personalized from your ISS ({profile.issScore}) & {profile.primaryZone?.name} risk factor.
            </p>

            <div className="bg-[var(--gs-bg-primary)] rounded-2xl p-5 mb-6 border border-[var(--gs-border)]">
              <p className="text-[var(--gs-text-muted)] text-xs uppercase tracking-widest mb-2">Weekly Premium</p>
              <h2 className="text-5xl font-bold gs-gradient-text font-mono">₹{quote.premium}</h2>
              <p className="text-xs mt-3 text-[var(--gs-accent)] font-medium">Covers up to ₹{quote.coverage}/week</p>
            </div>

            <div className="flex gap-3">
              <button disabled={purchaseLoading} onClick={() => setQuote(null)} className="gs-btn-secondary flex-1 !py-3 justify-center">Cancel</button>
              <button disabled={purchaseLoading} onClick={handlePurchase} className="gs-btn-primary flex-1 !py-3 justify-center">
                {purchaseLoading ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</span>
                ) : 'Pay & Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════ MAIN DASHBOARD ═══════ */}
      <div className="space-y-8">

        {/* ── Welcome Header ── */}
        <div className="gs-animate-slide-up opacity-0 gs-delay-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
            Welcome back, <span className="gs-gradient-text">{profile.name}</span>
          </h1>
          <p className="text-[var(--gs-text-secondary)] text-sm">
            Your real-time protection dashboard · {profile.city} · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* ── Top Stat Cards Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* ISS Score Card */}
          <div className="gs-card p-6 group gs-animate-slide-up opacity-0 gs-delay-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold">Income Stability Score</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(108,92,231,0.1)', color: 'var(--gs-primary-light)', border: '1px solid rgba(108,92,231,0.2)' }}>
                <TrendingUpIcon className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white font-mono mb-3">{profile.issScore}<span className="text-base font-normal text-[var(--gs-text-muted)]">/100</span></h2>
            <div className="w-full bg-[var(--gs-bg-primary)] h-2 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${profile.issScore}%`, background: 'var(--gs-gradient-primary)' }}
              />
            </div>
            <p className="text-[10px] text-[var(--gs-text-muted)] mt-2">Higher score = lower premiums</p>
          </div>

          {/* Zone Risk Card */}
          <div
            className="gs-card p-6 group gs-animate-slide-up opacity-0 gs-delay-2"
            style={{ borderColor: risk.glow, boxShadow: `0 0 25px ${risk.glow}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold">Active Zone</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: risk.bg, color: risk.color, border: `1px solid ${risk.glow}` }}>
                <MapPinIcon className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{profile.primaryZone?.name}</h3>
            <p className="text-sm font-bold flex items-center gap-2" style={{ color: risk.color }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: risk.color }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: risk.color }} />
              </span>
              {risk.label} (x{profile.primaryZone?.riskMultiplier})
            </p>
          </div>

          {/* Weekly Target Card */}
          <div className="gs-card p-6 group gs-animate-slide-up opacity-0 gs-delay-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold">Weekly Target</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,206,201,0.1)', color: 'var(--gs-accent)', border: '1px solid rgba(0,206,201,0.2)' }}>
                <WalletIcon className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white font-mono">₹{profile.weeklyEarningsEstimate?.toLocaleString('en-IN')}</h2>
            <p className="text-[10px] text-[var(--gs-text-muted)] mt-2">Used for payout calculations</p>
          </div>

          {/* Coverage Status Mini Card */}
          <div className="gs-card p-6 group gs-animate-slide-up opacity-0 gs-delay-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold">Coverage</p>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activePolicy ? 'bg-[rgba(0,184,148,0.1)] text-[var(--gs-success)]' : 'bg-[rgba(255,118,117,0.1)] text-[var(--gs-danger)]'}`} style={{ border: activePolicy ? '1px solid rgba(0,184,148,0.2)' : '1px solid rgba(255,118,117,0.2)' }}>
                <ShieldIcon className="w-4 h-4" />
              </div>
            </div>
            {activePolicy ? (
              <>
                <span className="gs-badge gs-badge-success text-xs">ACTIVE</span>
                <p className="text-white font-mono font-bold text-lg mt-2">₹{activePolicy.coverageAmount?.toLocaleString('en-IN')}</p>
              </>
            ) : (
              <>
                <span className="gs-badge gs-badge-danger text-xs">UNPROTECTED</span>
                <p className="text-[var(--gs-text-muted)] text-xs mt-2">Buy a policy below</p>
              </>
            )}
          </div>
        </div>

        {/* ── Bottom Two Columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ═══ Policy Engine — Wide ═══ */}
          <div className="lg:col-span-3 gs-glass p-8 relative overflow-hidden gs-animate-slide-up opacity-0 gs-delay-3">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-[0.06] blur-[60px]" style={{ background: activePolicy ? 'var(--gs-success)' : 'var(--gs-primary)' }} />

            {activePolicy ? (
              /* ── Active Policy View ── */
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--gs-success)] to-[var(--gs-accent)] flex items-center justify-center shadow-lg shadow-[rgba(0,184,148,0.3)]">
                    <ShieldIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Weekly Shield Active</h2>
                    <p className="text-xs text-[var(--gs-text-muted)]">AI engine is monitoring {profile.primaryZone?.name} 24/7</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-[var(--gs-bg-primary)] p-4 rounded-xl border border-[var(--gs-border)]">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)] mb-1">Policy ID</p>
                    <p className="font-mono text-sm text-white font-bold">{activePolicy._id.substring(0, 8)}…</p>
                  </div>
                  <div className="bg-[var(--gs-bg-primary)] p-4 rounded-xl border border-[var(--gs-border)]">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)] mb-1">Covered Up To</p>
                    <p className="font-mono text-sm font-bold" style={{ color: 'var(--gs-success)' }}>₹{activePolicy.coverageAmount?.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-[var(--gs-bg-primary)] p-4 rounded-xl border border-[var(--gs-border)]">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)] mb-1">Expires</p>
                    <p className="font-mono text-sm text-white font-bold">{new Date(activePolicy.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--gs-text-muted)]">
                  <CheckCircleIcon className="w-4 h-4" style={{ color: 'var(--gs-success)' }} />
                  <span>Parametric triggers armed · Fraud detection active · UPI payout linked</span>
                </div>
              </div>
            ) : (
              /* ── No Policy — CTA ── */
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--gs-primary)] to-[var(--gs-accent)] flex items-center justify-center gs-animate-pulse-glow">
                    <ShieldIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Protect Your Earnings</h2>
                    <p className="text-xs text-[var(--gs-text-muted)]">Monsoon season active — disruptions predicted this week</p>
                  </div>
                </div>

                <p className="text-[var(--gs-text-secondary)] text-sm mb-6 leading-relaxed">
                  Our AI engine analyzed weather forecasts, traffic patterns, and your ISS of <span className="text-white font-bold">{profile.issScore}</span> to generate a personalized premium for your zone <span className="text-white font-bold">{profile.primaryZone?.name}</span>.
                </p>

                <button onClick={handleGenerateQuote} disabled={quoteLoading} className="gs-btn-primary !py-3.5 !px-8 text-base">
                  {quoteLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Calculating AI Quote…
                    </span>
                  ) : (
                    <><ZapIcon className="w-4 h-4" /> Generate Weekly Premium</>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ═══ Parametric Event Simulator (Judge Panel) ═══ */}
          <div className="lg:col-span-2 gs-card p-8 relative overflow-hidden gs-animate-slide-up opacity-0 gs-delay-4" style={{ borderColor: 'rgba(255,118,117,0.15)' }}>
            {/* Watermark */}
            <div className="absolute top-3 right-4 text-[8px] uppercase tracking-[0.3em] text-[var(--gs-text-muted)] opacity-40 font-bold">Hackathon Demo</div>
            {/* Decorative rain glow */}
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[var(--gs-danger)] opacity-[0.06] blur-[50px]" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,118,117,0.1)', color: 'var(--gs-danger)', border: '1px solid rgba(255,118,117,0.2)' }}>
                <CloudRainIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Simulate Disruption</h3>
                <p className="text-[10px] text-[var(--gs-text-muted)] uppercase tracking-wider">Parametric Trigger Engine</p>
              </div>
            </div>

            <p className="text-[var(--gs-text-secondary)] text-sm mb-6 leading-relaxed">
              Simulate a <span className="text-white font-semibold">"Heavy Rain / Flood"</span> event in <span className="text-white font-semibold">{profile.primaryZone?.name}</span>. The system will instantly verify active policies, run fraud checks, and auto-approve payouts.
            </p>

            <button
              onClick={handleSimulateDisruption}
              disabled={!activePolicy || claimLoading}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activePolicy
                  ? 'bg-gradient-to-r from-[var(--gs-danger)] to-[#e17055] text-white hover:shadow-[0_0_30px_rgba(255,118,117,0.35)] hover:-translate-y-0.5'
                  : 'bg-[var(--gs-bg-card)] text-[var(--gs-text-muted)] cursor-not-allowed border border-[var(--gs-border)]'
              }`}
            >
              {claimLoading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Simulating Event & Running Fraud AI…</>
              ) : activePolicy ? (
                <><CloudRainIcon className="w-4 h-4" /> TRIGGER HEAVY RAIN IN ZONE</>
              ) : (
                <><ShieldIcon className="w-4 h-4" /> Buy Policy First to Trigger</>
              )}
            </button>

            {/* Claim Result Banner */}
            {claimResult && (
              <div
                className={`mt-5 p-4 rounded-xl text-sm font-mono gs-animate-scale-in border ${
                  claimResult.type === 'success'
                    ? 'bg-[rgba(0,184,148,0.08)] border-[rgba(0,184,148,0.3)] text-[var(--gs-success)]'
                    : 'bg-[rgba(255,118,117,0.08)] border-[rgba(255,118,117,0.3)] text-[var(--gs-danger)]'
                }`}
              >
                {claimResult.msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
