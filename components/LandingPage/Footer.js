import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-bold">StyleMatch</h3>
          <p className="text-sm text-blue-300 mt-2 leading-6">
            Transforming local businesses into credible online stores with ease
            and efficiency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-blue-300 hover:text-white transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="text-blue-300 hover:text-white transition"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-blue-300 hover:text-white transition"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className="text-blue-300 hover:text-white transition"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-blue-300 hover:text-white transition"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-blue-300 text-sm">
            Email:{" "}
            <Link
              href="mailto:support@stylematch.com"
              className="hover:text-white"
            >
              marketmatch@gmail.com
            </Link>
          </p>
          <p className="text-blue-300 text-sm mt-2">
            Phone:{" "}
            <Link href="tel:+2349074577147" className="hover:text-white">
              +234 907 457 7147
            </Link>
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="https://x.com/freedom_praise"
              className="text-blue-300 hover:text-white transition"
            >
              Twitter
            </Link>
            <Link
              href="https://www.instagram.com/stylematchhub/"
              className="text-blue-300 hover:text-white transition"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-blue-400 text-sm mt-10 border-t border-blue-800 pt-4">
        © {new Date().getFullYear()} StyleMatch. All rights reserved. |
        <Link href="/terms" className="ml-2 hover:text-white">
          Terms of Service
        </Link>{" "}
        |
        <Link href="/privacy" className="ml-2 hover:text-white">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
