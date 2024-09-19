import React, { useState, useEffect } from "react";
import { getDeliveries, createDelivery } from "../api/vendor";

const DeliveryPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState({ time: "", location: "" });

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    const data = await getDeliveries();
    setDeliveries(data);
  };

  const handleCreateDelivery = async () => {
    await createDelivery(newDelivery);
    setNewDelivery({ time: "", location: "" });
    fetchDeliveries();
  };

  const handleMarkAsCompleted = (id) => {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delivery Management</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create New Delivery</h2>
        <input
          type="text"
          placeholder="Time"
          value={newDelivery.time}
          onChange={(e) =>
            setNewDelivery({ ...newDelivery, time: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={newDelivery.location}
          onChange={(e) =>
            setNewDelivery({ ...newDelivery, location: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreateDelivery}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Delivery
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Pending Deliveries</h2>
        <ul>
          {deliveries.map((delivery) => (
            <li
              key={delivery.id}
              className="border p-2 mb-2 flex justify-between items-center"
            >
              <div>
                <p>Time: {delivery.time}</p>
                <p>Location: {delivery.location}</p>
              </div>
              <button
                onClick={() => handleMarkAsCompleted(delivery.id)}
                className="bg-green-500 text-white p-2 rounded"
              >
                Mark as Completed
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeliveryPage;
