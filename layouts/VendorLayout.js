import { useState } from "react";
import TopNavbar from "./TopNavbar";
import DropdownNav from "./DropdownNav";

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
    </div>
  );
};

export default VendorLayout;
