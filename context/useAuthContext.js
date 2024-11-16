import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie, hasCookie, getCookie, deleteCookie } from "cookies-next";
import { loginVendor, logoutVendor } from "../utils/supabaseAuth";
import CustomToast from "@/CustomToast";

const AuthContext = createContext({
  vendor: null,
  isLoading: false,
  error: null,
  saveSession: async () => {},
  removeSession: async () => {},
});

let vendorCache = null;

const AuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const excludePaths = ["/auth", "", "/"];

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      if (!excludePaths.includes(router.pathname)) {
        if (hasCookie("vendor_session")) {
          const sessionData = JSON.parse(getCookie("vendor_session"));

          if (sessionData?.email && sessionData?.password) {
            const { vendor, error: vendorError } = await loginVendor(
              sessionData.email,
              sessionData.password
            );

            if (vendorError) {
              console.error(
                "Error fetching vendor data:",
                vendorError?.message
              );
              setError(vendorError);
            } else {
              setVendor(vendor);
              vendorCache = vendor;
            }
          }
        } else if (!hasCookie("vendor_session")) {
          router.push("/auth");
        }
      }
      setIsLoading(false);
    };

    initialize();
  }, [router]);

  const saveSession = async (email, password) => {
    setIsLoading(true);

    if (vendorCache) {
      setVendor(vendorCache);
      setIsLoading(false);
      return { vendor: vendorCache, error: null };
    }

    const { vendor, error } = await loginVendor(email, password);
    setIsLoading(false);

    if (error) {
      setError(error);
      return { vendor: null, error };
    }

    setVendor(vendor);
    vendorCache = vendor;
    setCookie("vendor_session", JSON.stringify({ email, password }));
    return { vendor, error: null };
  };

  const removeSession = async () => {
    const { error } = await logoutVendor();
    if (error) {
      console.error("Error signing out:", error.message);
      setError(error);
      return;
    }

    setVendor(null);
    deleteCookie("vendor_session");
    vendorCache = null;
    router.push("/auth");
  };

  const value = {
    vendor,
    isLoading,
    error,
    saveSession,
    removeSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
