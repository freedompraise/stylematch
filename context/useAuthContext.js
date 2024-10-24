import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { setCookie, hasCookie, deleteCookie } from "cookies-next";
import { getSession, loginVendor } from "../utils/supabaseAuth";
import { supabase } from "../utils/supabaseClient";

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

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      if (hasCookie("vendor_session")) {
        const sessionData = await getSession();

        if (sessionData?.user) {
          const { user: vendorData, error: vendorError } = await loginVendor(
            sessionData.user.email
          );

          if (vendorError) {
            console.error("Error fetching vendor data:", vendorError?.message);
            setError(vendorError);
          } else {
            setVendor(vendorData);
          }
        }
      }
      setIsLoading(false);
    };

    initialize();
  }, []);

  const saveSession = async (email, password) => {
    setIsLoading(true);
    const { vendor, error } = await loginVendor(email, password);
    setIsLoading(false);

    if (error) {
      setError(error);
      return;
    }

    setVendor(vendor);

    // Set a cookie for client-side session management
    setCookie("vendor_session", JSON.stringify(vendor), { expires: 2 });

    toast.success("Login successful!");
  };

  const removeSession = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      setError(error);
      return;
    }

    setVendor(null);
    deleteCookie("vendor_session");

    toast.success("Logged out successfully!");
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
