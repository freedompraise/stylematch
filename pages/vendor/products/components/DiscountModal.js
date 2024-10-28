// DiscountModal.js
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

const DiscountModal = ({ open, onClose, productId, onDiscountChange }) => {
  const [discount, setDiscount] = useState("");

  const handleApplyDiscount = async () => {
    await onDiscountChange(productId, discount);
    toast.success("Discount updated successfully!");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Discount</DialogTitle>
      <DialogContent>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Enter discount percentage"
          className="w-full border px-3 py-2 rounded-md mb-3"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleApplyDiscount} color="primary">
          Apply Discount
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountModal;
