import { useEffect, useState } from "react";
import { getInventoryByCategory } from "../../../api/inventoryApi";
import { useBuilder } from "../../../context/BuilderContext";
import IngredientOption from "../../../components/builder/IngredientOption";

function StepCheese() {
  const { selection, selectCheese } = useBuilder();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInventoryByCategory("cheese")
      .then((res) => setOptions(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted text-center">Loading cheeses...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold text-charcoal mb-4">Choose your cheese</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((item) => (
          <IngredientOption
            key={item._id}
            name={item.name}
            stock={item.stock}
            selected={selection.cheese === item.name}
            onClick={() => selectCheese(item.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default StepCheese;