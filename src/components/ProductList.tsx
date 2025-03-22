import { useState, useEffect } from "react";
import { Product } from "../types/product.dto";
import ProductCard from "./ProductCard";
import ProductBackground from "../widgets/Background"; // Assuming you have a styled background widget
import SearchAndFilter from "./SearchBarComponent";

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
        products.filter((item) => item.category === category),
      );
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = products;
    if (activeCategory !== "All") {
      filtered = products.filter(
        (product) => product.category === activeCategory,
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search and Filter Box with Aesthetic Background */}
      <ProductBackground className="mb-8">
        <SearchAndFilter
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          productCategories={productCategories}
          activeCategory={activeCategory}
          filterByCategory={filterByCategory}
        />
      </ProductBackground>

      <br />

      {/* Product Grid with Adjusted Styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" // Add rounded corners and subtle shadows
            />
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
