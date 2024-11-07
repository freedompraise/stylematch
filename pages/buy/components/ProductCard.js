const ProductCard = ({ product = {}, onViewDetails }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-40 object-cover mb-3"
      />
      <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-600 mb-2">Price: NGN {product.price}</p>
      <button
        onClick={() => onViewDetails(product)}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
