"use client";

import { useState, useEffect } from "react";
import { Star, Clock, Plus, ShoppingBag } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import burger from "./pngegg (5).png"
import h1 from "../home/h1.jpg"
import h2 from "./h2 (1).jpg"
import h3 from "./h2 (2).jpg"
import h4 from "./h2 (3).jpg"
const restaurants = [
  {
    name: "Rose Garden Restaurant",
    cuisines: ["Burger", "Chicken", "Rice", "Wings"],
    rating: 4.7,
    deliveryFee: "Free",
    deliveryTime: "20 min",
    id: 1,
  },
];

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [animateRestaurants, setAnimateRestaurants] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://136.185.21.210:26908/fetch_items");
        if (!res.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await res.json();
        setItems(Object.values(data)); // Use the API response
      } catch (err) {
        setError("Failed to load menu items. Please try again later.");
      }
    };

    fetchItems();
    setAnimateRestaurants(true);
    setTimeout(() => setAnimateItems(true), 500);
  }, []);

  const handleAddToCart = (itemId) => {
    setCart((prevCart) => [...prevCart, itemId]);
    console.log(`Added item with id: ${itemId} to the cart`);
  };

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  const defaultImage = "/h1 (1).jpg"; // Ensure this image exists in the public folder

  return (
    
    <div className="mx-auto p-8 bg-white w-full min-h-screen overflow-auto">
    <header className="flex justify-between items-center mb-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl text-black font-bold">Restaurant</h1>
      </div>
      <div className="relative">
        <Link href="/cart">
          <button className="rounded-full p-2 border border-gray-300 relative">
            <ShoppingBag className="w-6 h-6 text-orange-500" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </Link>
      </div>
    </header>

    <div className="mx-auto flex flex-col items-center justify-center">
      <div className="mb-6 flex flex-col justify-center items-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {restaurants.map((restaurant) => (
            <div 
              key={restaurant.id} 
              className='bg-white w-[85vw] text-black rounded-lg shadow p-4 transition-all duration-500 ease-in-out'
            >
              <div className="w-full h-40 text-black rounded-lg mb-4 overflow-x-hidden overflow-y-hidden">
                <div className="flex flex-row animate-scroll">
                  {[h1, h2, h3, h4, h1, h2].map((src, index) => (
                    <Image
                      key={index}
                      src={src}
                      width={260}
                      height={160}
                      className="object-cover"
                    />
                  ))}
                </div>
              </div>
              <h3 className="font-semibold mb-2 pt-16 text-black">{restaurant.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{restaurant.cuisines.join(" • ")}</p>
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
          ))}
        </div>
          <div className="w-full mt-6">
            <h2 className="text-2xl text-black font-bold">Menu Items</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-6 w-full">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-500 ease-in-out p-4 bg-white shadow rounded-lg ${
                  animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-full h-56 relative mb-4 overflow-hidden rounded-t-lg">
                  <Image
                    src={item.image_url && item.image_url.startsWith("http") ? item.image_url : defaultImage}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform hover:scale-110 duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-black">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.restaurant}</p>
                <p className="mt-2 text-sm">Quantity: {item.quantity}</p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600"
                  >
                    <Link href="/cart">
                    <Plus className="w-6 h-6" />
                  </Link>
                    <span className="sr-only">Add {item.name} to cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}