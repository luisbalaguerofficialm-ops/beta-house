// components/HeroSection.jsx
import React, { useState } from "react";

const HeroSection = ({ onFilter }) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState(0);

  const handleSearch = () => {
    // Call parent filter function
    onFilter({ location, propertyType, bedrooms });
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-center text-white overflow-hidden"
      style={{ backgroundImage: `url(/assets/puplic.png)` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-center gap-12 px-4 md:px-6 w-full max-w-[1440px] mx-auto">
        <h2 className="font-semibold leading-tight md:text-[50px] text-[36px]">
          Browse Our Properties
        </h2>
        <p className="text-lg md:text-xl text-gray-100">
          Find your perfect home among our curated properties. Start browsing
          now!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full bg-white rounded-lg shadow overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-8 py-4 px-4 md:px-6">
            <div className="flex flex-col justify-center">
              <label className="text-2xl font-bold tracking-wide text-gray-700">
                LOCATION
              </label>
              <input
                type="text"
                placeholder="eg. Gbagada"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 text-gray-700 border-b border-gray-300 focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="hidden md:block h-10 w-px bg-gray-500"></div>

            <div className="flex flex-col justify-center">
              <label className="text-2xl font-bold tracking-wide text-black">
                PROPERTY TYPE
              </label>
              <input
                type="text"
                placeholder="eg. Duplex, Bedroom Flat"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="mt-1 text-gray-700 border-b border-gray-300 focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="hidden md:block h-10 w-px bg-gray-700"></div>

            <div className="flex flex-col items-center justify-center">
              <label className="text-2xl font-bold tracking-wide text-gray-700 mb-1">
                BEDROOM
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setBedrooms((prev) => (prev > 0 ? prev - 1 : 0))
                  }
                  className="border border-gray-500 w-6 h-6 rounded-full text-black text-2xl flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-gray-700 font-medium">{bedrooms}</span>
                <button
                  onClick={() => setBedrooms((prev) => prev + 1)}
                  className="border border-gray-500 w-6 h-6 rounded-full text-black text-2xl flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-900 text-[20px] text-white font-medium px-10 py-6 md:py-0 md:h-full flex items-center justify-center"
          >
            Find Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
