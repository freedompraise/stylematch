import { useState } from "react";
import { uploadImageToCloudinary } from "../../utils/cloudinary";
import Image from "next/image";

const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.size > 1000000) {
      // less than 1MB
      alert("Please select an image smaller than 1MB");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      onImageUpload(imageUrl);
      setImage(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} disabled={isUploading} />
      {image && (
        <Image
          src={image}
          alt="Uploaded"
          className="mt-2 h-20 w-20 object-cover"
        />
      )}
    </div>
  );
};

export default ImageUploader;
