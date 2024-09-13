import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-6">
          <Link href="/" className="text-2xl font-bold text-white">
            StyleMatch
          </Link>
        </div>
        <ul className="flex space-x-6 mb-6">
          <li>
            <Link href="/features" className="hover:text-gray-400">
              Features
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-gray-400">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/testimonials" className="hover:text-gray-400">
              Testimonials
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-400">
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="text-gray-400">
          &copy; {new Date().getFullYear()} StyleMatch. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
