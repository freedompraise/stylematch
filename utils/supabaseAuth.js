import { supabase } from "./supabaseClient";
import { toast } from "sonner";

export const signUpVendor = async (name, email, company_name, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        company_name,
      },
    },
  });

  const user = data?.user;

  if (error) {
    console.error("Error signing up:", error.message);
    return { data: null, error };
  }

  const { error: insertError } = await supabase.from("vendors").insert([
    {
      name,
      email,
      company_name: company_name,
      user_id: user.id,
    },
  ]);

  if (insertError) {
    console.error("Error inserting vendor:", insertError.message);
    return { data: null, error: insertError };
  }

  return { data, error: null };
};

export const loginVendor = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error logging in:", error.message);
    return { data: null, error };
  }

  return { data, error: null };
};
