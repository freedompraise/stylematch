import { useState } from "react";
import { signUpVendor, loginVendor } from "../../utils/supabaseAuth";
import { toast } from "sonner";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const togglePane = () => setIsLogin(!isLogin);

  const handleSignUp = async () => {
    const { data, error } = await signUpVendor(
      name,
      email,
      password,
      companyName
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("Signup successful! Please confirm your email.");
      window.location.href = "/auth/confirm-email";
    }
  };

  const handleLogin = async () => {
    const { data, error } = await loginVendor(email, password);
    if (error) {
      toast.error("Login error: " + error.message);
      return;
    }

    if (data.user) {
      const { data: vendorData, error: vendorError } = await supabase
        .from("vendors")
        .select("company_name")
        .eq("user_id", data.user.id);

      if (vendorError) {
        toast.error("Error fetching vendor data: " + vendorError.message);
      } else {
        window.location.href = `/${vendorData[0].company_name}`;
      }
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/placeholder-image.jpg')` }}
    >
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

        <input
          type="password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </>
        )}

        <button
          className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
          onClick={isLogin ? handleLogin : handleSignUp}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

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
