import { supabase } from "@/supabaseClient";

export const getVendorOrders = async (vendorId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("vendor_id", vendorId);

  if (error) {
    console.error("Error fetching orders:", error.message);
    return { success: false, orders: [] };
  }
  return { success: true, orders: data };
};

export const confirmOrder = async (orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "confirmed", payment_proof_url: null })
    .eq("id", orderId);

  try {
  } catch (error) {
    throw new Error();
  }

  if (error) {
    console.error("Error confirming order:", error.message);
    return { success: false, error };
  }
  return { success: true, data };
};

export const deleteOrder = async (orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    console.error("Error deleting order:", error.message);
    return { success: false };
  }

  return { success: true };
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
