// Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/profile/show', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('jwt')
                    }
                });
                const result = res.data;
                if (result) {
                    console.log(result);
                    setFullName(result.name);
                    setEmail(result.email);
                    setImageUrl(result.profile);
                    setLoading(false);
                } else {
                    console.log('Error');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    const handleImageChange = async (e) => {
        const imageData = new FormData();
        imageData.append('file', e.target.files[0]);
        imageData.append('upload_preset', 'Instagram Clone');
        imageData.append('cloud_name', 'dr81x5wpk');

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dr81x5wpk/image/upload', {
                method: 'POST',
                body: imageData
            });
            const data = await res.json();
            setImageUrl(data.url);
            console.log(data.url);
            // Update profile picture in the database
            
            fetch("http://localhost:4000/api/profile/add",{
                method:"POST",
                headers:{
                    "content-type": "application/json",
                    Authorization: "Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({url:data.url})
    
            })
            .then((res)=>res.json())
            .then((saved)=>{
                if(saved.success==true)
                    {
                      console.log(saved)
                        console.log("Success");
                    }
                    else
                    console.log("failure");
    
    
            })
            .catch((err)=>{
                console.log("error");
            })
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="min-h-screen bg-sky-400 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                <h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>
                {loading ? (
                    <p className="text-center">Loading profile...</p>
                ) : (
                    <>
                        <div className="flex justify-center items-center mb-6">
                            <img
                                src={imageUrl }
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="full-name" className="block text-gray-700 font-semibold mb-2">
                                Full Name:
                            </label>
                            <p className="bg-gray-100 py-2 px-3 rounded-md text-gray-800">{fullName}</p>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email:
                            </label>
                            <p className="bg-gray-100 py-2 px-3 rounded-md text-gray-800">{email}</p>
                        </div>
                        <div className="text-center">
                            <label htmlFor="image-upload" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                Change Profile Picture
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
