import Navbar from "@/Buyers/Navbar";
import Footer from "@/Buyers/Footer";

const BuyerLayout = ({ children }) => {
  return (
    <>
      <Navbar logo="StyleMatch" cartItems={0} />
      {children}
      <Footer />
    </>
  );
};

export default BuyerLayout;
