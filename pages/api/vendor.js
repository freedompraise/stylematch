import { supabase } from "../../utils/supabaseClient";

export const fetchVendorData = async (company_name) => {
  const { data: vendorData, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("company_name", company_name)
    .single();

  if (error || !vendorData) {
    console.error("Error fetching vendor data:", error?.message);
    return { vendor: null, error };
  }
  return { vendor: vendorData, error: null };
};
