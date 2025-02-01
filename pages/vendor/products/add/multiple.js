import React, { useState } from "react";
import { createProduct } from "@/api/product";
import { uploadImageToCloudinary } from "@/cloudinary";
import CustomToast from "@/CustomToast";
import { categories, colors, sizesByCategory } from "@/api/product";

const MultipleUploadPage = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [batchCategory, setBatchCategory] = useState("");
  const [products, setProducts] = useState([]);

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
        category: batchCategory || "",
        color: "",
        size: "",
        discount_price: null,
        discount_start: null,
        discount_end: null,
      },
    }));
    setImages([...images, ...newImages]);
    setProducts([...products, ...newImages.map((img) => img.details)]);
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[currentIndex] = {
      ...updatedProducts[currentIndex],
      [name]: value,
    };
    setProducts(updatedProducts);
  };

  const handleBatchCategory = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        category: batchCategory,
      }))
    );
  };

  const handleUploadAll = async () => {
    try {
      const uploadedProducts = await Promise.all(
        images.map(async (img, index) => {
          const imageUrl = await uploadImageToCloudinary(img.file);
          const product = { ...products[index], image_url: imageUrl };
          return createProduct(product);
        })
      );
      CustomToast.success("All products uploaded successfully!");
      setImages([]);
      setProducts([]);
      setCurrentIndex(0);
    } catch (error) {
      CustomToast.error("Error uploading products. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Upload Multiple Products</h2>

      {images.length === 0 && (
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="mb-4"
          />
          <div className="mb-4">
            <label>Batch Category (optional):</label>
            <select
              value={batchCategory}
              onChange={(e) => setBatchCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={handleBatchCategory}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Apply to All
            </button>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div>
          <img
            src={images[currentIndex].preview}
            alt="Preview"
            className="w-full h-64 object-cover mb-4"
          />
          <div>
            <input
              type="text"
              name="name"
              value={products[currentIndex].name || ""}
              onChange={handleDetailChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded-md mb-2"
            />
            <textarea
              name="description"
              value={products[currentIndex].description || ""}
              onChange={handleDetailChange}
              placeholder="Product Description"
              className="w-full p-2 border rounded-md mb-2"
            ></textarea>
            <input
              type="number"
              name="price"
              value={products[currentIndex].price || ""}
              onChange={handleDetailChange}
              placeholder="Price"
              className="w-full p-2 border rounded-md mb-2"
            />
            {/* Add other fields */}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))
              }
              disabled={currentIndex === images.length - 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleUploadAll}
        disabled={images.length === 0}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Upload All
      </button>
    </div>
  );
};

export default MultipleUploadPage;
