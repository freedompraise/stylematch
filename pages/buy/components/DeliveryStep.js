import { Select, MenuItem, Button, InputLabel } from "@mui/material";
import { useState } from "react";

const DeliveryStep = ({ deliveryOptions = { options: [] }, onNext }) => {
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const handleDeliveryChange = (deliveryId) => {
    const selected = deliveryOptions?.options?.find(
      (opt) => opt.id === deliveryId
    );
    setSelectedDelivery(deliveryId);
    setAvailableTimes(selected?.available_times || []);
    setSelectedTime(selected?.available_times?.[0] || "");
  };

  const handleNextClick = () => {
    if (!selectedDelivery || (availableTimes.length > 0 && !selectedTime)) {
      alert("Please complete all selections.");
      return;
    }
    onNext({ selectedDelivery, selectedTime });
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
            {Object.entries(availableTimes).flatMap(([day, times]) =>
              times.map((time, index) => (
                <MenuItem key={`${day}-${index}`} value={time}>
                  {day} - {time}
                </MenuItem>
              ))
            )}
          </Select>
        </>
      )}
      <Button
        onClick={handleNextClick}
        variant="contained"
        color="primary"
        className="mt-4"
      >
        Next
      </Button>
    </div>
  );
};

export default DeliveryStep;
