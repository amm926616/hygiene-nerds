export interface Product {
  id: number;
  name: string;
  description: string;
  brandName: string;
  stock: number;
  price: number;
  category: string;
  imageFile: File | null;
  imageUrl: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
