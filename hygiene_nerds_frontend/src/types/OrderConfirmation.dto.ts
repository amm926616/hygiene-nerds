export interface OrderConfirmationDto {
  orderId: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  message: string;
  orderDate: string;
  estimatedDelivery: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    zipCode: string;
  };
  paymentMethod: string;
}
