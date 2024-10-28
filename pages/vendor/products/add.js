import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { createProduct } from "@/api/product";
import { useAuth } from "context/useAuthContext";
import { uploadImageToCloudinary } from "@/cloudinary";
import ProductForm from "./components/ProductForm";

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
      setProduct((prevProduct) => ({
        ...prevProduct,
        vendor_id: vendor.user_id,
      }));
    }
  }, [vendor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!product.price || isNaN(product.price)) {
      isValid = false;
      toast.error("Price must be a number");
    }

    if (isValid) {
      if (selectedImage) {
        const imageUrl = await uploadImageToCloudinary(selectedImage);
        product.image_url = imageUrl;
      }
      await createProduct(product);
      toast.success("Product added successfully!");
      router.push("/vendor/products");
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
