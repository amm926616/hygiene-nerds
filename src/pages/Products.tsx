import { useState, useEffect } from "react";
import FloatingCart from "../components/FloatingCart";
import ProductList from "../components/ProductList";
import { Product } from "../types/product.dto";
import { ModelPage } from "../components/IntroPage";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate fetching data before the loading screen finishes
    const fetchData = async () => {
      // Simulating API/data fetch delay (can replace with real fetch)
      await new Promise((resolve) => setTimeout(resolve, 500));
      fetch("/src/data/products.json")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <ModelPage pageKey="cart" duration={2000}>
        <ProductList products={products} />
        <FloatingCart />
      </ModelPage>
    </div>
  );
}
