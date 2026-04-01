# AI GigShield 🚀

An AI-powered parametric insurance platform that predicts, prevents, and automatically protects gig workers (delivery partners) from income loss due to external disruptions (rain, traffic, curfews).

## Overview
Built to ensure daily earners never face zero-income days from events completely out of their control. By combining an **Income Stability Score (ISS)**, **Behavioral Fraud Detection**, and **Parametric Auto-Claims** tied to Weather APIs, GigShield ensures gig workers get paid instantly via UPI when disaster hits.

## 🏆 Key Features Demonstrated
1. **Rider Onboarding & Risk Profiling:** Captures target earnings and preferred zone.
2. **AI Dynamic Premium Engine:** Calculates exactly what a rider should pay based on their ISS (0-100) and Zone Risk Multiplier.
3. **Weekly Shield Coverage:** Allows the purchase of fixed weekly micro-policies.
4. **Parametric Claims & Fraud Filter:** Features a "Simulate Event" button that immediately verifies active policies in the affected zone, clears fraud logs, and auto-generates a payout instantly without human intervention.

## 🛠️ Built With
- **Frontend:** Next.js 14, TailwindCSS, React 18, Framer Motion
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas

---

## 💻 How to Build & Run Locally (Judges Guide)

### Prerequisites
Make sure you have `node.js` installed. You will need 2 terminal windows.

### 1. Backend Setup
1. CD into the backend `cd backend`
2. Run `npm install`
3. Duplicate `.env.example` and rename it to `.env`. Add your MongoDB Atlas connection URL!
4. **Crucial Step:** Run the database seeder to populate the delivery zones!
   ```bash
   node src/scripts/seed.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. In your second terminal, CD into the frontend `cd frontend`
2. Run `npm install`
3. Start the Next.js app:
   ```bash
   npm run dev
   ```

### 3. Usage & Testing 
1. Open `http://localhost:3000` in your browser.
2. Log in with a random phone number (e.g. `8888888888`) and the magic OTP `123456`.
3. Complete your profile onboarding by selecting a City and Delivery Zone (e.g., *Bengaluru* -> *Koramangala*).
4. On the Dashboard, click **Generate Custom Premium**. AI calculates a custom policy price.
5. Pay/Activate the policy.
6. Look at the **Judge Panel** block! Click **TRIGGER HEAVY RAIN**.
7. Watch the parametric engine bypass all manual handlers, instantly verify fraud bounds, and payout.
