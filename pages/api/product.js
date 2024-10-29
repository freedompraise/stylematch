import { supabase } from "../../utils/supabaseClient";

export const categories = [
  "Clothing",
  "Accessories",
  "Footwear",
  "Bags",
  "Jewelry",
  "Beauty",
  "Home Decor",
];
export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "N/A"];
export const colors = [
  "Red",
  "Blue",
  "Green",
  "Gold",
  "Yellow",
  "Black",
  "White",
];

export const fetchProducts = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("vendor_id", id);
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

export const toggleHottestOffer = async (id, isHottestOffer) => {
  const { data, error } = await supabase
    .from("products")
    .update({ is_hottest_offer: isHottestOffer })
    .eq("id", id);
  if (error) throw error;
  return data;
};
