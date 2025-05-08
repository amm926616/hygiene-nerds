import axios from "axios";
import { CheckoutRequest } from "../types/Checkout.dto";

const API_BASE_URL = "http://localhost:8080/api/checkout";

export const processCheckout = async (checkoutData: CheckoutRequest) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/process`, checkoutData);
    return response.data;
  } catch (error) {
    console.error("Checkout failed:", error);
    throw error;
  }
};
