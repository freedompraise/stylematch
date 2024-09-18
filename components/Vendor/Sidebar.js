import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
        <li>
          <Link href="/orders">Orders</Link>
        </li>
        <li>
          <Link href="/delivery">Delivery Options</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
