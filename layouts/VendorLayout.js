import { useThemeContext } from "../context/ThemeContext";
import { useViewPort } from "hooks/useViewPort";
import TopNavbar from "./TopNavbar";
import LeftSidebar from "./LeftSidebar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const VendorLayout = ({ children }) => {
  const { width } = useViewPort();
  const { sideNavMode, toggleSideNavMode } = useThemeContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (width <= 1024) {
      toggleSideNavMode("sm");
    } else {
      toggleSideNavMode("default");
      setSidebarOpen(false);
    }
  }, [width, toggleSideNavMode]);

  return (
    <div className="flex min-h-screen">
      <LeftSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-grow ${
          sidebarOpen && width <= 1024 ? "opacity-50" : ""
        } transition-all duration-300`}
      >
        <TopNavbar toggleSidebar={toggleSidebar} />
        <main className="p-4">{children}</main>
      </div>
      {width <= 1024 && (
        <button
          onClick={toggleSidebar}
          className="fixed top-6 left-4 text-blue-500 z-20"
        >
          {sidebarOpen ? "Close" : "Open"}
        </button>
      )}
    </div>
  );
};

export default VendorLayout;
