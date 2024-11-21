import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Snackbar,
} from "@mui/material";
import { FaLink } from "react-icons/fa";
import ImageUploader from "@/FileUploader/ImageUploader";
import CustomToast from "@/CustomToast";
import LoadingButton from "@/LoadingButton";
import { saveOrder, fetchDeliveryOptions } from "@/api/buy";
import { uploadImageToCloudinary } from "@/cloudinary";

const ProductDetailModal = ({
  product = { id: null, vendor_id: null, name: "", description: "", price: 0 },
  bankDetails = [],
  onClose,
}) => {
  const [deliveryOptions, setDeliveryOptions] = useState({ options: [] });
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!product?.vendor_id) {
        setError("Vendor information is missing.");
        return;
      }
      setLoading(true);
      try {
        const options = await fetchDeliveryOptions(product.vendor_id);
        setDeliveryOptions(options);
      } catch (err) {
        throw new Error("Failed to fetch delivery options.");
      } finally {
        setLoading(false);
      }
    };

    if (product?.vendor_id) {
      fetchData();
    }
  }, [product.vendor_id]);

  const copyAccountNumber = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    CustomToast.success("Account number copied to clipboard!");
  };

  const getAvailableTimes = () => {
    const selectedOption = deliveryOptions.options.find(
      (opt) => opt.id === selectedDelivery
    );
    if (!selectedOption || !selectedOption.available_times) return [];
    return Object.entries(selectedOption.available_times).flatMap(
      ([day, times]) =>
        times.map((time) => ({
          day,
          time,
        }))
    );
  };

  const handleOrder = async () => {
    if (!customerName || !customerPhone || !selectedDelivery || !selectedTime) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        product_id: product.id,
        vendor_id: product.vendor_id,
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_location: selectedDelivery,
        delivery_date: selectedTime,
        status: "pending",
      };

      if (proofOfPayment) {
        const uploadedImageUrl = await uploadImageToCloudinary(proofOfPayment);
        if (!uploadedImageUrl) {
          throw new Error("Proof of payment upload returned an invalid URL.");
        }
        orderData.payment_proof_url = uploadedImageUrl;
      }

      const { success } = await saveOrder(orderData);
      if (!success) {
        throw new Error("Failed to save order.");
      }

      CustomToast.success("Order submitted successfully!");
      setSuccessMessage(true);
    } catch (err) {
      console.error("Failed to submit order:", err.message);
      setError(err.message || "An error occurred while submitting the order.");
      CustomToast.error(err.message || "Order submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        {loading && <CircularProgress />}
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-4">Customer Details</h2>
          <TextField
            label="Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Phone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-4">Select Delivery</h2>
          <InputLabel id="delivery-location-label">Location</InputLabel>
          <Select
            labelId="delivery-location-label"
            value={selectedDelivery || ""}
            onChange={(e) => setSelectedDelivery(e.target.value)}
            fullWidth
          >
            {deliveryOptions?.options?.length > 0 ? (
              deliveryOptions.options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.location}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No delivery options available</MenuItem>
            )}
          </Select>

          {selectedDelivery && (
            <>
              <InputLabel className="mt-4">Select Delivery Time</InputLabel>
              <Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                fullWidth
              >
                {getAvailableTimes().length > 0 ? (
                  getAvailableTimes().map(({ day, time }, index) => (
                    <MenuItem key={index} value={`${day} ${time}`}>
                      {day} - {time}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No available times</MenuItem>
                )}
              </Select>
            </>
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Bank Details</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bank Name</TableCell>
                <TableCell>Account Name</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bankDetails?.map((bank, index) => (
                <TableRow key={index}>
                  <TableCell>{bank.bankName}</TableCell>
                  <TableCell>{bank.accountName}</TableCell>
                  <TableCell>{bank.accountNumber}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => copyAccountNumber(bank.accountNumber)}
                      startIcon={<FaLink />}
                    >
                      Copy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-4">Upload Proof of Payment</h2>
          <ImageUploader onImageSelect={setProofOfPayment} />
        </div>
        <div className="mt-4">
          <LoadingButton
            onClick={handleOrder}
            label="Submit Order"
            isLoading={loading}
          />
        </div>
      </DialogContent>
      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(false)}
        message="Order submitted successfully!"
      />
    </Dialog>
  );
};

export default ProductDetailModal;
