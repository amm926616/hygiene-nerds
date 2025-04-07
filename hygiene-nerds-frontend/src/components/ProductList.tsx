import { useState, useEffect, useMemo, useCallback } from "react";
import { ProductDto } from "../types/product.dto";
import ProductCard from "./ProductCard";
import SearchAndFilter from "./SearchBarComponent";
import { motion, AnimatePresence } from "framer-motion";
import ProductBackground from "../backgrounds/Background";

interface ProductListProps {
  products: ProductDto[];
}

type SortOption = "default" | "price-low" | "price-high" | "newest" | "stock";

const ProductList = ({ products }: ProductListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize product categories to prevent unnecessary recalculations
  const productCategories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category))],
    [products],
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand_name.toLowerCase().includes(query),
      );
    }

    // Filter out-of-stock if not showing them
    if (!showOutOfStock) {
      result = result.filter((product) => product.stock > 0);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        return result.sort((a, b) => a.price - b.price);
      case "price-high":
        return result.sort((a, b) => b.price - a.price);
      case "newest":
        return result.sort((a, b) => (b.id || 0) - (a.id || 0)); // Assuming higher ID means newer
      case "stock":
        return result.sort((a, b) => b.stock - a.stock);
      default:
        return result;
    }
  }, [products, activeCategory, searchQuery, sortOption, showOutOfStock]);

  // Separate in-stock and out-of-stock products
  const [inStockProducts, outOfStockProducts] = useMemo(() => {
    const inStock = filteredProducts.filter((product) => product.stock > 0);
    const outOfStock = filteredProducts.filter((product) => product.stock <= 0);
    return [inStock, outOfStock];
  }, [filteredProducts]);

  // Handle category filter
  const filterByCategory = useCallback((category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((option: SortOption) => {
    setSortOption(option);
  }, []);

  // Simulate loading state (remove in production)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ProductBackground>
          <div className="flex flex-col space-y-4">
            <SearchAndFilter
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              productCategories={productCategories}
              activeCategory={activeCategory}
              filterByCategory={filterByCategory}
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Sort by:
                  </span>
                  <select
                    onChange={(e) =>
                      handleSortChange(e.target.value as SortOption)
                    }
                    className="rounded-lg border border-gray-300 px-3 py-1 text-sm"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="stock">Stock Quantity</option>
                  </select>
                </label>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showOutOfStock}
                  onChange={() => setShowOutOfStock(!showOutOfStock)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Show out-of-stock items
                </span>
              </label>
            </div>
          </div>
        </ProductBackground>
      </motion.div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden h-96 animate-pulse"
            >
              <div className="bg-gray-200 h-48 w-full"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <div className="space-y-8 mt-8">
              {/* In Stock Products */}
              {inStockProducts.length > 0 && (
                <motion.div layout>
                  <h2 className="text-xl font-bold mb-4 text-green-600">
                    Available Products ({inStockProducts.length})
                  </h2>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    layout
                  >
                    <AnimatePresence>
                      {inStockProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}

              {/* Out of Stock Products */}
              {showOutOfStock && outOfStockProducts.length > 0 && (
                <motion.div layout className="mt-8">
                  <div className="mb-4">
                    {" "}
                    {/* Added a wrapping div for better layout control */}
                    <h2 className="text-xl font-bold mb-2 text-red-600">
                      Out of Stock ({outOfStockProducts.length})
                    </h2>
                    <span className="text-sm text-gray-500 italic">
                      Probably soon to be added
                    </span>
                  </div>{" "}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-70"
                    layout
                  >
                    <AnimatePresence>
                      {outOfStockProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-gray-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                {searchQuery
                  ? `No items match your search for "${searchQuery}"`
                  : `No items available in ${activeCategory} category`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setShowOutOfStock(false);
                }}
                className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
