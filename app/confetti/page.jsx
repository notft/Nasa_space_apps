"use client";
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function SuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const { height } = useWindowSize();

  // Stop the confetti after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Confetti stops after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" min-h-screen w-screen flex flex-col justify-center items-center bg-white">
      <div className='flex flex-col items-center justify-center absolute top-6 left-80'>
      {showConfetti && (
        <div >
        <Confetti
          width={800}
          height={height / 2} // Show confetti only in the top half
          numberOfPieces={300}
          recycle={false} // Do not recycle pieces
        />
        </div>
      )}
      </div>

      {/* Success message */}
      <div className="flex flex-col items-center gap-4 z-10">
        <div className="w-[500px] sm:w-[800px] h-[300px] bg-orange-400 flex flex-col justify-center items-center rounded-md text-center shadow-lg mx-auto my-10">
          <h2 className="text-4xl font-bold">Order Successful</h2>
          <p className="mt-10 text-2xl text-black">You successfully ordered! Enjoy feeding the needy!</p>
        </div>

        <button className="bg-orange-500 text-white px-6 py-2 mt-8 rounded-md hover:bg-orange-600 w-full sm:w-auto transition duration-300">
          CONTINUE
        </button>
      </div>
      </div>
  );
}
