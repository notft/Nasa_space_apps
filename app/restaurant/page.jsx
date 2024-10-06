'use client'

import { useState, useEffect } from "react"
import { Star, Clock, Plus, ShoppingBag } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
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
]


export default async function HomePage() {
  const [cart, setCart] = useState([])
  const [animateRestaurants, setAnimateRestaurants] = useState(false)
  const [animateItems, setAnimateItems] = useState(false)
  const res= await fetch("http://136.185.21.210:26908/fetch_items");

  const items = await res.json();

  useEffect(() => {
    setAnimateRestaurants(true)
    setTimeout(() => setAnimateItems(true), 500)
  }, [])

  const handleAddToCart = (itemId) => {
    setCart((prevCart) => [...prevCart, itemId])
    console.log(`Added item with id: ${itemId} to the cart`)
  }

  return (
    <div className="mx-auto p-8 bg-white w-screen h-[100vh] md:h-screen overflow-auto">
      <header className="flex justify-between items-center mb-6 animate-fadeIn">
        <div>
          <h1 className="text-2xl text-black font-bold">Restaurant</h1>
        </div>
        <div className="relative">
          <Link href='/cart'>
            <div className="relative">
              <div className="w-10 h-10 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                <ShoppingBag className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </Link>
        </div>
      </header>

      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="mb-6 flex flex-col justify-center items-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {restaurants.map((restaurant) => (
              <div 
                key={restaurant.id} 
                className={`bg-white w-[85vw] text-black rounded-lg shadow p-4 transition-all duration-500 ease-in-out ${
                  animateRestaurants ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-full h-40 text-black rounded-lg mb-4 overflow-hidden">
                  <div className="flex flex-row animate-scroll">
                    {[h1, h2, h3, h4, h1, h2].map((src, index) => (
                      <Image
                        key={index}
                        src={src}
                        alt={`Restaurant Image ${index + 1}`}
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
            <h1 className="text-2xl text-black font-bold">Items</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-6 w-full">
            {items.map((items, index) => (
              <div
                key={placeholder.id}
                className={`bg-white shadow-md p-4 w-full md:w-[20vw] text-center relative flex flex-col items-center transition-all duration-500 ease-in-out ${
                  animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-87 h-32 bg-gray-300 mb-4 overflow-hidden">
                  <Image
                    src={burger}
                    alt="Burger Image"
                    width={212}
                    height={130}
                    className="object-cover transition-transform hover:scale-110 duration-300"
                  />
                </div>
                <h2 className="pt-24 font-semibold text-lg text-black">{placeholder.name}</h2>
                <p className="text-sm text-gray-500">{placeholder.subtitle}</p>
                <div className="mt-4 text-xl font-bold text-black">{placeholder.number}</div>
                <button
                  onClick={() => handleAddToCart(placeholder.id)}
                  className="absolute bottom-4 right-4 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  aria-label={`Add ${placeholder.name} to cart`}
                >
                  <Link href="/cart">
                    <Plus className="w-6 h-6" />
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}