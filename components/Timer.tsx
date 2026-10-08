"use client";

import { useState, useEffect } from "react";

interface TimerProps {
  lastCheckIn: Date | null;
  onExpired: () => void;
}

export default function Timer({ lastCheckIn, onExpired }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(48 * 60 * 60 * 1000); // 48 hours in milliseconds
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!lastCheckIn) {
      setTimeLeft(48 * 60 * 60 * 1000);
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const elapsed = now.getTime() - lastCheckIn.getTime();
      const remaining = 48 * 60 * 60 * 1000 - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        if (!isExpired) {
          setIsExpired(true);
          onExpired();
        }
      } else {
        setTimeLeft(remaining);
        setIsExpired(false);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [lastCheckIn, onExpired]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = ((48 * 60 * 60 * 1000 - timeLeft) / (48 * 60 * 60 * 1000)) * 100;
  const isUrgent = progress > 75;

  return (
    <div className="space-y-4">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
        <div className="text-center">
          <div className={`text-5xl font-mono font-bold ${isUrgent ? 'text-red-400' : 'text-purple-400'} transition-colors duration-300`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Time remaining until next check-in
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ${
            isUrgent 
              ? 'bg-gradient-to-r from-red-600 to-orange-500' 
              : 'bg-gradient-to-r from-purple-600 to-pink-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Start</span>
        <span>{progress.toFixed(1)}%</span>
        <span>48h</span>
      </div>
    </div>
  );
}