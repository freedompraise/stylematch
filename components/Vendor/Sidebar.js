import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Hamburger Menu (visible only on mobile) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md z-40 transform transition-transform duration-200 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 bg-blue-600">
          <h2 className="text-white text-2xl font-bold">StyleMatch</h2>
        </div>

        {/* Close Button on Mobile */}
        {isOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-6 right-5 text-gray-600 focus:outline-none md:hidden"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        )}

        <ul className="space-y-2 pt-4">
          <li>
            <Link
              href="/vendor/[company_name]/dashboard"
              className="block py-2 px-4 font-mono text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="block py-2 px-4 font-mono text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              className="block py-2 px-4 font-mono text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/delivery"
              className="block py-2 px-4 font-mono text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
            >
              Delivery Options
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
