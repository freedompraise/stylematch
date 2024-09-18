import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import Navbar from "../components/LandingPage/Navbar";
import Footer from "../components/LandingPage/Footer";
import VendorLayout from "../layouts/VendorLayout";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
  const router = useRouter();
  const isVendorPage = router.pathname.startsWith("/vendor");

  return (
    <>
      <Head>
        <title>StyleMatch</title>
        <meta
          name="description"
          content="Grow your fashion business, one sale at a time"
        />
        <link rel="shortcut icon" href="/favicon.jpg" />
      </Head>

      {isVendorPage ? (
        <VendorLayout>
          <Component {...pageProps} />
        </VendorLayout>
      ) : (
        <>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
