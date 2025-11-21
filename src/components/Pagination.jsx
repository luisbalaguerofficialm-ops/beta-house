import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-3 mt-10 mb-16">
      {/* Previous Arrow */}
      <button className="p-1">
        <ArrowLeft className="w-4 h-4 text-gray-500" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-3">
        <button className="px-3 py-1 rounded bg-green-600 text-white font-semibold">
          1
        </button>

        <button className="px-3 py-1 text-gray-500 font-semibold">2</button>
        <button className="px-3 py-1 text-gray-500 font-semibold">3</button>
        <button className="px-3 py-1 text-gray-500 font-semibold">4</button>
      </div>

      {/* Next Arrow */}
      <button className="p-1">
        <ArrowRight className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};

export default Pagination;
