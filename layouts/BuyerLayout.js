import Navbar from "@/Buyers/Navbar";
import Footer from "@/Buyers/Footer";
import React, { useState } from "react";

const BuyerLayout = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <Navbar logo="StyleMatch" cartItems={0} onSearch={handleSearch} />

      {React.cloneElement(children, { searchQuery })}

      <Footer />
    </>
  );
};

export default BuyerLayout;
