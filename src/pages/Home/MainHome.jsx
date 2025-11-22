import React, { useState, useEffect } from "react";
import axios from "axios";

import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import slide4 from "../../assets/slide4.jpg";
import Pagination from "../../components/Pagination";
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

const MainHome = () => {
  const [sortOption, setSortOption] = useState("default");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [properties, setProperties] = useState([]);

  // Fetch properties from deployed backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          "https://beta-house-backend-b96p.onrender.com/api/properties"
        );
        setProperties(res.data); // make sure backend returns array of properties
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, []);

  // Handle filter button click
  const handleFilterClick = (filter) => {
    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  // Apply filters
  const filteredProperties = properties.filter((prop) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some((filter) => {
      if (filter === "For Sale" || filter === "For Rent")
        return prop.label === filter;
      if (filter === "1-3 Bedrooms") return prop.bed >= 1 && prop.bed <= 3;
      if (filter === "4-6 Bedrooms") return prop.bed >= 4 && prop.bed <= 6;
      if (filter === "7+ Bedrooms") return prop.bed >= 7;
      return false;
    });
  });

  // Sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOption === "low") return a.price - b.price;
    if (sortOption === "high") return b.price - a.price;
    return 0;
  });

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
              key={item._id || item.id}
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
                    <ArrowLeft size={20} className="cursor-pointer" />
                    <ArrowRight size={20} className="cursor-pointer" />
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
        <section className="w-full mt-16 mb-20 px-4 lg:px-16 relative">
          {/* Header */}
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-12">
            Discover Our Popular Properties
          </h2>

          <div className="relative">
            {/* LEFT ARROW */}
            <button
              className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-14 h-14 bg-gray-300 hover:bg-green-500 rounded-full flex items-center justify-center z-30 lg:hidden"
              onClick={() =>
                document
                  .getElementById("propertiesFlex")
                  .scrollBy({ left: -350, behavior: "smooth" })
              }
            >
              <ArrowLeft size={30} className="text-gray-800" />
            </button>

            {/* RIGHT ARROW */}
            <button
              className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-14 h-14 bg-green-400 hover:bg-green-500 rounded-full flex items-center justify-center z-30 lg:hidden"
              onClick={() =>
                document
                  .getElementById("propertiesFlex")
                  .scrollBy({ left: 350, behavior: "smooth" })
              }
            >
              <ArrowRight size={30} className="text-gray-800" />
            </button>

            {/* Cards Container */}
            <div
              id="propertiesFlex"
              className="flex gap-10 overflow-x-auto scroll-smooth scrollbar-hide lg:grid lg:grid-cols-4 lg:gap-10"
            >
              {/* CARD 1 */}
              <div className="relative rounded-xl overflow-hidden min-w-[300px] sm:min-w-[400px] lg:min-w-0">
                <img src={slide1} className="w-full h-[430px] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/95 to-transparent">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-white font-semibold text-xl whitespace-nowrap">
                      Semi Detached Duplex
                    </h3>
                    <p className="text-white font-bold text-xl whitespace-nowrap">
                      ₦1,430,000,000
                    </p>
                    <div className="flex items-center text-white text-sm gap-6 whitespace-nowrap">
                      <span>6 Bed</span>
                      <span>3 Bath</span>
                      <span>720 sq ft</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm mt-2 whitespace-nowrap">
                      <MapPin size={16} /> Victoria Island, Lagos
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="relative rounded-xl overflow-hidden min-w-[300px] sm:min-w-[400px] lg:min-w-0">
                <img src={slide2} className="w-full h-[430px] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/95 to-transparent">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-white font-semibold text-xl whitespace-nowrap">
                      Luxury Penthouse
                    </h3>
                    <p className="text-white font-bold text-xl whitespace-nowrap">
                      ₦950,000,000
                    </p>
                    <div className="flex items-center text-white text-sm gap-6 whitespace-nowrap">
                      <span>4 Bed</span>
                      <span>3 Bath</span>
                      <span>620 sq ft</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm mt-2 whitespace-nowrap">
                      <MapPin size={16} /> Victoria Island, Lagos
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="relative rounded-xl overflow-hidden min-w-[300px] sm:min-w-[400px] lg:min-w-0">
                <img src={slide3} className="w-full h-[430px] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/95 to-transparent">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-white font-semibold text-xl whitespace-nowrap">
                      Modern Smart Home
                    </h3>
                    <p className="text-white font-bold text-xl whitespace-nowrap">
                      ₦680,000,000
                    </p>
                    <div className="flex items-center text-white text-sm gap-6 whitespace-nowrap">
                      <span>5 Bed</span>
                      <span>4 Bath</span>
                      <span>800 sq ft</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm mt-2 whitespace-nowrap">
                      <MapPin size={16} /> Victoria Island, Lagos
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 4 */}
              <div className="relative rounded-xl overflow-hidden min-w-[300px] sm:min-w-[400px] lg:min-w-0">
                <img src={slide4} className="w-full h-[430px] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/95 to-transparent">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-white font-semibold text-xl whitespace-nowrap">
                      Terrace Duplex
                    </h3>
                    <p className="text-white font-bold text-xl whitespace-nowrap">
                      ₦520,000,000
                    </p>
                    <div className="flex items-center text-white text-sm gap-6 whitespace-nowrap">
                      <span>4 Bed</span>
                      <span>3 Bath</span>
                      <span>650 sq ft</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm mt-2 whitespace-nowrap">
                      <MapPin size={16} /> Victoria Island, Lagos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainHome;
