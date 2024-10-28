import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { setCookie, hasCookie, getCookie, deleteCookie } from "cookies-next";
import { loginVendor, logoutVendor } from "../utils/supabaseAuth";

const AuthContext = createContext({
  vendor: null,
  isLoading: false,
  error: null,
  saveSession: async () => {},
  removeSession: async () => {},
});

const AuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      if (router.pathname !== "/auth") {
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
            }
          }
        } else {
          router.push("/auth");
        }
      }
      setIsLoading(false);
    };

    initialize();
  }, [router]);

  const saveSession = async (email, password) => {
    setIsLoading(true);
    const { vendor, error } = await loginVendor(email, password);
    setIsLoading(false);

    if (error) {
      setError(error);
      return { data: null, error };
    }

    setVendor(vendor);
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
    toast.success("Logged out successfully!");
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
