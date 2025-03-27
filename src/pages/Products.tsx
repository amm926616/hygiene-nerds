import { useEffect, useState } from "react";
import FloatingCart from "../components/FloatingCart";
import { ModelPage } from "../components/IntroPage";
import ProductList from "../components/ProductList";
import { ProductDto } from "../types/product.dto";
import { fetchProducts } from "../service/imageupdate.service";
import { CartProvider } from "../components/CartContext";

export default function Products() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return localStorage.getItem("hasSeenWelcome") !== "true";
  });

  const [products, setProducts] = useState<ProductDto[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts();
        console.log("API Response:", response.data);

        // ✅ Convert response to match `ProductDto` type
        const formattedProducts: ProductDto[] = response.data.map(
          (product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            brand_name: product.brandName,
            price: product.price,
            image_url: product.imageUrl, // Convert field name
            category: product.category,
            stock: product.stock,
          }),
        );
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {showWelcome ? (
        <ModelPage
          pageKey="cart"
          duration={2000}
          onClose={handleWelcomeClose}
        />
      ) : (
        <>
          <CartProvider>
            <ProductList products={products} />
            <FloatingCart />
          </CartProvider>
        </>
      )}
    </div>
  );
}
