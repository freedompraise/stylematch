import { useState, useEffect } from "react";
import Image from "next/image";

const ImageUploader = ({ onImageSelect, existingImageUrl }) => {
  const [imagePreview, setImagePreview] = useState(existingImageUrl || null);
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    // Set preview to existing image if provided
    if (existingImageUrl) {
      setImagePreview(existingImageUrl);
    }
  }, [existingImageUrl]);

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

  const handleRemoveImage = () => {
    setImagePreview(null);
    onImageSelect(null);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {imagePreview ? (
        <div className="mt-2 relative">
          <Image
            src={imagePreview}
            width={80}
            height={80}
            alt="Preview"
            className="h-20 w-20 object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 p-1 bg-red-500 text-white text-xs rounded-full"
          >
            X
          </button>
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-500">No image selected</p>
      )}
    </div>
  );
};

export default ImageUploader;
