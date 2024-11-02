import { getPublicId } from "@/utils";
import { supabase } from "@/supabaseClient";
import { deleteImageFromCloudinary } from "@/cloudinary";

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
    const { id, ...updateData } = vendorData;
    const { data, error } = await supabase
      .from("vendors")
      .update(updateData)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error updating vendor profile:", error);
    throw error;
  }
};

export const deleteBannerImage = async (imageUrl) => {
  const publicId = getPublicId(imageUrl);
  await deleteImageFromCloudinary(publicId);
  return { message: "Image changed successfully" };
};
