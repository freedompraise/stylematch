import { useEffect, useState } from "react";
import { useAuth } from "context/useAuthContext";
import Link from "next/link";
import {
  FaBoxOpen,
  FaUserEdit,
  FaStoreAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import PreLoader from "@/Preloader";

const VendorPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { vendor, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && vendor) {
      setIsLoading(false);
    }
  }, [vendor, authLoading]);

  if (authLoading || isLoading) {
    return <PreLoader />;
  }

  if (!vendor) {
    return <div>Unauthorized. Redirecting...</div>;
  }

  return (
    <div className="container flex w-full">
      <div className="flex-1 py-8">
        <div className="p-4 max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome, {vendor.name}!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Let{"'"}s get your store up and running.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white shadow-lg p-6 rounded-lg transform hover:scale-105 transition duration-200">
                <FaUserEdit className="text-blue-500 text-3xl mb-4 mx-auto" />
                <h2 className="text-xl font-semibold mb-2">
                  Complete Your Profile
                </h2>
                <p className="text-gray-600 mb-4">
                  Add more details about your business to attract customers.
                </p>
                <Link
                  href="/vendor/profile"
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Go to Profile Settings
                </Link>
              </div>

              <div className="bg-white shadow-lg p-6 rounded-lg transform hover:scale-105 transition duration-200">
                <FaBoxOpen className="text-green-500 text-3xl mb-4 mx-auto" />
                <h2 className="text-xl font-semibold mb-2">
                  Add Your First Product
                </h2>
                <p className="text-gray-600 mb-4">
                  Start by adding products to your catalog.
                </p>
                <Link
                  href="/vendor/products/add"
                  className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                >
                  Add Product
                </Link>
              </div>

              <div className="bg-white shadow-lg p-6 rounded-lg transform hover:scale-105 transition duration-200">
                <FaStoreAlt className="text-purple-500 text-3xl mb-4 mx-auto" />
                <h2 className="text-xl font-semibold mb-2">
                  Customize Your Store
                </h2>
                <p className="text-gray-600 mb-4">
                  Personalize your store to match your brand.
                </p>
                <Link
                  href="/vendor/settings"
                  className="inline-block bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
                >
                  Customize Store
                </Link>
              </div>

              <div className="bg-white shadow-lg p-6 rounded-lg transform hover:scale-105 transition duration-200">
                <FaQuestionCircle className="text-gray-500 text-3xl mb-4 mx-auto" />
                <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
                <p className="text-gray-600 mb-4">
                  Check out our resources to help you get started.
                </p>
                <Link
                  href="/vendor/help"
                  className="inline-block bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Get Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
