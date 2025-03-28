import axios from "axios";
import { ProductDto } from "../types/product.dto";

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
