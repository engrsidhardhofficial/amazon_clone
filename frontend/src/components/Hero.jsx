import React from 'react';

const Hero = () => {
    return (
        <div className="relative">
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            <div className="w-full h-[400px] bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                {/* Placeholder for Carousel/Banner */}
                <p>Amazing Deals on Electronics</p>
            </div>
        </div>
    );
};

export default Hero;
