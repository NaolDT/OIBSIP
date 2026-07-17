import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../../api/orderApi";
import Card from "../../components/ui/Card";

const STATUS_STEPS = ["Order Received", "In Kitchen", "Sent to Delivery"];

function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res.data);

        if (res.data.orderStatus === "Sent to Delivery") {
          clearInterval(intervalRef.current);
        }
      } catch {
        setError("Could not load order");
        clearInterval(intervalRef.current);
      }
    };

    fetchOrder(); 
    intervalRef.current = setInterval(fetchOrder, 5000);
    return () => clearInterval(intervalRef.current);
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <p className="text-warning">{error}</p>
        </Card>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <p className="text-muted">Loading order...</p>
      </div>
    );
  }

  const currentIndex = STATUS_STEPS.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-charcoal mb-2">Order Tracking</h1>
        <p className="text-muted text-sm mb-8">Order #{order._id.slice(-6).toUpperCase()}</p>

        <Card className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {STATUS_STEPS.map((label, index) => (
              <div key={label} className="flex-1 flex flex-col items-center relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm z-10
                    ${index <= currentIndex ? "bg-brand text-white" : "bg-muted/20 text-muted"}
                  `}
                >
                  {index < currentIndex ? "✓" : index + 1}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    index <= currentIndex ? "text-charcoal font-medium" : "text-muted"
                  }`}
                >
                  {label}
                </span>
                {index < STATUS_STEPS.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-0.5 ${
                      index < currentIndex ? "bg-brand" : "bg-muted/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-charcoal mb-3">Your pizza</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Base</dt>
              <dd className="text-charcoal">{order.pizza.base}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Sauce</dt>
              <dd className="text-charcoal">{order.pizza.sauce}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Cheese</dt>
              <dd className="text-charcoal">{order.pizza.cheese}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Vegetables</dt>
              <dd className="text-charcoal text-right">
                {order.pizza.vegetables.length > 0 ? order.pizza.vegetables.join(", ") : "None"}
              </dd>
            </div>
          </dl>
          <div className="border-t border-muted/10 mt-3 pt-3 flex justify-between">
            <span className="text-muted">Total Paid</span>
            <span className="font-bold text-brand">₹{order.totalAmount}</span>
          </div>
        </Card>

        <Link to="/my-orders" className="block text-center mt-6 text-brand font-semibold hover:underline">
          View all orders
        </Link>
      </div>
    </div>
  );
}

export default OrderTracking;