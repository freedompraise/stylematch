import { useState, useEffect } from "react";
import { useAuth } from "context/useAuthContext";
import { getVendorOrders, confirmOrder, deleteOrder } from "@/api/vendor";
import { deleteImageFromCloudinary } from "@/cloudinary";
import { getPublicId } from "@/utils";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import Breadcrumb from "@/Breadcrumb";

const OrdersPage = () => {
  const { vendor } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (vendor) {
      fetchOrders();
    }
  }, [vendor]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { success, orders: fetchedOrders } = await getVendorOrders(
        vendor.user_id
      );
      if (!success) throw new Error("Failed to fetch orders.");
      setOrders(fetchedOrders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async (order) => {
    try {
      if (order.payment_proof_url) {
        await deleteImageFromCloudinary(getPublicId(order.payment_proof_url));
      }
      const { success } = await confirmOrder(order.id);
      if (!success) throw new Error("Failed to confirm order.");
      fetchOrders();
    } catch (err) {
      alert(err.message || "Failed to confirm order.");
    }
  };

  const handleDeleteOrder = async (order) => {
    try {
      if (order.payment_proof_url) {
        await deleteImageFromCloudinary(getPublicId(order.payment_proof_url));
      }
      const { success } = await deleteOrder(order.id);
      if (!success) throw new Error("Failed to delete order.");
      fetchOrders();
    } catch (err) {
      alert(err.message || "Failed to delete order.");
    }
  };

  return (
    <Container className="py-8">
      <Breadcrumb links={[{ href: "/", label: "Home" }, { label: "Orders" }]} />
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Delivery Location</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography align="center" variant="subtitle1">
                      No orders available Yet.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order.customer_phone}</TableCell>
                  <TableCell>{order.delivery_location}</TableCell>
                  <TableCell>
                    {new Date(order.delivery_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleConfirmOrder(order)}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDeleteOrder(order)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default OrdersPage;
