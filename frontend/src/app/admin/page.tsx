'use client';

import React, { useState, useEffect } from 'react';

// Mock Data for Phase 2 UI Demonstration
const mockZones = [
  { id: 1, name: 'Koramangala', status: 'CRITICAL', rain: '45mm', risk: 92, activeRiders: 45 },
  { id: 2, name: 'Electronic City', status: 'HIGH', rain: '30mm', risk: 78, activeRiders: 82 },
  { id: 3, name: 'HSR Layout', status: 'MEDIUM', rain: '15mm', risk: 45, activeRiders: 110 },
  { id: 4, name: 'Indiranagar', status: 'MEDIUM', rain: '10mm', risk: 38, activeRiders: 64 },
  { id: 5, name: 'Whitefield', status: 'LOW', rain: '2mm', risk: 15, activeRiders: 135 },
  { id: 6, name: 'BTM Layout', status: 'LOW', rain: '0mm', risk: 5, activeRiders: 90 },
];

export default function AdminOverviewPage() {
  const [pulse, setPulse] = useState(false);

  // Trigger pulse effect every few seconds for "live" feel
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="gs-animate-slide-up opacity-0 gs-delay-1 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-1">Live Risk Analytics</h2>
          <p className="text-sm text-[var(--gs-text-secondary)]">
            Bengaluru Sector Analysis · OpenWeather Sync: <span className="text-[var(--gs-success)]">LIVE</span>
          </p>
        </div>
        <div className="flex items-center gap-2 gs-glass px-4 py-2">
          <span className={`w-2 h-2 rounded-full bg-[var(--gs-danger)] ${pulse ? 'opacity-100' : 'opacity-40'} transition-opacity`} />
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--gs-danger)]">Monitoring Parametrics</span>
        </div>
      </div>

      {/* Top Stat Level */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-primary)] gs-animate-slide-up opacity-0 gs-delay-2">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Active Policies</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-mono font-bold text-white">526</h3>
            <span className="text-[var(--gs-success)] text-xs font-bold mb-1">+42 this hour</span>
          </div>
        </div>

        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-accent)] gs-animate-slide-up opacity-0 gs-delay-3">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Total Exposure Value</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-mono font-bold text-white">₹8.4L</h3>
            <span className="text-[var(--gs-text-muted)] text-xs font-bold mb-1">Max liability</span>
          </div>
        </div>

        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-danger)] gs-animate-slide-up opacity-0 gs-delay-4">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Parametric Triggers</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-mono font-bold text-[var(--gs-danger)]">14</h3>
            <span className="text-[var(--gs-text-muted)] text-xs mb-1">Today</span>
          </div>
        </div>

        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-success)] gs-animate-slide-up opacity-0 gs-delay-4">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">AI Fraud Intercepts</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-mono font-bold text-white">2.4%</h3>
            <span className="text-[var(--gs-danger)] text-xs font-bold mb-1">9 claims blocked</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gs-animate-slide-up opacity-0 gs-delay-5">
        
        {/* Risk Heatmap (Custom CSS Matrix) */}
        <div className="lg:col-span-2 gs-glass p-8 relative overflow-hidden">
           <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Geographic Risk Exposure Model</h3>
            <div className="flex gap-4 text-xs font-bold font-mono">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[rgba(214,48,49,0.2)] border border-[var(--gs-danger)]"/> Critical</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[rgba(253,203,110,0.2)] border border-[var(--gs-risk-medium)]"/> Elevated</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[rgba(0,184,148,0.2)] border border-[var(--gs-risk-low)]"/> Normal</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockZones.map(zone => {
              const isCritical = zone.status === 'CRITICAL';
              const isHigh = zone.status === 'HIGH';
              const isMedium = zone.status === 'MEDIUM';

              let borderColor = 'var(--gs-risk-low)';
              let bgColor = 'rgba(0,184,148,0.05)';
              let pulseColor = 'rgba(0,184,148,0.5)';

              if (isCritical || isHigh) {
                borderColor = 'var(--gs-danger)';
                bgColor = 'rgba(214,48,49,0.1)';
                pulseColor = 'rgba(214,48,49,0.8)';
              } else if (isMedium) {
                borderColor = 'var(--gs-risk-medium)';
                bgColor = 'rgba(253,203,110,0.1)';
                 pulseColor = 'rgba(253,203,110,0.8)';
              }

              return (
                <div key={zone.id} className="relative p-5 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg" style={{ borderColor, backgroundColor: bgColor }}>
                  {/* Blinking indicator for high risk */}
                  {(isCritical || isHigh) && (
                    <span className="absolute top-4 right-4 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: pulseColor }}></span>
                      <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: borderColor }}></span>
                    </span>
                  )}
                  
                  <h4 className="font-bold text-white text-lg mb-1">{zone.name}</h4>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)]">Live Rain</p>
                      <p className="font-mono text-sm font-bold text-white">{zone.rain}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)]">Risk Propensity</p>
                      <p className="font-mono text-sm font-bold" style={{ color: borderColor }}>{zone.risk}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)]">Active Shields</p>
                      <p className="font-mono text-sm font-bold text-white">{zone.activeRiders}</p>
                    </div>
                  </div>
                  
                  {/* Progress var for risk */}
                  <div className="w-full bg-[var(--gs-bg-primary)] h-1 rounded-full overflow-hidden mt-4">
                    <div className="h-1 rounded-full transition-all duration-1000" style={{ width: `${zone.risk}%`, backgroundColor: borderColor }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action / Trigger Log */}
        <div className="gs-glass p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">System Terminal</h3>
            <span className="text-[10px] uppercase font-mono text-[var(--gs-text-muted)]">Logs</span>
          </div>
          
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[460px] pr-2 custom-scrollbar">
             <div className="p-3 bg-[#0A0D14] rounded-lg border border-[var(--gs-border)] font-mono text-[11px] leading-relaxed">
               <span className="text-[var(--gs-text-muted)]">[14:02:44]</span> <span className="text-[var(--gs-primary)]">SYS_CHECK:</span> Routine OpenWeather API payload received.<br/>
               <span className="text-[var(--gs-text-muted)]">→ Avg City Temp: 28°C</span>
             </div>

             <div className="p-3 bg-[#0A0D14] rounded-lg border border-[rgba(214,48,49,0.3)] font-mono text-[11px] leading-relaxed relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--gs-danger)]" />
               <span className="text-[var(--gs-text-muted)]">[13:58:12]</span> <span className="text-[var(--gs-danger)]">ALERT_TRIGGERED:</span> Rain anomaly detected in Koramangala (45mm).<br/>
               <span className="text-white">→ Validating 45 active policies...</span><br/>
               <span className="text-[var(--gs-success)]">→ 42 Auto-Payouts Authorized via Razorpay.</span><br/>
               <span className="text-[var(--gs-danger)]">→ 3 Claims blocked (Fraud Code: OUT_OF_ZONE_GPS)</span>
             </div>

             <div className="p-3 bg-[#0A0D14] rounded-lg border border-[var(--gs-border)] font-mono text-[11px] leading-relaxed">
               <span className="text-[var(--gs-text-muted)]">[13:45:00]</span> <span className="text-[var(--gs-accent)]">ISS_ENGINE:</span> Global score recalculation complete.<br/>
               <span className="text-[var(--gs-text-muted)]">→ Global average: 68/100</span>
             </div>
             
             <div className="p-3 bg-[#0A0D14] rounded-lg border border-[var(--gs-border)] font-mono text-[11px] leading-relaxed">
               <span className="text-[var(--gs-text-muted)]">[13:30:11]</span> <span className="text-[var(--gs-success)]">PAYOUT_VERIFIED:</span> Webhook received. UPI transfer ₹750 successful for RiderID: 69ca...
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
