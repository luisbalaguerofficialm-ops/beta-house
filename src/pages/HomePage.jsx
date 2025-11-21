import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MainHome from "../pages/Home/MainHome";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="w-screen h-auto overflow-x-hidden m-0 p-0">
      {/* Navbar (normal flow, not fixed) */}
      <div className="z-50  backdrop-blur-[10px] text-white  fixed w-full top-0 sm:px-[100px] px-6">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="m-0 p-0">
        <HeroSection />
      </div>

      {/* Rest of home page */}
      <MainHome />
      <Footer />
    </div>
  );
};

export default HomePage;
