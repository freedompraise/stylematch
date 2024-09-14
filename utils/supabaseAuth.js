import { supabase } from "./supabaseClient";

// Vendor Signup
export const signUpVendor = async (email, password, companyName) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!error) {
    const { data, insertError } = await supabase
      .from("vendors")
      .insert([{ user_id: user.id, company_name: companyName }]);

    if (insertError) {
      console.log(insertError.message);
      return { error: insertError.message };
    }
  }

  return { user, error };
};

// Vendor Login
export const loginVendor = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  return { user, error };
};
