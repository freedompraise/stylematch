import { useEffect, useState } from "react";
import { getOrders, confirmOrder, deliverOrder } from "@/api/vendor";
import OrderList from "./components/OrderList";
import CustomToast from "@/CustomToast";

const OrdersPage = ({ vendorId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const { orders, error } = await getOrders(vendorId);
      if (error) {
        CustomToast.error("Failed to fetch orders!");
      } else {
        setOrders(orders);
      }
    };
    fetchOrders();
  }, [vendorId]);

  const handleConfirmOrder = async (orderId, proofOfPaymentUrl) => {
    setLoading(true);
    const { success, error } = await confirmOrder(orderId, proofOfPaymentUrl);
    setLoading(false);

    if (success) {
      CustomToast.success("Order confirmed successfully!");
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: "confirmed", proof_of_payment_url: null }
            : order
        )
      );
    } else {
      CustomToast.error("Failed to confirm order!");
    }
  };

  const categorizedOrders = {
    pending: orders.filter((order) => order.status === "pending"),
    confirmed: orders.filter((order) => order.status === "confirmed"),
    delivered: orders.filter((order) => order.status === "delivered"),
  };

  return (
    <div className="p-4 lg:p-12 container bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>
      <OrderList
        title="Pending Orders"
        orders={categorizedOrders.pending}
        onConfirm={handleConfirmOrder}
      />
      <OrderList
        title="Confirmed Orders"
        orders={categorizedOrders.confirmed}
      />
      <OrderList
        title="Delivered Orders"
        orders={categorizedOrders.delivered}
      />
    </div>
  );
};

export default OrdersPage;
