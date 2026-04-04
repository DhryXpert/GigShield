'use client';

import React from 'react';

const mockClaims = [
  { id: '1092', rider: 'Raju B.', zone: 'Koramangala', event: 'Heavy Rain', amount: '₹750', status: 'PAID', time: '10 mins ago', fraudScore: 0 },
  { id: '1091', rider: 'Amit S.', zone: 'Electronic City', event: 'Heavy Rain', amount: '₹1,000', status: 'PAID', time: '1 HOUR AGO', fraudScore: 2 },
  { id: '1090', rider: 'Vikram M.', zone: 'HSR Layout', event: 'Extreme Heat', amount: '₹400', status: 'PAID', time: '2 HOURS AGO', fraudScore: 5 },
  { id: '1089', rider: 'Suresh P.', zone: 'Koramangala', event: 'Heavy Rain', amount: '₹750', status: 'DENIED', time: '3 HOURS AGO', fraudScore: 88 },
];

export default function ClaimsPayoutsPage() {
  return (
    <div className="space-y-6">
      <div className="gs-animate-slide-up opacity-0 gs-delay-1">
        <h2 className="text-3xl font-bold mb-1">Claims & Payouts</h2>
        <p className="text-sm text-[var(--gs-text-secondary)]">
          Real-time ledger of all parametric triggers and automated UPI disbursements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gs-animate-slide-up opacity-0 gs-delay-2">
        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-primary)]">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Total Paid Today</p>
          <h3 className="text-3xl font-mono font-bold text-white">₹12,400</h3>
        </div>
        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-success)]">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Auto-Approval Rate</p>
          <h3 className="text-3xl font-mono font-bold text-white">96.5%</h3>
        </div>
        <div className="gs-card p-6 border-l-4 border-l-[var(--gs-accent)]">
          <p className="text-xs uppercase tracking-widest text-[var(--gs-text-muted)] font-semibold mb-2">Avg Payout Speed</p>
          <h3 className="text-3xl font-mono font-bold text-white">2.4<span className="text-base text-[var(--gs-text-muted)] font-sans font-normal ml-2">seconds</span></h3>
        </div>
      </div>

      <div className="gs-glass p-8 gs-animate-slide-up opacity-0 gs-delay-3">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">Recent Transactions</h3>
          <button className="gs-btn-secondary text-xs">Export CSV</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--gs-border)] text-xs uppercase tracking-widest text-[var(--gs-text-muted)]">
                <th className="p-4 font-semibold">Tnx ID</th>
                <th className="p-4 font-semibold">Rider</th>
                <th className="p-4 font-semibold">Trigger Event</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {mockClaims.map((claim) => (
                <tr key={claim.id} className="border-b border-[var(--gs-border)]/50 hover:bg-[var(--gs-bg-card)] transition-colors">
                  <td className="p-4 font-mono text-sm text-[var(--gs-text-muted)]">#{claim.id}</td>
                  <td className="p-4 text-sm font-semibold text-white">{claim.rider}</td>
                  <td className="p-4 text-sm text-[var(--gs-text-secondary)]">{claim.event} <span className="text-[10px] bg-[#0A0D14] px-2 py-1 rounded ml-1">{claim.zone}</span></td>
                  <td className="p-4 font-mono font-bold text-white">{claim.amount}</td>
                  <td className="p-4">
                    {claim.status === 'PAID' ? (
                      <span className="gs-badge gs-badge-success text-[10px]">SUCCESS</span>
                    ) : (
                      <span className="gs-badge gs-badge-danger text-[10px]">F-DENIED</span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-[var(--gs-text-muted)]">{claim.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
