import React from "react";

interface CheckInButtonProps {
  onCheckIn: () => void;
}

export default function CheckInButton({ onCheckIn }: CheckInButtonProps) {
  return (
    <button
      onClick={onCheckIn}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95 border border-purple-500/30"
    >
      <span className="flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Check In Now
      </span>
    </button>
  );
}