import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import DeliveryStep from "./DeliveryStep";
import BankSelectionStep from "./BankSelectionStep";
import {
  saveOrder,
  uploadProofOfPayment,
  fetchDeliveryOptions,
} from "@/api/buy";

const ProductDetailModal = ({ product = {}, onClose }) => {
  const [step, setStep] = useState(1);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedBank, setSelectedBank] = useState({});
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
        if (options.length > 0) {
          setSelectedDelivery(options[0].id);
          setAvailableTimes(options[0].available_times);
          setSelectedTime(options[0].available_times[0]);
        }
      } catch (err) {
        setError("Failed to fetch delivery options.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [product]);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
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
      vendor_id: product.vendor_id,
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
    if (loading) return <CircularProgress />;
    if (error) return <p className="text-red-500">{error}</p>;

    switch (step) {
      case 1:
        return (
          <DeliveryStep
            deliveryOptions={deliveryOptions}
            selectedDelivery={selectedDelivery}
            availableTimes={availableTimes}
            selectedTime={selectedTime}
            setSelectedDelivery={setSelectedDelivery}
            setAvailableTimes={setAvailableTimes}
            setSelectedTime={setSelectedTime}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <BankSelectionStep
            bankDetails={product?.vendor?.bank_details || []}
            selectedBank={selectedBank}
            setSelectedBank={setSelectedBank}
            onOrder={handleOrder}
          />
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
      <div className="flex justify-end">
        <DialogActions>
          {step > 1 && (
            <Button onClick={handleBack} color="primary">
              Back
            </Button>
          )}
        </DialogActions>
        <DialogActions>
          {step !== 4 && (
            <Button onClick={onClose} color="secondary">
              Close
            </Button>
          )}
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ProductDetailModal;
