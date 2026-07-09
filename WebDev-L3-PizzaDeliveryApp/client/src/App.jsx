import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    api
      .get("/health")
      .then((res) => setStatus(res.data.message))
      .catch(() => setStatus("Could not reach server"));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Pizza Delivery App</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;