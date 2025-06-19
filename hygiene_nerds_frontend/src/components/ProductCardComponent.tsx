import { image_backend_url } from "../data/const";
import { ProductDto } from "../types/product.dto";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../providers/CartContext";

interface ProductCardProps {
  product: ProductDto;
}

const ProductCardComponent = ({ product }: ProductCardProps) => {
  const { addToCart, cartItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [localStock, setLocalStock] = useState(product.stock); // Local stock state

  const cartItem = cartItems.find((item) => item.productId === product.id);
  const quantityInCart = cartItem?.quantity || 0;

  // Reset local stock when product changes
  useEffect(() => {
    setLocalStock(product.stock);
  }, [product]);

  const image_link =
    product.imageUrl === "https://placehold.co/600x400"
      ? "https://placehold.co/600x400"
      : image_backend_url + product.imageUrl;

  const isLowStock = localStock > 0 && localStock <= 10;
  const isOutOfStock = localStock === 0;
  const stockStatusClass = isOutOfStock
    ? "text-red-600"
    : isLowStock
      ? "text-amber-600"
      : "text-emerald-600";

  const handleAddToCart = (qty: number = 1) => {
    if (!isOutOfStock && localStock >= qty) {
      setIsAnimating(true);
      addToCart(
        product.id,
        product.price,
        product.name,
        product.imageUrl,
        qty,
        product.brandName,
      );
      setLocalStock((prev) => prev - qty); // Only update local state
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 border border-gray-100 flex flex-col h-full relative overflow-hidden group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={openModal}
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

          {product.brandName && (
            <div className="flex">
              <p className="text-sm text-gray-500 mb-1 bg-blue-200 px-2.5 py-1 rounded-full font-medium">
                {product.brandName}
              </p>
            </div>
          )}
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
                  ? `Only ${localStock} left`
                  : `${localStock} available`}
            </div>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className={`
              relative overflow-hidden
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-700 hover:to-blue-600
              text-white py-3 px-6 rounded-xl w-full
              font-medium transition-all duration-300
              hover:cursor-pointer
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

      {/* Product Detail Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
            >
              <div
                className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="relative">
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <img
                      src={image_link}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-l-2xl"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h2>
                      {product.brandName && (
                        <p className="text-blue-600 font-medium">
                          {product.brandName}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <span className="text-2xl font-bold text-gray-800">
                        ${product.price.toFixed(2)}
                      </span>
                      <div
                        className={`text-sm font-semibold mt-1 ${stockStatusClass}`}
                      >
                        {isOutOfStock
                          ? "Out of Stock"
                          : isLowStock
                            ? `Only ${localStock} left`
                            : `${localStock} available`}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">
                        Description
                      </h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">
                        More Information
                      </h3>
                      <p className="text-gray-600">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Adipisci ipsa repudiandae ullam fugit vero quae
                        voluptatem quos facere ea eius exercitationem accusamus
                        aperiam tenetur odio quod, commodi nam illum modi!
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Quantity Input */}
                      <div className="relative">
                        <input
                          type="number"
                          value={quantityToAdd}
                          onChange={(e) =>
                            setQuantityToAdd(
                              Math.max(1, parseInt(e.target.value) || 1),
                            )
                          }
                          min="1"
                          max={localStock}
                          className="
                            w-24 h-12 px-4
                            border-2 border-gray-200 rounded-lg
                            bg-white text-gray-800
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                            outline-none transition-all
                            appearance-none [&::-webkit-inner-spin-button]:appearance-none
                            text-center font-medium
                          "
                          aria-label="Quantity"
                        />
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(quantityToAdd);
                        }}
                        className={`
                          relative overflow-hidden
                          bg-gradient-to-r from-blue-600 to-blue-500
                          hover:from-blue-700 hover:to-blue-600
                          text-white py-3 px-6 rounded-xl
                          font-medium transition-all duration-300
                          flex-1 h-12
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          disabled:opacity-70 disabled:cursor-not-allowed
                          disabled:from-gray-400 disabled:to-gray-500
                          shadow-md hover:shadow-lg
                        `}
                        disabled={isOutOfStock || localStock < quantityToAdd}
                        whileHover={
                          !isOutOfStock && localStock >= quantityToAdd
                            ? { y: -2 }
                            : {}
                        }
                        whileTap={
                          !isOutOfStock && localStock >= quantityToAdd
                            ? {
                                scale: 0.97,
                                boxShadow: "0px 1px 2px rgba(0,0,0,0.2)",
                              }
                            : {}
                        }
                        aria-disabled={
                          isOutOfStock || localStock < quantityToAdd
                        }
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isOutOfStock ? (
                            "Out of Stock"
                          ) : localStock < quantityToAdd ? (
                            "Not Enough Stock"
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
                        {!isOutOfStock && localStock >= quantityToAdd && (
                          <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCardComponent;
