import { useState } from "react";
import Navbar from "../components/Vendor/Navbar";
import Sidebar from "../components/Vendor/Sidebar";

const VendorLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col w-full">
        <Navbar vendorName="John Doe" />
        <main className="p-4 h-full mt-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default VendorLayout;
