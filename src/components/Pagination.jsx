import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers array dynamically
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-10 mb-16">
      {/* Previous Arrow */}
      <button
        className={`p-1 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePrev}
      >
        <ArrowLeft className="w-4 h-4 text-gray-500" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-3">
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 rounded font-semibold ${
              num === currentPage
                ? "bg-green-600 text-white"
                : "text-gray-500 hover:bg-gray-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next Arrow */}
      <button
        className={`p-1 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleNext}
      >
        <ArrowRight className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};

export default Pagination;
