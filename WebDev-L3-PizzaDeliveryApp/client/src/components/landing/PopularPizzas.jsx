import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPizzas } from "../../api/pizzaApi";
import Card from "../ui/Card";

function PopularPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPizzas()
      .then((res) => setPizzas(res.data.slice(0, 4))) // just the first 4 as a "popular" preview
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
          Popular Pizzas <span aria-hidden="true">🔥</span>
        </h2>
        <button
          onClick={() => navigate("/register")}
          className="text-brand font-semibold text-sm hover:underline flex items-center gap-1"
        >
          View All <span aria-hidden="true">→</span>
        </button>
      </div>

      {loading && <p className="text-muted">Loading menu...</p>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {pizzas.map((pizza) => (
          <Card key={pizza._id} className="!p-0 overflow-hidden group">
            <div className="h-32 sm:h-40 bg-accent/20 relative overflow-hidden flex items-center justify-center">
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

              <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-success/90 text-white">
                Veg
              </span>

              <button
                onClick={() => navigate("/register")}
                aria-label={`Order ${pizza.name}`}
                className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-brand hover:bg-brand-dark text-white flex items-center justify-center text-lg font-bold shadow-md transition"
              >
                +
              </button>
            </div>

            <div className="p-3 sm:p-4">
              <h3 className="font-bold text-charcoal text-sm sm:text-base">{pizza.name}</h3>
              <p className="text-xs text-muted mt-0.5 line-clamp-1">{pizza.description}</p>
              <span className="text-brand font-bold text-sm sm:text-base mt-1 block">
                ₹{pizza.basePrice}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default PopularPizzas;