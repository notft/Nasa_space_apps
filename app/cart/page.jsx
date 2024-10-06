"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import h1 from "./pngegg (6).png";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Ozone', quantity: 1 },
    { id: 2, name: 'Ozone', quantity: 1 },
    { id: 3, name: 'Ozone', quantity: 1 },
    { id: 4, name: 'Ozone', quantity: 1 },
  ]);

  const [address, setAddress] = useState('');

  const updateQuantity = (id, action) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: action === 'increment' ? item.quantity + 1 : item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="bg-gray-900 text-white min-h-screen overflow-y-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-6"
          variants={itemVariants}
        >
          Cart
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
        >
          <AnimatePresence>
            {cartItems.map(item => (
              <motion.div 
                key={item.id} 
                className="bg-gray-800 p-4 rounded-lg text-center"
                variants={itemVariants}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 0px 8px rgb(255,255,255)",
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Image
                  src={h1}
                  alt="Restaurant Image"
                  width={320}
                  height={160}
                  className="rounded-lg object-cover"
                />
                <motion.p 
                  className="pt-12 text-2xl font-semibold"
                  whileHover={{ scale: 1.1, color: "#FFA500" }}
                >
                  Chorum Morum
                </motion.p>
                <motion.p 
                  className="text-xl font-bold"
                  whileHover={{ scale: 1.1, color: "#FFA500" }}
                >
                  {item.name}
                </motion.p>
                <div className="flex justify-center items-center mt-4">
                  <motion.button
                    onClick={() => updateQuantity(item.id, 'decrement')}
                    className="text-lg font-bold bg-gray-700 px-2 py-1 rounded"
                    whileHover={{ scale: 1.1, backgroundColor: "#FFA500" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <motion.span 
                    className="mx-4 text-lg"
                    key={item.quantity}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.quantity}
                  </motion.span>
                  <motion.button
                    onClick={() => updateQuantity(item.id, 'increment')}
                    className="text-lg font-bold bg-gray-700 px-2 py-1 rounded"
                    whileHover={{ scale: 1.1, backgroundColor: "#FFA500" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="pt-14 bg-white text-black p-6 rounded-lg shadow-md mb-6"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold md:ml-14 mb-4">RESTAURANT ADDRESS</h2>
          <div className='flex flex-col justify-center items-center'>
            <motion.p 
              className="bg-slate-300 h-14 rounded-lg p-2 pb-4 md:p-5 w-[80vw] md:w-[70vw]"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Pala, Choondacherry Sjcet, 686515, Kottayam Kerela 
            </motion.p>
          
            <div className="flex mt-5 flex-col gap-5 justify-center items-center mb-4">
              <motion.p 
                className="text-xl font-semibold"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                TOTAL: {totalQuantity}
              </motion.p>
              <motion.button  
                className="md:w-[20vw] w-[39vw] bg-orange-500 text-white text-lg font-semibold py-4 rounded-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#FF8C00" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/review">PLACE ORDER</Link>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}