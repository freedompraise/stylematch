import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "context/ThemeContext";

const Sidebar = () => {
  const { sideNavMode, toggleSideNavMode } = useThemeContext();

  return (
    <div
      className={`fixed top-0 left-0 w-64 bg-white h-screen z-30 transition-transform transform ${
        sideNavMode === "sm" ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="p-4 bg-blue-500 flex justify-between">
        <h2 className="text-white text-2xl font-bold">StyleMatch</h2>
        <button className="lg:hidden text-white" onClick={toggleSideNavMode}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <ul className="space-y-2 pt-4">
        <li>
          <Link
            href="/vendor/dashboard"
            className="block py-2 px-4 hover:bg-blue-100"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/vendor/products"
            className="block py-2 px-4 hover:bg-blue-100"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/vendor/orders"
            className="block py-2 px-4 hover:bg-blue-100"
          >
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
