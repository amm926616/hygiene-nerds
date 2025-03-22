import { useEffect, useState } from "react";
import FloatingBubbles from "../components/FloatingBubbles";
import FloatingCart from "../components/FloatingCart";
import { ModelPage } from "../components/IntroPage";
import ProductList from "../components/ProductList";
import { Product } from "../types/product.dto";

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
        <FloatingBubbles />
      </ModelPage>
    </div>
  );
}
