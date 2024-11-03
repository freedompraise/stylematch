import { supabase } from "@/supabaseClient";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/cloudinary";
import { getPublicId } from "@/utils";

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
  "Brown",
  "Pink",
  "Purple",
  "Orange",
  "N/A",
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

export const getProductById = async (id) => {
  const { data, error } = await supabase.from("products").select().eq("id", id);
  if (error) throw error;
  return data[0];
};

export const deleteProduct = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);
  if (error) throw error;
  return data;
};

export const deleteProductImage = async (imageUrl) => {
  const publicId = getPublicId(imageUrl);
  await deleteImageFromCloudinary(publicId);
  return { message: "Image deleted successfully" };
};

export const replaceProductImage = async (currentImageUrl, newImage) => {
  if (currentImageUrl) {
    const publicId = getPublicId(currentImageUrl);
    try {
      await deleteImageFromCloudinary(publicId);
    } catch (error) {
      throw new Error("Failed to delete the current image.");
    }
  }
  const newImageUrl = await uploadImageToCloudinary(newImage);
  return newImageUrl;
};
