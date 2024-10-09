import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const DropdownNav = ({ closeDropdown }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-1/4 bg-blue-900 text-white z-40 flex flex-col justify-center"
      onClick={closeDropdown}
    >
      <ul className="space-y-4 px-6">
        <li className="hover:bg-blue-700 p-2">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Dashboard
        </li>
        <li className="hover:bg-blue-700 p-2">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Profile
        </li>
        <li className="hover:bg-blue-700 p-2">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Orders
        </li>
      </ul>
    </div>
  );
};

export default DropdownNav;
