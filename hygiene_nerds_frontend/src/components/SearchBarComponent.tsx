import React from "react";
import { Search as SearchIcon, X } from "react-feather";

interface SearchAndFilterProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
  productCategories: string[];
  activeCategory: string;
  filterByCategory: (category: string) => void;
}

const SearchAndFilterComponent: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  handleSearch,
  productCategories,
  activeCategory,
  filterByCategory,
}) => {
  const clearSearch = () => handleSearch("");

  return (
    <div className="px-4 py-8 sm:py-12">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
        Discover <span className="text-blue-600">Premium</span> Hygiene Products
      </h2>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
        Find exactly what you need with our curated collection of high-quality
        products
      </p>

      {/* Search Bar */}
      <div className="flex items-center mb-10">
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-5 py-3 pl-12 pr-10 text-gray-700 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none shadow-sm transition-all duration-300 bg-white hover:border-blue-200"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 px-2">
        {productCategories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium shadow-xs
                        ${
                          activeCategory === category
                            ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-200"
                            : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
                        }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilterComponent;
