import FloatingCart from "../components/FloatingCart";
import ProductList from "../components/ProductList"; // Adjust import if needed
import { Product } from "../types/Products";

export default function Products() {
  const products: Product[] = [
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
    {
      id: 4,
      name: "Soap",
      description: "Gentle on skin.",
      price: 3.99,
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 5,
      name: "Toothpaste",
      description: "Fresh breath.",
      price: 4.5,
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 6,
      name: "Shampoo",
      description: "Healthy hair.",
      price: 8.0,
      imageUrl: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">All Products</h2>
      <ProductList products={products} />
      <FloatingCart />
    </div>
  );
};
