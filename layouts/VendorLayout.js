import Navbar from "../components/Vendor/Navbar";
import Sidebar from "../components/Vendor/Sidebar";

const VendorLayout = ({ children }) => {
  const vendorName = "Vendor Name";

  return (
    <div
      className="flex 
        flex-col 
        h-screen 
        bg-gray-100"
    >
      <Navbar vendorName={vendorName} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default VendorLayout;
