import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchVendorData, getSession } from "../../utils/supabaseAuth";
import { fetchProducts } from "../api/vendor";

const VendorPage = () => {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { company_name } = router.query;

  useEffect(() => {
    const checkSessionAndFetchData = async () => {
      const session = await getSession();

      if (!session?.session) {
        router.push("/auth");
        return;
      }

      const { user } = session.session;

      const { vendor: vendorData, error } = await fetchVendorData(company_name);

      if (error || vendorData.user_id !== user.id) {
        router.push("/auth");
      } else {
        setVendor(vendorData);

        const { products: vendorProducts } = await fetchProducts(company_name);
        setProducts(vendorProducts);
      }
    };

    if (company_name) {
      checkSessionAndFetchData();
    }
  }, [company_name, router]);

  if (!vendor) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen">
      <div className="p-8">
        {products.length > 0 ? (
          <div>
            <h1 className="text-2xl font-bold">Your Products</h1>
            <ul>
              {products.map((product) => (
                <li key={product.id} className="p-4 border-b">
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome {vendor.name}!</h1>
            <p className="mt-4 text-gray-600">
              Your company, {vendor.company_name}, is successfully registered.
              Start adding products to sell on your platform.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPage;
