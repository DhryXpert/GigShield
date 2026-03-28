"use client";

import { useState, useEffect } from "react";

/* ============================================================
   ICON COMPONENTS (inline SVG — no external deps needed)
   ============================================================ */

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

function ShieldIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ZapIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function BrainIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a6 6 0 0 1 6 6c0 2-1 3.5-2.5 4.5L12 15l-3.5-2.5C7 11.5 6 10 6 8a6 6 0 0 1 6-6z" />
      <path d="M12 15v7" />
      <path d="M8 18h8" />
    </svg>
  );
}

function WalletIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <circle cx="17" cy="14" r="1.5" />
    </svg>
  );
}

function TrendingUpIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function MapPinIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 4.418-9 13-9 13S3 14.418 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function MenuIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ============================================================
   COUNTER ANIMATION HOOK
   ============================================================ */
function useCountUp(target: number, duration: number = 2000, suffix: string = "") {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const increment = target / (duration / 16);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [hasStarted, target, duration]);

  return `${count.toLocaleString("en-IN")}${suffix}`;
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#0B0D17]/90 backdrop-blur-xl border-b border-[rgba(108,92,231,0.15)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#00CEC9] flex items-center justify-center transition-transform group-hover:scale-110">
            <ShieldIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="gs-gradient-text">Gig</span>Shield
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-[#9CA3C0] hover:text-white transition-colors">How it Works</a>
          <a href="#features" className="text-sm text-[#9CA3C0] hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-[#9CA3C0] hover:text-white transition-colors">Pricing</a>
          <a href="#stats" className="text-sm text-[#9CA3C0] hover:text-white transition-colors">Impact</a>
          <a href="/login" className="gs-btn-primary text-sm !py-2.5 !px-6">
            Get Protected
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0B0D17]/98 backdrop-blur-xl border-b border-[rgba(108,92,231,0.15)] p-6 flex flex-col gap-4 gs-animate-slide-up">
          <a href="#how-it-works" className="text-[#9CA3C0] hover:text-white transition-colors py-2" onClick={() => setMobileOpen(false)}>How it Works</a>
          <a href="#features" className="text-[#9CA3C0] hover:text-white transition-colors py-2" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" className="text-[#9CA3C0] hover:text-white transition-colors py-2" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a href="#stats" className="text-[#9CA3C0] hover:text-white transition-colors py-2" onClick={() => setMobileOpen(false)}>Impact</a>
          <a href="/login" className="gs-btn-primary text-center justify-center !py-3">Get Protected</a>
        </div>
      )}
    </nav>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6C5CE7] rounded-full opacity-[0.07] blur-[100px] gs-animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00CEC9] rounded-full opacity-[0.06] blur-[80px] gs-animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A29BFE] rounded-full opacity-[0.04] blur-[120px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(108,92,231,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="gs-animate-slide-up opacity-0 gs-delay-1">
          <span className="gs-badge gs-badge-primary mb-8 inline-flex">
            <ZapIcon className="w-3.5 h-3.5" />
            Built for Blinkit Delivery Partners
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 gs-animate-slide-up opacity-0 gs-delay-2">
          Income Protection,{" "}
          <span className="gs-gradient-text gs-animate-gradient">Powered by AI</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[#9CA3C0] max-w-2xl mx-auto mb-10 leading-relaxed gs-animate-slide-up opacity-0 gs-delay-3">
          When rain stops your deliveries, GigShield doesn&apos;t. Automated parametric
          insurance with{" "}
          <span className="text-white font-medium">instant UPI payouts</span> — no
          claims, no paperwork, no waiting.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 gs-animate-slide-up opacity-0 gs-delay-4">
          <a href="/login" className="gs-btn-primary text-lg !py-3.5 !px-8">
            <ShieldIcon className="w-5 h-5" />
            Start Protection — ₹20/week
          </a>
          <a href="#how-it-works" className="gs-btn-secondary text-lg !py-3.5 !px-8">
            See How it Works
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[#5F6589] gs-animate-slide-up opacity-0 gs-delay-5">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-[#00B894]" />
            <span>No claim forms</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-[#00B894]" />
            <span>&lt;5 min payouts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-[#00B894]" />
            <span>AI fraud detection</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-[#00B894]" />
            <span>Weekly pricing</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOW IT WORKS
   ============================================================ */
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: <MapPinIcon className="w-7 h-7" />,
      title: "Register Your Zone",
      desc: "Sign up with your phone number, select your Blinkit delivery zone, and you're onboarded in under 60 seconds.",
      color: "#6C5CE7",
    },
    {
      num: "02",
      icon: <TrendingUpIcon className="w-7 h-7" />,
      title: "AI Scores Your Risk",
      desc: "Our AI engine calculates your Income Stability Score (300–900) and generates a personalized weekly premium.",
      color: "#00CEC9",
    },
    {
      num: "03",
      icon: <ShieldIcon className="w-7 h-7" />,
      title: "Get Covered Weekly",
      desc: "Pay ₹20–₹45/week via UPI. Coverage starts instantly. Pause or resume anytime — no lock-in.",
      color: "#A29BFE",
    },
    {
      num: "04",
      icon: <ZapIcon className="w-7 h-7" />,
      title: "AI Triggers Auto Payout",
      desc: "Rain hits hard? Orders drop 50%? Our system detects it automatically and credits your UPI in under 5 minutes.",
      color: "#55EFC4",
    },
  ];

  return (
    <section id="how-it-works" className="gs-section">
      <div className="text-center mb-16">
        <span className="gs-badge gs-badge-primary mb-4 inline-flex">How It Works</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Four layers.{" "}
          <span className="gs-gradient-text">Zero friction.</span>
        </h2>
        <p className="text-[#9CA3C0] text-lg max-w-xl mx-auto">
          From registration to payout — fully automated, fully transparent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="gs-card p-6 relative group"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {/* Step number */}
            <div
              className="text-6xl font-black absolute top-4 right-4 opacity-[0.06]"
              style={{ color: step.color }}
            >
              {step.num}
            </div>

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
              style={{
                background: `${step.color}15`,
                color: step.color,
                border: `1px solid ${step.color}30`,
              }}
            >
              {step.icon}
            </div>

            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-[#9CA3C0] leading-relaxed">{step.desc}</p>

            {/* Connector line (hidden on last) */}
            {i < 3 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-gradient-to-r from-[rgba(108,92,231,0.3)] to-transparent" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   FEATURES
   ============================================================ */
function FeaturesSection() {
  const features = [
    {
      icon: <BrainIcon className="w-7 h-7" />,
      title: "AI Risk Intelligence",
      desc: "Real-time weather, traffic, and disruption data feed our ML engine to predict income risks before they happen.",
      color: "#6C5CE7",
    },
    {
      icon: <ZapIcon className="w-7 h-7" />,
      title: "Parametric Auto-Triggers",
      desc: "5 disruption types monitored every 15 minutes. When thresholds breach, claims fire automatically.",
      color: "#00CEC9",
    },
    {
      icon: <ShieldIcon className="w-7 h-7" />,
      title: "Fraud Detection AI",
      desc: "GPS spoofing, fake inactivity, duplicate claims — our anomaly scoring catches it all in real-time.",
      color: "#FF7675",
    },
    {
      icon: <WalletIcon className="w-7 h-7" />,
      title: "Instant UPI Payouts",
      desc: "From trigger to money-in-account in under 5 minutes. No paperwork, no phone calls, no waiting.",
      color: "#55EFC4",
    },
    {
      icon: <TrendingUpIcon className="w-7 h-7" />,
      title: "Income Stability Score",
      desc: "Your personal credit-score-style rating (300–900) that determines fair pricing. Improve your score, lower your premium.",
      color: "#FDCB6E",
    },
    {
      icon: <MapPinIcon className="w-7 h-7" />,
      title: "Hyper-Local Risk Map",
      desc: "See real-time disruption risk overlaid on your delivery zones. Make informed shift decisions.",
      color: "#A29BFE",
    },
  ];

  return (
    <section id="features" className="gs-section">
      <div className="text-center mb-16">
        <span className="gs-badge gs-badge-success mb-4 inline-flex">Features</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Not just insurance.{" "}
          <span className="gs-gradient-text">Intelligence.</span>
        </h2>
        <p className="text-[#9CA3C0] text-lg max-w-xl mx-auto">
          Six AI-powered engines working together to predict, protect, and pay.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, i) => (
          <div
            key={feat.title}
            className="gs-glass p-7 group cursor-default"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-lg"
              style={{
                background: `${feat.color}12`,
                color: feat.color,
                border: `1px solid ${feat.color}25`,
              }}
            >
              {feat.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feat.title}</h3>
            <p className="text-sm text-[#9CA3C0] leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   PRICING SECTION
   ============================================================ */
function PricingSection() {
  const plans = [
    {
      tier: "Low Risk",
      zones: "South Delhi, Whitefield",
      price: 20,
      coverage: 800,
      color: "#00B894",
      colorBg: "rgba(0, 184, 148, 0.08)",
      features: ["Up to ₹800 weekly coverage", "Basic weather triggers", "Standard payout speed", "ISS score tracking"],
      popular: false,
    },
    {
      tier: "Medium Risk",
      zones: "Andheri West, Gurgaon Sec 56",
      price: 30,
      coverage: 1200,
      color: "#6C5CE7",
      colorBg: "rgba(108, 92, 231, 0.08)",
      features: ["Up to ₹1,200 weekly coverage", "All 5 trigger types active", "Priority payout (<3 min)", "Shift recommendations", "ISS score tracking"],
      popular: true,
    },
    {
      tier: "High Risk",
      zones: "Dharavi, Kurla, Rohini",
      price: 45,
      coverage: 1800,
      color: "#FF7675",
      colorBg: "rgba(255, 118, 117, 0.08)",
      features: ["Up to ₹1,800 weekly coverage", "All 5 trigger types active", "Instant payout (<1 min)", "Priority shift alerts", "ISS coaching tips", "Community validation"],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="gs-section">
      <div className="text-center mb-16">
        <span className="gs-badge gs-badge-warning mb-4 inline-flex">Pricing</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Weekly. Fair.{" "}
          <span className="gs-gradient-text">Dynamic.</span>
        </h2>
        <p className="text-[#9CA3C0] text-lg max-w-xl mx-auto">
          Premium recalculates every Sunday night based on your zone&apos;s forecast and your Income Stability Score.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`gs-card p-7 relative flex flex-col ${
              plan.popular ? "border-[rgba(108,92,231,0.4)] shadow-[0_0_30px_rgba(108,92,231,0.15)]" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="gs-badge text-xs" style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", color: "white", border: "none" }}>
                  Most Popular
                </span>
              </div>
            )}

            {/* Tier badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 w-fit"
              style={{ background: plan.colorBg, color: plan.color, border: `1px solid ${plan.color}30` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: plan.color }} />
              {plan.tier}
            </div>

            {/* Price */}
            <div className="mb-1">
              <span className="text-4xl font-bold">₹{plan.price}</span>
              <span className="text-[#5F6589] text-sm">/week</span>
            </div>
            <p className="text-xs text-[#5F6589] mb-6">Coverage up to ₹{plan.coverage.toLocaleString("en-IN")}/week</p>

            {/* Zone examples */}
            <p className="text-xs text-[#5F6589] mb-4">
              <span className="text-[#9CA3C0]">Zone examples:</span> {plan.zones}
            </p>

            {/* Features */}
            <ul className="flex-1 space-y-3 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#9CA3C0]">
                  <CheckCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="/login"
              className={`text-center rounded-full py-3 px-6 font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                plan.popular
                  ? "gs-btn-primary !w-full justify-center"
                  : "gs-btn-secondary !w-full justify-center"
              }`}
            >
              Get Covered
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   STATS / IMPACT
   ============================================================ */
function StatsSection() {
  const riders = useCountUp(2000000, 2000);
  const payout = useCountUp(5, 1500);
  const coverage = useCountUp(40, 1500, "+");

  const stats = [
    { label: "Gig Workers in India", value: `${riders}+`, icon: <MapPinIcon className="w-5 h-5" /> },
    { label: "Payout Speed", value: `<${payout} min`, icon: <ClockIcon className="w-5 h-5" /> },
    { label: "Cities Covered", value: coverage, icon: <MapPinIcon className="w-5 h-5" /> },
    { label: "Income Protected Weekly", value: "₹800–₹1,800", icon: <ShieldIcon className="w-5 h-5" /> },
  ];

  return (
    <section id="stats" className="gs-section">
      <div className="gs-glass p-10 md:p-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Built for{" "}
            <span className="gs-gradient-text">Scale</span>
          </h2>
          <p className="text-[#9CA3C0]">
            Protecting the backbone of India&apos;s Q-commerce economy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[rgba(108,92,231,0.1)] text-[#A29BFE] mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold gs-gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-[#5F6589]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SCENARIO / STORY SECTION
   ============================================================ */
function ScenarioSection() {
  return (
    <section className="gs-section">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Without GigShield */}
        <div className="gs-card p-8 border-[rgba(255,118,117,0.2)]">
          <div className="gs-badge gs-badge-danger mb-5 inline-flex">❌ Without GigShield</div>
          <div className="space-y-4 text-sm text-[#9CA3C0]">
            <div className="flex items-start gap-3">
              <ClockIcon className="w-5 h-5 text-[#FF7675] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">3:30 PM — Heavy rain alert</p>
                <p>Rahul is delivering in Gurugram. Orders drop 70% in 15 minutes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon className="w-5 h-5 text-[#FF7675] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">6:00 PM — Day ends early</p>
                <p>Rahul earned ₹210 instead of the expected ₹700. A ₹490 loss.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon className="w-5 h-5 text-[#FF7675] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">No recovery</p>
                <p>No insurance claim. No platform support. Money is simply lost.</p>
              </div>
            </div>
          </div>
        </div>

        {/* With GigShield */}
        <div className="gs-card p-8 border-[rgba(0,184,148,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B894] opacity-[0.04] blur-[40px] rounded-full" />
          <div className="gs-badge gs-badge-success mb-5 inline-flex">✅ With GigShield</div>
          <div className="space-y-4 text-sm text-[#9CA3C0]">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-[#00B894] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">3:32 PM — AI detects disruption</p>
                <p>Rain &gt; 40mm detected. Order density drops confirmed. Parametric trigger fires.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-[#00B894] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">3:33 PM — Fraud check passed</p>
                <p>Location verified. Weather cross-validated. Anomaly score: 0.12 (clean).</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-[#00B894] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">3:34 PM — ₹350 credited via UPI</p>
                <p>Push notification: <span className="text-[#55EFC4] font-medium">&quot;Income protection credited.&quot;</span> No form. No call.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA SECTION
   ============================================================ */
function CTASection() {
  return (
    <section className="gs-section">
      <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center" style={{ background: "linear-gradient(135deg, rgba(108,92,231,0.15) 0%, rgba(0,206,201,0.1) 100%)", border: "1px solid rgba(108,92,231,0.2)" }}>
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#6C5CE7] opacity-[0.08] blur-[80px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#00CEC9] opacity-[0.07] blur-[60px] rounded-full" />

        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Every ₹ you earn is earned through sweat.
          </h2>
          <p className="text-lg text-[#9CA3C0] max-w-lg mx-auto mb-8">
            No rainstorm should take that away. Start protecting your income today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/login" className="gs-btn-primary text-lg !py-4 !px-10">
              <ShieldIcon className="w-5 h-5" />
              Get Protected Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="border-t border-[rgba(108,92,231,0.1)] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00CEC9] flex items-center justify-center">
            <ShieldIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">
            <span className="gs-gradient-text">Gig</span>Shield
          </span>
        </div>
        <p className="text-xs text-[#5F6589]">
          Built with ❤️ for Blinkit Delivery Partners · DEVTrails 2026 · MIT License
        </p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/DhryXpert/GigShield" className="text-[#5F6589] hover:text-[#A29BFE] text-sm transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" className="text-[#5F6589] hover:text-[#A29BFE] text-sm transition-colors">Privacy</a>
          <a href="#" className="text-[#5F6589] hover:text-[#A29BFE] text-sm transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <hr className="gs-divider" />
        <ScenarioSection />
        <hr className="gs-divider" />
        <HowItWorksSection />
        <hr className="gs-divider" />
        <FeaturesSection />
        <hr className="gs-divider" />
        <PricingSection />
        <hr className="gs-divider" />
        <StatsSection />
        <hr className="gs-divider" />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
