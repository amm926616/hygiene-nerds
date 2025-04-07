import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "../providers/CartContext";
import { Link } from "react-router-dom";
import { backend_image_url } from "../data/const";
import { RightClickHint } from "./ProductCartHint";
import { Minus, Plus, Trash2 } from "react-feather";

const FloatingCart = () => {
  const padding = 120;
  const [constraints, setConstraints] = useState(() => getConstraintValues());
  const { cartItems, cartCount, cartTotal, updateQuantity, clearCart } =
    useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showQuickPreview, setShowQuickPreview] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const controls = useAnimation();
  const cartRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(cartCount);
  const doubleClickTimer = useRef(null);
  const clickCount = useRef(0);
  const [showRightClickHint, setShowRightClickHint] = useState(false);
  const [hasShownHint, setHasShownHint] = useState(false);

  const triggerAddAnimation = useCallback(async () => {
    setIsAnimating(true);
    await controls.start({
      scale: [1, 1.3, 1],
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.6 },
    });
    setIsAnimating(false);
  }, [controls]);

  // Handle cart item addition animation and first-item hint
  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      const newItem = cartItems[cartItems.length - 1];
      setLastAddedItem(newItem);

      // Trigger the cart animation
      triggerAddAnimation();

      // Show right-click hint if it's the first item
      if (cartCount === 1 && !hasShownHint) {
        setShowRightClickHint(true);
        const hintTimer = setTimeout(() => {
          setShowRightClickHint(false);
          setHasShownHint(true);
        }, 5000); // Hide after 5 seconds

        return () => clearTimeout(hintTimer);
      }
    }

    prevCountRef.current = cartCount;
  }, [cartCount, cartItems, hasShownHint, triggerAddAnimation]);

  // Handle window resize
  useEffect(() => {
    const updateConstraints = () => setConstraints(getConstraintValues());
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  // Get cart position for bubble animation
  const getCartPosition = () => {
    if (!cartRef.current) return { x: 0, y: 0 };
    const rect = cartRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  // Handle cart interactions
  const handlePointerDown = (e) => {
    // Right click
    if (e.button === 2) {
      e.preventDefault();
      toggleQuickPreview();
      return;
    }

    // Handle double click
    clickCount.current += 1;
    if (clickCount.current === 1) {
      doubleClickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 300);
    } else if (clickCount.current === 2) {
      clearTimeout(doubleClickTimer.current);
      clickCount.current = 0;
      toggleQuickPreview();
    }
  };

  const toggleQuickPreview = () => {
    setShowQuickPreview(!showQuickPreview);
  };

  // Close preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        previewRef.current &&
        !previewRef.current.contains(event.target) &&
        !cartRef.current.contains(event.target)
      ) {
        setShowQuickPreview(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.div
        ref={cartRef}
        className="fixed bottom-10 right-10 z-50 flex items-center justify-center"
        drag
        dragConstraints={constraints}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        animate={controls}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        onPointerDown={handlePointerDown}
        onContextMenu={(e) => e.preventDefault()} // Disable default right-click menu
      >
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative cursor-grab"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(100, 149, 237, 0.9), rgba(70, 130, 180, 0.8))",
            boxShadow: "0px 4px 20px rgba(100, 149, 237, 0.4)",
          }}
          animate={{
            scale: isDragging ? 1.1 : isAnimating ? [1, 1.2, 1] : 1,
            boxShadow: isDragging
              ? "0px 6px 25px rgba(100, 149, 237, 0.6)"
              : "0px 4px 20px rgba(100, 149, 237, 0.4)",
          }}
          transition={{
            duration: 0.3,
          }}
        >
          {/* Add the RightClickHint component */}
          <RightClickHint show={showRightClickHint} />

          {/* Cart Icon */}
          <div className="relative">
            <ShoppingCart className="text-white w-8 h-8" strokeWidth={2.5} />

            {/* Item Count Badge */}
            {cartCount > 0 && (
              <motion.div
                className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                initial={false}
                animate={{
                  scale: isAnimating ? [1, 1.5, 1] : 1,
                  backgroundColor: isAnimating
                    ? ["#48bb78", "#68d391", "#48bb78"]
                    : "#48bb78",
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                {cartCount}
              </motion.div>
            )}
          </div>

          {/* Glare Effects */}
          <div className="absolute top-3 left-3 w-4 h-4 bg-white rounded-full opacity-70 blur-[1px]" />
          <div
            className="absolute bottom-0 right-0 w-10 h-6 opacity-80"
            style={{
              clipPath: "ellipse(50% 30% at 50% 70%)",
              transform: "rotate(-216deg) scaleX(0.8)",
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3))",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Quick Preview Popup */}
      <AnimatePresence>
        {showQuickPreview && cartCount > 0 && (
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-32 right-10 z-50 bg-white rounded-xl shadow-2xl w-80 max-h-[60vh] overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg">Your Cart ({cartCount})</h3>
              <button
                onClick={toggleQuickPreview}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {cartItems.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 border-b border-gray-100 flex items-center"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 overflow-hidden">
                    <img
                      src={
                        "https://placehold.co/600x400" === item.imageUrl
                          ? "https://placehold.co/600x400"
                          : backend_image_url + item.imageUrl
                      }
                      className="w-full h-full object-cover"
                      alt={item.imageUrl}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.name}
                    </h4>
                    {item.brand_name && (
                      <p className="text-gray-500 text-xs">{item.brand_name}</p>
                    )}
                  </div>
                  <div className="text-right ml-2">
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                        aria-label="Decrease quantity"
                      >
                        <Minus
                          size={14}
                          color="blue"
                          className="bg-blue-100 rounded-sm"
                        />
                      </button>

                      <span className="text-sm w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                        aria-label="Increase quantity"
                      >
                        <Plus
                          className="bg-blue-100 rounded-sm"
                          size={14}
                          color="blue"
                        />
                      </button>

                      <button
                        onClick={() => updateQuantity(item.productId, 0)}
                        className="p-1 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded ml-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} color="red" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-1"
                >
                  <Trash2 size={16} /> Clear
                </button>
                <Link to="/checkout" className="flex-1">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                    Checkout Now
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  function getConstraintValues() {
    return {
      left: -window.innerWidth + padding + 20,
      right: 0,
      top: -window.innerHeight + padding + 20,
      bottom: 0,
    };
  }
};

export default FloatingCart;
