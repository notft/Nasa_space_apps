"use client"

import { useState, useEffect } from 'react';
import { Search, ChevronRight, Star, Clock, ShoppingBag, CirclePlus } from 'lucide-react'; 
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import png from './all.png';
import fruits from './fruits.png';
import meals from './pngegg (2).png';
import pizza from './pngegg (3).png';
import h1 from './h1.jpg';

const categories = [
  { name: 'All', icon: png }, 
  { name: 'Fruits', icon: fruits }, 
  { name: 'Meals', icon: meals }, 
  { name: 'Pizza', icon: pizza }, 
];

const restaurants = [
  { name: 'Rose Garden Restaurant', cuisines: ['Burger', 'Chicken', 'Rice', 'Wings'], rating: 4.7, deliveryFee: 'Free', deliveryTime: '20 min' },
  { name: 'Rose Garden Restaurant', cuisines: ['Burger', 'Chicken', 'Rice', 'Wings'], rating: 4.7, deliveryFee: 'Free', deliveryTime: '20 min' },
  { name: 'Pizza Palace', cuisines: ['Pizza', 'Wings'], rating: 4.8, deliveryFee: '4.5 kms', deliveryTime: '30 min' },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [name, setName] = useState('');

  useEffect(() => {
    async function fetchName() {
      try {
        const session = Cookies.get('session');
        console.log(session);
        const res = await fetch(`http://136.185.21.210:26908/validate?session=${session}`);
        const data = await res.json().data.name;
        console.log(res);
        setName(data); 
      } catch (error) {
        console.error(error);
        setName('NGO'); // Set fallback name on error
      }
    }

    fetchName();
  }, []);

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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto p-8 bg-white w-screen h-[100vh] md:h-screen overflow-hidden"
    >
      <motion.header variants={itemVariants} className="flex flex-row  w-screen justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-black font-bold">Hey {name}, Good Afternoon!</h1>
        </div>
       <div className='flex flex-row justify-end absolute right-10'>
        <Link href='/cart'>
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-10 h-10 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
            </div>
          </motion.div>
        </Link>
        <Link href='/add'>
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-{10} right-10 absolute h-10 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center">
              <CirclePlus className="w-6 h-6 text-orange-500" />
            </div>
          </motion.div>

        </Link>
        </div>
      </motion.header>

      <motion.div variants={itemVariants} className="mb-6 flex flex-col justify-center items-center">
        <div className="relative w-full max-w-[50vw]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <motion.input
            type="text"
            placeholder="Search Location, restaurants"
            className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg"
            initial={{ width: "80%" }}
            whileFocus={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-black font-semibold">All Categories</h2>
          <motion.button 
            className="text-gray-500 flex items-center"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            See All <ChevronRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
        <motion.div 
          className="flex space-x-4 overflow-x-auto pb-2"
          variants={containerVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col justify-between items-center h-24 text-black p-2 rounded-lg ${
                selectedCategory === category.name ? 'bg-orange-100' : 'bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <Image src={category.icon} alt={category.name} width={62} height={62} className="mb-2" />
              <span className="text-sm font-medium text-black mt-auto">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Open Restaurants</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
        >
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link href="/restaurant">
                <div className="bg-white text-black rounded-lg shadow p-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={h1}
                      alt="Restaurant Image"
                      width={500}
                      height={160}
                      className="rounded-lg object-cover"
                    />
                  </motion.div>
                  <h3 className="pt-8 font-semibold mb-2 text-black">{restaurant.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{restaurant.cuisines.join(' • ')}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">{restaurant.deliveryFee}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}