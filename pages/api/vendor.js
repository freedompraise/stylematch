import { getPublicId } from "@/utils";
import { supabase } from "@/supabaseClient";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/cloudinary";

export const getVendorDetails = async (company_name) => {
  console.log("company_name", company_name);
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

export const updateVendorProfile = async (vendorData) => {
  try {
    if (!vendorData.user_id) {
      throw new Error("User ID is missing. Ensure user_id is properly set.");
    }

    const { data, error } = await supabase
      .from("vendors")
      .update(vendorData)
      .eq("user_id", vendorData.user_id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error updating vendor profile:", error);
    throw error;
  }
};

export const replaceBannerImage = async (oldImageUrl, newImage) => {
  if (oldImageUrl) {
    const publicId = getPublicId(oldImageUrl);
    try {
      await deleteImageFromCloudinary(publicId);
    } catch (error) {
      throw new Error("Failed to delete the current image.");
    }
  }

  const newImageUrl = await uploadImageToCloudinary(newImage);
  return newImageUrl;
};
