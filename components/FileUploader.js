import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";

const FileUploader = ({ onUpload }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.size > 2000000) {
      toast.error("Image size should not exceed 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      setImage(imageUrl);
      onUpload(imageUrl);
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="mb-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <Image src={image} alt="Product" className="mt-2 w-24 h-24" />}
    </div>
  );
};

export default FileUploader;
