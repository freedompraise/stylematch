// pages/product/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import { getProductById, updateProduct } from "@/api/product";
import CustomToast from "@/CustomToast";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [isDiscountChecked, setIsDiscountChecked] = useState(false);

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
    try {
      await updateProduct(id, product);
      CustomToast.success("Product updated successfully!");
      router.push("/products"); // Redirect to products page or another route after update
    } catch (error) {
      console.error("Failed to update product:", error);
      CustomToast.error("Failed to update product.");
    }
  };

  const handleImageSelect = (imageUrl) => {
    setProduct((prev) => ({ ...prev, image_url: imageUrl }));
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
