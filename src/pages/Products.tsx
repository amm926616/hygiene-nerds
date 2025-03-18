import { useState, useEffect } from "react";
import FloatingCart from "../components/FloatingCart";
import ProductList from "../components/ProductList";
import { Product } from "../types/Products";
import { ModelPage } from "../components/IntroPage";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate fetching data before the loading screen finishes
    const fetchData = async () => {
      // Simulating API/data fetch delay (can replace with real fetch)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts([
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
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <ModelPage pageKey="cart" duration={2000}>
        <h2 className="text-3xl font-semibold mb-4">All Products</h2>
        <ProductList products={products} />
        <FloatingCart />
      </ModelPage>
    </div>
  );
}
