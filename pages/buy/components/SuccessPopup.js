const SuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600">Order Successful!</h2>
        <p className="mt-2 text-gray-700">
          Thank you for your order. The vendor will contact you shortly.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
