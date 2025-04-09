import { useState } from "react";
import axios from "axios";
import { ProductDto } from "../types/product.dto";

const NewProductForm = () => {
  const [formData, setFormData] = useState<Omit<ProductDto, "id">>({
    name: "",
    description: "",
    price: 0,
    brandName: "",
    image: File || null, // Updated to store image file
    category: "",
  });

  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Image preview

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(value) || 0 : value, // Ensure price is a number
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      setMessage("Please select an image.");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("name", formData.name);
    uploadFormData.append("description", formData.description);
    uploadFormData.append("price", formData.price.toString());
    uploadFormData.append("category", formData.category);
    uploadFormData.append("imageFile", formData.image); // Append image file

    try {
      const response = await axios.post(
        "http://localhost:8080/products/add-new-product",
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setMessage(response.data); // Show success message
      setFormData({
        name: "",
        description: "",
        price: 0,
        image: null,
        category: "",
      }); // Reset form
      setPreviewImage(null); // Clear image preview
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Show Image Preview */}
        {previewImage && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Image Preview:</h3>
            <img
              src={previewImage}
              alt="Selected"
              className="mt-2 w-40 h-40 object-cover border rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default NewProductForm;
