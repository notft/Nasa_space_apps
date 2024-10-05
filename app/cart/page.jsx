// pages/cart.js
"use client"
import React,{ useState } from 'react';

export default function Cart() {
  // Cart items state (default quantity of 2 for all items)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Ozone', quantity: 1 },
    { id: 2, name: 'Ozone', quantity: 1 },
    { id: 3, name: 'Ozone', quantity: 1 },
    { id: 4, name: 'Ozone', quantity: 1 },
  ]);

  // Address state
  const [address, setAddress] = useState('');

  // Handle increment and decrement
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

  // Calculate total quantity
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Cart</h1>

        {/* Cart Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {cartItems.map(item => (
            <div key={item.id} className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm font-semibold">Chorum Morum</p>
              <p className="text-xl font-bold">{item.name}</p>
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => updateQuantity(item.id, 'decrement')}
                  className="text-lg font-bold bg-gray-700 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="mx-4 text-lg">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 'increment')}
                  className="text-lg font-bold bg-gray-700 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Restaurant Address */}
        <div className="bg-white text-black p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">RESTAURANT ADDRESS</h2>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-gray-100 p-4 rounded-lg"
          />
        </div>

        {/* Total and Place Order */}
        <div className="flex flex-col gap-5 justify-center items-center mb-4">
          <p className="text-xl font-semibold">TOTAL: {totalQuantity}</p>
          {/* <a href="#" className="text-orange-500">Breakdown</a> */}
          <button className="w-[20vw] bg-orange-500 text-white text-xl font-semibold py-4 rounded-lg">PLACE ORDER</button>
        </div>
       
      </div>
    </div>
  );
}
