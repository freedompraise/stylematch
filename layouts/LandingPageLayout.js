import Navbar from "../components/LandingPage/Navbar";
import Footer from "../components/LandingPage/Footer";

const LandingPageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default LandingPageLayout;
