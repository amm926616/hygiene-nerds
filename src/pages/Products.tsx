import { useEffect, useState } from "react";
import FloatingCart from "../components/FloatingCart";
import { ModelPage } from "../components/IntroPage";
import ProductList from "../components/ProductList";
import { fetchProducts } from "../service/imageupdate.service";
import { ProductDto } from "../types/product.dto";

// Cache for products data
let productsCache: ProductDto[] | null = null;

export default function Products() {
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check localStorage for welcome screen status
    if (typeof window !== "undefined") {
      return localStorage.getItem("hasSeenWelcome") !== "true";
    }
    return true;
  });

  const [products, setProducts] = useState<ProductDto[]>(() => {
    // Initialize from cache if available
    return productsCache || [];
  });

  const [isLoading, setIsLoading] = useState(!productsCache);

  useEffect(() => {
    const loadProducts = async () => {
      // Skip if we already have cached products
      if (productsCache) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetchProducts();
        console.log("API Response:", response.data);

        const formattedProducts: ProductDto[] = response.data.map(
          (product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            brand_name: product.brandName,
            price: product.price,
            image_url: product.imageUrl,
            category: product.category,
            stock: product.stock,
          }),
        );

        // Update cache and state
        productsCache = formattedProducts;
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();

    // Cleanup function
    return () => {
      // Cancel any ongoing requests if needed
    };
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenWelcome", "true");
    }
  };

  if (showWelcome) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ModelPage
          pageKey="cart"
          duration={2000}
          onClose={handleWelcomeClose}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ProductList products={products} />
      )}
      <FloatingCart />
    </div>
  );
}
