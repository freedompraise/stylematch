import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>StyleMatch</title>
      </Head>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {
            // Navbar
            <Navbar />
          }
          <Component {...pageProps} />

          {
            // Footer
            <Footer />
          }
        </div>
      </div>
    </>
  );
}

export default App;
