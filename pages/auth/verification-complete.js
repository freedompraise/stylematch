import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";

const ConfirmEmailPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkConfirmation = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData?.session) {
        const { user } = sessionData.session;

        const { data: vendorData, error } = await supabase
          .from("vendors")
          .select("company_name")
          .eq("user_id", user.id)
          .single();

        if (!error && vendorData) {
          router.push(`/vendor/${vendorData.company_name}`);
        }
      }
    };

    checkConfirmation();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h1 className="text-2xl font-bold">Email Confirmed!</h1>
        <p className="mt-4 text-gray-600">Redirecting to your vendor page...</p>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
