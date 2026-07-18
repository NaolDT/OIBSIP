import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { icon: "🍞", label: "Bases", description: "5 crust styles" },
  { icon: "🍅", label: "Sauces", description: "5 signature sauces" },
  { icon: "🧀", label: "Cheeses", description: "3 cheese options" },
  { icon: "🥦", label: "Vegetables", description: "Mix & match toppings" },
];

function CategoryStrip() {
  const navigate = useNavigate();

  return (
    <section className="bg-white border-b border-muted/10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 overflow-x-auto sm:overflow-visible sm:justify-center sm:flex-wrap pb-2 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate("/builder")}
              className="flex-shrink-0 flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border border-muted/10 hover:border-brand/40 hover:bg-brand/5 transition min-w-[120px]"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-semibold text-charcoal text-sm">{cat.label}</span>
              <span className="text-xs text-muted">{cat.description}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryStrip;