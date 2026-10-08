"use client";

import { useState, useEffect } from "react";
import CheckInButton from "@/components/CheckInButton";
import Timer from "@/components/Timer";
import EncryptedField from "@/components/EncryptedField";
import { createCheckIn, getLatestCheckIn } from "@/lib/checkin";

export default function Home() {
  const [lastCheckIn, setLastCheckIn] = useState<Date | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load last check-in from Supabase or localStorage
    const loadCheckIn = async () => {
      try {
        const latestCheckIn = await getLatestCheckIn();
        if (latestCheckIn) {
          setLastCheckIn(new Date(latestCheckIn.check_in_time));
        } else {
          // Fallback to localStorage
          const savedCheckIn = localStorage.getItem("lastCheckIn");
          if (savedCheckIn) {
            setLastCheckIn(new Date(savedCheckIn));
          }
        }
      } catch (error) {
        console.error("Error loading check-in:", error);
        // Fallback to localStorage
        const savedCheckIn = localStorage.getItem("lastCheckIn");
        if (savedCheckIn) {
          setLastCheckIn(new Date(savedCheckIn));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCheckIn();
  }, []);

  const handleCheckIn = async () => {
    try {
      const now = new Date();
      await createCheckIn();
      setLastCheckIn(now);
      localStorage.setItem("lastCheckIn", now.toISOString());
      setIsExpired(false);
    } catch (error) {
      console.error("Error creating check-in:", error);
      // Fallback to localStorage only
      const now = new Date();
      setLastCheckIn(now);
      localStorage.setItem("lastCheckIn", now.toISOString());
      setIsExpired(false);
    }
  };

  const handleTimerExpired = () => {
    setIsExpired(true);
    // Trigger email notification
    sendExpirationEmail();
  };

  const sendExpirationEmail = async () => {
    try {
      await fetch("/api/send-expiration-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to send expiration email:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Check-in Timer
          </h1>
          <p className="text-gray-400 text-sm">48-hour monitoring system</p>
        </div>
        
        <div className="space-y-6">
          <Timer 
            lastCheckIn={lastCheckIn} 
            onExpired={handleTimerExpired}
          />
          
          <CheckInButton onCheckIn={handleCheckIn} />
          
          <EncryptedField />
        </div>

        {isExpired && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-2xl p-4 text-red-300 text-center backdrop-blur-sm">
            <div className="text-2xl mb-2">⚠️</div>
            <p className="font-semibold">Timer expired!</p>
            <p className="text-sm text-red-400 mt-1">Check-in required immediately</p>
          </div>
        )}
      </div>
    </main>
  );
}