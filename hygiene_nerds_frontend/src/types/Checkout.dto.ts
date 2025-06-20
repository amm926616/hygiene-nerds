import { CartItem } from "./CartItem.dto";

export interface CheckoutRequest {
  formData: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: string;
  };
  cartItems: CartItem[];
  total: number;
}

export interface CheckoutResponse {
  orderId: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  message?: string;
}
