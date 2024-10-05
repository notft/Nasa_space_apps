"use client";
import React, { useState } from 'react';
import Cookies from 'js-cookie'; 
// import {useRouter, Router} from 'next/navigation';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const res = await fetch("https://hmpp6vkz-8000.inc1.devtunnels.ms/login_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

             
            if (!res.ok) {
                throw new Error("Login failed");
            }

            const data = await res.json();
            console.log("Login successful", data);

            Cookies.set('session', data.data.cookie, { expires: 30 });
            alert("Login successful");

        } catch (e) {
            console.error(e);
            alert("Login failed, please try again.");
        }
    };

    return (
        <div className='h-screen w-screen bg-[#121223]'>
            <div className='pt-24 flex flex-col gap-3 items-center justify-center text-white'>
                <h1 className="text-3xl font-bold">LOGIN</h1>
                <h3 className="text-lg">Please sign in to your existing account</h3>
            </div>
            <div className='pt-12 mx-auto rounded-xl mt-10 bg-white w-[70vw] md:w-[40vw] flex flex-col items-center justify-center'>
                <form className='flex mx-auto flex-col items-center justify-center w-full max-w-md p-4' onSubmit={handleSubmit}>
                    <label htmlFor="email" className="uppercase text-gray-700 font-semibold mb-2 self-start w-full max-w-md">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="bg-[#F0F5FA] rounded-md w-full max-w-md h-10 text-gray-600 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@gmail.com"
                    />
                    <label htmlFor="password" className="mt-4 uppercase text-gray-700 font-semibold mb-2 self-start w-full max-w-md">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="bg-[#F0F5FA] rounded-md w-full max-w-md h-10 text-gray-600 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                    <div className="flex justify-between w-full max-w-md mb-4">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="remember-me" 
                                className="mr-2" 
                                
                                checked={rememberMe} 
                                onChange={handleRememberMeChange} 
                            />
                            <label htmlFor="remember-me" className="text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-[#FF7622] hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <div>
                        <button type='submit' className='uppercase font-bold rounded-xl text-[#ffff] bg-[#FF7622] w-40 h-11'>
                            Log In
                        </button>
                    </div>
                    <div className="pt-4 text-center">
                        <p className="text-gray-700">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-[#FF7622] hover:underline">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
