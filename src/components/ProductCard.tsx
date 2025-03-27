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
  const [isHovered, setIsHovered] = useState(false);
  const cartItem = cartItems.find((item) => item.productId === product.id);
  const quantityInCart = cartItem?.quantity || 0;

  const image_link =
    product.image_url === "https://placehold.co/600x400"
      ? "https://placehold.co/600x400"
      : backend_image_url + product.image_url;

  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;
  const stockStatusClass = isOutOfStock
    ? "text-red-600"
    : isLowStock
      ? "text-amber-600"
      : "text-emerald-600";

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      setIsAnimating(true);
      addToCart(product.id);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 border border-gray-100 flex flex-col h-full relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product image with hover effect */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <motion.img
          src={image_link}
          alt={product.name}
          className="w-full h-52 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">
            Low Stock
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {quantityInCart > 0 && (
            <div className="mb-3 flex justify-end">
              <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-medium">
                {quantityInCart} in cart
              </span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-1">{product.brand_name}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
      </div>

      {/* Price and action section */}
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          <div className={`text-sm font-semibold ${stockStatusClass}`}>
            {isOutOfStock
              ? "Out of Stock"
              : isLowStock
                ? `Only ${product.stock} left`
                : `${product.stock} available`}
          </div>
        </div>

        <motion.button
          onClick={handleAddToCart}
          className={`
            relative overflow-hidden
            bg-gradient-to-r from-blue-600 to-blue-500
            hover:from-blue-700 hover:to-blue-600
            text-white py-3 px-6 rounded-xl w-full
            font-medium transition-all duration-300
            ${isOutOfStock ? "opacity-50 cursor-not-allowed bg-gray-400 from-gray-400 to-gray-500 hover:from-gray-400 hover:to-gray-500" : ""}
          `}
          disabled={isOutOfStock}
          whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isOutOfStock ? (
              "Out of Stock"
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </>
            )}
          </span>
          {!isOutOfStock && isHovered && (
            <motion.span
              className="absolute inset-0 bg-white opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
