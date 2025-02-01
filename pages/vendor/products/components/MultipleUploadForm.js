import { useState } from "react";
import { uploadImageToCloudinary } from "@/cloudinary";
import CustomToast from "@/CustomToast";
import { createProduct } from "@/api/product";

const MultipleUploadForm = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productDetails, setProductDetails] = useState([]);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      details: {
        name: "",
        description: "",
        price: null,
        stock_quantity: null,
        category: "",
        color: "",
        size: "",
        discount_price: null,
        discount_start: null,
        discount_end: null,
      },
    }));
    setImages([...images, ...newImages]);
    setProductDetails([...productDetails, ...newImages.map(() => ({}))]);
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    const updatedDetails = [...productDetails];
    updatedDetails[currentImageIndex] = {
      ...updatedDetails[currentImageIndex],
      [name]: value,
    };
    setProductDetails(updatedDetails);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => Math.min(prev + 1, images.length - 1));
  };

  const handleSubmit = async () => {
    try {
      for (let index = 0; index < images.length; index++) {
        const product = { ...productDetails[index] };
        const createdProduct = await createProduct(product);
        if (createdProduct) {
          const imageUrl = await uploadImageToCloudinary(images[index].file);
          await createProduct({ ...product, image_url: imageUrl });
        }
      }
      CustomToast.success("Products uploaded successfully!");
      setImages([]);
      setProductDetails([]);
      setCurrentImageIndex(0);
    } catch (error) {
      CustomToast.error("Failed to upload some products. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Upload Multiple Products</h2>
      {images.length > 0 && (
        <div>
          <img
            src={images[currentImageIndex].preview}
            alt="Preview"
            className="w-full h-64 object-contain rounded-md mb-4"
          />
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={productDetails[currentImageIndex]?.name || ""}
              onChange={handleDetailChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded-md"
            />
            <textarea
              name="description"
              value={productDetails[currentImageIndex]?.description || ""}
              onChange={handleDetailChange}
              placeholder="Product Description"
              className="w-full p-2 border rounded-md"
            ></textarea>
            <input
              type="number"
              name="price"
              value={productDetails[currentImageIndex]?.price || ""}
              onChange={handleDetailChange}
              placeholder="Price"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="stock_quantity"
              value={productDetails[currentImageIndex]?.stock_quantity || ""}
              onChange={handleDetailChange}
              placeholder="Stock Quantity"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentImageIndex === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentImageIndex === images.length - 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {images.length === 0 && (
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="w-full mb-4"
        />
      )}
      <button
        onClick={handleSubmit}
        disabled={images.length === 0}
        className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md"
      >
        Upload All Products
      </button>
    </div>
  );
};

export default MultipleUploadForm;
