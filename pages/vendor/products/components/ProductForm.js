import { useState } from "react";
import { categories, colors, sizes } from "@/api/product";
import DiscountSection from "./DiscountSection";
import ImageUploader from "@/FileUploader/ImageUploader";
import LoadingButton from "@/LoadingButton";

const ProductForm = ({
  product = {},
  setProduct,
  handleSubmit,
  handleImageSelect,
  isDiscountChecked,
  setIsDiscountChecked,
}) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Product name is required.";
        break;
      case "category":
        if (!value) error = "Category is required.";
        break;
      case "description":
        if (!value) error = "Description is required.";
        break;
      case "price":
        if (!value || isNaN(value)) error = "Valid price is required.";
        break;
      case "stock_quantity":
        if (!value || isNaN(value) || parseInt(value) < 0) {
          error = "Stock quantity must be a non-negative number.";
        }
        break;
      case "discount_price":
        if (isDiscountChecked && (!value || isNaN(value))) {
          error = "Valid discount price is required.";
        }
        break;
      case "discount_start":
      case "discount_end":
        if (isDiscountChecked && !value) {
          error = "Discount dates are required.";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error ? null : value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validValue = validateField(name, value);
    if (validValue !== null) {
      setProduct((prev) => ({ ...prev, [name]: validValue }));
    }
  };

  return (
    <form className="items-center lg:p-12 sm:p-4 justify-between mb-4">
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
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
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
          {errors.category && (
            <p className="text-red-500 text-xs">{errors.category}</p>
          )}
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-semibold mb-1">Color</label>
          <select
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
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description}</p>
        )}
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
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price}</p>
          )}
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
          {errors.stock_quantity && (
            <p className="text-red-500 text-xs">{errors.stock_quantity}</p>
          )}
        </div>
      </div>

      {/* Discount Section */}
      <DiscountSection
        isDiscountChecked={isDiscountChecked}
        setIsDiscountChecked={setIsDiscountChecked}
        product={product}
        handleChange={handleChange}
        errors={errors}
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
        <LoadingButton onClick={handleSubmit} label="Save Product" />
      </div>
    </form>
  );
};

export default ProductForm;
