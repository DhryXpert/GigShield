# AI GigShield 🚀

![Banner](https://raw.githubusercontent.com/DhryXpert/GigShield/main/frontend/public/banner.png)

An AI-powered parametric insurance platform that predicts, prevents, and automatically protects gig workers from income loss due to external disruptions (rain, traffic, curfews).

## 💡 Inspiration
India has **2M+ gig delivery workers**. A single monsoon afternoon can wipe out a Blinkit rider's entire day of earnings—instantly, with zero fallback. Traditional insurance doesn't work for daily earners: monthly premiums, 15-30 day claim settlements, and manual paperwork make it completely irrelevant for someone who needs money the same day they lose it.

**AI GigShield** was inspired by a simple question: *What if protection was automatic, instant, and built around how gig workers actually earn?*

## ✨ What It Does
AI GigShield is a parametric income protection platform for Blinkit's last-mile delivery partners.
- **Real-time AI Risk Engine:** Monitors weather, traffic, and order density every 10 minutes across delivery zones.
- **Dynamic Weekly Pricing:** Income Stability Score (ISS) dynamically prices a rider's weekly premium (₹20-₹45) based on their individual risk profile.
- **Parametric Auto-Trigger:** Claims fire the moment disruption thresholds are breached — no claim form, no call center.
- **Behavioral Fraud Detection:** Validates claims using GPS behavior and multi-API weather cross-verification.
- **Instant UPI Payouts:** Credited to the rider within 5 minutes of a verified disruption.

## 🏗️ How We Built It
The platform consists of four intelligent layers:
1. **Predict:** XGBoost ML model trained on disruption + earnings correlation data, refreshed every 30 minutes via OpenWeather and Google Maps APIs.
2. **Price:** Dynamic weekly premium calculation using ISS score, zone flood history, and IMD forecasts.
3. **Trigger:** Parametric logic that fires automatically when rain > 40mm, order density drops > 50%, or temperature exceeds 42°C.
4. **Pay:** Razorpay Payout logic (Mocked) verifies and transfers funds post-fraud validation.

**Tech Stack:**
- **Frontend:** Next.js 14, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Security:** JWT (HttpOnly Cookies), CSRF Protection

## 🛡️ Fraud Detection Engine
To scale parametric insurance, we built a robust fraud detection system:
- **Location Cross-Check:** Verifies the rider was actually active in the storm zone during the event.
- **GPS Spoofing AI:** Detects anomalous movement patterns often used to trick delivery apps.
- **Community Validation:** Cross-references inactivity across 50+ riders in the same zone to confirm localized disruption.

## 🚀 Challenges We Faced
- **Modeling Rainfall Impact:** Determining the exact point where "it's raining" becomes "it's impossible to deliver" required analyzing historical order drop-off across different Indian cities.
- **Fraud Robustness:** Designing a system that catches "fake inactivity" without creating false positives that block legitimate claims.
- **Unit Economics:** Structuring the pricing on a weekly cycle to match Blinkit's payment cadence—most insurance models are built around monthly/annual billing.

## 🔮 Future Roadmap
- **Live Integration with IMD:** Direct alerts from India Meteorological Department for better predictive accuracy.
- **Predictive Shift Alerts:** "Heavy rain in Sector 62 in 45 mins — move to Sector 50 for 3x lower disruption risk."
- **Expansion:** Scaling to Swiggy Instamart, Zepto, and Porter delivery partners.

---

## 💻 Setup & Installation

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env # Add your MongoDB Atlas URI
node src/scripts/seed.js # Required to populate delivery zones
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---
**GigShield** — Ensuring that a rainy day never means a hungry day. 🛡️🌧️
