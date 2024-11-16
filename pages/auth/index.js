import { useState } from "react";
import { signUpVendor } from "../../utils/supabaseAuth";
import { useAuth } from "context/useAuthContext";
import { useRouter } from "next/router";
import CustomToast from "@/CustomToast";
import LoadingButton from "@/LoadingButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const { saveSession } = useAuth();
  const router = useRouter();

  const togglePane = () => setIsLogin(!isLogin);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Frontend signup logic
  const handleSignUp = async () => {
    if (!name || !companyName) {
      CustomToast.error("Name and Company Name are required.");
      return;
    }

    const { data, error } = await signUpVendor(
      name,
      email,
      companyName,
      password
    );

    if (error) {
      CustomToast.error("Error signing up");
      return;
    }

    CustomToast.success("Please check your email to confirm your account");
    router.push("/auth/confirm-email");
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      CustomToast.error("Email and password are required for login!");
      return;
    }

    const { vendor, error } = await saveSession(email, password);

    if (error) {
      CustomToast.error(error.message);
      return;
    }

    if (vendor) {
      CustomToast.success("Logged in successfully");
      router.push(`/vendor/dashboard`);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? "Vendor Login" : "Vendor Signup"}
        </h1>

        <input
          type="email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute right-4 top-4"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {!isLogin && (
          <>
            <input
              type="text"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => {
                const value = e.target.value;
                const urlSafeValue = value.replace(/[^a-zA-Z0-9-_]/g, "");
                setCompanyName(urlSafeValue);
              }}
            />
          </>
        )}

        <LoadingButton
          onClick={isLogin ? handleLogin : handleSignUp}
          label={isLogin ? "Login" : "Sign Up"}
          className="w-full p-3 mb-4 rounded-md hover:bg-blue-600"
        />
        <p
          className="mt-4 text-center text-blue-500 cursor-pointer underline"
          onClick={togglePane}
        >
          {isLogin ? "Create an account" : "Login to your account"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
