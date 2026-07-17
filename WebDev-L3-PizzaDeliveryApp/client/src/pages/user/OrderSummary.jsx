import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuilder } from "../../context/BuilderContext";
import { createOrder, createRazorpayOrder, verifyPayment } from "../../api/orderApi";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const BASE_PRICES = {
  "Thin Crust": 100,
  "Thick Crust": 110,
  "Whole Wheat": 120,
  "Cheese Burst": 150,
  "Gluten Free": 160,
};
const SAUCE_PRICE = 20;
const CHEESE_PRICE = 30;
const VEGETABLE_PRICE = 10;

function estimatePrice({ base, sauce, cheese, vegetables }) {
  const basePrice = BASE_PRICES[base] || 0;
  return basePrice + (sauce ? SAUCE_PRICE : 0) + (cheese ? CHEESE_PRICE : 0) + vegetables.length * VEGETABLE_PRICE;
}

function OrderSummary() {
  const { selection, resetBuilder } = useBuilder();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const estimatedTotal = estimatePrice(selection);

  const handleConfirmAndPay = async () => {
    setError("");
    setProcessing(true);

    try {
      const orderRes = await createOrder(selection);
      const order = orderRes.data;

      const razorpayRes = await createRazorpayOrder(order._id);
      const { razorpayOrderId, amount, currency, keyId } = razorpayRes.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "PizzaHub",
        description: "Pizza Order Payment",
        order_id: razorpayOrderId,
        prefill: {
          contact: "9999999999", 
        },
        handler: async function (response) {
          try {
            await verifyPayment(order._id, response);
            resetBuilder();
            navigate(`/orders/${order._id}`);
          } catch {
            setError("Payment succeeded but verification failed. Contact support.");
          }
        },
        modal: {
          ondismiss: () => setProcessing(false), 
        },
        theme: { color: "#E63946" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong creating your order");
      setProcessing(false);
    }
  };

  
  if (!selection.base || !selection.sauce || !selection.cheese) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <p className="text-muted mb-4">No pizza selection found.</p>
          <Button onClick={() => navigate("/builder")}>Start Building</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-charcoal mb-6">Order Summary</h1>

        <Card className="mb-6">
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-muted">Base</dt>
              <dd className="font-semibold text-charcoal">{selection.base}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Sauce</dt>
              <dd className="font-semibold text-charcoal">{selection.sauce}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Cheese</dt>
              <dd className="font-semibold text-charcoal">{selection.cheese}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Vegetables</dt>
              <dd className="font-semibold text-charcoal text-right">
                {selection.vegetables.length > 0 ? selection.vegetables.join(", ") : "None"}
              </dd>
            </div>
          </dl>

          <div className="border-t border-muted/10 mt-4 pt-4 flex justify-between items-center">
            <span className="text-muted">Estimated Total</span>
            <span className="text-2xl font-extrabold text-brand">₹{estimatedTotal}</span>
          </div>
        </Card>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-warning/10 text-warning text-sm">{error}</div>
        )}

        <Button fullWidth size="lg" onClick={handleConfirmAndPay} disabled={processing}>
          {processing ? "Processing..." : "Confirm & Pay"}
        </Button>
      </div>
    </div>
  );
}

export default OrderSummary;