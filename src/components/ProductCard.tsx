// ProductCard.tsx
import { backend_image_url } from "../data/const";
import { ProductDto } from "../types/product.dto";
import { useState } from "react";
import FloatingBubbles from "./FloatingBubbles";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";

interface ProductCardProps {
  product: ProductDto;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, cartItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const cartItem = cartItems.find((item) => item.productId === product.id);
  const quantityInCart = cartItem?.quantity || 0;

  let image_link = "";

  if (product.image_url === "https://placehold.co/600x400") {
    image_link = "https://placehold.co/600x400";
  } else {
    image_link = backend_image_url + product.image_url;
  }

  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;
  const stockStatusClass = isOutOfStock
    ? "text-red-500"
    : isLowStock
      ? "text-yellow-500"
      : "text-green-500";

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      setIsAnimating(true);
      addToCart(product.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-200 flex flex-col h-full relative overflow-hidden">
      {isAnimating && (
        <FloatingBubbles
          count={50}
          flyToCart={true}
          onComplete={() => setIsAnimating(false)}
        />
      )}
      <img
        src={image_link}
        alt={product.name}
        className="w-full h-52 object-cover mb-4 rounded-lg"
      />
      <div className="flex-grow">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold text-gray-900 mr-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600">({product.brand_name})</p>
        </div>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-2">
          <div className={`text-sm font-medium ${stockStatusClass}`}>
            {isOutOfStock
              ? "Out of Stock"
              : isLowStock
                ? `Only ${product.stock} left!`
                : `In Stock (${product.stock})`}
          </div>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-lg font-semibold text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          {quantityInCart > 0 && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {quantityInCart} in cart
            </span>
          )}
        </div>
        <motion.button
          onClick={handleAddToCart}
          className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2 px-6 rounded-full w-full font-medium transition-all duration-300 ${
            isOutOfStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isOutOfStock}
          whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </motion.button>
      </div>
    </div>
  );
};

export default ProductCard;
