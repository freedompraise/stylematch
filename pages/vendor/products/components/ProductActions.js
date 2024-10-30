import { useRouter } from "next/router";
import { Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { Link } from "@mui/icons-material";
import { toast } from "sonner";
import DiscountModal from "./DiscountModal";
import {
  toggleHottestOffer,
  updateProductDiscount,
} from "../../../api/product";
import { useState } from "react";

const ProductActions = ({ product, anchorEl, handleClose }) => {
  const router = useRouter();
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [isHottestOffer, setIsHottestOffer] = useState(
    product.is_hottest_offer || false
  );

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
      toast.success(
        `Product is now ${
          !product.is_hottest_offer ? "activated" : "deactivated"
        } as hottest offer!`
      );
    } catch (error) {
      console.error("Failed to toggle hottest offer:", error);
      toast.error("Failed to toggle hottest offer. Please try again.");
    } finally {
      handleClose();
    }
  };

  const handleDiscountToggle = () => {
    setDiscountModalOpen(true);
  };

  const handleViewDetails = () => {
    router.push(`/product/${product.id}`);
    handleClose();
  };

  return (
    <>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleHottestToggle}>
          {product.is_hottest_offer ? "Deactivate" : "Activate"} Hottest Offer
        </MenuItem>
        <MenuItem onClick={handleDiscountToggle}>Manage Discount</MenuItem>
        <MenuItem onClick={handleViewDetails}>
          <IconButton>
            <Link />
          </IconButton>
          View Details
        </MenuItem>
      </Menu>
      <DiscountModal
        open={discountModalOpen}
        onClose={() => setDiscountModalOpen(false)}
        productId={product.id}
        onDiscountChange={updateProductDiscount}
      />
    </>
  );
};

export default ProductActions;
