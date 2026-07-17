import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await forgotPassword({ email });
      setMessage(res.data.message);
    } catch {
      
      setMessage("If that email exists, a reset link has been sent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-charcoal mb-1">Reset your password</h1>
        <p className="text-muted text-sm mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-success/10 text-success text-sm">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/login" className="text-brand font-semibold hover:underline">
            Back to login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default ForgotPassword;