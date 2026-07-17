import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPizzas } from "../../api/pizzaApi";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Dashboard() {
  const { user } = useAuth();
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllPizzas()
      .then((res) => setPizzas(res.data))
      .catch(() => setError("Could not load pizzas right now"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-gradient-to-br from-brand to-brand-dark text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
            Hey {user?.name?.split(" ")[0]}, hungry?
          </h1>
          <p className="text-white/90 text-base sm:text-lg mb-6 max-w-xl">
            Pick a favorite below, or design your own pizza from scratch — your base, your sauce, your toppings.
          </p>
          <Link to="/builder">
            <Button variant="secondary" size="lg">
              🍕 Build Your Own Pizza
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-charcoal mb-6">Our Favorites</h2>

        {loading && <p className="text-muted">Loading menu...</p>}
        {error && <p className="text-warning">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pizzas.map((pizza) => (
              <Card key={pizza._id} className="flex flex-col">
                <div className="h-40 bg-accent/20 rounded-lg mb-4 flex items-center justify-center text-4xl">
                  🍕
                </div>
                <h3 className="text-lg font-bold text-charcoal">{pizza.name}</h3>
                <p className="text-muted text-sm mt-1 flex-1">{pizza.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-brand font-bold text-lg">₹{pizza.basePrice}</span>
                  <Link to="/builder">
                    <Button size="sm" variant="outline">
                      Customize
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;