import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

const Navbar = ({ logo, cartItems }) => {
  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        <Link href="/">
          <span className="text-xl md:text-2xl font-bold text-indigo-500 cursor-pointer">
            {logo}
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-3 py-1"
            />
            <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Link href="/cart">
            <span className="relative cursor-pointer">
              <FaShoppingCart size={24} className="text-indigo-500" />
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
