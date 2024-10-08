import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const TopNavbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 fixed w-full top-0 left-0 z-10 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-500">Vendor Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Link
          href="/profile"
          className="text-gray-700 hover:text-blue-500 flex items-center"
        >
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
          <span className="ml-2">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
