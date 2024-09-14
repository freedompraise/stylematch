// components/VendorNavbar.js
import Link from "next/link";

const VendorNavbar = ({ vendor }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href={`/${vendor.subdomain}/catalog`}>Catalog</Link>
        </li>
        <li>
          <Link href={`/${vendor.subdomain}/orders`}>Orders</Link>
        </li>
        <li>
          <Link href={`/${vendor.subdomain}/delivery-options`}>
            Delivery Options
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default VendorNavbar;
