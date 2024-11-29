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
              <a href="/" className="text-blue-300 hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a
                href="/features"
                className="text-blue-300 hover:text-white transition"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                className="text-blue-300 hover:text-white transition"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/testimonials"
                className="text-blue-300 hover:text-white transition"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-blue-300 hover:text-white transition"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-blue-300 text-sm">
            Email:{" "}
            <a
              href="mailto:support@stylematch.com"
              className="hover:text-white"
            >
              marketmatch@gmail.com
            </a>
          </p>
          <p className="text-blue-300 text-sm mt-2">
            Phone:{" "}
            <a href="tel:+2349074577147" className="hover:text-white">
              +234 907 457 7147
            </a>
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://x.com/freedom_praise"
              className="text-blue-300 hover:text-white transition"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/stylematchhub/"
              className="text-blue-300 hover:text-white transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-blue-400 text-sm mt-10 border-t border-blue-800 pt-4">
        © {new Date().getFullYear()} StyleMatch. All rights reserved. |
        <a href="/terms" className="ml-2 hover:text-white">
          Terms of Service
        </a>{" "}
        |
        <a href="/privacy" className="ml-2 hover:text-white">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
