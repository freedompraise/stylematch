import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "tailwindcss/tailwind.css";
import Head from "next/head";
import VendorLayout from "../layouts/VendorLayout";
import LandingPageLayout from "../layouts/LandingPageLayout";
import { useRouter } from "next/router";
import { Toaster } from "sonner";
import AuthProvider from "context/useAuthContext";

function App({ Component, pageProps }) {
  const router = useRouter();
  const isVendorPage = router.pathname.startsWith("/vendor");
  const isLandingPage = router.pathname === "/";

  return (
    <>
      <AuthProvider>
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
        ) : isLandingPage ? (
          <LandingPageLayout>
            <Component {...pageProps} />
          </LandingPageLayout>
        ) : (
          <Component {...pageProps} />
        )}
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
