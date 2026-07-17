import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../../api/authApi";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, { password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        {success ? (
          <>
            <h1 className="text-2xl font-bold text-success mb-2">Password reset!</h1>
            <p className="text-muted">Redirecting you to login...</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-charcoal mb-1">Set a new password</h1>
            <p className="text-muted text-sm mb-6">Choose something secure.</p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-warning/10 text-warning text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="password"
                type="password"
                label="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button type="submit" fullWidth disabled={loading}>
                {loading ? "Resetting..." : "Reset password"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              <Link to="/login" className="text-brand font-semibold hover:underline">
                Back to login
              </Link>
            </p>
          </>
        )}
      </Card>
    </div>
  );
}

export default ResetPassword;