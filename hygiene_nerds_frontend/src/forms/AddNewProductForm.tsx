import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Product } from "../types/product";

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   brandName: string;
//   stock: number;
//   price: number;
//   category: string;
//   imageFile: File | undefined;
//   imagePath: string | null;
//   createdAt: Date | null;
//   updatedAt: Date | null;
// }

interface ProductFormProps {
  product: Product;
  onSave: (product: Product) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm = ({
  product,
  onSave,
  onCancel,
  isLoading,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: product.name,
    description: product.description,
    brandName: product.brandName,
    price: product.price,
    category: product.category,
    stock: product.stock,
    imageFile: null,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (product.imageUrl) {
      setPreviewImage(
        `http://localhost:8080/products/image/${product.imageUrl}`,
      );
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        setValidationErrors((prev) => ({
          ...prev,
          imageFile: "Please upload a valid image file",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors((prev) => ({
          ...prev,
          imageFile: "Image size should be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        // Clear imagePath when new image is selected
        imagePath: null,
      }));
      setPreviewImage(URL.createObjectURL(file));

      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.imageFile;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Product name is required";
    if (!formData.description.trim())
      errors.description = "Description is required";
    if (!formData.brandName.trim()) errors.brandName = "Brand name is required";
    if (formData.price <= 0) errors.price = "Price must be greater than 0";
    if (formData.stock < 0) errors.stock = "Stock cannot be negative";
    if (!formData.category.trim()) errors.category = "Category is required";

    // Image is required for new products or when editing without existing image
    if (!product?.id && !formData.imageFile) {
      errors.imageFile = "Product image is required";
    }
    // For editing existing product, require image if there was no existing image
    else if (product?.id && !formData.imageUrl && !formData.imageFile) {
      errors.imageFile = "Product image is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    try {
      // Create FormData to properly send file and other fields
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("brandName", formData.brandName);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("stock", formData.stock.toString());
      formDataToSend.append("category", formData.category);

      // Only append imageFile if it exists (for new uploads)
      if (formData.imageFile) {
        formDataToSend.append("imageFile", formData.imageFile);
      } else if (formData.imageUrl) {
        formDataToSend.append("imagePath", formData.imageUrl);
      }

      await onSave({
        ...product,
        ...formData,
        // Ensure imageFile is included in the product object
        imageFile: formData.imageFile || null,
      });
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        {product?.id ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none ${
                  validationErrors.name ? "border-red-500" : "border-blue-200"
                }`}
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Brand Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none ${
                  validationErrors.brandName
                    ? "border-red-500"
                    : "border-blue-200"
                }`}
              />
              {validationErrors.brandName && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.brandName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    min="0.01"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none ${
                      validationErrors.price
                        ? "border-red-500"
                        : "border-blue-200"
                    }`}
                  />
                </div>
                {validationErrors.price && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none ${
                    validationErrors.stock
                      ? "border-red-500"
                      : "border-blue-200"
                  }`}
                />
                {validationErrors.stock && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.stock}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none ${
                  validationErrors.category
                    ? "border-red-500"
                    : "border-blue-200"
                }`}
              />
              {validationErrors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Product Image{" "}
                {(!product?.imageUrl || !formData.imageUrl) && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none ${
                  validationErrors.imageFile
                    ? "border-red-500"
                    : "border-blue-200"
                }`}
              />
              {validationErrors.imageFile && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.imageFile}
                </p>
              )}
              {(previewImage || formData.imageUrl) && (
                <div className="mt-4">
                  <img
                    src={
                      previewImage ||
                      `http://localhost:8080/products/image/${formData.imageUrl}`
                    }
                    alt="Preview"
                    className="h-32 object-contain rounded-lg border"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.imageFile?.name || "Current image"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none ${
              validationErrors.description
                ? "border-red-500"
                : "border-blue-200"
            }`}
            rows={4}
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.description}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {product?.id ? "Updating..." : "Saving..."}
              </span>
            ) : product?.id ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
