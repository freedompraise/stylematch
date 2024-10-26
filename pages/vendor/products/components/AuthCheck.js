import { useRouter } from "next/router";

const AuthCheck = ({ vendor, children }) => {
  const router = useRouter();

  if (!vendor) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          You need to be logged in to add a product
        </h2>
        <button
          onClick={() => router.push("/auth")}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }

  return children;
};

export default AuthCheck;
