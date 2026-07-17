import { useEffect, useState } from "react";
import { getInventoryByCategory } from "../../../api/inventoryApi";
import { useBuilder } from "../../../context/BuilderContext";
import IngredientOption from "../../../components/builder/IngredientOption";

function StepSauce() {
  const { selection, selectSauce } = useBuilder();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInventoryByCategory("sauce")
      .then((res) => setOptions(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted text-center">Loading sauces...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold text-charcoal mb-4">Choose your sauce</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((item) => (
          <IngredientOption
            key={item._id}
            name={item.name}
            stock={item.stock}
            selected={selection.sauce === item.name}
            onClick={() => selectSauce(item.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default StepSauce;