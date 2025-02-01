import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createProduct } from "@/api/product";
import { useAuth } from "context/useAuthContext";
import { uploadImageToCloudinary } from "@/cloudinary";
import ProductForm from "./components/ProductForm";
import CustomToast from "@/CustomToast";

const AddProduct = () => {
  const { vendor } = useAuth();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: null,
    stock_quantity: null,
    vendor_id: null,
    image_url: "",
    category: "",
    color: "",
    size: "",
    discount_price: null,
    discount_start: null,
    discount_end: null,
  });
  const router = useRouter();

  const [isDiscountChecked, setIsDiscountChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (vendor) {
      console.log("vendor", vendor);
      setProduct((prevProduct) => ({
        ...prevProduct,
        vendor_id: vendor.user_id,
      }));
    }
  }, [vendor]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const requiredFields = [
      "name",
      "category",
      "description",
      "price",
      "stock_quantity",
    ];
    let isValid = true;
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!product[field]) {
        newErrors[field] = `${field.replace("_", " ")} is required.`;
        isValid = false;
      }
    });

    if (!isValid) {
      CustomToast.error("Please fill all required fields.");
      return;
    }

    if (selectedImage) {
      try {
        const imageUrl = await uploadImageToCloudinary(selectedImage);
        product.image_url = imageUrl;
      } catch (error) {
        CustomToast.error("Failed to upload image. Please try again.");
        return;
      }
    }

    try {
      await createProduct(product);
      CustomToast.success("Product added successfully!");
      router.push("/vendor/products");
    } catch (error) {
      CustomToast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="mx-auto bg-gray-100 p-6 rounded-md shadow-md">
      <ProductForm
        product={product}
        setProduct={setProduct}
        handleSubmit={handleSubmit}
        handleImageSelect={setSelectedImage}
        isDiscountChecked={isDiscountChecked}
        setIsDiscountChecked={setIsDiscountChecked}
      />
    </div>
  );
};

export default AddProduct;
