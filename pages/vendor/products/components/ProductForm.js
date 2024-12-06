import { categories, colors, sizesByCategory } from "@/api/product";
import DiscountSection from "./DiscountSection";
import ImageUploader from "@/FileUploader/ImageUploader";
import LoadingButton from "@/LoadingButton";
import CustomToast from "@/CustomToast";

const ProductForm = ({
  product = {},
  setProduct,
  handleSubmit,
  handleImageSelect,
  isDiscountChecked,
  setIsDiscountChecked,
}) => {
  const validateForm = () => {
    const errors = [];

    if (!product.name) errors.push("Name is required");
    if (!product.category) errors.push("Category is required");
    if (!product.color) errors.push("Color is required");
    if (!product.size) errors.push("Size is required");
    if (!product.description) errors.push("Description is required");
    if (!product.price) errors.push("Price is required");
    if (!product.stock_quantity) errors.push("Stock Quantity is required");

    if (isDiscountChecked) {
      if (!product.discount_price) errors.push("Discount Price is required");
      if (!product.discount_start_date)
        errors.push("Discount Start Date is required");
      if (!product.discount_end_date)
        errors.push("Discount End Date is required");
    }

    if (errors.length) {
      CustomToast.error(errors.join(", "));
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    if (validateForm()) {
      handleSubmit();
    }

    return false;
  };

  const getSizesByCategory = (category) => {
    return sizesByCategory[category?.toLowerCase()] || [];
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
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select
            name="category"
            value={product.category || ""}
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
            name="color"
            value={product.color || ""}
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
            value={product.size || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!product.category}
          >
            <option value="">Select Size</option>
            {product.category &&
              getSizesByCategory(product.category).map((size) => (
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
          value={product.description || ""}
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
        <LoadingButton onClick={handleFormSubmit} label="Save Product" />
      </div>
    </form>
  );
};

export default ProductForm;
