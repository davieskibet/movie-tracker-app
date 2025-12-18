// src/components/Header.jsx
import React from 'react';
import { AiOutlineRadarChart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-deep-blue shadow-lg relative z-50">
            {/* max-w-[1440px]: Matches standard Figma desktop width
                mx-auto: Centers the inner content 
                flex justify-between: Pushes Logo to Left and Button to Right
            */}
            <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6 py-4">
                
                {/* 1. Logo & Title (Left Side) */}
                <div 
                    className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => navigate('/')}
                >
                    <div className="p-2 bg-brand-cyan-600/10 rounded-lg">
                        <AiOutlineRadarChart className="text-brand-cyan-600 text-3xl" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">
                        MultiTrack <span className="text-brand-cyan-600">Media Hub</span>
                    </h1>
                </div>

                {/* 2. Action Button (Right Side) */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="
                            bg-brand-cyan-600 
                            hover:bg-cyan-500 
                            text-white 
                            font-semibold 
                            py-2.5 
                            px-6 
                            rounded-brand 
                            shadow-[0_4px_14px_0_rgba(8,145,178,0.39)] 
                            transition-all 
                            duration-200 
                            active:scale-95
                        "
                    >
                        Launch App
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;