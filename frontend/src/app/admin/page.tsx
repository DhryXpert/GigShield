'use client';

import React from 'react';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="gs-animate-slide-up opacity-0 gs-delay-1">
        <h2 className="text-3xl font-bold mb-1">Live Metrics Overview</h2>
        <p className="text-sm text-[var(--gs-text-secondary)]">
          Real-time system health, exposure, and fraud analytics across all monitored delivery zones.
        </p>
      </div>

      {/* Top Stat Level */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-primary)] gs-animate-slide-up opacity-0 gs-delay-2">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Active Policies</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-mono font-bold text-white">142</h3>
            <span className="text-[var(--gs-success)] text-xs font-bold mb-1">+12 today</span>
          </div>
        </div>

        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-accent)] gs-animate-slide-up opacity-0 gs-delay-3">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Total Protected Value</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-mono font-bold text-white">₹4.2L</h3>
          </div>
        </div>

        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-danger)] gs-animate-slide-up opacity-0 gs-delay-4">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Auto-Payouts Today</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-mono font-bold text-[var(--gs-danger)]">₹12,400</h3>
            <span className="text-[var(--gs-text-muted)] text-xs mb-1">Across 18 users</span>
          </div>
        </div>

        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-success)] gs-animate-slide-up opacity-0 gs-delay-4">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Fraud Block Rate</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-mono font-bold text-white">99.8%</h3>
            <span className="text-[var(--gs-danger)] text-xs font-bold mb-1">3 claims blocked</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gs-animate-slide-up opacity-0 gs-delay-5">
        {/* Placeholder for future heatmap/chart component */}
        <div className="lg:col-span-2 gs-glass p-8 min-h-[400px] flex flex-col items-center justify-center border-dashed border-[var(--gs-border)] text-[var(--gs-text-muted)]">
          <span className="text-4xl mb-4">🗺️</span>
          <p>Risk Heatmap Component</p>
          <p className="text-xs mt-2 text-center max-w-sm">Will show live geographic exposure based on rider locations and OpenWeather API data.</p>
        </div>

        {/* Placeholder for latest claims */}
        <div className="gs-glass p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Recent Triggers</h3>
            <span className="gs-badge gs-badge-danger !text-[10px]">LIVE</span>
          </div>
          
          <div className="space-y-4">
             {/* Mock logs */}
             <div className="p-3 bg-[var(--gs-bg-primary)] rounded-lg border border-[var(--gs-border)]">
               <p className="text-xs text-[var(--gs-success)] font-bold mb-1">✓ Payout Approved</p>
               <p className="text-sm text-white">₹750 to <span className="font-mono text-[var(--gs-text-muted)]">Raju B.</span></p>
               <p className="text-[10px] text-[var(--gs-text-muted)] mt-1">Parametric: Rain 20mm in Koramangala</p>
             </div>

             <div className="p-3 bg-[var(--gs-bg-primary)] rounded-lg border border-[var(--gs-border)]">
               <p className="text-xs text-[var(--gs-danger)] font-bold mb-1">✕ Fraud Blocked</p>
               <p className="text-sm text-white">₹1,000 to <span className="font-mono text-[var(--gs-text-muted)]">Amit S.</span></p>
               <p className="text-[10px] text-[var(--gs-text-muted)] mt-1">Reason: GPS not in affected polygon</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
