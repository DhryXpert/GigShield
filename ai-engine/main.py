from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

app = FastAPI(
    title="AI GigShield — AI Engine",
    description="Risk Intelligence, Fraud Detection & Income Stability Scoring",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000"),
                   os.getenv("BACKEND_URL", "http://localhost:5000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "🛡️ AI GigShield — AI Engine",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "gigshield-ai-engine",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
    }
