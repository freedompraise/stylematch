import { useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
import { toast } from "sonner";

const ConfirmEmailPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session) {
        const { data: vendorData, error: vendorError } = await supabase
          .from("vendors")
          .select("company_name")
          .eq("user_id", session.user.id)
          .single();

        if (vendorError) {
          toast.error("Error fetching vendor data: " + vendorError.message);
          router.push("/auth");
        } else {
          toast.success("Email confirmed successfully!");
          router.push(`/${vendorData.company_name}`);
        }
      } else {
        toast.error("Session not found, please login.");
        router.push("/auth");
      }
    };

    checkSession();
  }, []);

  return <div>Confirming your email...</div>;
};

export default ConfirmEmailPage;
