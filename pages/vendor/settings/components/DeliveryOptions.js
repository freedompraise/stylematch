import { useState, useEffect } from "react";
import {
  getDeliveryOptions,
  updateDeliveryOption,
  addDeliveryOption,
  deleteDeliveryOption,
} from "@/api/vendor";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Chip,
} from "@mui/material";
import LoadingButton from "@/LoadingButton";
import CustomToast from "@/CustomToast";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DeliveryOptions = ({ vendorId }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [location, setLocation] = useState("");
  const [availableTimes, setAvailableTimes] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [editOptionId, setEditOptionId] = useState(null);

  useEffect(() => {
    (async () => {
      const { deliveryOptions: options, error } = await getDeliveryOptions(
        vendorId
      );
      if (!error) setDeliveryOptions(options);
    })();
  }, [vendorId]);

  const validateDeliveryOption = () => {
    if (!location.trim()) {
      CustomToast.error("Location cannot be empty.");
      return false;
    }
    const hasValidTimes = daysOfWeek.some((day) => availableTimes[day].length);
    if (!hasValidTimes) {
      CustomToast.error("At least one time slot must be added.");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setLocation("");
    setAvailableTimes(
      daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
    );
    setIsEditMode(false);
    setEditOptionId(null);
  };

  const handleSubmit = async () => {
    if (!validateDeliveryOption()) return;

    const optionData = {
      location,
      available_times: availableTimes,
      vendor_id: vendorId,
    };

    const success = isEditMode
      ? await updateDeliveryOption(editOptionId, optionData)
      : await addDeliveryOption(optionData);

    if (success) {
      CustomToast.success(
        `Delivery option ${isEditMode ? "updated" : "added"} successfully!`
      );
      const updatedOptions = isEditMode
        ? deliveryOptions.map((opt) =>
            opt.id === editOptionId ? { ...opt, ...optionData } : opt
          )
        : [...deliveryOptions, optionData];
      setDeliveryOptions(updatedOptions);
      resetForm();
    }
  };

  const handleDeleteOption = async (id) => {
    const success = await deleteDeliveryOption(id);
    if (success) {
      CustomToast.success("Delivery option deleted successfully!");
      setDeliveryOptions((prev) => prev.filter((opt) => opt.id !== id));
    }
  };

  const handleEditOption = (option) => {
    setLocation(option.location);
    setAvailableTimes(option.available_times);
    setEditOptionId(option.id);
    setIsEditMode(true);
  };

  const handleTimeChange = (day, value, index) => {
    const updatedTimes = { ...availableTimes, [day]: [...availableTimes[day]] };
    if (index === null) {
      updatedTimes[day].push(value);
    } else {
      updatedTimes[day][index] = value;
    }
    setAvailableTimes(updatedTimes);
  };

  return (
    <Box p={4} bgcolor="white" boxShadow={3} borderRadius={2}>
      <Typography variant="h6" fontWeight="semibold" mb={3}>
        Delivery Options
      </Typography>

      {/* Form */}
      <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" fontWeight="medium" mb={2}>
          {isEditMode ? "Edit Delivery Option" : "Add Delivery Option"}
        </Typography>
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
        />
        {daysOfWeek.map((day) => (
          <Box key={day} mb={2}>
            <Typography fontWeight="bold" gutterBottom>
              {day}
            </Typography>
            {availableTimes[day].map((time, index) => (
              <Box
                display="flex"
                gap={2}
                alignItems="center"
                mb={1}
                key={index}
              >
                <TextField
                  value={time}
                  onChange={(e) => handleTimeChange(day, e.target.value, index)}
                  size="small"
                  placeholder="e.g., 9:00AM-12:00PM"
                />
                <Button
                  size="small"
                  color="error"
                  onClick={() =>
                    setAvailableTimes({
                      ...availableTimes,
                      [day]: availableTimes[day].filter((_, i) => i !== index),
                    })
                  }
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Button
              size="small"
              onClick={() => handleTimeChange(day, "", null)}
              sx={{ mt: 1 }}
            >
              + Add Time
            </Button>
          </Box>
        ))}
        <Box display="flex" gap={2}>
          <LoadingButton onClick={handleSubmit}>
            {isEditMode ? "Update Option" : "Add Option"}
          </LoadingButton>
          {isEditMode && (
            <Button onClick={resetForm} variant="outlined">
              Cancel
            </Button>
          )}
        </Box>
      </Card>

      {/* Display Delivery Options */}
      <Grid container spacing={2}>
        {deliveryOptions.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={option.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {option.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Available Times:
                </Typography>
                {daysOfWeek.map((day) => (
                  <Box key={day} mb={1}>
                    <Typography fontWeight="medium">{day}:</Typography>
                    {option.available_times[day]?.length ? (
                      option.available_times[day].map((time, idx) => (
                        <Chip key={idx} label={time} sx={{ mr: 1, mb: 1 }} />
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        None
                      </Typography>
                    )}
                  </Box>
                ))}
                <Box mt={2} display="flex" gap={1}>
                  <Button
                    size="small"
                    onClick={() => handleEditOption(option)}
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDeleteOption(option.id)}
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DeliveryOptions;
