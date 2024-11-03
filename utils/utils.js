export const getPublicId = (url) => {
  const parts = url.split("/");
  const publicIdWithExtension = parts.slice(-2).join("/"); // e.g., "my-folder/image_name.jpg"
  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // Removes the extension
  return publicId;
};
