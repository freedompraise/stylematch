import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { createProduct, categories, variants } from "@/api/product";
import ImageUploader from "@/FileUploader/ImageUploader";
import { ArrowBack } from "@mui/icons-material";
import { useAuth } from "context/useAuthContext";

const AddProduct = () => {
  const { vendor } = useAuth();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    vendor_id: vendor.id,
    image_url: "",
    category: "",
    variants: "",
    discount_price: "",
    discount_start: "",
    discount_end: "",
  });
  const router = useRouter();

  const [isDiscountChecked, setIsDiscountChecked] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl) => {
    setProduct((prev) => ({ ...prev, image_url: imageUrl }));
  };

  const handleImageRemove = () => {
    setProduct((prev) => ({ ...prev, image_url: "" }));
  };

  const handleBack = () => {
    router.push("/vendor/products");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(product);
      toast.success("Product added successfully!");
      router.push("/vendor/products");
    } catch (error) {
      toast.error("Error adding product. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto bg-gray-100 p-6 rounded-md shadow-md">
      <div className="items-center lg:p-12 sm:p-4 justify-between mb-4">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowBack />
          <span className="ml-2">Go Back</span>
        </button>
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Variants */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Variants
              </label>
              <select
                name="variants"
                value={product.variants}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Variant(s)</option>
                {variants.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          {/* Price and Stock Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Price (NGN)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock_quantity"
                value={product.stock_quantity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter stock quantity"
                required
              />
            </div>
          </div>

          {/* Discount Fields */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isDiscountChecked}
                onChange={(e) => setIsDiscountChecked(e.target.checked)}
              />
              <span className="ml-2">Apply Discount</span>
            </label>

            {isDiscountChecked && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Discount Price (NGN)
                  </label>
                  <input
                    type="number"
                    name="discount_price"
                    value={product.discount_price}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter discount price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Discount Start
                  </label>
                  <input
                    type="date"
                    name="discount_start"
                    value={product.discount_start}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Discount End
                  </label>
                  <input
                    type="date"
                    name="discount_end"
                    value={product.discount_end}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Product Image
            </label>
            <ImageUploader
              onImageUpload={(url) => {
                handleImageUpload(url);
                setImagePreview(url);
              }}
            />

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover mb-2"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
