import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-screen fixed left-0 top-0">
      <div className="p-4 bg-blue-500">
        <h2 className="text-white text-2xl font-bold">StyleMatch</h2>
      </div>
      <ul className="space-y-2 pt-4">
        <li>
          <Link
            href="/dashboard"
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
            href="/settings"
            className="block py-2 px-4 font-mono text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
          >
            Settings
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
  );
};

export default Sidebar;
