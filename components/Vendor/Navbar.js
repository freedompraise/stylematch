const Navbar = ({ vendorName }) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Vendor Dashboard</h1>
        <span>Welcome, {vendorName}</span>
      </div>
    </nav>
  );
};

export default Navbar;
