// src/components/Header.jsx

import React from 'react';
import { AiOutlineRadarChart } from 'react-icons/ai'; 

const Header = () => {
    return (
        // ⭐️ UPDATED: Using the new custom color class ⭐️
        <header className="bg-deep-blue shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                
                {/* 1. Logo and Title */}
                <div className="flex items-center space-x-3">
                    {/* Icon - We'll confirm this color next */}
                    <AiOutlineRadarChart className="text-teal-400 text-3xl" />
                    
                    {/* Title */}
                    <h1 className="text-2xl font-extrabold text-white tracking-wider">
                        MultiTrack Media Hub
                    </h1>
                </div>

                {/* 2. Launch App Button */}
                <div>
                    <button 
                        onClick={() => console.log('Launch App button clicked')}
                        className="bg-teal-600 hover:bg-teal-500 text-gray-900 font-bold py-2 px-6 rounded-lg transition duration-200 shadow-lg"
                    >
                        Launch App
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;