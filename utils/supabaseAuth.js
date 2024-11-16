import { supabase } from "./supabaseClient";

export const signUpVendor = async (name, email, company_name, password) => {
  // Create a user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, company_name }, // Save name and company_name in user metadata
    },
  });

  if (error) {
    console.error("Error signing up:", error.message);
    return { data: null, error };
  }

  const user = data?.user;

  // Insert a new vendor (without the email column)
  const { error: insertError } = await supabase.from("vendors").insert([
    {
      name,
      company_name,
      user_id: user.id, // Link vendor to the user via user_id
    },
  ]);

  if (insertError) {
    console.error("Error inserting vendor data:", insertError.message);
    return { data: null, error: insertError };
  }

  return { data, error: null };
};

export const loginVendor = async (email, password) => {
  if (!email || !password) {
    return { data: null, error: new Error("Missing credentials") };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error logging in:", error.message);
    return { data: null, error };
  }

  if (data.user) {
    const { data: vendorData, error: vendorError } = await supabase
      .from("vendors")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

    if (vendorError || !vendorData) {
      console.error("Error fetching vendor data:", vendorError?.message);
      return { vendor: null, error: vendorError };
    }
    return { vendor: vendorData, error: null };
  }

  return { data: null, error: null };
};

export const logoutVendor = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
