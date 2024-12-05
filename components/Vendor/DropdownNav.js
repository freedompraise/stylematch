import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faShoppingCart,
  faTimes,
  faSignOut,
  faLink,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useAuth } from "context/useAuthContext";
import CustomToast from "@/CustomToast";
import { useRef, useEffect } from "react";

const DropdownNav = ({ closeDropdown }) => {
  const { vendor, removeSession } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await removeSession();
    router.push("/auth");
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      closeDropdown();
    }
  };

  const handleClickInside = (e) => {
    if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("click", handleClickInside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleClickInside);
    };
  }, []);

  const copyVendorLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/buy/${vendor?.company_name}`
    );
    CustomToast.success("Vendor Link copied to clipboard");
  };

  return (
    <div
      ref={dropdownRef}
      className="fixed top-0 left-0 h-full lg:w-80 w-64 bg-white text-black z-50"
    >
      <div className="flex justify-end p-4">
        <button onClick={closeDropdown}>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-3xl hover:text-gray-300"
          />
        </button>
      </div>
      <ul className="space-y-4 px-6">
        <li className="hover:bg-blue-600 hover:text-white">
          <Link href="/vendor" className="flex items-center w-full p-2 block">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white">
          <Link
            href="/vendor/profile"
            className="flex items-center w-full p-2 block"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white">
          <Link
            href="/vendor/products"
            className="flex items-center w-full p-2 block"
          >
            <FontAwesomeIcon icon={faProductHunt} className="mr-2" />
            Products
          </Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white">
          <Link
            href="/vendor/orders"
            className="flex items-center w-full p-2 block"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Orders
          </Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white">
          <Link
            href="/vendor/settings"
            className="flex items-center w-full p-2 block"
          >
            <FontAwesomeIcon icon={faGear} className="mr-2" />
            Settings
          </Link>
        </li>
        <li
          onClick={copyVendorLink}
          className="hover:bg-blue-600 hover:text-white cursor-pointer flex items-center w-full p-2"
        >
          <FontAwesomeIcon icon={faLink} className="mr-2" />
          Copy Link
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
