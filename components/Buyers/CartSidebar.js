import { FaTimes } from "react-icons/fa";

const CartSidebar = ({ isOpen, toggleCart, cartItems }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-40`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button
          onClick={toggleCart}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-gray-500 text-xs">
                  {item.quantity} x ${item.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={toggleCart}
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition"
        >
          {cartItems.length > 0 ? "Checkout" : "Go Shopping"}
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
