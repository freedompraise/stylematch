import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faShoppingCart,
  faTimes,
  faSignOut,
  faLink,
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          <Link href="/vendor/dashboard">Dashboard</Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <Link href="/vendor/profile">Profile</Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faProductHunt} className="mr-2" />
          <Link href="/vendor/products">Products</Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white p-2">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          <Link href="/comingSoon">Orders</Link>
        </li>
        <li
          onClick={copyVendorLink}
          className="hover:bg-blue-600 hover:text-white p-2 cursor-pointer"
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
