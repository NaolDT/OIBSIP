import { useEffect, useState,useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "../../api/authApi";
import Card from "../../components/ui/Card";

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; 
    hasRun.current = true;

    verifyEmail(token)
      .then((res) => {
        setStatus("success");
        setMessage(res.data.message);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed");
      });
  }, [token]);


  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        {status === "verifying" && <p className="text-muted">Verifying your email...</p>}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-success mb-2">Email verified!</h1>
            <p className="text-muted mb-6">{message}</p>
            <Link to="/login" className="text-brand font-semibold hover:underline">
              Go to login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-warning mb-2">Verification failed</h1>
            <p className="text-muted">{message}</p>
          </>
        )}
      </Card>
    </div>
  );
}

export default VerifyEmail;