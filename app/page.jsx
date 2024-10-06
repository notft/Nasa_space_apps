'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../public/images/logo.png';
import bg from '../public/images/bg.png';
import bgr from '../public/images/bgr.png';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push('/login');
    }, 4000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const zoomIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white h-screen w-screen"
        >
          <div className="h-screen w-screen flex flex-col items-center justify-center">
            <motion.div
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src={logo}
                alt="logo"
                width={190}
                height={190}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative bg-white h-screen w-screen overflow-hidden"
        >
          <motion.div
            className="absolute top-0 left-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src={bg}
              alt="background"
              width={350}
              height={100}
            />
          </motion.div>

          <motion.div 
            className="h-screen w-screen flex flex-col items-center justify-center"
            {...fadeInUp}
          >
            <motion.div {...zoomIn}>
              <Image
                src={logo}
                alt="logo"
                width={345}
                height={220}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-0"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src={bgr}
              alt="background"
              width={350}
              height={100}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}