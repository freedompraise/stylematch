import { useRouter } from "next/router";
import { Menu, MenuItem, IconButton, Typography, Switch } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  toggleHottestOffer,
  deleteProduct,
  deleteProductImage,
} from "@/api/product";
import { useState, useEffect } from "react";
import CustomToast from "@/CustomToast";

const ProductActions = ({ product, anchorEl, handleClose }) => {
  const router = useRouter();
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [isHottestOffer, setIsHottestOffer] = useState(false);

  useEffect(() => {
    if (product) {
      setIsHottestOffer(product.is_hottest_offer || false);
    }
  }, [product]);

  if (!product) {
    return (
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem disabled>
          <Typography color="error">Product data is not available</Typography>
        </MenuItem>
      </Menu>
    );
  }

  const handleHottestToggle = async () => {
    try {
      await toggleHottestOffer(product.id, !isHottestOffer);
      setIsHottestOffer(!isHottestOffer);
      CustomToast.success(
        `Product is now ${
          !isHottestOffer ? "activated" : "deactivated"
        } as hottest offer!`
      );
    } catch (error) {
      console.error("Failed to toggle hottest offer:", error);
      CustomToast.error("Failed to toggle hottest offer. Please try again.");
    } finally {
      handleClose();
    }
  };

  const handleViewDetails = () => {
    router.push(`/vendor/products/${product.id}`);
    handleClose();
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProductImage(product.image_url);
      await deleteProduct(product.id);
      CustomToast.success("Product deleted successfully!");
      router.push("/vendor/products");
    } catch (error) {
      console.error("Failed to delete product:", error);
      CustomToast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleHottestToggle}>
          <IconButton>
            <Switch checked={isHottestOffer} />
          </IconButton>
          {isHottestOffer ? "Deactivate" : "Activate"} Hottest Offer
        </MenuItem>
        <MenuItem onClick={handleViewDetails}>
          <IconButton>
            <Edit />
          </IconButton>
          Edit Product
        </MenuItem>
        <MenuItem onClick={handleDeleteProduct}>
          <IconButton>
            <Delete />
          </IconButton>
          Delete Product
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProductActions;
