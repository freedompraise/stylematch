import { useThemeContext } from "../context/ThemeContext";
import { useViewPort } from "hooks/useViewPort";
import TopNavbar from "./TopNavbar";
import LeftSidebar from "./LeftSidebar";
import Footer from "./Footer";

const VendorLayout = ({ children }) => {
  const { width } = useViewPort();
  const { sideNavMode } = useThemeContext();

  return (
    <div className="flex">
      <LeftSidebar />
      <div
        className={`${
          sideNavMode === "sm" && width < 1024
            ? "translate-x-0"
            : "-translate-x-64"
        } transform transition-transform duration-300 ease-in-out`}
      >
        <div className="w-full">
          <TopNavbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
