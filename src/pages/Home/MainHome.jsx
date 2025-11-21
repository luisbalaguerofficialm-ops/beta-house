import React, { useState } from "react";

import Pagination from "../../components/Pagination";
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

  // ALL PROPERTIES IN ONE ARRAY
  const properties = [
    {
      id: 1,
      img: img1,
      title: "Real House Luxury Villa",
      location: "Victoria Island, Lagos",
      bed: 6,
      bath: 3,
      price: 3340000000,
      label: "For Sale",
    },
    {
      id: 2,
      img: img2,
      title: "Exquisite Haven Villa",
      location: "Festac, Lagos",
      bed: 5,
      bath: 3,
      price: 4000000,
      label: "For Rent",
    },
    {
      id: 3,
      img: img3,
      title: "Luxe Palatial Villa",
      location: "Gbagada, Lagos",
      bed: 3,
      bath: 2,
      price: 5350000000,
      label: "For Sale",
    },
    {
      id: 4,
      img: img4,
      title: "Infinite Bliss Villa",
      location: "Ishiagu, Enugu",
      bed: 5,
      bath: 3,
      price: 2350000000,
      label: "For Rent",
    },
    {
      id: 5,
      img: img5,
      title: "Real House Luxury Villa",
      location: "Works Layout, Owerri",
      bed: 8,
      bath: 6,
      price: 3350000,
      label: "For Rent",
    },
    {
      id: 6,
      img: img6,
      title: "Real House Luxury Villa",
      location: "Ikeja, Lagos",
      bed: 6,
      bath: 6,
      price: 4200000,
      label: "For Sale",
    },
    {
      id: 7,
      img: img7,
      title: "Infinite Bliss Villa",
      location: "Ishiagu, Enugu",
      bed: 5,
      bath: 3,
      price: 2350000000,
      label: "For Sale",
    },
    {
      id: 8,
      img: img8,
      title: "Real House Luxury Villa",
      location: "Works Layout, Owerri",
      bed: 8,
      bath: 6,
      price: 3350000,
      label: "For Rent",
    },
    {
      id: 9,
      img: img9,
      title: "Modern Family Villa",
      location: "Ajah, Lagos",
      bed: 4,
      bath: 3,
      price: 2800000000,
      label: "For Sale",
    },
  ];

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
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-12">
            Discover Properties
          </h2>

          <div className="relative">
            {/* LEFT ARROW (mobile only) */}
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

            {/* RIGHT ARROW (mobile only) */}
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

            {/* Properties Container */}
            <div
              id="propertiesFlex"
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide lg:grid lg:grid-cols-4 lg:gap-10"
            >
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="relative rounded-xl overflow-hidden min-w-[300px] sm:min-w-[400px] lg:min-w-0"
                >
                  <img
                    src={property.image}
                    className="w-full h-[430px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/95 to-transparent">
                    <div className="flex flex-col items-start gap-1">
                      <h3 className="text-white font-semibold text-xl whitespace-nowrap">
                        {property.title}
                      </h3>
                      <p className="text-white font-bold text-xl whitespace-nowrap">
                        {property.price}
                      </p>
                      <div className="flex items-center text-white text-sm gap-6 whitespace-nowrap">
                        <span>{property.bed} Bed</span>
                        <span>{property.bath} Bath</span>
                        <span>{property.size} sq ft</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm mt-2 whitespace-nowrap">
                        <MapPin size={16} /> {property.location}
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
