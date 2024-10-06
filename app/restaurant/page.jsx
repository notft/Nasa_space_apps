"use client";
import { useState } from "react";
import { Star, Clock, Plus, Ellipsis } from "lucide-react"; // Import Plus icon for the Add button
import burger from "./pngegg (5).png";
import h1 from "../home/h1.jpg";
import Image from 'next/image';
const restaurants = [
  {
    name: "Rose Garden Restaurant",
    cuisines: ["Burger", "Chicken", "Rice", "Wings"],
    rating: 4.7,
    deliveryFee: "Free",
    deliveryTime: "20 min",
    id: 1, // Add a unique ID for the restaurant
  },
  // Add more restaurants if needed
];

const placeholders = [
  { id: 1, name: "Burger Ferguson", subtitle: "Spicy Restaurant", number: "No 3" },
  { id: 2, name: "Burger Ferguson", subtitle: "Spicy Restaurant", number: "No 3" },
  // Add more placeholders if needed
];

export default function HomePage() {
  const [cart, setCart] = useState([]); // Track items added to the cart

  // Function to handle adding items to the cart
  const handleAddToCart = (itemId) => {
    setCart((prevCart) => [...prevCart, itemId]);
    console.log(`Added item with id: ${itemId} to the cart`);
  };

  return (
    <div className="mx-auto p-8 bg-white w-screen h-[100vh] md:h-screen overflow-auto">
      <div>
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl text-black font-bold">Restaurant</h1>
          </div>
          <div className="relative">
            <div className="w-10 h-10 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center">
              <Ellipsis className="w-6 h-6 text-orange-500" />
              {/* Add ellipsis or other icons as needed */}
              {/* <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"></span> */}
            </div>
          </div>
        </header>
      </div>

      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="mb-6 flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white w-[85vw] text-black rounded-lg shadow p-4">
                <div className="w-full h-40 bg-gray-200 text-black rounded-lg mb-4">
                  <div className="flex flex-row">
                  <Image
                    src={h1}
                    alt="Restaurant Image"
                    width={260}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                  <Image
                    src={h1}
                    alt="Restaurant Image"
                    width={260}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                  <Image
                    src={h1}
                    alt="Restaurant Image"
                    width={260}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                  <Image
                    src={h1}
                    alt="Restaurant Image"
                    width={260}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                  <Image
                    src={h1}
                    alt="Restaurant Image"
                    width={260}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                  <Image
                    src={h1}
                    alt="Restaurant Image"
                    width={260}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                  </div>
                </div>
                <h3 className="font-semibold mb-2 text-black">{restaurant.name}</h3>
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

          {/* Items Section */}
          <div className="w-full mt-6">
            <h1 className="text-2xl text-black font-bold">Items</h1>
          </div>

          {/* Placeholder Section with Tight Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-6 w-full ">
            {placeholders.map((placeholder) => (
              <div
                key={placeholder.id}
                className="bg-white shadow-md rounded-xl p-4 w-full md:w-[20vw] text-center relative flex flex-col items-center"
              >
                {/* Placeholder Image */}
                <div className="w-87 h-32 bg-gray-300 rounded-md mb-4">
                <Image
                    src={burger}
                    alt="Restaurant Image"
                    width={210}
                    height={130}
                    className="rounded-lg object-cover"
                  />
                </div>

                {/* Title */}
                <h2 className="pt-24 font-semibold text-lg text-black">{placeholder.name}</h2>

                {/* Subtitle */}
                <p className="text-sm text-gray-500">{placeholder.subtitle}</p>

                {/* Number */}
                <div className="mt-4 text-xl font-bold text-black">{placeholder.number}</div>

                {/* Add Button */}
                <button
                  onClick={() => handleAddToCart(placeholder.id)}
                  className="absolute bottom-4 right-4 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
