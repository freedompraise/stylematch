import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  saveOrder,
  uploadProofOfPayment,
  fetchDeliveryOptions,
} from "@/api/buy";

const ProductDetailModal = ({ product = {}, onClose }) => {
  const [step, setStep] = useState(1);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedBank, setSelectedBank] = useState({});
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!product?.vendor?.user_id) {
        setError("Vendor information is missing.");
        return;
      }
      setLoading(true);
      try {
        const options = await fetchDeliveryOptions(product.vendor.user_id);
        setDeliveryOptions(options);
      } catch (err) {
        setError("Failed to fetch delivery options.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [product]);

  const handleDeliveryChange = (deliveryId) => {
    const selected = deliveryOptions.find((opt) => opt.id === deliveryId);
    setSelectedDelivery(deliveryId);
    setAvailableTimes(selected?.available_times || []);
  };

  const handleOrder = async () => {
    if (!product?.vendor?.user_id) {
      setError("Vendor information is missing.");
      return;
    }

    setLoading(true);
    setError("");
    const orderData = {
      product_id: product.id,
      delivery_time: selectedTime,
      delivery_location: selectedDelivery,
      vendor_id: product.vendor.user_id,
      status: "pending_payment",
    };

    try {
      const { success, orderId } = await saveOrder(orderData);
      if (success) {
        setOrderId(orderId);
        setStep(3);
      } else {
        throw new Error("Failed to save order.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadProof = async () => {
    if (!proofOfPayment) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("proof", proofOfPayment);

      const { success } = await uploadProofOfPayment(orderId, formData);
      if (success) {
        setStep(4);
      } else {
        throw new Error("Failed to upload proof of payment.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Select Delivery Location</h2>
            <InputLabel id="delivery-location-label">Location</InputLabel>
            <Select
              labelId="delivery-location-label"
              value={selectedDelivery}
              onChange={(e) => handleDeliveryChange(e.target.value)}
              fullWidth
            >
              {deliveryOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.location}
                </MenuItem>
              ))}
            </Select>
            {availableTimes.length > 0 && (
              <>
                <h2 className="text-xl font-bold mt-4 mb-2">
                  Select Delivery Time
                </h2>
                <Select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  fullWidth
                >
                  {availableTimes.map((time, index) => (
                    <MenuItem key={index} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <Button
              onClick={() => setStep(2)}
              variant="contained"
              color="primary"
              disabled={!selectedDelivery || !selectedTime}
              className="mt-4"
            >
              Next
            </Button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Select Bank for Payment</h2>
            {product?.vendor?.bank_details?.map((bank) => (
              <div key={bank.id} className="mb-4">
                <input
                  type="radio"
                  id={bank.id}
                  name="bank"
                  value={bank.id}
                  onChange={() => setSelectedBank(bank)}
                />
                <label htmlFor={bank.id} className="ml-2">
                  {`${bank.bankName} - ${bank.accountName} - ${bank.accountNumber}`}
                </label>
              </div>
            ))}
            <Button
              onClick={handleOrder}
              variant="contained"
              color="primary"
              disabled={!selectedBank.id}
            >
              Proceed to Payment
            </Button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Upload Proof of Payment</h2>
            <TextField
              type="file"
              inputProps={{ accept: "image/*" }}
              fullWidth
              onChange={(e) => setProofOfPayment(e.target.files[0])}
            />
            <Button
              onClick={handleUploadProof}
              variant="contained"
              color="primary"
              disabled={!proofOfPayment}
              className="mt-4"
            >
              Upload Proof
            </Button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Purchase Complete</h2>
            <p>You’ll hear from the vendor soon. Thank you!</p>
            <Button
              onClick={() =>
                (window.location.href = `/vendor/${product?.vendor?.user_id}`)
              }
              variant="outlined"
              color="primary"
            >
              Go Back to Vendor Page
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
      <DialogActions>
        {step !== 4 && (
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailModal;
