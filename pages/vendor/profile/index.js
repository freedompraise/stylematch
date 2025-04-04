import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, Typography, Box } from "@mui/material";
import ImageUploader from "@/FileUploader/ImageUploader";
import { updateVendorProfile, replaceBannerImage } from "@/api/vendor";
import CustomToast from "@/CustomToast";
import { useAuth } from "context/useAuthContext";
import LoadingButton from "@/LoadingButton";

const VendorProfileSettings = () => {
  const router = useRouter();
  const { vendor } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [vendorData, setVendorData] = useState({
    company_name: "",
    phone: "",
    banner_image_url: "",
    bio: "",
    name: "",
    user_id: "",
    instagram_url: "",
    facebook_url: "",
    wabusiness_url: "",
  });

  useEffect(() => {
    if (vendor) {
      setVendorData({
        ...vendor,
        user_id: vendor.user_id || vendor.id,
      });
      setSelectedImage(null);
    }
  }, [vendor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = async () => {
    try {
      if (!vendorData.company_name || !vendorData.name.trim()) {
        CustomToast.error("Company Name and Name are required.");
        return;
      }

      let updatedBannerImageUrl = vendorData.banner_image_url;

      if (selectedImage === null && vendorData.banner_image_url) {
        await replaceBannerImage(vendorData.banner_image_url, null);
        updatedBannerImageUrl = "";
      } else if (selectedImage) {
        updatedBannerImageUrl = await replaceBannerImage(
          vendorData.banner_image_url,
          selectedImage
        );

        if (!updatedBannerImageUrl) {
          throw new Error("Failed to upload the new image.");
        }

        setVendorData((prevData) => ({
          ...prevData,
          banner_image_url: updatedBannerImageUrl,
        }));
      }

      const updatedVendorData = {
        ...vendorData,
        banner_image_url: updatedBannerImageUrl,
      };

      await updateVendorProfile(updatedVendorData);
      CustomToast.success("Profile updated successfully!");
      router.push("/vendor");
    } catch (error) {
      console.error("Failed to update profile:", error);
      CustomToast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Vendor Profile Settings
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Company Name"
        name="company_name"
        value={vendorData.company_name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Phone Number"
        name="phone"
        type="number"
        value={vendorData.phone}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={vendorData.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        margin="normal"
        label="Bio"
        name="bio"
        value={vendorData.bio}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Instagram Link"
        name="instagram_url"
        value={vendorData.instagram_url}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Facebook Link"
        name="facebook_url"
        value={vendorData.facebook_url}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="WhatsApp Business URL"
        name="wabusiness_url"
        placeholder="https://wa.me/1234567890"
        value={vendorData.wabusiness_url}
        onChange={handleInputChange}
      />
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography variant="subtitle1">Upload Banner Image</Typography>
        <ImageUploader
          onImageSelect={handleImageSelect}
          existingImageUrl={vendorData.banner_image_url || ""}
        />
      </Box>
      <LoadingButton onClick={handleSubmit} label="Save Profile" />
    </Box>
  );
};

export default VendorProfileSettings;
