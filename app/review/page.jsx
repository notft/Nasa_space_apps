// pages/review.js
"use client"

import React, { useState } from 'react';

export default function Review() {
  // State for review form
  const [ngoName, setNgoName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Function to handle rating click
  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  // Function to handle hover
  const handleMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Review</h1>

        {/* NGO Name Input */}
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="ngoName">NGO NAME</label>
        <input
          type="text"
          id="ngoName"
          placeholder="Enter NGO name"
          value={ngoName}
          onChange={(e) => setNgoName(e.target.value)}
          className="w-full text-black p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Review Input */}
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="review">REVIEW</label>
        <textarea
          id="review"
          placeholder="Write your review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full text-black p-3 border border-black rounded-lg mb-6 h-24 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Rating */}
        <label className="block text-gray-700 font-semibold mb-2">RATING</label>
        <div className="flex items-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-8 h-8 cursor-pointer ${hoverRating >= star || rating >= star ? 'text-orange-500' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
            >
              <path d="M12 .587l3.668 7.428 8.207 1.194-5.93 5.78 1.4 8.16L12 18.896l-7.345 3.853 1.4-8.16L.125 9.209l8.207-1.194L12 .587z" />
            </svg>
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-xl hover:bg-orange-600 transition duration-300"
          onClick={() => alert(`Review Posted: \nNGO: ${ngoName}\nRating: ${rating}\nReview: ${reviewText}`)}
        >
          ADD REVIEW
        </button>
      </div>
    </div>
  );
}
