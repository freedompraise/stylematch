import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
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
        setSelectedDelivery(options[0]?.id || null);
        setAvailableTimes(options[0]?.available_times || []);
      } catch (err) {
        setError("Failed to fetch delivery options.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [product]);

  const handleNext = () => {
    if (step === 1 && !selectedDelivery) {
      setError("Please select a delivery location.");
      return;
    }
    if (step === 2 && !selectedTime) {
      setError("Please select a delivery time.");
      return;
    }
    setError("");
    setStep((prev) => prev + 1);
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
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Select Delivery Time</h2>
            <Button
              onClick={handleNext}
              variant="contained"
              color="primary"
              disabled={!selectedTime}
              className="mt-4"
            >
              Next
            </Button>
          </div>
        );
      case 3:
        return (
          <BankSelectionStep
            bankDetails={product?.vendor?.bank_details || []}
            onOrder={handleOrder}
          />
        );
      case 4:
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
              onClick={() => setStep(5)}
              variant="contained"
              color="primary"
              disabled={!proofOfPayment}
              className="mt-4"
            >
              Upload Proof
            </Button>
          </div>
        );
      case 5:
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
        {step > 1 && (
          <Button onClick={() => setStep((prev) => prev - 1)} color="primary">
            Back
          </Button>
        )}
        {step < 5 && (
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailModal;
