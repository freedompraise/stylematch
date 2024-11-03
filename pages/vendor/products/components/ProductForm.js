import { categories, colors, sizes } from "@/api/product";
import DiscountSection from "./DiscountSection";
import ImageUploader from "@/FileUploader/ImageUploader";

const ProductForm = ({
  product = {},
  setProduct,
  handleSubmit,
  handleImageSelect,
  isDiscountChecked,
  setIsDiscountChecked,
}) => {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center lg:p-12 sm:p-4 justify-between mb-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={product.name || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
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
          <label className="block text-sm font-semibold mb-1">Color</label>
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
        <label className="block text-sm font-semibold mb-1">Description</label>
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
            value={product.price || ""}
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
            value={product.stock_quantity || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter stock quantity"
            required
          />
        </div>
      </div>

      {/* Discount Section */}
      <DiscountSection
        isDiscountChecked={isDiscountChecked}
        setIsDiscountChecked={setIsDiscountChecked}
        product={product}
        handleChange={handleChange}
      />

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Product Image
        </label>
        <ImageUploader
          onImageSelect={handleImageSelect}
          existingImageUrl={product.image_url || ""}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          {product.id ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
