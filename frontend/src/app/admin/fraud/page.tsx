'use client';

import React from 'react';

const mockFrauds = [
  { id: '1089', rider: 'Suresh P.', reason: 'OUT_OF_ZONE_GPS', description: 'Rider GPS reported distance > 5km from active disruption polygon during claim trigger.', interceptTime: '3 HOURS AGO' },
  { id: '1074', rider: 'Karan T.', reason: 'DUPLICATE_CLAIM_ATTEMPT', description: 'Attempted to trigger identical claim payload less than 60 minutes after previous payout.', interceptTime: '1 DAY AGO' },
  { id: '1061', rider: 'Ajay K.', reason: 'IMPOSSIBLE_TRAJECTORY', description: 'Location jumped 12km in 30 seconds. Flagged as likely GPS mock application.', interceptTime: '2 DAYS AGO' },
];

export default function FraudLogsPage() {
  return (
    <div className="space-y-6">
      <div className="gs-animate-slide-up opacity-0 gs-delay-1 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-1">Fraud Detection Logs</h2>
          <p className="text-sm text-[var(--gs-text-secondary)]">
            AI intercepted claims, spoofing attempts, and rules engine blocks.
          </p>
        </div>
        <div className="flex items-center gap-2 gs-glass px-4 py-2 border-[var(--gs-danger)]/30">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--gs-danger)]">Shield AI Active</span>
        </div>
      </div>

      <div className="gs-card p-6 border-l-4 border-l-[var(--gs-danger)] bg-[rgba(214,48,49,0.05)] gs-animate-slide-up opacity-0 gs-delay-2">
         <div className="flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--gs-danger)] font-semibold mb-2">Total Prevented Loss</p>
              <h3 className="text-3xl font-mono font-bold text-white">₹4,250</h3>
              <p className="text-sm text-[var(--gs-text-muted)] mt-1">Month to date across all operating zones.</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[rgba(214,48,49,0.1)] text-[var(--gs-danger)] flex items-center justify-center text-3xl">
              🛡️
            </div>
         </div>
      </div>

      <div className="gs-glass p-8 gs-animate-slide-up opacity-0 gs-delay-3">
        <h3 className="font-bold text-lg mb-6">Recent Intercepts</h3>
        
        <div className="space-y-4">
          {mockFrauds.map((log) => (
             <div key={log.id} className="p-5 bg-[var(--gs-bg-primary)] rounded-xl border border-[rgba(214,48,49,0.2)] hover:border-[var(--gs-danger)] transition-all">
                <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center gap-3">
                     <span className="gs-badge gs-badge-danger !text-[10px] font-mono">{log.reason}</span>
                     <span className="text-white font-bold text-sm">Target Rider: {log.rider}</span>
                   </div>
                   <span className="text-xs text-[var(--gs-text-muted)]">{log.interceptTime}</span>
                </div>
                
                <div className="pl-2 border-l-2 border-[var(--gs-border)] mt-2">
                   <p className="text-sm text-[var(--gs-text-secondary)]">{log.description}</p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-[var(--gs-border)] flex gap-4">
                  <button className="text-xs text-[var(--gs-text-muted)] hover:text-white transition-colors flex items-center gap-1">
                    <span>👁️</span> View Full Telemetry
                  </button>
                  <button className="text-xs text-[var(--gs-danger)] hover:text-white transition-colors flex items-center gap-1">
                     Suspend Account
                  </button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
