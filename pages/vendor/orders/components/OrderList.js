import LoadingButton from "@/LoadingButton";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
};

const OrderList = ({ title, orders = {}, onConfirm }) => {
  if (!orders.length) {
    return (
      <div className="p-4 border rounded-md shadow-md text-center">
        <p>No orders found</p>
        <p>Check back later</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`p-4 border rounded-md ${
              statusColors[order.status]
            } shadow-md`}
          >
            <div>
              <strong>Customer Name:</strong> {order.customer_name}
            </div>
            <div>
              <strong>Phone:</strong> {order.customer_phone}
            </div>
            <div>
              <strong>Delivery Location:</strong> {order.delivery_location}
            </div>
            <div>
              <strong>Delivery Date:</strong> {order.delivery_date}
            </div>
            {order.proof_of_payment_url && (
              <div>
                <strong>Proof of Payment:</strong>{" "}
                <a
                  href={order.proof_of_payment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View
                </a>
              </div>
            )}
            {order.status === "pending" && (
              <LoadingButton
                onClick={() => onConfirm(order.id, order.proof_of_payment_url)}
                label="Confirm Order"
                className="mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
