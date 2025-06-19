import { useEffect, useState } from "react";
import FloatingCart from "../components/FloatingCart";
import ProductList from "../components/ProductList";
import { Spinner } from "../components/SpinnerComponent";
import { fetchProducts } from "../service/product.service";
import { ProductDto } from "../types/product.dto";

// Cache for products data
let productsCache: ProductDto[] | null = null;

export default function Products() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check welcome status and products cache
  useEffect(() => {
    if (productsCache) {
      setProducts(productsCache);
      setIsLoading(false);
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

        console.log("just fetched products from backend");
        console.log(response.data);

        const formattedProducts: ProductDto[] = response.data.map(
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
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="md" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <>
          <ProductList products={products} />
          {console.log(products)}
          <FloatingCart />
        </>
      )}
    </div>
  );
}
