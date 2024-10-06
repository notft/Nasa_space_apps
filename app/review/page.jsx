"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Review() {
  const [ngoName, setNgoName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      alert(`Review Posted: \nNGO: ${ngoName}\nRating: ${rating}\nReview: ${reviewText}`);
      setIsSubmitted(false);
      setNgoName('');
      setReviewText('');
      setRating(0);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl font-semibold mb-6 text-gray-800"
          variants={childVariants}
        >
          Review
        </motion.h1>

        <motion.div variants={childVariants}>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="ngoName">NGO NAME</label>
          <motion.input
            type="text"
            id="ngoName"
            placeholder="Enter NGO name"
            value={ngoName}
            onChange={(e) => setNgoName(e.target.value)}
            className="w-full text-black p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        <motion.div variants={childVariants}>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="review">REVIEW</label>
          <motion.textarea
            id="review"
            placeholder="Write your review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full text-black p-3 border border-black rounded-lg mb-6 h-24 focus:outline-none focus:ring-2 focus:ring-orange-400"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        <motion.div variants={childVariants}>
          <label className="block text-gray-700 font-semibold mb-2">RATING</label>
          <div className="flex items-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.svg
                key={star}
                className={`w-8 h-8 cursor-pointer ${hoverRating >= star || rating >= star ? 'text-orange-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleMouseEnter(star)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <path d="M12 .587l3.668 7.428 8.207 1.194-5.93 5.78 1.4 8.16L12 18.896l-7.345 3.853 1.4-8.16L.125 9.209l8.207-1.194L12 .587z" />
              </motion.svg>
            ))}
          </div>
        </motion.div>

        <motion.button
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-xl hover:bg-orange-600 transition duration-300"
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={childVariants}
        >
          ADD REVIEW
        </motion.button>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center"
            >
              Review submitted successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}