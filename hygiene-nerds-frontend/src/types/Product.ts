export interface Product {
  name: string;
  description: string;
  brand_name: string;
  stock: number;
  price: number;
  category: string;
  imageFile: File | null;
  imagePath: string | null;
}
