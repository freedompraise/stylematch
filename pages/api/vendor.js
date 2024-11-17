import { getPublicId } from "@/utils";
import { supabase } from "@/supabaseClient";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/cloudinary";
import CustomToast from "@/CustomToast";

/* 
  VENDOR PROFILE
*/
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

/*
   DELIVERY
*/

export const getDeliveryOptions = async (vendorId) => {
  const { data, error } = await supabase
    .from("deliveryoptions")
    .select("*")
    .eq("vendor_id", vendorId);

  if (error) {
    console.error("Error fetching delivery options:", error.message);
    return { deliveryOptions: null, error };
  }
  return { deliveryOptions: data, error: null };
};

export const updateDeliveryOption = async (optionId, updatedData) => {
  const { data, error } = await supabase
    .from("deliveryoptions")
    .update(updatedData)
    .eq("id", optionId);

  if (error) {
    console.error("Error updating delivery option:", error.message);
    return { success: false, error };
  }
  CustomToast.success("Delivery option updated successfully!");
  return { success: true, data };
};

export const addDeliveryOption = async (newOption) => {
  const { data, error } = await supabase
    .from("deliveryoptions")
    .insert(newOption);

  if (error) {
    console.error("Error adding delivery option:", error.message);
    return { success: false, error };
  }
  return { success: true, data };
};

export const deleteDeliveryOption = async (optionId) => {
  const { data, error } = await supabase
    .from("deliveryoptions")
    .delete()
    .eq("id", optionId);

  if (error) {
    console.error("Error deleting delivery option:", error.message);
    return { success: false, error };
  }
  return { success: true, data };
};

/*
  ORDERS
*/

export const getOrders = async (vendorId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("vendor_id", vendorId);

  if (error) {
    console.error("Error fetching orders:", error.message);
    return { orders: [], error };
  }
  return { orders: data, error: null };
};

export const confirmOrder = async (orderId, proofOfPaymentUrl) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "confirmed", proof_of_payment_url: null })
    .eq("id", orderId);

  try {
    await deleteImageFromCloudinary(getPublicId(proofOfPaymentUrl));
  } catch (error) {
    throw new Error();
  }

  if (error) {
    console.error("Error confirming order:", error.message);
    return { success: false, error };
  }
  return { success: true, data };
};

export const deliverOrder = async (orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "delivered" })
    .eq("id", orderId);

  if (error) {
    console.error("Error marking product as delivered", error.message);
    return { success: false, error };
  }
  return { success: true, data };
};

/*
  BANK DETAILS
*/

export const modifyAccountDetails = async (vendorId, modifierFn) => {
  if (!vendorId) throw new Error("Vendor ID is required");

  const { data, error } = await supabase
    .from("vendors")
    .select("bank_details")
    .eq("user_id", vendorId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const updatedBankDetails = modifierFn(data.bank_details || []);

  const { error: updateError } = await supabase
    .from("vendors")
    .update({ bank_details: updatedBankDetails })
    .eq("user_id", vendorId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedBankDetails;
};

export const getAccountDetails = async (vendorId) => {
  if (!vendorId) throw new Error("Vendor ID is required");

  const { data, error } = await supabase
    .from("vendors")
    .select("bank_details")
    .eq("user_id", vendorId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return Array.isArray(data.bank_details) ? data.bank_details : [];
};

export const addAccountDetails = async (vendorId, accountDetails) => {
  return await modifyAccountDetails(vendorId, (bankDetails) => [
    ...bankDetails,
    { id: crypto.randomUUID(), ...accountDetails },
  ]);
};

export const updateAccountDetails = async (
  vendorId,
  accountId,
  updatedDetails
) => {
  return await modifyAccountDetails(vendorId, (bankDetails) =>
    bankDetails.map((account) =>
      account.id === accountId ? { ...account, ...updatedDetails } : account
    )
  );
};

export const deleteAccountDetails = async (vendorId, accountId) => {
  return await modifyAccountDetails(vendorId, (bankDetails) =>
    bankDetails.filter((account) => account.id !== accountId)
  );
};
