import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../api/orderApi";
import Card from "../../components/ui/Card";

const STATUS_COLORS = {
  "Order Received": "bg-muted/20 text-muted",
  "In Kitchen": "bg-accent/20 text-accent",
  "Sent to Delivery": "bg-success/20 text-success",
};

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-charcoal mb-6">My Orders</h1>

        {loading && <p className="text-muted">Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <Card className="text-center">
            <p className="text-muted mb-4">You haven't placed any orders yet.</p>
            <Link to="/builder" className="text-brand font-semibold hover:underline">
              Build your first pizza →
            </Link>
          </Card>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order._id} to={`/orders/${order._id}`}>
              <Card className="hover:shadow-md transition cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-charcoal">
                    #{order._id.slice(-6).toUpperCase()}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[order.orderStatus]}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <p className="text-sm text-muted">
                  {order.pizza.base} • {order.pizza.sauce} • {order.pizza.cheese}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className="font-bold text-brand">₹{order.totalAmount}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;