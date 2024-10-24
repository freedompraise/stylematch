import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faShoppingCart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const DropdownNav = ({ closeDropdown }) => {
  return (
    <div className="fixed top-0 left-0 h-full lg:w-80 w-64 bg-white text-black z-50">
      <div className="flex justify-end p-4">
        <button onClick={closeDropdown}>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-3xl hover:text-gray-300"
          />
        </button>
      </div>
      <ul className="space-y-4 px-6">
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Dashboard
        </li>
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Profile
        </li>
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faProductHunt} className="mr-2" />
          <Link href="/vendor/products">Products</Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Orders
        </li>
      </ul>
    </div>
  );
};

export default DropdownNav;
