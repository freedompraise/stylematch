const Navbar = ({ vendorName }) => {
  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 right-0 left-64 z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-500">Vendor Dashboard</h1>
        <span className="text-gray-600">
          Welcome,{" "}
          <span className="font-semibold text-blue-500">{vendorName}</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
