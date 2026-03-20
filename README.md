# 🛡️ AI GigShield
### *AI-Powered Parametric Income Protection for Blinkit Delivery Partners*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built for: DEVTrails 2026](https://img.shields.io/badge/Built%20for-Guidewire%20DEVTrails%202026-blueviolet)](https://github.com/DhryXpert/GigShield)
[![Domain: InsurTech](https://img.shields.io/badge/Domain-InsurTech-brightgreen)](https://github.com/DhryXpert/GigShield)
[![AI Powered](https://img.shields.io/badge/AI-Powered-blue)](https://github.com/DhryXpert/GigShield)
[![Phase: 1](https://img.shields.io/badge/Phase-1%20%E2%80%94%20Ideation-orange)](https://github.com/DhryXpert/GigShield)

---

## 📌 Executive Summary

**AI GigShield** is a next-generation parametric insurance platform purpose-built for **Blinkit's last-mile delivery partners** — the Q-commerce riders who power 10-minute deliveries across India's metro cities.

When a sudden thunderstorm grounds Mumbai's delivery fleet, or a heatwave in Delhi pushes temperatures past safe working limits — these riders lose income instantly, with **zero fallback**. GigShield changes that. Using a real-time AI risk engine, automated parametric triggers, and instant UPI payouts, we protect a rider's weekly earnings the moment a disruption is detected — **no claim forms, no waiting, no friction**.

> *"We're not building a claims app on top of a weather API. We're building an AI risk intelligence platform with insurance as the output."*

---

## 🎯 Persona: The Blinkit Delivery Partner

| Attribute | Reality |
|---|---|
| **Platform** | Blinkit (Q-Commerce — 10-minute grocery & essentials delivery) |
| **Earnings Model** | Per-delivery commission + zone surge, paid weekly |
| **Working Hours** | 6–14 hours/day, heavily weather-dependent |
| **Primary Risks** | Monsoon rain, extreme heat (40°C+), dense fog, flash floods, local strikes |
| **Existing Protection** | None. Platforms offer no income safety net. |
| **Monthly Income** | ₹15,000 – ₹25,000 (entirely variable, no floor) |

### A Day in the Life — Why This Matters

**Scenario:** Rahul is a Blinkit partner in Gurugram. It's a Tuesday afternoon and he's on track for ₹700 in earnings. At 3:30 PM, the IMD alert triggers — heavy rain, Category 3 intensity. Orders drop 70% in 15 minutes. By 6 PM, Rahul has earned ₹210 for the day.

**With GigShield:** At 3:32 PM, our parametric trigger fires automatically. Rahul receives a push notification: *"Disruption detected. ₹350 income protection credited to your UPI."* No form. No call center. No waiting.

---

## ⚠️ The Problem: Income Volatility at Scale

India's Q-commerce sector has **2M+ active delivery partners**. Blinkit alone operates across 40+ cities. These workers:

- Earn **daily** — income loss is felt the same day
- Have **zero savings buffer** — most carry less than 7 days of reserves
- Face **3–5 weather/disruption events per month** during monsoon season
- Lose **20–30% of monthly income** due to uncontrollable external factors

### Why Existing Solutions Fail

| Solution | Gap |
|---|---|
| Traditional insurance | Weekly/monthly premiums, manual claims, 15–30 day settlement |
| Platform earnings guarantees | Don't exist for Blinkit; not parametric |
| Government schemes | Complex onboarding, not designed for gig workers |
| Personal savings | Median gig worker savings: < ₹5,000 |

**The core gap:** No product exists that automatically detects a Blinkit partner's disruption event, verifies it against real-world data, and pays them within minutes — without any human intervention.

---

## 💡 Our Solution: AI GigShield

We address this with four interconnected layers:

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1 — PREDICT    │  AI Risk Engine scores zones daily  │
├───────────────────────┼─────────────────────────────────────┤
│  LAYER 2 — PRICE      │  Dynamic weekly premium per rider   │
├───────────────────────┼─────────────────────────────────────┤
│  LAYER 3 — TRIGGER    │  Parametric auto-claim on disruption│
├───────────────────────┼─────────────────────────────────────┤
│  LAYER 4 — PAY        │  Instant UPI payout, fraud-verified │
└─────────────────────────────────────────────────────────────┘
```

### What Makes This Different

| Traditional Insurance | AI GigShield |
|---|---|
| Rider files a claim | System files automatically |
| 15–30 day settlement | Sub-5 minute payout |
| Fixed annual/monthly premium | Dynamic weekly premium per risk profile |
| Manual fraud review | AI behavioral anomaly detection |
| Protects assets | Protects income only (parametric) |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                        AI GIGSHIELD PLATFORM                         │
│                                                                      │
│  ┌──────────────┐    ┌──────────────────┐    ┌──────────────────┐   │
│  │  Rider App   │───▶│   Backend API    │───▶│   AI Engine      │   │
│  │ (Next.js PWA)│    │  (Node/Express)  │    │ (Python/FastAPI) │   │
│  └──────────────┘    └────────┬─────────┘    └────────┬─────────┘   │
│                               │                        │             │
│                       ┌───────▼────────┐    ┌─────────▼──────────┐  │
│                       │   MongoDB DB   │    │  ML Models         │  │
│                       │ (Policies,     │    │  - Risk Scoring    │  │
│                       │  Claims,       │    │  - Fraud Detection │  │
│                       │  Profiles)     │    │  - Stability Score │  │
│                       └───────┬────────┘    └────────────────────┘  │
│                               │                                      │
│              ┌────────────────┼────────────────┐                     │
│              ▼                ▼                ▼                     │
│       ┌──────────┐   ┌──────────────┐  ┌────────────┐              │
│       │ OpenWeather│  │ Google Maps  │  │  Razorpay  │              │
│       │    API    │  │ Traffic API  │  │ (Test Mode)│              │
│       └──────────┘   └──────────────┘  └────────────┘              │
└──────────────────────────────────────────────────────────────────────┘
```

### End-to-End Flow

```
Rider Registers (Location + Zone + Delivery History)
        │
        ▼
AI Calculates Income Stability Score (300–900)
        │
        ▼
Weekly Premium Generated (₹20 / ₹30 / ₹45 based on risk)
        │
        ▼
Rider Buys Policy (UPI, weekly debit)
        │
        ▼
System Monitors: Weather + Traffic + Order Density (real-time)
        │
        ▼
Disruption Threshold Breached?
   ├── NO  → Continue monitoring
   └── YES → Fraud Engine validates claim
                │
                ├── FRAUD DETECTED → Flag, block, escalate
                └── CLEAN → Instant UPI payout to rider
```

---

## 🧠 Core AI Engines (Technical Deep Dive)

### Engine 1 — Risk Intelligence Engine

**Purpose:** Predict income disruption probability per zone, per shift window.

**Input Features:**
- `rain_mm` — rainfall intensity (OpenWeather API)
- `temp_celsius` — ambient temperature (critical above 40°C for outdoor workers)
- `aqi_index` — Air Quality Index (safe threshold: AQI < 150)
- `traffic_congestion_index` — Google Maps real-time data
- `historical_order_drop_rate` — zone-level historical data
- `local_event_flags` — strike alerts, curfew data, festival closures

**Output:** `risk_score` (0–100) → Zone classification: `LOW / MEDIUM / HIGH / CRITICAL`

**Model:** Gradient Boosted Trees (XGBoost) trained on historical disruption × earnings drop correlation data. Updated with live API data every 30 minutes.

```python
# Simplified parametric trigger logic
def evaluate_trigger(zone_data: ZoneSnapshot) -> ClaimDecision:
    if (zone_data.rain_mm > 40 and
        zone_data.order_density_drop_pct > 50 and
        zone_data.active_rider_pct < 30):
        return ClaimDecision.TRIGGER_AUTO_CLAIM
    if zone_data.temp_celsius > 42 and zone_data.active_rider_pct < 20:
        return ClaimDecision.TRIGGER_AUTO_CLAIM
    return ClaimDecision.CONTINUE_MONITORING
```

---

### Engine 2 — Income Stability Score (ISS)

A credit-score-style rating (**300–900**) unique to each rider — the insurance industry equivalent of underwriting, built for gig workers.

| Factor | Weight | Description |
|---|---|---|
| Active delivery hours/week | 30% | Consistent earners = lower risk |
| Zone risk history | 25% | Riders in flood-prone zones score lower |
| Disruption resilience | 20% | How often rider works despite low-risk alerts |
| Platform tenure | 15% | Longer on Blinkit = more data = better pricing |
| Claim history | 10% | Prior fraudulent claims tank the score |

**ISS directly determines premium band.** A rider with ISS 750+ in a low-risk zone pays ₹18/week. A new rider in a high-flood zone pays ₹48/week.

---

### Engine 3 — Smart Weekly Premium Engine

**Core Rule:** Aligned to Blinkit's weekly payout cycle. Riders pay weekly, get covered weekly.

```
Premium = BasePremium × RiskMultiplier × ZoneMultiplier × ISS_Discount
```

| Risk Tier | Zone Examples | Weekly Premium | Coverage Cap |
|---|---|---|---|
| 🟢 Low | South Delhi, Whitefield Bengaluru | ₹20 | ₹800 |
| 🟡 Medium | Andheri West, Gurgaon Sector 56 | ₹30 | ₹1,200 |
| 🔴 High | Dharavi adjacent, Kurla, Rohini | ₹45 | ₹1,800 |

**Dynamic Repricing:** Premium recalculates every Sunday night for the upcoming week based on 7-day weather forecast + zone risk delta.

---

### Engine 4 — Parametric Trigger Engine

The system continuously monitors 5 real-time data streams and evaluates trigger conditions every 15 minutes per zone.

| Disruption Type | Trigger Condition | Payout % |
|---|---|---|
| Heavy Rain | Rain > 40mm/hr AND order drop > 50% | 70% of daily avg earnings |
| Extreme Heat | Temp > 42°C AND active riders < 20% of zone | 60% |
| Dense Fog | Visibility < 100m AND order drop > 40% | 65% |
| Flash Flood / Waterlogging | Traffic index CRITICAL AND 50+ riders offline in zone | 80% |
| Strike / Curfew | Local event flag + zone lockdown confirmed | 75% |

**Community Validation Layer:** If 30+ Blinkit riders in the same zone simultaneously go offline and location data shows stationary GPS — the system treats this as a confirmed disruption signal, even before weather API confirms.

---

### Engine 5 — Fraud Detection Engine

**Industrial-grade behavioral AI** preventing platform abuse across 4 fraud vectors:

| Fraud Type | Detection Signal | Response |
|---|---|---|
| GPS Spoofing | Impossible velocity: >100km/h movement between pings | Flag + ISS penalty |
| Fake Weather Claim | Primary API says rain; 3 secondary APIs confirm dry | Auto-reject + flag |
| Fake Inactivity | App session active while claiming offline | Reject + review |
| Duplicate Claim | Cryptographic hash of trigger event → deduplicate | Auto-block |

**Anomaly Scoring:** Each claim gets an `anomaly_score` (0–1). Score > 0.75 → human review queue. Score > 0.90 → auto-block + ISS deduction.

---

### Engine 6 — Instant Payout Engine

Once fraud check passes:

```
Fraud-clear signal received
        │
        ▼
Payout amount calculated (earnings_avg × disruption_pct)
        │
        ▼
Razorpay Payout API called (UPI / bank transfer)
        │
        ▼
Rider receives money — target: < 5 minutes from trigger
        │
        ▼
Push notification + claim receipt generated
        │
        ▼
Claim logged for admin analytics
```

---

## 📐 Weekly Premium Model — Detailed Breakdown

> **Non-negotiable requirement:** All pricing structured on a **weekly basis** to match Blinkit's weekly earning cycle.

### Why Weekly (Not Monthly)?

- Blinkit pays riders **every week** — a monthly premium would require riders to save across 4 pay cycles
- Disruption events cluster — one bad monsoon week can wipe the month
- Weekly pricing creates **micro-commitment** — low barrier to adoption (₹20–₹45 is a single delivery's earnings)
- Drop-off and re-enroll is weekly — matches the informal nature of gig work

### Premium Calculation Example

**Rider Profile:** Karan, Blinkit partner, Zone: Saket, Delhi. ISS: 680. Forecast: moderate rain week.

```
Base premium:        ₹25.00
Zone multiplier:     × 1.1  (Saket — moderate flood history)
Risk forecast adj:   × 1.15  (IMD predicts 3 heavy rain days this week)
ISS discount:        × 0.94  (ISS 680 → 6% discount)
─────────────────────────────
Final weekly premium: ₹29.70 → rounded to ₹30
Coverage cap this week: ₹1,200
```

---

## 🗺️ Advanced Differentiators

### 1. Hyper-Local Risk Heatmap
Real-time city map (Blinkit zone overlay) showing current disruption risk. Color-coded by severity. Riders see risk before they start a shift and can choose safer zones.

### 2. Predictive Shift Alerts
`"Heavy rain forecast in Sector 62 in 45 mins. Consider moving to Sector 50 — disruption risk is 3× lower."`
Proactive, not reactive. Prevents income loss before it happens.

### 3. Community Validation System
Crowdsourced disruption confirmation:
- If 30+ riders in Zone X go offline simultaneously → system flags as likely disruption
- Cross-validates with weather + traffic APIs
- Reduces false negative claims (real disruptions that APIs miss)

### 4. Income Stability Score Dashboard
Riders can view their ISS, understand what factors are affecting it, and take actions to improve their premium. Gamification + transparency = trust + retention.

---

## 📊 Dashboard System

### Worker Dashboard
- Active policy status + coverage cap remaining this week
- Real-time zone risk level (refreshed every 30 min)
- Earnings protected YTD
- Claim history + payout receipts
- Shift zone recommendations
- ISS score + improvement tips

### Admin / Insurer Dashboard
- Live claim feed with anomaly scores
- Zone-level risk heatmap
- Loss ratio by zone, week, disruption type
- Fraud detection log
- Predictive analytics: next week's expected claim volume
- Weekly premium revenue vs payout comparison

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | Next.js 14, Tailwind CSS, PWA | Mobile-first; Blinkit riders use phones not desktops |
| **Backend API** | Node.js, Express.js | Fast, scalable REST API layer |
| **AI / ML** | Python, FastAPI, XGBoost, scikit-learn | Production-grade ML serving with low latency |
| **Database** | MongoDB (policies, claims), Redis (session/cache) | Flexible schema for claims; Redis for real-time state |
| **Weather** | OpenWeather API (free tier + mocked data) | IMD-correlated rain/temp/AQI data |
| **Traffic** | Google Maps Traffic API (mocked) | Congestion index per zone |
| **Payments** | Razorpay Payout API (test mode) | UPI-native, India-first payment rails |
| **Auth** | JWT + OTP (phone number) | No email — riders use phone-only |
| **Hosting** | Vercel (FE), Railway (BE + AI) | Fast CI/CD, low ops overhead during hackathon |

---

## 📅 Phase-wise Build Plan

### ✅ Phase 1 — Ideation & Foundation (Weeks 1–2) `[Current]`

| Deliverable | Status |
|---|---|
| Problem statement + persona research | ✅ Complete |
| Risk engine logic + trigger conditions | ✅ Defined |
| Weekly premium model + ISS framework | ✅ Defined |
| Tech stack decision + repo setup | ✅ Complete |
| README (this document) | ✅ Complete |
| 2-minute strategy video | 🔄 In progress |

### 🔄 Phase 2 — Automation & Protection (Weeks 3–4)

- Rider registration + onboarding flow
- Policy creation with weekly pricing
- Dynamic premium calculation (ML-backed)
- Parametric trigger system (3–5 automated triggers with mocked APIs)
- Claims management dashboard
- 2-minute demo video

### 🔜 Phase 3 — Scale & Optimise (Weeks 5–6)

- Advanced fraud detection (GPS spoofing, fake inactivity)
- Instant Razorpay payout simulation
- Full worker + admin dashboards
- Final 5-minute demo video
- Pitch deck (PDF)

---

## 🔑 Critical Design Decisions

### Why Parametric, Not Indemnity?

Traditional indemnity insurance requires proof of actual loss. For a Blinkit rider:
- Proof of loss = order logs, GPS history, bank statements → complex and invasive
- Processing time = days to weeks → useless for daily earners
- Parametric insurance triggers on **objectively measurable external events** (rain > 40mm) → instant, automatic, fair

### Why Weekly Pricing?

- Blinkit pays weekly → premium deducted weekly = **zero cash flow mismatch**
- Riders can pause coverage during personal leave without penalty
- Lower weekly price (₹20–₹45) vs monthly (₹80–₹180) = better perceived affordability

### Coverage Scope — Explicit Exclusions

Per problem statement requirements, GigShield **strictly covers income loss only**. The following are explicitly excluded:

| ❌ Excluded | Reason |
|---|---|
| Vehicle damage / repair | Not income loss |
| Health / accident / hospitalization | Separate insurance product |
| Life insurance | Out of scope |
| Platform app crashes or order cancellations | Platform SLA, not external disruption |

---

## 💰 Business Viability

### Unit Economics (Per Rider, Monthly)

```
Average weekly premium:           ₹32
Monthly premium collected:        ₹128
Expected monthly payout:          ₹85  (disruption rate ~3×/month, avg ₹28/event)
Gross margin per rider/month:     ₹43  (33.5%)
Fraud loss buffer (5%):          -₹6.40
Net margin per rider/month:       ₹36.60
```

### Scalability

- **10,000 riders:** ₹3.66L/month net margin
- **1,00,000 riders:** ₹3.66 Cr/month net margin
- Premium adjusts upward with monsoon risk → natural hedge against claims spike

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB instance (local or Atlas)
- OpenWeather API key (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/DhryXpert/GigShield.git
cd GigShield

# Backend
cd backend && npm install && npm run dev

# AI Engine
cd ai-engine && pip install -r requirements.txt && uvicorn main:app --reload

# Frontend
cd frontend && npm install && npm run dev
```

### Environment Variables

```env
# Backend
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_test_key

# AI Engine
OPENWEATHER_API_KEY=your_openweather_key
GMAPS_API_KEY=your_maps_key
```

---

## 👥 Team

> Built with purpose for Guidewire DEVTrails 2026 — protecting the backbone of India's Q-commerce economy.

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with ❤️ for Blinkit Delivery Partners**

*Because every ₹ they earn is earned through sweat — and no rainstorm should take that away.*

</div>
