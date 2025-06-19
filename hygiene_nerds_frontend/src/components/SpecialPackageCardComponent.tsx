import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProductDto } from "../types/product.dto";
import { Gift, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "../providers/CartContext";

interface SpecialPackageCardProps {
  pkg: {
    id: number;
    name: string;
    description: string;
    discount: number;
    price: number;
    originalPrice: number;
    offeredProducts: ProductDto[];
  };
}

export function SpecialPackageCardComponent({ pkg }: SpecialPackageCardProps) {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    // Add each product in the package to cart
    pkg.offeredProducts.forEach((product) => {
      addToCart(
        product.id,
        product.price,
        product.name,
        product.imageUrl,
        1, // quantity
        product.brandName,
      );
    });

    // Add the package itself as a special item
    addToCart(
      pkg.id,
      pkg.price,
      pkg.name,
      pkg.offeredProducts[0]?.imageUrl || "",
      1,
      "Special Package",
    );

    setTimeout(() => setIsAdding(false), 1000);
  };

  // Calculate how many items from this package are in the cart
  const packageItemsInCart = cartItems
    .filter(
      (item) =>
        pkg.offeredProducts.some((product) => product.id === item.productId) ||
        item.productId === pkg.id,
    )
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all h-full flex flex-col"
    >
      {/* Package Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white relative">
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
          {pkg.discount}% OFF
        </div>
        <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
        <p className="opacity-90">{pkg.description}</p>
      </div>

      {/* Package Content */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Price */}
        <div className="flex items-end mb-6">
          <span className="text-3xl font-bold text-gray-900">
            ${pkg.price.toFixed(2)}
          </span>
          <span className="ml-2 text-gray-500 line-through">
            ${pkg.originalPrice.toFixed(2)}
          </span>
          <span className="ml-auto text-green-600 font-medium">
            Save ${(pkg.originalPrice - pkg.price).toFixed(2)}
          </span>
        </div>

        {/* Included Products */}
        <div className="mb-6 flex-grow">
          <h3 className="font-medium text-gray-700 mb-3 flex items-center">
            <Gift className="text-blue-500 mr-2" size={18} />
            Includes:
          </h3>
          <ul className="space-y-3">
            {pkg.offeredProducts.map((product) => (
              <li key={product.id} className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-lg mr-3 overflow-hidden">
                  <img
                    src={`http://localhost:8080/api/products/image/${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/images/placeholder-product.jpg";
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {product.category} • ${product.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 ${
              isAdding ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors relative`}
          >
            {isAdding ? (
              "Adding..."
            ) : (
              <>
                <ShoppingCart className="mr-2" size={18} />
                Add to Cart
                {packageItemsInCart > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {packageItemsInCart}
                  </span>
                )}
              </>
            )}
          </button>
          <Link
            to={`/packages/${pkg.id}`}
            className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="View package details"
          >
            <Star className="text-gray-600" size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
