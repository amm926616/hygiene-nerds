import { useEffect, useState } from "react";
import FloatingCart from "../components/FloatingCart";
import { ModelPage } from "../components/IntroPage";
import ProductList from "../components/ProductList";
import { fetchProducts } from "../service/imageupdate.service";
import { ProductDto } from "../types/product.dto";
import { useAuth } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import { Spinner } from "../components/SpinnerComponent";

// Cache for products data
let productsCache: ProductDto[] | null = null;

export default function Products() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check welcome status and products cache
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowWelcome(localStorage.getItem("hasSeenWelcome") !== "true");

      if (productsCache) {
        setProducts(productsCache);
        setIsLoading(false);
      }
    }
  }, []);

  // Load products when authentication is confirmed
  useEffect(() => {
    const loadProducts = async () => {
      if (productsCache) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchProducts();

        if (!response?.data) {
          throw new Error("Invalid response format");
        }

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

        productsCache = formattedProducts;
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    // Only load products when we're sure about auth state
    if (!isAuthLoading && isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated, isAuthLoading]);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenWelcome", "true");
    }
  };

  // Show loading state while checking auth
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

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
          <Spinner size="md" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <>
          <ProductList products={products} />
          <FloatingCart />
        </>
      )}
    </div>
  );
}
