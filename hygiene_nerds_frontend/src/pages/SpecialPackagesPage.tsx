import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Gift } from "lucide-react";
import { SpecialPackage } from "../types/product.dto";
import { fetchSpecialPackages } from "../service/product.service";
import { Link } from "react-router-dom";
import { LoadingSpinnerComponent } from "../components/LoadingSpinnerComponent";
import FloatingCart from "../components/FloatingCardComponent";
import { SpecialPackageCardComponent } from "../components/SpecialPackageCardComponent";

export default function SpecialPackagesPage() {
  const [packages, setPackages] = useState<SpecialPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchSpecialPackages();
        // Transform the data to include calculated fields
        const transformedPackages = data.map((pkg) => ({
          ...pkg,
          name: pkg.packageName,
          description: `Valid for ${pkg.duration} days until ${new Date(pkg.expirationDate).toLocaleDateString()}`,
          discount: calculateDiscount(pkg),
          price: calculatePrice(pkg),
          originalPrice: calculateOriginalPrice(pkg),
        }));
        setPackages(transformedPackages);
      } catch (error) {
        console.error("Failed to load packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPackages();
  }, []);

  // Helper functions to calculate package pricing
  const calculateOriginalPrice = (pkg: SpecialPackage) => {
    return pkg.offeredProducts.reduce((sum, product) => sum + product.price, 0);
  };

  const calculatePrice = (pkg: SpecialPackage) => {
    const original = calculateOriginalPrice(pkg);
    return original * 0.8; // Example: 20% discount
  };

  const calculateDiscount = (pkg: SpecialPackage) => {
    const original = calculateOriginalPrice(pkg);
    const discounted = calculatePrice(pkg);
    return Math.round(((original - discounted) / original) * 100);
  };

  const handleAddToCart = (pkgId: number) => {
    console.log(`Adding package ${pkgId} to cart`);
    // Implement your add to cart logic
  };

  if (isLoading) {
    return <LoadingSpinnerComponent />;
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <Zap className="mr-2" size={18} />
            <span className="font-medium">Special Offers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Curated Hygiene Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save more with our specially bundled products
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <SpecialPackageCardComponent
              key={pkg.id}
              pkg={pkg}
              onAddToCart={() => handleAddToCart(pkg.id)}
            />
          ))}
        </div>

        {packages.length === 0 && !isLoading && <EmptyState />}
      </div>
      <FloatingCart />
    </div>
  );
}

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-12"
  >
    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Gift className="text-gray-400" size={32} />
    </div>
    <h2 className="text-xl font-medium text-gray-700 mb-2">
      No special offers available
    </h2>
    <p className="text-gray-500 mb-4">
      Check back later for our exclusive bundles
    </p>
    <Link
      to="/products"
      className="text-blue-600 hover:text-blue-800 font-medium"
    >
      View All Products
    </Link>
  </motion.div>
);
