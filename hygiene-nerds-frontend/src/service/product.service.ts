import axios from "axios";
import { ProductDto, SpecialPackage } from "../types/product.dto";

const API_BASE_URL = "http://localhost:8080"; // to update with backend url

export async function fetchProductsByIds(ids: number[]): Promise<ProductDto[]> {
  try {
    const response = await axios.get<ProductDto[]>(
      `${API_BASE_URL}/products/bulk`,
      {
        params: { ids: ids.join(",") },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

interface Product {
  name: string;
  description: string;
  brandName: string;
  price: number;
  stock: number;
  category: string;
  imageFile: File | null;
  imagePath: string | null;
}

export const sendCreateProductForm = (productForm: Product) => {
  console.log(productForm);
  axios.post(API_BASE_URL + "/products/add-new-product", productForm);
  return Promise.resolve();
};

export const fetchProducts = () => axios.get(API_BASE_URL + "/products");

export async function fetchSpecialPackages(): Promise<SpecialPackage[]> {
  try {
    const response = await axios.get<SpecialPackage[]>(
      `${API_BASE_URL}/products/special-packages`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching special packages:", error);
    throw error;
  }
}
