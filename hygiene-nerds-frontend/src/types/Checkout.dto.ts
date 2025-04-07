export interface CheckoutRequest {
  formData: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: string;
  };
  cartItems: Array<{
    productId: number;
    name: string;
    brand_name: string;
    imageUrl: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export interface CheckoutResponse {
  orderId: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  message?: string;
}
