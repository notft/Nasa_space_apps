"use client"
import React, { useState } from 'react';

function Login() {
    const [userType, setUserType] = useState('');

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    }

    return (
        <div className='h-screen w-screen bg-[#121223]'>
            <div className='pt-24 flex flex-col gap-3 items-center justify-center text-white'>
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <h3 className="text-lg">Please sign up to get started</h3>
            </div>

            <div className='pt-12 mx-auto rounded-xl mt-10 bg-white w-[70vw] md:w-[40vw] flex flex-col items-center justify-center'>
                <form className='flex mx-auto flex-col items-center justify-center w-full max-w-md p-4'>
                    <label htmlFor="name" className="uppercase text-gray-700 font-semibold mb-2 self-start w-full max-w-md">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="bg-[#F0F5FA] rounded-md w-full max-w-md h-10 text-gray-600 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                    />
                    <label htmlFor="email" className="uppercase text-gray-700 font-semibold mb-2 self-start w-full max-w-md">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="bg-[#F0F5FA] rounded-md w-full max-w-md h-10 text-gray-600 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@gmail.com"
                    />
                    <label htmlFor="password" className="mt-4 uppercase text-gray-700 font-semibold mb-2 self-start w-full max-w-md">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="bg-[#F0F5FA] rounded-md w-full max-w-md h-10 text-gray-600 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />

                    <label htmlFor="userType" className="uppercase text-gray-700 font-semibold mb-2 self-start w-full max-w-md">
                        Select User Type
                    </label>
                    <select
                        id="userType"
                        value={userType}
                        onChange={handleUserTypeChange}
                        className="bg-[#F0F5FA] rounded-md w-full max-w-md h-10 text-gray-600 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select user type</option>
                        <option value="ngo">NGO</option>
                        <option value="restaurant">Restaurant</option>
                    </select>

                    <button className='uppercase font-bold rounded-xl text-white bg-[#FF7622] w-40 h-11'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
