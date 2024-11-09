import { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        <Link href="/">
          <span className="text-xl md:text-2xl font-bold text-indigo-500 cursor-pointer">
            StyleMatch
          </span>
        </Link>

        <button
          className="text-indigo-500 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={24} />
        </button>

        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 space-y-4 md:space-y-0 absolute md:relative top-full left-0 md:top-auto md:left-auto bg-white md:bg-transparent w-full md:w-auto shadow-md md:shadow-none p-4 md:p-0`}
        >
          <Link href="/#features">
            <span className="block md:inline-block text-gray-600 hover:text-indigo-500 cursor-pointer">
              Features
            </span>
          </Link>
          <Link href="/#pricing">
            <span className="block md:inline-block text-gray-600 hover:text-indigo-500 cursor-pointer">
              Pricing
            </span>
          </Link>
          <Link href="/#testimonials">
            <span className="block md:inline-block text-gray-600 hover:text-indigo-500 cursor-pointer">
              Testimonials
            </span>
          </Link>
          <Link href="/auth">
            <button className="w-full md:w-auto px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600">
              Sign Up
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
