import { supabase } from "../../utils/supabaseClient";

export const fetchProducts = async (company_name) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("company_name", company_name);

  if (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }

  return { products: data };
};
