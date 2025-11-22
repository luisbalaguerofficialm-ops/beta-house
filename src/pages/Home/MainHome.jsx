import React, { useState, useEffect } from "react";
import axios from "axios";

import Pagination from "../../components/Pagination.jsx";
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import slide4 from "../../assets/slide4.jpg";

import {
  MapPin,
  Bed,
  Bath,
  ArrowLeft,
  ArrowRight,
  Heart,
  Share2,
} from "lucide-react";
import { FiVideo, FiImage } from "react-icons/fi";

import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import img6 from "../../assets/img6.png";
import img7 from "../../assets/img7.png";
import img8 from "../../assets/img8.png";
import img9 from "../../assets/img9.png";

const MainHome = () => {
  const [sortOption, setSortOption] = useState("default");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [properties, setProperties] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "https://beta-house-backend-b96p.onrender.com/properties"
        );
        // Map backend data to match frontend structure
        const mapped = response.data.map((prop, index) => ({
          id: prop._id || index,
          img: prop.image || img1,
          title: prop.title || "Property",
          location: prop.location || "Unknown",
          bed: prop.bedrooms || 3,
          bath: prop.bathrooms || 2,
          price: prop.price || 0,
          label: prop.label || "For Sale",
        }));
        setProperties(mapped);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  // HANDLE FILTER BUTTON CLICK
  const handleFilterClick = (filter) => {
    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter); // remove filter if already active
      } else {
        return [...prev, filter]; // add filter
      }
    });
  };

  // APPLY FILTERS
  const filteredProperties = properties.filter((prop) => {
    if (activeFilters.length === 0) return true; // no filters = show all
    return activeFilters.some((filter) => {
      if (filter === "For Sale" || filter === "For Rent")
        return prop.label === filter;
      if (filter === "1-3 Bedrooms") return prop.bed >= 1 && prop.bed <= 3;
      if (filter === "4-6 Bedrooms") return prop.bed >= 4 && prop.bed <= 6;
      if (filter === "7+ Bedrooms") return prop.bed >= 7;
      return false;
    });
  });

  // SORTING LOGIC
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOption === "low") return a.price - b.price;
    if (sortOption === "high") return b.price - a.price;
    return 0;
  });

  // Carousel controls
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sortedProperties.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sortedProperties.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full bg-white pt-[120px] px-6">
      {/* FILTER BAR */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <button
              className="font-medium hover:text-black"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
            >
              More Filter
            </button>
            <span className="text-gray-400 hidden sm:block">|</span>
            <p className="text-gray-500 hidden sm:block">
              Showing{" "}
              <span className="text-black font-semibold">
                1–{sortedProperties.length}
              </span>{" "}
              of{" "}
              <span className="text-black font-semibold">
                {sortedProperties.length}
              </span>{" "}
              results
            </p>
          </div>

          {/* SORT DROPDOWN */}
          <select
            className="border rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white shadow-sm cursor-pointer"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by: Default</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

        {/* MORE FILTER PANEL */}
        {showMoreFilters && (
          <div className="mt-4 p-4 border-t border-gray-200 bg-white shadow-sm">
            <p className="font-semibold mb-2">Filter Options</p>
            <div className="flex flex-wrap gap-4">
              {[
                "For Sale",
                "For Rent",
                "1-3 Bedrooms",
                "4-6 Bedrooms",
                "7+ Bedrooms",
              ].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1 border rounded hover:bg-gray-100 ${
                    activeFilters.includes(filter)
                      ? "bg-gray-200 border-gray-500"
                      : ""
                  }`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PROPERTY GRID */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div className="relative">
                <img src={item.img} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute top-4 left-4 flex gap-30 md:gap-38">
                  <button className="bg-[#3D9970] rounded-lg w-20 h-8 text-white">
                    Featured
                  </button>
                  <button className="bg-gray-400 text-white text-xs px-3 py-1 rounded-lg w-20 h-8">
                    {item.label}
                  </button>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-3">
                  <button className="bg-white/80 p-2 rounded-full">
                    <Share2 size={16} />
                  </button>
                  <button className="bg-white/80 p-2 rounded-full">
                    <FiVideo size={16} />
                  </button>
                  <button className="bg-white/80 p-2 rounded-full">
                    <FiImage size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin size={16} />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span>{item.bed} Bedrooms</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Bath size={16} />
                      <span>{item.bath} Bathrooms</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-semibold text-gray-800">
                    ₦{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-3 text-gray-500">
                    <ArrowLeft
                      size={20}
                      className="cursor-pointer"
                      onClick={prevSlide}
                    />
                    <ArrowRight
                      size={20}
                      className="cursor-pointer"
                      onClick={nextSlide}
                    />
                    <Share2 size={20} className="cursor-pointer" />
                    <Heart
                      size={20}
                      className="cursor-pointer hover:text-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination />

        {/* DISCOVER POPULAR PROPERTIES CAROUSEL */}
        <section className="w-full mt-16 mb-20 px-4 lg:px-16 relative">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-12">
            Discover Our Popular Properties
          </h2>

          <div className="relative flex items-center justify-center">
            <button
              className="absolute left-0 z-10 p-4 bg-gray-300 rounded-full hover:bg-green-500 lg:hidden"
              onClick={prevSlide}
            >
              <ArrowLeft size={24} />
            </button>
            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {[slide1, slide2, slide3, slide4].map((slide, index) => (
                  <div
                    key={index}
                    className="min-w-full relative rounded-xl overflow-hidden"
                  >
                    <img
                      src={slide}
                      className="w-full h-[430px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute right-0 z-10 p-4 bg-green-400 rounded-full hover:bg-green-500 lg:hidden"
              onClick={nextSlide}
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainHome;
