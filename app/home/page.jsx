"use client"
import { useState, useEffect } from 'react';
import { Search, ChevronRight, Star, Clock, ShoppingBag } from 'lucide-react'; // Keep a single import of ShoppingBag
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: 'All', icon: '' },
  { name: 'Fruits', icon: '/placeholder.svg' },
  { name: 'Meals', icon: '/placeholder.svg' },
  { name: 'Pizza', icon: '/placeholder.svg?height=50&width=50' },
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
        const session = getCookie('session');
        console.log(session);
        const res = await fetch(`https://hmpp6vkz-8000.inc1.devtunnels.ms/validate?session=${session}`);
        const data = await res.json().data.name;
        setName(data || 'Guest'); // Fallback to 'Guest' if no name is returned
      } catch (error) {
        console.error(error);
        setName('NRO'); // Set fallback name on error
      }
    }

    fetchName();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="mx-auto p-8 bg-white w-screen h-[100vh] md:h-screen overflow-auto">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-black font-bold">Hey NGO, Good Afternoon!</h1>
        </div>
        <Link href='/cart'>
        
        <div className="relative">
          <div className="w-10 h-10 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center">
          <ShoppingBag  className="w-6 h-6 text-orange-500" />
            <span  className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            
          </div>
        
        </div>
        
        </Link>
      </header>

      <div className="mb-6 flex flex-col justify-center items-center">
        <div className="relative">
          <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Location, restaurants"
            className="w-[50vw] pl-10 pr-4 py-2 text-black  border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-black font-semibold">All Categories</h2>
          <button className="text-gray-500 flex items-center">
            See All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col text-black items-center p-2 rounded-lg ${
                selectedCategory === category.name ? 'bg-orange-100' : 'bg-gray-100'
              }`}
            >
              <Image src={category.icon} alt={category.name} width={40} height={40} className="mb-2" />
              <span className="text-sm text-black">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Open Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((restaurant, index) => (
            <Link href="/restaurant">
            <div key={index} className="bg-white text-black rounded-lg shadow p-4">
              <div className="w-full h-40 bg-gray-200 text-black rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2 text-black">{restaurant.name}</h3>
              <p className="text-sm text-gray-500 mb-2 ">{restaurant.cuisines.join(' • ')}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
}
