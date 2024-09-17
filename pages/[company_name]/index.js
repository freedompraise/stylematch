import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchVendorData, getSession } from "../../utils/supabaseAuth";

const VendorPage = () => {
  const [vendor, setVendor] = useState(null);
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
      }
    };

    if (company_name) {
      checkSessionAndFetchData();
    }
  }, [company_name]);

  if (!vendor) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h1 className="text-2xl font-bold">Welcome {vendor.name}!</h1>
        <p className="mt-4 text-gray-600">
          Your company, {vendor.company_name}, is successfully registered!
        </p>
      </div>
    </div>
  );
};

export default VendorPage;
