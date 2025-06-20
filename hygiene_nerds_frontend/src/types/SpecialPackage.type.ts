import { Product } from "./product";

export interface SpecialPackage {
  id: number;
  name: string;
  description: string;
  packageName: string;
  duration: number;
  expirationDate: string;
  offeredProducts: Product[];
  discount?: number; // Calculated field
  price: number; // Calculated field
  originalPrice: number; // Calculated field
}
