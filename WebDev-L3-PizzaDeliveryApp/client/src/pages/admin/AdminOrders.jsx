import { useEffect, useState } from "react";
import { getAllOrdersAdmin, updateOrderStatusAdmin } from "../../api/orderApi";
import Card from "../../components/ui/Card";

const STATUS_FLOW = ["Order Received", "In Kitchen", "Sent to Delivery"];

const STATUS_COLORS = {
  "Order Received": "bg-muted/20 text-muted",
  "In Kitchen": "bg-accent/20 text-accent",
  "Sent to Delivery": "bg-success/20 text-success",
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    getAllOrdersAdmin()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await updateOrderStatusAdmin(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: res.data.order.orderStatus } : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="text-center text-muted py-10">Loading orders...</p>;

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-charcoal mb-6">Order Management</h1>

        {orders.length === 0 && <p className="text-muted">No orders yet.</p>}

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-charcoal">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[order.orderStatus]}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="text-sm text-muted">
                    {order.user?.name} ({order.user?.email})
                  </p>
                  <p className="text-sm text-muted">
                    {order.pizza.base} • {order.pizza.sauce} • {order.pizza.cheese}
                    {order.pizza.vegetables.length > 0 && ` • ${order.pizza.vegetables.join(", ")}`}
                  </p>
                  <p className="text-sm font-semibold text-brand mt-1">₹{order.totalAmount}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {STATUS_FLOW.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(order._id, status)}
                      disabled={updatingId === order._id || order.orderStatus === status}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition
                        ${
                          order.orderStatus === status
                            ? "bg-brand text-white cursor-default"
                            : "bg-muted/10 text-charcoal hover:bg-muted/20 cursor-pointer"
                        }
                        disabled:opacity-50
                      `}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;