import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../forms/AddNewProductFrom";

interface Product {
  id: number;
  name: string;
  description: string;
  brandName: string;
  price: number;
  category: string;
  imageFile: File | null;
  imagePath: string | null;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch products from the server on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data); // Assuming the API returns an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
        setMessage("Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run this effect only once

  // Add or Update Product
  const handleSaveProduct = async (product: Product) => {
    if (!product.imageFile) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("brand_name", product.brandName);
    formData.append("price", product.price.toString());
    formData.append("category", product.category);
    formData.append("imageFile", product.imageFile);

    try {
      const endpoint = editingProduct
        ? `http://localhost:8080/products/update/${editingProduct.id}`
        : "http://localhost:8080/products/add-new-product";

      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (editingProduct) {
        // Update existing product
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id
              ? { ...product, imagePath: response.data.imagePath }
              : p,
          ),
        );
      } else {
        // Add new product
        setProducts((prev) => [
          ...prev,
          {
            ...product,
            id: Date.now(),
            imagePath: response.data.imagePath,
          },
        ]);
      }

      setMessage(response.data.message || "Operation successful");
      setEditingProduct(null);
      setIsAdding(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Operation failed. Please try again.");
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/products/delete/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setMessage("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Failed to delete product");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* Status Message */}
        {message && (
          <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg text-center">
            {message}
          </div>
        )}

        {/* Add Product Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingProduct(null);
              setMessage("");
            }}
            className="bg-blue-200 text-blue-800 py-2 px-6 rounded-full font-semibold hover:bg-blue-300 transition-all duration-300"
          >
            Add New Product
          </button>
        </div>

        {/* Product Form (Add/Edit) */}
        {(isAdding || editingProduct) && (
          <ProductForm
            onSave={handleSaveProduct}
            onCancel={() => {
              setIsAdding(false);
              setEditingProduct(null);
              setMessage("");
            }}
          />
        )}

        {/* Product List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            Product List
          </h2>
          {products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row justify-between items-center border-b border-blue-100 pb-4"
                >
                  <div className="flex items-center space-x-4">
                    {product.imagePath && (
                      <img
                        src={`http://localhost:8080/products/image/${product.imagePath}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-blue-700">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">{product.description}</p>
                      <p className="text-gray-600">
                        Category: {product.category}
                      </p>
                      <p className="text-lg font-bold text-blue-700">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setMessage("");
                      }}
                      className="bg-blue-100 text-blue-700 py-1 px-4 rounded-full hover:bg-blue-200 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-100 text-red-700 py-1 px-4 rounded-full hover:bg-red-200 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
