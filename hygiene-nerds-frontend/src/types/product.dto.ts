export interface ProductDto {
  id: number;
  name: string;
  description: string;
  brandName: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface SpecialPackage {
  id: number;
  packageName: string;
  duration: number;
  expirationDate: string;
  offeredProducts: ProductDto[];
  discount?: number; // Calculated field
  price?: number; // Calculated field
  originalPrice?: number; // Calculated field
}
