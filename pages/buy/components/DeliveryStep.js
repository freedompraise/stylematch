import { Select, MenuItem, Button, InputLabel } from "@mui/material";

const DeliveryStep = ({
  deliveryOptions = { options: [] },
  selectedDelivery,
  availableTimes,
  selectedTime,
  setSelectedDelivery,
  setAvailableTimes,
  setSelectedTime,
  onNext,
}) => {
  const handleDeliveryChange = (deliveryId) => {
    const selected = deliveryOptions?.options?.find(
      (opt) => opt.id === deliveryId
    );
    setSelectedDelivery(deliveryId);
    setAvailableTimes(selected?.available_times || []);
    setSelectedTime(selected?.available_times?.[0] || "");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Delivery Location</h2>
      <InputLabel id="delivery-location-label">Location</InputLabel>
      <Select
        labelId="delivery-location-label"
        value={selectedDelivery || ""}
        onChange={(e) => handleDeliveryChange(e.target.value)}
        fullWidth
      >
        {deliveryOptions?.options?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.location}
          </MenuItem>
        ))}
      </Select>
      {availableTimes.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-4 mb-2">Select Delivery Time</h2>
          <Select
            value={selectedTime || ""}
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
        onClick={onNext}
        variant="contained"
        color="primary"
        disabled={
          !selectedDelivery || (availableTimes.length > 0 && !selectedTime)
        }
        className="mt-4"
      >
        Next
      </Button>
    </div>
  );
};

export default DeliveryStep;
