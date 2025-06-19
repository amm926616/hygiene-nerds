import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  Truck,
  ShoppingBag,
  Home,
  Package,
  CreditCard,
} from "react-feather";
import { OrderConfirmationDto } from "../types/OrderConfirmation.dto";
import { fetchOrderConfirmation } from "../service/order.service";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderConfirmationDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("This is orderid");
  console.log(orderId);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!orderId) throw new Error("No order ID provided");
        const orderData = await fetchOrderConfirmation(orderId);
        setOrder(orderData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load order details",
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
          <p className="mb-4">
            {error || "We couldn't retrieve your order details."}
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Order Confirmed Header */}
        <div className="text-center mb-10">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for your purchase. Your order #{order.orderId} has been
            received.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order Summary
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Ordered on {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <li key={index} className="py-4 flex">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p>${item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Truck className="mr-2 text-blue-500" size={20} />
              Shipping Information
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Shipping to
                </h4>
                <p className="mt-1 text-sm text-gray-900">
                  {order.shippingAddress.name}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Address</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Estimated delivery
                </h4>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <p className="mt-1 text-sm text-green-600 font-medium">
                  {order.status === "SUCCESS" ? "Confirmed" : order.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <CreditCard className="mr-2 text-blue-500" size={20} />
              Payment Information
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Payment method
                </h4>
                <p className="mt-1 text-sm text-gray-900 capitalize">
                  {order.paymentMethod.replace("-", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/products"
            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ShoppingBag className="mr-2" size={18} />
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Home className="mr-2" size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
