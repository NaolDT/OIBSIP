import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-7xl mb-4">🍕</div>
        <h1 className="text-4xl font-extrabold text-charcoal mb-2">404</h1>
        <p className="text-muted mb-8">
          Looks like this slice went missing. The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;