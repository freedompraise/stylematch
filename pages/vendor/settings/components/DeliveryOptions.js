import { useState, useEffect } from "react";
import {
  getDeliveryOptions,
  updateDeliveryOption,
  addDeliveryOption,
  deleteDeliveryOption,
} from "@/api/vendor";
import LoadingButton from "@/LoadingButton";
import CustomToast from "@/CustomToast";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DeliveryOptions = ({ vendorId }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [newAvailableTimes, setNewAvailableTimes] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );
  const [editOptionId, setEditOptionId] = useState(null);
  const [editLocation, setEditLocation] = useState("");
  const [editAvailableTimes, setEditAvailableTimes] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );

  useEffect(() => {
    (async () => {
      const { deliveryOptions: options, error } = await getDeliveryOptions(
        vendorId
      );
      if (!error) {
        setDeliveryOptions(options);
      }
    })();
  }, [vendorId]);

  const validateDeliveryOption = (location, availableTimes) => {
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

  const handleAddOption = async () => {
    if (!validateDeliveryOption(newLocation, newAvailableTimes)) return;

    const newOption = {
      location: newLocation,
      available_times: newAvailableTimes,
      vendor_id: vendorId,
    };

    const { success } = await addDeliveryOption(newOption);
    if (success) {
      CustomToast.success("Delivery option added successfully!");
      setDeliveryOptions((prev) => [...prev, newOption]);
      setNewLocation("");
      setNewAvailableTimes(
        daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
      );
    }
  };

  const handleUpdateOption = async () => {
    if (!validateDeliveryOption(editLocation, editAvailableTimes)) return;

    const updatedData = {
      location: editLocation,
      available_times: editAvailableTimes,
    };

    const { success } = await updateDeliveryOption(editOptionId, updatedData);
    if (success) {
      setDeliveryOptions((prev) =>
        prev.map((option) =>
          option.id === editOptionId ? { ...option, ...updatedData } : option
        )
      );
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditOptionId(null);
    setEditLocation("");
    setEditAvailableTimes(
      daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
    );
  };

  const handleDeleteOption = async (id) => {
    const { success } = await deleteDeliveryOption(id);
    if (success) {
      CustomToast.success("Delivery option deleted successfully!");
      setDeliveryOptions((prev) => prev.filter((option) => option.id !== id));
    }
  };

  const handleTimeChange = (day, value, index, times) => {
    const updatedTimes = {
      ...times,
      [day]: [...times[day]],
    };
    if (index === null) {
      updatedTimes[day].push(value);
    } else {
      updatedTimes[day][index] = value;
    }
    return updatedTimes;
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h5 className="text-xl font-semibold mb-4">Delivery Options</h5>
      <div className="space-y-4">
        {deliveryOptions.map((option) => (
          <div key={option.id} className="p-4 border rounded-md">
            {editOptionId === option.id ? (
              <>
                <input
                  type="text"
                  placeholder="Location"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md my-2"
                />
                {daysOfWeek.map((day) => (
                  <div key={day} className="mb-2">
                    <label className="block font-semibold capitalize">
                      {day}
                    </label>
                    {editAvailableTimes[day].map((time, index) => (
                      <div key={index} className="flex space-x-2 items-center">
                        <input
                          type="text"
                          value={time}
                          onChange={(e) =>
                            setEditAvailableTimes(
                              handleTimeChange(
                                day,
                                e.target.value,
                                index,
                                editAvailableTimes
                              )
                            )
                          }
                          className="border px-3 py-1 rounded-md w-full"
                        />
                      </div>
                    ))}
                    <button
                      className="text-blue-500 hover:underline text-sm"
                      onClick={() =>
                        setEditAvailableTimes(
                          handleTimeChange(day, "", null, editAvailableTimes)
                        )
                      }
                    >
                      + Add Time
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2 mt-4">
                  <LoadingButton
                    onClick={handleUpdateOption}
                    className="w-full"
                    label="Save Changes"
                  />
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-200 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <span className="font-bold">Location:</span> {option.location}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Available Times:</span>{" "}
                  {JSON.stringify(option.available_times)}
                </div>
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => {
                    setEditOptionId(option.id);
                    setEditLocation(option.location);
                    setEditAvailableTimes(option.available_times);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteOption(option.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
        <div className="p-4 border rounded-md">
          <h4 className="text-lg font-semibold">Add Delivery Option</h4>
          <input
            type="text"
            placeholder="Location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="w-full border px-3 py-2 rounded-md my-2"
          />
          {daysOfWeek.map((day) => (
            <div key={day} className="mb-2">
              <label className="block font-semibold capitalize">{day}</label>
              {newAvailableTimes[day].map((time, index) => (
                <div key={index} className="flex space-x-2 items-center">
                  <input
                    type="text"
                    placeholder="e.g., 9:00AM-12:00PM"
                    value={time}
                    onChange={(e) =>
                      setNewAvailableTimes(
                        handleTimeChange(
                          day,
                          e.target.value,
                          index,
                          newAvailableTimes
                        )
                      )
                    }
                    className="border px-3 py-1 rounded-md w-full"
                  />
                </div>
              ))}
              <button
                className="text-blue-500 hover:underline text-sm"
                onClick={() =>
                  setNewAvailableTimes(
                    handleTimeChange(day, "", null, newAvailableTimes)
                  )
                }
              >
                + Add Time
              </button>
            </div>
          ))}
          <LoadingButton
            onClick={handleAddOption}
            className="w-full"
            label="Add Delivery Option"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
