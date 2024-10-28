// ProductActions.js
import { useRouter } from "next/router";
import { Menu, MenuItem, IconButton } from "@mui/material";
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

  const handleHottestToggle = async () => {
    await toggleHottestOffer(product.id, !product.is_hottest_offer);
    toast.success(
      `Product is now ${
        !product.is_hottest_offer ? "activated" : "deactivated"
      } as hottest offer!`
    );
    handleClose();
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
