import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../providers/CartContext";
import { ProductDto } from "../types/product.dto";
import { fetchProductsByIds } from "../service/product.service";
import { image_backend_url } from "../data/const";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, CreditCard, Shield, Truck, XCircle } from "react-feather";
import { useAuth } from "../providers/AuthProvider";
import { getUserDetails } from "../service/auth.service";
import { processCheckout } from "../service/checkout.service";

export default function CheckOutPage() {
  const { username } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "paypal",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!username) {
          throw new Error("No user logged in");
        }

        const response = await getUserDetails(username);
        const userData = response.data;

        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          username: userData.username || "",
          address: userData.address || "",
          city: "", // Add city to your backend response if needed
          zipCode: "", // Add zipCode to your backend response if needed
          paymentMethod: "paypal",
        });
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProductsByIds(
          cartItems.map((item) => item.productId),
        );
        console.log("Fetched products:", products);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    } else {
      setIsLoading(false);
    }
  }, [cartItems]);

  // Calculate totals
  const { subtotal, tax, total } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      return sum + (product?.price || 0) * cartItem.quantity;
    }, 0);

    const shipping = 5.99; // Flat rate shipping
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    return { subtotal, tax, total };
  }, [cartItems, products]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get these from your auth context or login form
      const result = await processCheckout({ formData, cartItems, total });

      if (result) {
        console.log("Checkout successful:", result);
        navigate(`/order-confirmation/${result.orderId}`);
        clearCart();
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setError("Checkout failed. Please check your credentials and try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12 text-center"
      >
        <XCircle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added any items yet
        </p>
        <Link
          to="/products/"
          className="inline-block bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus:scale-105 hover:shadow-lg focus:shadow-lg outline-none"
        >
          Browse Products
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <div className="flex items-center text-gray-500 mb-8">
            <CheckCircle className="text-green-500 mr-2" size={18} />
            <span>Secure checkout</span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column - Items and Shipping */}
              <div className="md:col-span-2 space-y-6">
                {/* Cart Items */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Your Items ({cartItems.length})
                  </h2>
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((cartItem) => {
                      const product = products.find(
                        (p) => p.id === cartItem.productId,
                      );
                      if (!product) {
                        return (
                          <div
                            key={cartItem.productId}
                            className="py-4 text-red-500"
                          >
                            Product not available (ID: {cartItem.productId})
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                removeFromCart(cartItem.productId);
                              }}
                              className="ml-4 text-sm text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        );
                      }

                      return (
                        <motion.div
                          key={cartItem.productId}
                          layout
                          className="py-4 flex"
                        >
                          <img
                            src={
                              product.imageUrl.startsWith("http")
                                ? product.imageUrl
                                : `${image_backend_url}${product.imageUrl}`
                            }
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder-product.jpg";
                            }}
                          />
                          <div className="ml-4 flex-grow">
                            <h3 className="font-medium text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {product.brandName}
                            </p>
                            <div className="flex items-center mt-2">
                              <div className="flex items-center mt-2 border border-gray-300 rounded-md w-fit">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateQuantity(
                                      cartItem.productId,
                                      cartItem.quantity - 1,
                                      cartItem.stock,
                                    );
                                  }}
                                  className={`px-3 py-1 bg-blue-200 text-gray-600 hover:bg-blue-100 active:bg-gray-200 transition-colors
                                    ${cartItem.quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:text-gray-900"}`}
                                  disabled={cartItem.quantity <= 1}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>

                                <span className="mx-2 w-8 text-center text-gray-900 font-medium">
                                  {cartItem.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateQuantity(
                                      cartItem.productId,
                                      cartItem.quantity + 1,
                                      cartItem.stock,
                                    );
                                  }}
                                  className="px-3 py-1 bg-blue-200 text-gray-600 hover:text-gray-900 hover:bg-blue-100 active:bg-gray-200 transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </button>
                              </div>{" "}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ${(product.price * cartItem.quantity).toFixed(2)}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(cartItem.productId)}
                              className="bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-700 text-sm mt-1 px-3 py-1 rounded-md"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                {/* Shipping Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Truck className="text-blue-500 mr-2" size={20} />
                    Shipping Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>$5.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between font-medium text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="mt-8">
                    <h3 className="font-medium mb-3 flex items-center">
                      <CreditCard className="text-blue-500 mr-2" size={18} />
                      Payment Method *
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 border border-gray-300 rounded-md">
                        <input
                          type="radio"
                          id="credit-card"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === "credit-card"}
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />
                        <label htmlFor="credit-card">Credit Card</label>
                      </div>
                      <div className="flex items-center p-3 border border-gray-300 rounded-md">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === "paypal"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <label htmlFor="paypal">PayPal</label>
                      </div>
                    </div>
                  </div>

                  {/* Secure Checkout Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      console.log("clicked on secure checkout");
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium mt-6 flex items-center justify-center"
                  >
                    <Shield className="mr-2" size={18} />
                    Complete Secure Checkout
                  </motion.button>

                  <div className="flex items-center text-gray-500 text-sm mt-4">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
