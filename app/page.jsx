'use client';
import Image from "next/image";
import { Router, useRouter } from "next/navigation";
import react, { useState, useEffect } from 'react';
import logo from '../public/images/logo.png';
import bg from '../public/images/bg.png';
import bgr from '../public/images/bgr.png';
// import './signup/page';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isNavgivating, setIsNavigating] = useState(false);

  const handleDelayNavigation = () => {
    setIsNavigating(true);
  }
    setTimeout(() => {
      router.push('/login');
    
    }, 1500);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white h-screen w-screen">
        <div className="h-screen w-screen flex flex-col items-center justify-center">
          <Image
            src={logo}
            alt="logo"
            width={190}
            height={190}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white h-screen w-screen">
      <div className={`absolute top-0 left-0  zoom-in-top`}>
        <Image
          src={bg}
          alt="background"
          width={350}
          height={100}
        />
      </div>

      <div className="h-screen w-screen flex flex-col items-center justify-center zoom-in">
        
        <Image
          src={logo}
          alt="logo"
          width={345}
          height={220}
        />
      </div>
      <div className={`absolute bottom-0 right-0 zoom-bottom-right`}>
        <Image
          src={bgr}
          alt="background"
          width={350}
          height={100}
        />
      </div>
    </div>
  );
}
