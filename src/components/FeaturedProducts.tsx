import { Product } from "../types/Products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Hand Sanitizer",
      description: "Effective hand sanitizer.",
      price: 5.99,
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Face Masks",
      description: "Comfortable face masks.",
      price: 10.99,
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Disinfectant Wipes",
      description: "Multi-surface wipes.",
      price: 7.99,
      imageUrl: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
