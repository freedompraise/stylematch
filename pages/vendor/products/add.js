import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { createProduct, categories, colors, sizes } from "@/api/product";
import ImageUploader from "@/FileUploader/ImageUploader";
import { ArrowBack } from "@mui/icons-material";
import { useAuth } from "context/useAuthContext";
import { uploadImageToCloudinary } from "@/cloudinary";

const AddProduct = () => {
  const { vendor } = useAuth();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: null,
    stock_quantity: null,
    vendor_id: null,
    image_url: "",
    category: "",
    color: "",
    size: "",
    discount_price: null,
    discount_start: null,
    discount_end: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (vendor) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        vendor_id: vendor.id,
      }));
    }
  }, [vendor]);

  const [isDiscountChecked, setIsDiscountChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case "price":
      case "discount_price":
        return value && !isNaN(value) ? parseFloat(value) : null;
      case "stock_quantity":
        return value && Number.isInteger(parseInt(value))
          ? parseInt(value)
          : null;
      case "discount_start":
      case "discount_end":
        return value || null;
      default:
        return value;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };

  const handleBack = () => {
    router.push("/vendor/products");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    let updatedProduct = { ...product };

    if (!updatedProduct.price || isNaN(updatedProduct.price)) {
      isValid = false;
      toast.error("Price must be a number");
    }

    if (
      !updatedProduct.stock_quantity ||
      isNaN(updatedProduct.stock_quantity)
    ) {
      isValid = false;
      toast.error("Stock quantity must be a number");
    }

    if (isValid) {
      if (selectedImage) {
        const imageUrl = await uploadImageToCloudinary(selectedImage);
        updatedProduct.image_url = imageUrl;
      }

      await createProduct(updatedProduct);
      toast.success("Product added successfully!");
      router.push("/vendor/products");
    } else {
      toast.error("Error adding product. Please try again.");
      console.error("Error adding product");
    }
  };

  return (
    <div className="mx-auto bg-gray-100 p-6 rounded-md shadow-md">
      {!vendor ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            You need to be logged in to add a product
          </h2>
          <button
            onClick={() => router.push("/auth")}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      ) : (
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

              {/* Color */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Color
                </label>
                <select
                  type="text"
                  name="color"
                  value={product.color}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Color</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-semibold mb-1">Size</label>
                <select
                  type="text"
                  name="size"
                  value={product.size}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
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
              <ImageUploader onImageSelect={handleImageSelect} />
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
      )}
    </div>
  );
};

export default AddProduct;
