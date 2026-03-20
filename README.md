# Project Title
AI GigShield – Income Protection for Delivery Workers

---

## Inspiration

Gig workers are the backbone of India’s on-demand economy, yet they face unpredictable income loss due to external disruptions like heavy rain, pollution, curfews, or app outages. These events can reduce their earnings by up to 20–30%, with no financial safety net available today. :contentReference[oaicite:0]{index=0}  

We wanted to build a system that doesn’t just insure—but actively protects and predicts income risks for gig workers.

---

## What it does

AI GigShield is an **AI-powered parametric insurance platform** designed specifically for delivery partners.

It:
- Protects **weekly income** against external disruptions
- Uses **AI to predict earnings and risks**
- Automatically triggers **instant payouts**
- Detects and prevents **fraudulent claims**

Core Features:
- AI-based **dynamic weekly premium**
- Real-time **risk monitoring (weather, pollution, curfew)**
- **Auto claim triggering** (zero manual effort)
- **UPI-based instant payouts**
- Fraud detection using behavior + location data

---

## How we built it

### 1. AI Risk Engine
- Predicts income risk using:
  - Weather APIs
  - Pollution data
  - Traffic patterns
  - Historical delivery trends

### 2. Weekly Premium Model
- Dynamic pricing based on:
  - Worker location
  - Risk exposure
  - Work hours

### 3. Parametric Trigger System
- Automatically triggers claims when:
  - Rain > threshold
  - AQI > threshold
  - Orders drop significantly
  - Worker active hours reduce

### 4. Fraud Detection System
- Detects anomalies like:
  - GPS spoofing
  - Fake idle time
  - Mismatch between claim and weather data

### 5. Instant Payout System
- Simulated UPI integration
- Claim → Approval → Payment within seconds

### 6. Dashboard
- Worker Dashboard:
  - Earnings protected
  - Active coverage
  - Alerts & predictions
- Admin Dashboard:
  - Risk analytics
  - Fraud alerts
  - Claim trends

---

## Challenges we ran into

- Designing **accurate parametric triggers** without false positives  
- Balancing **fair premium vs profitability**  
- Simulating **real-world APIs (weather, delivery data)**  
- Building **fraud detection logic with limited data**  
- Ensuring **instant payout simulation works smoothly**

---

## Accomplishments that we're proud of

- Built a **fully automated insurance flow (zero manual claims)**
- Designed a **dynamic weekly pricing model**
- Implemented **AI-based risk prediction**
- Created a **real-world scalable concept**, not just a prototype

---

## What we learned

- How **parametric insurance works in real scenarios**
- Importance of **AI in personalization and prediction**
- Trade-offs between **risk, pricing, and payouts**
- Designing systems that are both **practical and scalable**

---

## What's next for AI GigShield

- Integrate **real delivery platform APIs**
- Improve AI with **real user data**
- Add **multi-platform income tracking (Swiggy + Zomato + others)**
- Launch a **mobile-first application**
- Partner with **insurance providers for real deployment**

---

## Built With

React, Node.js, Express, MongoDB, Python, TensorFlow, Weather API, Razorpay (test mode), Tailwind CSS