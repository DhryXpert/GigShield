'use client';

import React, { useState, useEffect } from 'react';

const mockZones = [
  { id: 1, name: 'Koramangala', status: 'CRITICAL', rain: '45mm', risk: 92, activeRiders: 45 },
  { id: 2, name: 'Electronic City', status: 'HIGH', rain: '30mm', risk: 78, activeRiders: 82 },
  { id: 3, name: 'HSR Layout', status: 'MEDIUM', rain: '15mm', risk: 45, activeRiders: 110 },
  { id: 4, name: 'Indiranagar', status: 'MEDIUM', rain: '10mm', risk: 38, activeRiders: 64 },
  { id: 5, name: 'Whitefield', status: 'LOW', rain: '2mm', risk: 15, activeRiders: 135 },
  { id: 6, name: 'BTM Layout', status: 'LOW', rain: '0mm', risk: 5, activeRiders: 90 },
];

export default function RiskHeatmapPage() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="gs-animate-slide-up opacity-0 gs-delay-1 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-1">Risk Heatmap</h2>
          <p className="text-sm text-[var(--gs-text-secondary)]">
            Zone-by-zone exposure and anomaly detection.
          </p>
        </div>
        <div className="flex items-center gap-2 gs-glass px-4 py-2">
          <span className={`w-2 h-2 rounded-full bg-[var(--gs-danger)] ${pulse ? 'opacity-100' : 'opacity-40'} transition-opacity`} />
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--gs-danger)]">Live OpenWeather Feed</span>
        </div>
      </div>

      <div className="gs-glass p-8 gs-animate-slide-up opacity-0 gs-delay-2">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-xl">Bengaluru Exposure Model</h3>
          <div className="flex gap-4 text-xs font-bold font-mono">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[rgba(214,48,49,0.2)] border border-[var(--gs-danger)]"/> Critical (&gt;85%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[rgba(253,203,110,0.2)] border border-[var(--gs-risk-medium)]"/> Elevated (&gt;40%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[rgba(0,184,148,0.2)] border border-[var(--gs-risk-low)]"/> Normal</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div key={zone.id} className="relative p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl group" style={{ borderColor, backgroundColor: bgColor }}>
                {(isCritical || isHigh) && (
                  <span className="absolute top-4 right-4 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: pulseColor }}></span>
                    <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: borderColor }}></span>
                  </span>
                )}
                
                <h4 className="font-bold text-white text-xl mb-4 group-hover:text-[var(--gs-primary-light)] transition-colors">{zone.name}</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[var(--gs-border)] pb-2">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)]">Live Rain / Flood Risk</p>
                    <p className="font-mono text-sm font-bold text-white">{zone.rain}</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-[var(--gs-border)] pb-2">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)]">Active Shields Monitored</p>
                    <p className="font-mono text-sm font-bold text-white">{zone.activeRiders}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)]">Net Risk Propensity</p>
                    <p className="font-mono text-xl font-bold" style={{ color: borderColor }}>{zone.risk}%</p>
                  </div>
                </div>
                
                <div className="w-full bg-[var(--gs-bg-primary)] h-2 rounded-full overflow-hidden mt-6">
                  <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${zone.risk}%`, backgroundColor: borderColor }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
