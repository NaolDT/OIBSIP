import { useState } from "react";
import api from "./api/axios";

function App() {
  const [email, setEmail] = useState("naoldera3@gmail.com");
  const [password, setPassword] = useState("test1234");
  const [token, setToken] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [log, setLog] = useState("");

  const appendLog = (msg) => setLog((prev) => prev + msg + "\n");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      appendLog("Logged in. Token acquired.");
    } catch (err) {
      appendLog("Login failed: " + err.response?.data?.message);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const res = await api.post(
        "/orders",
        {
          base: "Thin Crust",
          sauce: "Marinara",
          cheese: "Mozzarella",
          vegetables: ["Onion", "Corn"],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrderId(res.data._id);
      appendLog(`Order created: ${res.data._id}, amount: ₹${res.data.totalAmount}`);
    } catch (err) {
      appendLog("Order creation failed: " + err.response?.data?.message);
    }
  };

  const handlePay = async () => {
    try {
      const res = await api.post(
        `/orders/${orderId}/razorpay`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { razorpayOrderId, amount, currency, keyId } = res.data;

     const options = {
  key: keyId,
  amount,
  currency,
  name: "Pizza Delivery App (Test)",
  description: "Test Order Payment",
  order_id: razorpayOrderId,
  prefill: {
    name: "Naol Test",
    email: "naoldera3@gmail.com",
    contact: "9999999999", 
  },
  handler: async function (response) {
    appendLog("Razorpay checkout completed, verifying with backend...");
    try {
      const verifyRes = await api.post(
        `/orders/${orderId}/verify`,
        response,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      appendLog("Verification result: " + JSON.stringify(verifyRes.data, null, 2));
    } catch (err) {
      appendLog("Verification failed: " + err.response?.data?.message);
    }
  },
  theme: { color: "#e63946" },
};

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      appendLog("Razorpay order creation failed: " + err.response?.data?.message);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: "500px" }}>
      <h2>Razorpay Flow Test Page (temporary)</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button onClick={handleLogin}>1. Login</button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleCreateOrder} disabled={!token}>
          2. Create Order
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handlePay} disabled={!orderId}>
          3. Pay with Razorpay
        </button>
      </div>

      <pre style={{ background: "#f0f0f0", padding: "1rem", whiteSpace: "pre-wrap" }}>{log}</pre>
    </div>
  );
}

export default App;