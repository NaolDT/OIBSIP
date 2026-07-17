import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(form.email, form.password);

      if (user.role !== "admin") {
        setError("This login is for administrators only.");
        setLoading(false);
        return;
      }

      navigate("/admin/inventory");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-3xl">🔒</span>
          <h1 className="text-2xl font-bold text-charcoal mt-2">Admin Access</h1>
          <p className="text-muted text-sm">PizzaHub internal dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-warning/10 text-warning text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Admin email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AdminLogin;