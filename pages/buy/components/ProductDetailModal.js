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
} from "@mui/material";
import {
  saveOrder,
  fetchDeliveryOptions,
  uploadProofOfPayment,
} from "@/api/buy";

const ProductDetailModal = ({
  product = { id: null, vendor_id: null, name: "", description: "", price: 0 },
  bankDetails = [],
  onClose,
}) => {
  const [deliveryOptions, setDeliveryOptions] = useState({ options: [] });
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

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
        setError("Failed to fetch delivery options.");
      } finally {
        setLoading(false);
      }
    };

    if (product?.vendor_id) {
      fetchData();
    }
  }, [product.vendor_id]);

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
    setLoading(true);
    setError("");
    try {
      const orderData = {
        product_id: product.id,
        delivery_time: selectedTime,
        delivery_location: selectedDelivery,
        vendor_id: product.vendor_id,
        status: "pending_payment",
      };
      const { success, orderId } = await saveOrder(orderData);
      if (success) {
        setOrderId(orderId);
      } else {
        throw new Error("Failed to save order.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleProofUpload = async () => {
    if (!proofOfPayment) {
      alert("Please upload a proof of payment.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("proof", proofOfPayment);
      await uploadProofOfPayment(formData);
      alert("Proof of payment uploaded successfully!");
    } catch (err) {
      alert("Failed to upload proof of payment.");
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
          <h2 className="text-lg font-bold mb-2">Product Details</h2>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
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
          <p>
            Please transfer the payment to one of the following bank accounts,
            and proceed to upload proof of payment:
          </p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bank Name</TableCell>
                <TableCell>Account Name</TableCell>
                <TableCell>Account Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("bankDetails", bankDetails)}
              {bankDetails?.map((bank, index) => (
                <TableRow key={index}>
                  <TableCell>{bank.bankName}</TableCell>
                  <TableCell>{bank.accountName}</TableCell>
                  <TableCell>{bank.accountNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Upload Proof of Payment</h2>
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            fullWidth
            onChange={(e) => setProofOfPayment(e.target.files[0])}
          />
          <Button
            onClick={handleProofUpload}
            variant="contained"
            color="primary"
            className="mt-4"
            disabled={!proofOfPayment}
          >
            Upload Proof
          </Button>
        </div>
      </DialogContent>
      <Button
        onClick={onClose}
        color="secondary"
        variant="outlined"
        className="mt-4"
      >
        Close
      </Button>
    </Dialog>
  );
};

export default ProductDetailModal;
