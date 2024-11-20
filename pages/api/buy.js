import { uploadImageToCloudinary } from "@/cloudinary";
import { supabase } from "@/supabaseClient";

export const getVendorDetails = async (company_name) => {
  const { data: vendorData, error } = await supabase
    .from("vendors")
    .select("*")
    .ilike("company_name", `%${company_name.trim().toLowerCase()}%`)
    .single();

  if (error || !vendorData) {
    console.error("Error fetching vendor data:", error?.message);
    return { vendor: null, error };
  }
  return { vendor: vendorData, error: null };
};

export const getVendorProducts = async (vendorId) => {
  const { data: productsData, error } = await supabase
    .from("products")
    .select("*")
    .eq("vendor_id", vendorId);

  if (error) {
    console.error("Error fetching products:", error.message);
    return { products: [], error };
  }

  return { products: productsData, error: null };
};

export const saveOrder = async (orderData) => {
  const { data, error } = await supabase.from("orders").insert([orderData]);

  if (error) {
    console.error("Error saving order:", error.message);
    return { success: false, orderId: null };
  }

  return { success: true, orderId: data[0].id };
};

export const uploadProofOfPayment = async (orderId, formData) => {
  const imageUrl = await uploadImageToCloudinary(formData);
  const { data, error } = await supabase
    .from("orders")
    .update({ payment_proof_url: imageUrl })
    .eq("id", orderId);

  if (error) {
    console.error("Error uploading proof of payment:", error.message);
    return { success: false, error };
  }
};

export const fetchDeliveryOptions = async (vendorId) => {
  const { data, error } = await supabase
    .from("deliveryoptions")
    .select("*")
    .eq("vendor_id", vendorId);

  if (error) {
    console.error("Error fetching delivery options:", error.message);
    return { options: [], error };
  }

  return { options: data, error: null };
};
