export interface Product {
  name: string;
  description: string;
  brandName: string;
  stock: number;
  price: number;
  category: string;
  imageFile: File | null;
  imagePath: string | null;
}
