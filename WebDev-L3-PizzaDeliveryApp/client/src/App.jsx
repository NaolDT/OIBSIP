import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/user/Dashboard";
import Builder from "./pages/user/Builder";
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
      <Builder />
    </ProtectedRoute>
  }
/>
      </Routes>
      
    </>
  );
}

export default App;