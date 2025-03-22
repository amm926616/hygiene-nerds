import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Add or Update Product
  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p)),
      );
      setEditingProduct(null);
    } else {
      // Add new product
      setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    }
    setIsAdding(false);
  };

  // Delete Product
  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* Add Product Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingProduct(null);
            }}
            className="bg-blue-200 text-blue-800 py-2 px-6 rounded-full font-semibold hover:bg-blue-300 transition-all duration-300"
          >
            Add New Product
          </button>
        </div>

        {/* Product Form (Add/Edit) */}
        {(isAdding || editingProduct) && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setIsAdding(false);
              setEditingProduct(null);
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
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-blue-700">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">{product.description}</p>
                      <p className="text-lg font-bold text-blue-700">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <button
                      onClick={() => setEditingProduct(product)}
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

// Product Form Component
interface ProductFormProps {
  product: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: product?.id || Date.now(),
      name,
      description,
      price,
      imageUrl,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Image URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 outline-none"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-200 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-200 text-blue-800 py-2 px-6 rounded-full hover:bg-blue-300 transition-all duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
