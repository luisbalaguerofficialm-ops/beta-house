import React from "react";
import heropage from "../assets/puplic.png";

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${heropage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-4 md:px-6 w-full max-w-[1440px] mx-auto">
        <h2 className="font-semibold leading-tight md:text-[50px] text-[36px]">
          Browse Our Properties
        </h2>
        <p className="text-lg md:text-xl text-gray-100">
          Find your perfect home among our curated properties. Start browsing
          now!
        </p>

        {/* Form Container */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full bg-white rounded-lg shadow overflow-hidden">
          {/* Left content */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-8 py-4 px-4 md:px-6">
            {/* LOCATION */}
            <div className="flex flex-col justify-center">
              <label className="text-2xl font-bold tracking-wide text-gray-700">
                LOCATION
              </label>
              <span className="text-gray-500 text-sm mt-1">eg. Gbagada</span>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-10 w-px bg-gray-500"></div>

            {/* PROPERTY TYPE */}
            <div className="flex flex-col justify-center">
              <label className="text-2xl font-bold tracking-wide text-black">
                PROPERTY TYPE
              </label>
              <span className="text-gray-500 text-sm mt-1">
                eg. Duplex, Bedroom Flat
              </span>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-10 w-px bg-gray-700"></div>

            {/* BEDROOM */}
            <div className="flex flex-col items-center justify-center">
              <label className="text-2xl font-bold tracking-wide text-gray-700 mb-1">
                BEDROOM
              </label>
              <div className="flex items-center gap-3">
                <button className="border border-gray-500 w-6 h-6 rounded-full text-black text-2xl flex items-center justify-center">
                  -
                </button>
                <span className="text-gray-700 font-medium">0</span>
                <button className="border border-gray-500 w-6 h-6 rounded-full text-2xl text-black flex items-center justify-center">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Right Full-Height Button */}
          <button className="bg-green-600 hover:bg-green-900 text-[20px] text-white font-medium px-10 py-6 md:py-0 md:h-full flex items-center justify-center">
            Find Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
