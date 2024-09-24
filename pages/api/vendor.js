import { supabase } from "../../utils/supabaseClient";

export const fetchProducts = async (company_name) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("company_name", company_name);

  if (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }

  return { products: data };
};

export const getDeliveries = async () => {
  const { data, error } = await supabase.from("deliveryoptions").select("*");

  if (error) {
    console.error("Error fetching deliveries:", error);
    return [];
  }

  return data;
};

export const createDelivery = async (delivery) => {
  const { data, error } = await supabase
    .from("deliveryoptions")
    .insert([delivery]);

  if (error) {
    console.error("Error creating delivery:", error);
    return;
  }

  return data;
};

export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order status:", error);
    return;
  }

  return data;
};

export const getOrders = async () => {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data;
};

export const updateProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", product.id);

  if (error) {
    console.error("Error updating product:", error);
    return;
  }

  return data;
};

export const uploadProduct = async (product) => {
  const { data, error } = await supabase.from("products").insert([product]);

  if (error) {
    console.error("Error uploading product:", error);
    return;
  }

  return data;
};

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data;
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
