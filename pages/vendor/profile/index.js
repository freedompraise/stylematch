import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Typography, Box } from "@mui/material";
import ImageUploader from "@/FileUploader/ImageUploader";
import { updateVendorProfile, deleteBannerImage } from "../../api/vendor";
import CustomToast from "@/CustomToast";
import { useAuth } from "context/useAuthContext";

const VendorProfileSettings = () => {
  const router = useRouter();
  const { vendor } = useAuth();
  const [vendorData, setVendorData] = useState({
    company_name: "",
    phone: "",
    banner_image_url: "",
    bio: "",
    name: "",
  });
  const [originalBannerImageUrl, setOriginalBannerImageUrl] = useState("");

  useEffect(() => {
    if (vendor) {
      setVendorData(vendor);
      setOriginalBannerImageUrl(vendor.banner_image_url);
    }
  }, [vendor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (newImageUrl) => {
    if (newImageUrl !== vendorData.banner_image_url) {
      if (originalBannerImageUrl) {
        try {
          await deleteBannerImage(originalBannerImageUrl);
        } catch (error) {
          console.error("Failed to delete old image:", error);
          CustomToast.error(
            "Failed to delete old banner image. Please try again."
          );
        }
      }

      setVendorData((prevData) => ({
        ...prevData,
        banner_image_url: newImageUrl,
      }));
      setOriginalBannerImageUrl(newImageUrl);
    }
  };

  const handleSubmit = async () => {
    try {
      await updateVendorProfile(vendorData);
      CustomToast.success("Profile updated successfully!");
      router.push("/vendor/dashboard");
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
        type="tel"
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
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography variant="subtitle1">Upload Banner Image</Typography>
        <ImageUploader
          existingImageUrl={vendorData.banner_image_url}
          onUploadSuccess={handleImageUpload}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
};

export default VendorProfileSettings;
