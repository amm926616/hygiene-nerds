import React, { useState } from "react";

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

interface ProductFormProps {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: product?.name || "",
    description: product?.description || "",
    brandName: product?.brandName || "",
    price: product?.price || 0,
    category: product?.category || "",
    imageFile: product?.imageFile || null,
    imagePath: product?.imagePath || "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(
    product?.imagePath ? `http://localhost:8080${product.imagePath}` : null,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: product?.id || Date.now(),
      ...formData,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 outline-none"
                required
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 outline-none"
                required={!product?.imagePath}
              />
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description (full width below the columns) */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            rows={4}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
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
            {product ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
