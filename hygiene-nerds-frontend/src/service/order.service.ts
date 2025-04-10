import axios from "axios";
import { OrderConfirmationDto } from "../types/OrderConfirmation.dto";

const API_BASE_URL = "http://localhost:8080/api/checkout";

export const fetchOrderConfirmation = async (
  orderId: string,
): Promise<OrderConfirmationDto> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/confirm/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order confirmation:", error);
    throw new Error("Failed to load order details");
  }
};

export interface Order {
  id: string;
  orderDate: string;
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    imageUrl?: string;
  }[];
}

export const fetchUserOrders = async (): Promise<Order[]> => {
  try {
    const username = localStorage.getItem("username");

    const response = await axios.get(
      `http://localhost:8080/api/user/my-orders?username=${username}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to load orders");
  }
};
