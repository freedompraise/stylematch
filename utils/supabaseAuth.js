import { supabase } from "./supabaseClient";
import { toast } from "sonner";

export const signUpVendor = async (name, email, company_name, password) => {
  if (!name || !email || !company_name || !password) {
    toast.error("All fields are required.");
    return { data: null, error: new Error("Missing fields") };
  }

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

  if (error) {
    toast.error(`Signup failed: ${error.message}`);
    return { data: null, error };
  }

  const user = data?.user;
  console.log("User created:", user);

  const { error: insertError } = await supabase.from("vendors").insert([
    {
      name,
      email,
      company_name,
      user_id: user.id,
    },
  ]);

  if (insertError) {
    toast.error(`Error inserting vendor: ${insertError.message}`);
    return { data: null, error: insertError };
  }

  toast.success("Vendor signed up successfully!");
  return { data, error: null };
};

export const loginVendor = async (email, password) => {
  if (!email || !password) {
    toast.error("Please provide both email and password.");
    return { data: null, error: new Error("Missing credentials") };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error(`Login failed: ${error.message}`);
    return { data: null, error };
  }

  console.log("Login data:", data);
  toast.success("Login successful!");
  return { data, error: null };
};
