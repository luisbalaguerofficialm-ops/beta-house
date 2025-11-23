import React, { useState, useEffect } from "react";
import axios from "axios";
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

import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import slide4 from "../../assets/slide4.jpg";

const MainHome = () => {
  const [sortOption, setSortOption] = useState("default");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const propertiesPerPage = 8; // items per page

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          "https://beta-house-backend-b96p.onrender.com/api/properties"
        );
        setProperties(res.data.properties); // backend returns { properties: [...] }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, []);

  // Handle filter button click
  const handleFilterClick = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
    setCurrentPage(1); // reset page to 1 on filter change
  };

  // Apply filters
  const filteredProperties = properties.filter((prop) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some((filter) => {
      if (filter === "For Sale" || filter === "For Rent")
        return prop.label?.toLowerCase() === filter.toLowerCase();
      if (filter === "1-3 Bedrooms")
        return prop.bedrooms >= 1 && prop.bedrooms <= 3;
      if (filter === "4-6 Bedrooms")
        return prop.bedrooms >= 4 && prop.bedrooms <= 6;
      if (filter === "7+ Bedrooms") return prop.bedrooms >= 7;
      return false;
    });
  });

  // Sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOption === "low") return a.price - b.price;
    if (sortOption === "high") return b.price - a.price;
    return 0;
  });

  // Paginate properties
  const displayedProperties = sortedProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  // Popular slides
  const popularSlides = [slide1, slide2, slide3, slide4];

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                {(currentPage - 1) * propertiesPerPage + 1}–
                {Math.min(
                  currentPage * propertiesPerPage,
                  sortedProperties.length
                )}
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
                  onClick={() => handleFilterClick(filter)}
                  className={`px-3 py-1 border rounded text-sm font-medium ${
                    activeFilters.includes(filter)
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
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
          {displayedProperties.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div className="relative">
                <img
                  src={item.images?.[0] || slide1}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute top-4 left-4 flex gap-2">
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
                      <span>{item.bedrooms} Bedrooms</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Bath size={16} />
                      <span>{item.bathrooms} Bathrooms</span>
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

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedProperties.length / propertiesPerPage)}
          onPageChange={handlePageChange}
        />

        {/* POPULAR PROPERTIES */}
        <section className="w-full mt-16 mb-20 px-4 lg:px-16 relative">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-12">
            Discover Our Popular Properties
          </h2>

          <div className="relative">
            <button
              className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-14 h-14 bg-gray-300 hover:bg-green-500 rounded-full flex items-center justify-center z-30 lg:hidden"
              onClick={() =>
                document
                  .getElementById("propertiesFlex")
                  ?.scrollBy({ left: -350, behavior: "smooth" })
              }
            >
              <ArrowLeft size={30} className="text-gray-800" />
            </button>

            <button
              className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-14 h-14 bg-green-400 hover:bg-green-500 rounded-full flex items-center justify-center z-30 lg:hidden"
              onClick={() =>
                document
                  .getElementById("propertiesFlex")
                  ?.scrollBy({ left: 350, behavior: "smooth" })
              }
            >
              <ArrowRight size={30} className="text-gray-800" />
            </button>

            <div
              id="propertiesFlex"
              className="flex gap-10 overflow-x-auto scroll-smooth scrollbar-hide lg:grid lg:grid-cols-4 lg:gap-10"
            >
              {popularSlides.map((slide, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden min-w-[300px] sm:min-w-[400px] lg:min-w-0"
                >
                  <img src={slide} className="w-full h-[430px] object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/95 to-transparent">
                    <div className="flex flex-col items-start gap-1">
                      <h3 className="text-white font-semibold text-xl whitespace-nowrap">
                        Featured Property {index + 1}
                      </h3>
                      <p className="text-white font-bold text-xl whitespace-nowrap">
                        ₦{(index + 1) * 500000000}
                      </p>
                      <div className="flex items-center text-white text-sm gap-6 whitespace-nowrap">
                        <span>{index + 4} Bed</span>
                        <span>{index + 2} Bath</span>
                        <span>{700 + index * 20} sq ft</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm mt-2 whitespace-nowrap">
                        <MapPin size={16} /> Victoria Island, Lagos
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainHome;
