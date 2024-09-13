import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/">
          <span className="text-2xl font-bold text-indigo-500">StyleMatch</span>
        </Link>

        <nav className="space-x-4">
          <Link href="/features">
            <span className="text-gray-600 hover:text-indigo-500">
              Features
            </span>
          </Link>
          <Link href="/#pricing">
            <span className="text-gray-600 hover:text-indigo-500">Pricing</span>
          </Link>
          <Link href="/#testimonials">
            <span className="text-gray-600 hover:text-indigo-500">
              Testimonials
            </span>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600">
              Sign Up
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
