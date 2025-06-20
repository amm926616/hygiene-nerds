import { useEffect, useState } from "react";
import FloatingCart from "../components/FloatingCardComponent";
import { LoadingSpinnerComponent } from "../components/LoadingSpinnerComponent";
import { fetchProducts } from "../service/product.service";
import { ProductDto } from "../types/product.dto";
import ProductListComponent from "../components/ProductListComponent";
import { Product } from "../types/product";

// Cache for products data
let productsCache: Product[] | null = null;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check welcome status and products cache
  useEffect(() => {
    if (productsCache) {
      setProducts(productsCache);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      <LoadingSpinnerComponent />;
    }
  }, [isLoading]);

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

        console.log("just fetched products from backend");
        console.log(response.data);

        const formattedProducts: Product[] = response.data.map(
          (product: ProductDto) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            brandName: product.brandName,
            price: product.price,
            imageUrl: product.imageUrl,
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
    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <>
          <ProductListComponent products={products} />
          {console.log(products)}
          <FloatingCart />
        </>
      )}
    </div>
  );
}
