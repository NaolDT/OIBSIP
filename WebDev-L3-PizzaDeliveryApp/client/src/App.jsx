import { Routes, Route,Navigate } from "react-router-dom";
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
import OrderTracking from "./pages/user/OrderTracking";
import MyOrders from "./pages/user/MyOrders";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminRoute from "./routes/AdminRoute";
import Landing from "./pages/Landing";
import { useAuth } from "./context/AuthContext";

function HomeRoute() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin/inventory" : "/dashboard"} replace />;
  }
  return <Landing />;
}
function App() {
  return (
    <>
      <Navbar />
      <BuilderProvider>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
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
             
                <Builder />
           
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-summary"
          element={
            <ProtectedRoute>
            
                <OrderSummary />
              
            </ProtectedRoute>
          }
        />
        <Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <OrderTracking />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>
<Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin/inventory"
  element={
    <AdminRoute>
      <AdminInventory />
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>

      </Routes>
      </BuilderProvider>
    </>
  );
}

export default App;