import { useState } from "react";
import Image from "next/image";

const ImageUploader = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || file.size > 1000000 || !allowedTypes.includes(file.type)) {
      alert(
        "Please select an image smaller than 1MB and in PNG or JPEG format"
      );
      return;
    }

    // Set the preview URL and pass the file to the parent component
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    onImageSelect(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {imagePreview && (
        <Image
          src={imagePreview}
          width={80}
          height={80}
          alt="Preview"
          className="mt-2 h-20 w-20 object-cover"
        />
      )}
    </div>
  );
};

export default ImageUploader;
