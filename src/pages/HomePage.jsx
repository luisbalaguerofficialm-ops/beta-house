import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MainHome from "../pages/Home/MainHome";
import Footer from "../components/Footer";

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  // This function receives data from HeroSection
  const handlePropertySearch = (data) => {
    console.log("Properties received in HomePage:", data);
    setProperties(data); // store for MainHome
  };

  return (
    <div className="w-screen h-auto overflow-x-hidden m-0 p-0">
      {/* Navbar */}
      <div className="z-50 backdrop-blur-[10px] text-white fixed w-full top-0 sm:px-[100px] px-6">
        <Navbar />
      </div>

      {/* Hero Section now passes results up */}
      <div className="m-0 p-0">
        <HeroSection onSearch={handlePropertySearch} />
      </div>

      {/* Main Home receives properties */}
      <MainHome properties={properties} />

      <Footer />
    </div>
  );
};

export default HomePage;
