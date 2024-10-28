const DiscountSection = ({
  isDiscountChecked,
  setIsDiscountChecked,
  product,
  handleChange,
}) => {
  return (
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

          {/* Discount Start and End Date */}
          {/* Similarly structure date fields */}
        </div>
      )}
    </div>
  );
};

export default DiscountSection;
