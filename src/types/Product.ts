export interface Product {
  id: number;
  name: string;
  description: string;
  brandName: string;
  price: number;
  category: string;
  imageFile: File | null;
  imagePath: string | null;
}
