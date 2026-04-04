"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: "📊" },
    { name: "Risk Heatmap", href: "/admin/heatmap", icon: "🗺️" },
    { name: "Claims \u0026 Payouts", href: "/admin/claims", icon: "💸" },
    { name: "Fraud Logs", href: "/admin/fraud", icon: "🛡️" },
  ];

  return (
    <div className="flex bg-[var(--gs-bg-primary)] min-h-screen text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 gs-glass border-r border-[var(--gs-border)] shrink-0 hidden md:flex flex-col z-20">
        <div className="p-6 border-b border-[var(--gs-border)] mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--gs-danger)] to-[var(--gs-accent)] rounded-xl flex items-center justify-center shadow-lg shadow-[rgba(214,48,49,0.2)]">
              <span className="font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="font-bold tracking-tight text-lg">Admin View</h1>
              <p className="text-[10px] uppercase tracking-widest text-[var(--gs-text-muted)]">
                Control Room
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold ${
                  isActive
                    ? "bg-[rgba(214,48,49,0.1)] text-[var(--gs-danger)] border border-[rgba(214,48,49,0.2)]"
                    : "text-[var(--gs-text-secondary)] hover:bg-[var(--gs-bg-card)]"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <Link
            href="/dashboard"
            className="gs-btn-secondary !w-full justify-center text-xs"
          >
            Switch to Rider App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative h-screen overflow-y-auto">
        {/* Ambient background for the content area */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gs-danger)] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--gs-accent)] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" />

        <div className="p-8 relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
