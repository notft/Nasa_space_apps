"use client"

import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email || !password) {
      setError("Please fill out all fields.")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("http://136.185.21.210:26908/login_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid email or password")
        } else {
          throw new Error("Login failed")
        }
      }

      const data = await res.json()

      Cookies.set('session', data.data.cookie, { expires: 30 })
      router.push('/home')
    } catch (e) {
      console.error(e)
      setError(e instanceof Error ? e.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen bg-[#121223] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-24 flex flex-col gap-3 items-center justify-center text-white"
      >
        <h1 className="text-3xl font-bold">LOGIN</h1>
        <h3 className="text-lg">Please sign in to your existing account</h3>
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            <label htmlFor="email" className="uppercase text-gray-700 font-semibold mb-2 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="bg-[#F0F5FA] rounded-md w-full h-10 text-gray-600 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
              placeholder="example@gmail.com"
              disabled={isLoading}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full"
          >
            <label htmlFor="password" className="mt-4 uppercase text-gray-700 font-semibold mb-2 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="bg-[#F0F5FA] rounded-md w-full h-10 text-gray-600 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-between w-full mb-4"
          >
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember-me" 
                className="mr-2" 
                checked={rememberMe} 
                onChange={handleRememberMeChange} 
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-[#FF7622] hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              Forgot password?
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button 
              type="submit" 
              className="uppercase font-bold rounded-xl text-[#ffff] bg-[#FF7622] w-40 h-11 transition duration-300 ease-in-out hover:bg-[#e56a1f] focus:outline-none focus:ring-2 focus:ring-[#FF7622] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="pt-4 text-center"
          >
            <p className="text-gray-700">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#FF7622] hover:underline transition duration-300 ease-in-out transform hover:scale-105 inline-block">
                Sign Up
              </a>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}