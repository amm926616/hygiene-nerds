import { useState, useEffect } from "react";
import { Product } from "../types/product.dto";
import ProductCard from "./ProductCard";
import { Search } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState("All");

  const productCategories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item) => item.category === category)
      );
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = products;
    if (activeCategory !== "All") {
      filtered = products.filter(
        (product) => product.category === activeCategory
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search and Filter Box */}
      <div
        className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-200"
        style={{
          backgroundImage: "url('/src/assets/models/waiting.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Explore Our Products
        </h2>

        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <div className="relative w-full md:w-1/2 mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-5 py-3 pl-10 text-gray-700 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none shadow-sm transition-all duration-300"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center space-x-2">
          {productCategories.map((category) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`px-4 py-2 border rounded-full transition-all duration-300 m-1 text-sm md:text-base
                ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
