import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const LeftSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 bg-blue-500 shadow-lg z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 bg-blue-600 text-white">
          <h2 className="text-2xl font-bold">StyleMatch</h2>
        </div>

        <button
          onClick={toggleSidebar}
          className="md:hidden text-white absolute top-6 right-5"
        >
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>

        <ul className="space-y-2 pt-4">
          <li>
            <Link
              href="/vendor/[company_name]/dashboard"
              className="block py-2 px-4 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="block py-2 px-4 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              className="block py-2 px-4 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/delivery"
              className="block py-2 px-4 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Delivery Options
            </Link>
          </li>
        </ul>
      </div>

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed z-20 top-6 left-4 text-blue-500 md:hidden"
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      )}
    </>
  );
};

export default LeftSidebar;
