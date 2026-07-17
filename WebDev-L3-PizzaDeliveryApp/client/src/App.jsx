import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/user/Dashboard";
import Builder from "./pages/user/Builder";
import OrderSummary from "./pages/user/OrderSummary";
import ProtectedRoute from "./routes/ProtectedRoute";
import { BuilderProvider } from "./context/BuilderContext";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/builder"
          element={
            <ProtectedRoute>
              <BuilderProvider>
                <Builder />
              </BuilderProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-summary"
          element={
            <ProtectedRoute>
              <BuilderProvider>
                <OrderSummary />
              </BuilderProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;