import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const Searchbar = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <>
      {/* Desktop Search Input */}
      <div className="hidden sm:flex items-center relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search products..."
          className="border border-gray-300 rounded-md px-3 py-1 w-48 lg:w-64"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Mobile Search Icon */}
      <div className="sm:hidden">
        <FaSearch
          onClick={toggleSearch}
          className="text-indigo-500 cursor-pointer"
          size={24}
        />
      </div>

      {/* Mobile Search Sidebar */}
      {isSearchOpen && (
        <div className="fixed top-0 right-0 h-full w-3/4 sm:w-1/3 bg-white shadow-lg z-50 transition-transform transform translate-x-0">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Search</h2>
            <button
              onClick={toggleSearch}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-4">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search products..."
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
      )}

      {/* Backdrop to close sidebar */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleSearch}
        ></div>
      )}
    </>
  );
};

export default Searchbar;
