import { supabase } from "../../utils/supabaseClient";

export const categories = [
  "Clothing",
  "Accessories",
  "Footwear",
  "Bags",
  "Jewelry",
  "Beauty",
  "Home Decor",
  "Art",
  "Electronics",
  "Toys",
];
export const variants = ["Small", "Medium", "Large", "Extra Large"];

export const fetchProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
};

export const createProduct = async (product) => {
  const { data, error } = await supabase.from("products").insert([product]);
  if (error) throw error;
  return data;
};

export const updateProduct = async (id, updates) => {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id) => {
  const { data, error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
  return data;
};

export const updateProductDiscount = async (id, discount) => {
  const { data, error } = await supabase
    .from("products")
    .update({ discount })
    .eq("id", id);
  if (error) throw error;
  return data;
};
