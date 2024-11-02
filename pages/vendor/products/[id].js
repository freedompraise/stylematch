import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import {
  getProductById,
  updateProduct,
  replaceProductImage,
} from "@/api/product";
import CustomToast from "@/CustomToast";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [isDiscountChecked, setIsDiscountChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const data = await getProductById(id);
          setProduct(data);
          setIsDiscountChecked(!!data.discount_price);
        } catch (error) {
          console.error("Failed to fetch product:", error);
          CustomToast.error("Failed to load product details.");
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let imageUrl = product.image_url;

    try {
      if (!product.name || !product.price) {
        CustomToast.error("Please fill in all required fields.");
        return;
      }

      if (selectedImage) {
        imageUrl = await replaceProductImage(product.image_url, selectedImage);
        setProduct((prev) => ({ ...prev, image_url: imageUrl }));
      }

      await updateProduct(id, { ...product, image_url: imageUrl });
      CustomToast.success("Product updated successfully!");
      router.push("/vendor/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      CustomToast.error("Failed to update product.");
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm
        product={product}
        setProduct={setProduct}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isDiscountChecked={isDiscountChecked}
        setIsDiscountChecked={setIsDiscountChecked}
      />
    </div>
  );
};

export default ProductPage;
