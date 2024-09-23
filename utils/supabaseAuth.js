import { supabase } from "./supabaseClient";
import { toast } from "sonner";
import Router from "next/router";

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
    console.error("Error signing up:", error.message);
    return { data: null, error };
  }

  const user = data?.user;
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
      return { data: null, error: vendorError };
    }

    toast.success("Login successful!");
    Router.push(`/vendor/${vendorData.company_name}`);
    localStorage.setItem("vendor", JSON.stringify(vendorData));
    return { user: data.user, vendor: vendorData };
  }

  return { data, error: null };
};

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

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data;
};
