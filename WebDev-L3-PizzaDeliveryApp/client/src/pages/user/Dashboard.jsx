import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPizzas } from "../../api/pizzaApi";
import { useAuth } from "../../context/AuthContext";
import { useBuilder } from "../../context/BuilderContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Dashboard() {
  const { user } = useAuth();
  const { loadSelection } = useBuilder();
  const navigate = useNavigate();
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllPizzas()
      .then((res) => setPizzas(res.data))
      .catch(() => setError("Could not load pizzas right now"))
      .finally(() => setLoading(false));
  }, []);

  const handleCustomize = (pizza) => {
    loadSelection(
      { base: pizza.base, sauce: pizza.sauce, cheese: pizza.cheese, vegetables: pizza.vegetables },
      1
    );
    navigate("/builder");
  };

  const handleBuyNow = (pizza) => {
    loadSelection(
      { base: pizza.base, sauce: pizza.sauce, cheese: pizza.cheese, vegetables: pizza.vegetables },
    );
    navigate("/order-summary");
  };

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
          <Button variant="secondary" size="lg" onClick={() => navigate("/builder")}>
            🍕 Build Your Own Pizza
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-charcoal mb-6">Our Favorites</h2>

        {loading && <p className="text-muted">Loading menu...</p>}
        {error && <p className="text-warning">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pizzas.map((pizza) => (
              <Card key={pizza._id} className="flex flex-col overflow-hidden !p-0 group">
                <div className="h-40 bg-accent/20 flex items-center justify-center overflow-hidden relative">
                  {pizza.image ? (
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <span
                    className="text-4xl w-full h-full items-center justify-center"
                    style={{ display: pizza.image ? "none" : "flex" }}
                  >
                    🍕
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-charcoal">{pizza.name}</h3>
                  <p className="text-muted text-sm mt-1 flex-1">{pizza.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {pizza.vegetables.slice(0, 3).map((veg) => (
                      <span key={veg} className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">
                        {veg}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-brand font-bold text-lg">₹{pizza.basePrice}</span>
                    <button
                      onClick={() => handleCustomize(pizza)}
                      className="text-sm font-semibold text-brand hover:text-brand-dark hover:underline transition"
                    >
                      Customize
                    </button>
                  </div>

                  <Button fullWidth size="md" className="mt-3" onClick={() => handleBuyNow(pizza)}>
                    Buy Now — ₹{pizza.basePrice}
                  </Button>
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