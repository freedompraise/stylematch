import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { createProduct } from "@/api/product";
import ImageUploader from "@/FileUploader/ImageUploader";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    company_name: "",
    image_url: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl) => {
    setProduct((prev) => ({ ...prev, image_url: imageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(product);
      toast.success("Product added successfully!");
      router.push("/vendor/products");
    } catch (error) {
      toast.error("Error adding product. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Price (NGN)
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Company Name
          </label>
          <input
            type="text"
            name="company_name"
            value={product.company_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Product Image
          </label>
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
