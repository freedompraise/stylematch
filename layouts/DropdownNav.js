import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faShoppingCart,
  faTimes,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useAuth } from "context/useAuthContext";

const DropdownNav = ({ closeDropdown }) => {
  const { removeSession } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await removeSession();
    router.push("/auth");
  };

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
          <Link href="dashboard">Dashboard</Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <Link href="/comingSoon">Profile</Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faProductHunt} className="mr-2" />
          <Link href="/vendor/products">Products</Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          <Link href="/comingSoon">Orders</Link>
        </li>
      </ul>
      <div className="flex justify-center p-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          <FontAwesomeIcon icon={faSignOut} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DropdownNav;
