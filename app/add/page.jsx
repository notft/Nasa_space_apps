// pages/upload.js
"use client"

import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [restaurant, setRestaurant] = useState('');
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file){
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      console.log(imageUrl);
      setSelectedFile(file);
    }
    
  };

  const handleReset = () => {
    setImage('null');
    setItemName('');
    setQuantity('');
    setRestaurant('');
  };

  const handleUpload = async () => {
    const formdata = new FormData();
    formdata.append("file", selectedFile);

    try{
        const req = await fetch('http://136.185.21.210:26908/upload_image', {
            method: "POST",
            body: formdata,
        })
        const result = await req.json();
        console.log(req)
        if (req.ok){
            const url = result.data.url;
            const response = await axios.post("http://136.185.21.210:26908/add_item", {
                "session": Cookies.get("session"),
                "name" : itemName,
                "restaurant": restaurant,
                "quantity": quantity,
                "image_url": url,
           },{
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response)
            if (response.ok){
                alert("Failed");
            } else {
                alert("Item added");
            }
        }
    }catch(e){
        throw new Error(e);
    }

    
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">Add New Items</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Item Name</label>
          <input
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Upload Photo</label>
          <div className="flex items-center gap-4">
            {image ? (
              <img src={image} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
            ) : (
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-500 pl-5">
                Image Preview
              </div>
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="px-4 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Restaurant</label>
          <textarea
            placeholder="Enter Restaurant"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-black"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          >
            Reset
          </button>
          <button onClick={handleUpload} className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
