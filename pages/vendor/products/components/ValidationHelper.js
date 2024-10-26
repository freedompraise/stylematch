export const validateField = (name, value) => {
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
