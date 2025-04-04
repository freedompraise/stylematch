import { useState } from "react";
import TopNavbar from "../components/Vendor/TopNavbar";
import DropdownNav from "../components/Vendor/DropdownNav";
import Footer from "../components/Vendor/Footer";

const VendorLayout = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <TopNavbar toggleDropdown={toggleDropdown} />

      {/* Dropdown Navigation */}
      {isDropdownOpen && <DropdownNav closeDropdown={closeDropdown} />}

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorLayout;
