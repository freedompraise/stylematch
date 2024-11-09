import { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

const ChatPopup = ({ vendorPhoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-indigo-500 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <FaCommentDots size={24} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Contact Options</h2>
            <button
              onClick={() =>
                window.open(`https://wa.me/234${vendorPhoneNumber}`, "_blank")
              }
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full mb-2"
            >
              Contact Seller
            </button>
            <button
              onClick={() =>
                window.open("https://wa.me/2349074577147", "_blank")
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            >
              Contact StyleMatch Support
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPopup;
