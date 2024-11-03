import { getPublicId } from "@/utils";
import { supabase } from "@/supabaseClient";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/cloudinary";

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
