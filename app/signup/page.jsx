"use client"

import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Signup() {
  const router = useRouter()
  const [userType, setUserType] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    setIsSuccess(false)

    if (name && email && password && userType) {
      try {
        const res = await fetch("http://136.185.21.210:26908/signup_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "usertype": userType,
          }),
        })

        if (!res.ok) {
          throw new Error("Signup failed")
        }

        const data = await res.json()
        console.log("Signup successful", data)

        if (data?.data?.cookie) {
            Cookies.set('session', data.data.cookie, { expires: 30 });
            setIsSuccess(true);
            setTimeout(() => {
              router.push('/login');
            }, 2000);
          } else {
            throw new Error("Cookie not found in response");
          }
      } catch (e) {
        console.error(e)
        setError("Signup failed, please try again.")
      } finally {
        setIsLoading(false)
      }
    } else {
      setError("Please fill out all fields.")
      setIsLoading(false)
    }
  }

  const formFields = [
    { id: 'name', label: 'Name', type: 'text', value: name, onChange: (e) => setName(e.target.value), placeholder: 'John Doe' },
    { id: 'email', label: 'Email', type: 'email', value: email, onChange: (e) => setEmail(e.target.value), placeholder: 'example@gmail.com' },
    { id: 'password', label: 'Password', type: 'password', value: password, onChange: (e) => setPassword(e.target.value), placeholder: 'Enter your password' },
  ]

  return (
    <div className="h-screen w-screen bg-[#121223] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-24 flex flex-col gap-3 items-center justify-center text-white"
      >
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <h3 className="text-lg">Please sign up to get started</h3>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pt-12 mx-auto rounded-xl mt-10 bg-white w-[70vw] md:w-[40vw] flex flex-col items-center justify-center shadow-lg"
      >
        <form className="flex mx-auto flex-col items-center justify-center w-full max-w-md p-4" onSubmit={handleSubmit}>
          {error && (
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-red-500 mb-4 w-full text-center"
            >
              {error}
            </motion.p>
          )}
          {isSuccess && (
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-green-500 mb-4 w-full text-center"
            >
              Signup successful! Redirecting to login...
            </motion.p>
          )}
          
          {formFields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="w-full mb-4"
            >
              <label htmlFor={field.id} className="uppercase text-gray-700 font-semibold mb-2 block">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                value={field.value}
                onChange={field.onChange}
                className="bg-[#F0F5FA] rounded-md w-full h-10 text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
                placeholder={field.placeholder}
                disabled={isLoading}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full mb-4"
          >
            <label htmlFor="userType" className="uppercase text-gray-700 font-semibold mb-2 block">
              Select User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="bg-[#F0F5FA] rounded-md w-full h-10 text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
              disabled={isLoading}
            >
              <option value="" disabled>Select user type</option>
              <option value="ngo">NGO</option>
              <option value="user">Restaurant</option>
            </select>
          </motion.div>

          <motion.button 
            type="submit"
            className="uppercase font-bold rounded-xl text-white bg-[#FF7622] w-40 h-11 transition duration-300 ease-in-out hover:bg-[#e56a1f] focus:outline-none focus:ring-2 focus:ring-[#FF7622] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            disabled={isLoading || isSuccess}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {isLoading ? 'Signing Up...' : isSuccess ? 'Success!' : 'Sign Up'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}