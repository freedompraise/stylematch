const ProductDetailModal = ({ product = {}, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover mb-4"
        />
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-gray-800 mb-2">Price: NGN {product.price}</p>
        <button
          onClick={() =>
            window.open(`https://wa.me/${product.vendor.phone}`, "_blank")
          }
          className="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-indigo-500 hover:text-white mr-2"
        >
          Order Now
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
