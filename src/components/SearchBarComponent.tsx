import React from "react";
import { Search as SearchIcon } from "react-feather";

interface SearchAndFilterProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
  productCategories: string[];
  activeCategory: string;
  filterByCategory: (category: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  handleSearch,
  productCategories,
  activeCategory,
  filterByCategory,
}) => {
  return (
    <>
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-500">
        Explore Our Products
      </h2>

      {/* Search Bar */}
      <div className="flex items-center mb-8">
        <div className="relative w-full md:w-1/2 mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-5 py-3 pl-12 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none shadow-sm transition-all duration-300 bg-white"
          />
          <SearchIcon
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
            size={20}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {productCategories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-5 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-semibold shadow-sm
                        ${
                          activeCategory === category
                            ? "bg-blue-200 text-blue-800 hover:bg-blue-300 focus:ring-2 focus:ring-blue-300"
                            : "bg-white text-gray-600 border border-blue-100 hover:bg-blue-50"
                        }`}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
};

export default SearchAndFilter;
