import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Package, CheckCircle, Truck, XCircle } from "react-feather";
import { fetchUserOrders, Order } from "../service/order.service";

const statusIcons = {
  PROCESSING: <Package className="text-yellow-500" />,
  SHIPPED: <Truck className="text-blue-500" />,
  DELIVERED: <CheckCircle className="text-green-500" />,
  CANCELLED: <XCircle className="text-red-500" />,
};

const statusColors = {
  PROCESSING: "bg-yellow-100 text-yellow-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orderData = await fetchUserOrders();
        setOrders(orderData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
          <h2 className="text-xl font-semibold mb-2">Error Loading Orders</h2>
          <p className="mb-4">{error}</p>
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Your Order History
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            View all your past and current orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by placing your first order.
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow overflow-hidden sm:rounded-lg"
              >
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Order #{order.id}
                    </h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>
                        Ordered on{" "}
                        {new Date(order.orderDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {statusIcons[order.status]}
                    <span className="ml-1.5 capitalize">
                      {order.status.toLowerCase()}
                    </span>
                  </span>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flow-root">
                    <ul className="-my-4 divide-y divide-gray-200">
                      {order.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="py-4 flex">
                          <div className="flex-shrink-0">
                            {item.imageUrl ? (
                              <img
                                className="h-16 w-16 rounded-md object-cover"
                                src={item.imageUrl}
                                alt={item.name}
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                                <Package className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
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
                  <div className="mt-6 border-t border-gray-200 pt-6 flex justify-between items-center">
                    <Link
                      to={`/order-confirmation/${order.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      View order details
                    </Link>
                    <div className="text-lg font-medium text-gray-900">
                      Total: ${order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
