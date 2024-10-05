// pages/success.tsx

"use client";
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
// import { useRouter } from 'next/router';

export default function SuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();
//   const router = useRouter();

  // Stop the confetti after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Confetti stops after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white relative">
      {/* Confetti effect */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
        />
      )}

      {/* Success message */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-64 h-64 bg-gray-300 flex flex-col justify-center items-center rounded-md text-center">
          <h2 className="text-2xl font-bold">Order Successful</h2>
          <p className="mt-2 text-gray-600">You successfully ordered! Enjoy feeding the needy!</p>
        </div>

        <button
          className="bg-orange-500 text-white px-8 py-3 mt-8 rounded-md hover:bg-orange-600"
        //   onClick={() => router.push('/')} // Redirect to homepage or another page
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
