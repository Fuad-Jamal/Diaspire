import React from "react";

export default function ProgressCard() {
  return (
    <div className="max-w-sm  bg-white shadow-md rounded-xl p-6 mt-20">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">My Progress</h2>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-1">
        You are on track with your career readiness goals. Keep up the great
        work!
      </p>

      {/* Circular Progress */}
      <div className="flex justify-center mt-6">
        <svg className="w-32 h-32">
          <circle
            className="text-gray-200"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="64"
            cy="64"
          />
          <circle
            className="text-green-500"
            strokeWidth="12"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="64"
            cy="64"
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={2 * Math.PI * 50 * (1 - 0.75)} 
            // 0.75 = 75% progress
          />
        </svg>
      </div>
    </div>
  );
}
