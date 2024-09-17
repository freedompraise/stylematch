import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";

const VendorPage = () => {
  const [vendor, setVendor] = useState(null);
  const router = useRouter();
  const { company_name } = router.query;

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth");
        return;
      }

      const fetchVendorData = async () => {
        const { data: vendorData } = await supabase
          .from("vendors")
          .select("name, company_name")
          .eq("company_name", company_name)
          .single();

        if (vendorData) {
          setVendor(vendorData);
        } else {
          router.push("/auth");
        }
      };

      fetchVendorData();
    };

    checkSession();
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
