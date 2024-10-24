import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { setCookie, hasCookie, deleteCookie, getCookie } from "cookies-next";
import { getSession, loginVendor } from "../utils/supabaseAuth";

const AuthContext = createContext({
  user: null,
  vendor: null,
  session: null,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);

      if (hasCookie("vendor_session")) {
        const userData = JSON.parse(getCookie("vendor_session"));
        setUser(userData);

        const sessionData = await getSession();
        setSession(sessionData);

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

  const login = async (email, password) => {
    setIsLoading(true);
    const { user, vendor, error } = await loginVendor(email, password);
    setIsLoading(false);

    if (error) {
      setError(error);
      return;
    }

    setUser(user);
    setVendor(vendor);
    setSession(await getSession());

    // Set a cookie for client-side session management
    setCookie("vendor_session", JSON.stringify(user), { expires: 2 });

    toast.success("Login successful!");
    // Redirect to vendor profile or desired location
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      setError(error);
      return;
    }

    setUser(null);
    setVendor(null);
    setSession(null);
    deleteCookie("vendor_session");

    toast.success("Logged out successfully!");
  };

  const value = {
    user,
    vendor,
    session,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
