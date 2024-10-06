"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  { id: 1, name: 'Appam', quantity: 0 },
  { id: 2, name: 'Payasam', quantity: 0 },
  { id: 3, name: 'Chorum Morum', quantity: 0 },
]

export default function ItemPage() {
  const [cart, setCart] = useState(items)
  const router = useRouter()

  const handleAdd = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const handleRemove = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const handleAddNewItem = () => {
    router.push('/add')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex flex-col items-center p-6"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="text-4xl font-bold text-black mb-8 text-center"
      >
        Add Item
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8"
      >
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white shadow-lg rounded-lg p-6 max-w-xs text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Image src="/placeholder.svg" alt={item.name} width={64} height={64} className="rounded-full mr-4" />
                <div>
                  <h2 className="text-xl font-semibold text-black">{item.name}</h2>
                  <motion.p
                    key={item.quantity}
                    initial={{ scale: 1.5, color: "#f97316" }}
                    animate={{ scale: 1, color: "#6b7280" }}
                    className="text-gray-500"
                  >
                    Quantity: {item.quantity}
                  </motion.p>
                </div>
              </div>
              <div className="flex space-x-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAdd(item.id)}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Add
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRemove(item.id)}
                  className="bg-white text-orange-500 border border-orange-500 px-4 py-2 rounded hover:bg-gray-200 transition"
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddNewItem}
        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
      >
        Add New Item
      </motion.button>
    </motion.div>
  )
}