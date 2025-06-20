import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState, useRef } from "react"; // Import useRef
import { AiFillProduct } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewProductForm from "../forms/AddNewProductForm";
import { fetchProducts as apiFetchProducts } from "../service/product.service";
import { Product } from "../types/product";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("name-asc");
  const topRef = useRef<HTMLDivElement>(null); // Create a ref

  // Function to scroll to the top
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch products with error handling
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiFetchProducts();
      console.log("fetching from admin table");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products. Please try again.");
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSaveProduct = async (product: Product) => {
    if (!product.imageFile && !product.imageUrl) {
      toast.warn("Please select an image.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("brandName", product.brandName);
      formData.append("price", product.price.toString());
      formData.append("stock", product.stock?.toString() || "10");
      formData.append(
        "createdAt",
        product.createdAt?.toString() || Date.now().toString(),
      );
      formData.append(
        "updatedAt",
        product.updatedAt?.toString() || Date.now().toString(),
      );
      formData.append("category", product.category);

      if (product.imageFile) {
        formData.append("imageFile", product.imageFile, product.imageFile.name);
      } else if (product.imageUrl) {
        formData.append("imagePath", product.imageUrl);
      }

      console.log("FormData contents before sending:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      toast.success(
        editingProduct
          ? "Product updated successfully"
          : "Product added successfully",
      );

      setIsAdding(false);
      setEditingProduct(null);
      fetchProducts();
      scrollToTop();
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("Detailed error:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }

      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }

    fetchProducts();
  };

  // Handle product deletion
  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8080/products/delete/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Bulk delete selected products
  const handleBulkDelete = async (ids: number[]) => {
    if (
      !window.confirm(`Are you sure you want to delete ${ids.length} products?`)
    )
      return;

    setIsLoading(true);
    try {
      await Promise.all(
        ids.map((id) =>
          axios.delete(`http://localhost:8080/products/delete/${id}`),
        ),
      );
      setProducts((prev) =>
        prev.filter((product) => !ids.includes(product.id)),
      );
      toast.success(`${ids.length} products deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete some products");
      console.error("Error in bulk delete:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "date-newest":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        case "date-oldest":
          return (
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
          );
        default:
          return 0;
      }
    });

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category.toLowerCase())),
  ];

  return (
    <div
      ref={topRef}
      className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen py-12"
    >
      {" "}
      {/* Add ref */}
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="text-center mb-8 space-x-4">
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingProduct(null);
              scrollToTop(); // Scroll to top when adding
            }}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Add New Product"}
          </button>

          <button
            onClick={() => fetchProducts()}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            Refresh Products
          </button>
        </div>

        {(isAdding || editingProduct != null) && editingProduct != null && (
          <AddNewProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setIsAdding(false);
              setEditingProduct(null);
            }}
            isLoading={isLoading}
          />
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-blue-700">
              Product Management
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="px-4 py-2 border rounded-lg"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2 border rounded-lg"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="date-newest">Newest First</option>
                <option value="date-oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {isLoading && !isAdding && !editingProduct ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-blue-700">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <ProductTable
              products={filteredProducts}
              onEdit={setEditingProduct}
              onDelete={handleDeleteProduct}
              onBulkDelete={handleBulkDelete}
            />
          ) : (
            <p className="text-center text-gray-600 py-8">
              No products found matching your criteria.
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Products"
              value={products.length}
              icon="📦"
            />
            <StatCard
              title="Categories"
              value={categories.length - 1} // subtract "all"
              icon="🏷️"
            />
            <StatCard
              title="Filtered Products"
              value={filteredProducts.length}
              icon="🔍"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductTable({
  products,
  onEdit,
  onDelete,
  onBulkDelete,
}: {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onBulkDelete: (ids: number[]) => void;
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center">
        <span className="text-blue-700">
          {selectedIds.length} product{selectedIds.length !== 1 ? "s" : ""}{" "}
          selected
        </span>
        <button
          onClick={() => {
            onBulkDelete(selectedIds);
            setSelectedIds([]);
          }}
          className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all"
        >
          Delete Selected
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <input
                type="checkbox"
                checked={
                  selectedIds.length === products.length && products.length > 0
                }
                onChange={toggleSelectAll}
                className="h-4 w-4 text-blue-600 rounded"
              />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(product.id)}
                  onChange={() => toggleSelect(product.id)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {product.imageUrl && (
                    <div className="flex-shrink-0 h-10 w-10 relative group">
                      {/* Visible image with fallback styling */}
                      <img
                        src={`http://localhost:8080/api/products/image/${product.imageUrl}`}
                        alt={product.name}
                        className="h-10 w-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.classList.add("error");
                          e.currentTarget.style.display = "none";
                        }}
                      />

                      {/* Fallback container - shown when image errors */}
                      <div className="absolute inset-0 hidden group-has-[img.error]:flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                        <AiFillProduct className="text-gray-400 text-lg" />
                      </div>
                    </div>
                  )}{" "}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {product.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 capitalize">
                  {product.category}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.stock || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        <div>
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          <p className="text-2xl font-bold text-blue-700">{value}</p>
        </div>
      </div>
    </div>
  );
}
