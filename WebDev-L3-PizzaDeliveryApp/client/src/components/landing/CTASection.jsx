import { Link } from "react-router-dom";
import Button from "../ui/Button";

function CTASection() {
  return (
    <section className="bg-charcoal py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Ready to build your pizza?
        </h2>
        <p className="text-white/70 mb-8">
          Create an account and place your first order in under two minutes.
        </p>
        <Link to="/register">
          <Button variant="secondary" size="lg">
            Create Free Account
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default CTASection;