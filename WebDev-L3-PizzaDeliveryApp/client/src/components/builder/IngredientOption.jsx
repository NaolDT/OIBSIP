function IngredientOption({ name, stock, selected, onClick, multiSelect = false }) {
  const outOfStock = stock <= 0;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={outOfStock}
      className={`
        relative p-4 rounded-xl border-2 text-left transition
        ${selected ? "border-brand bg-brand/5" : "border-muted/20 bg-white"}
        ${outOfStock ? "opacity-40 cursor-not-allowed" : "hover:border-brand/50 cursor-pointer"}
      `}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-charcoal">{name}</span>
        {selected && (
          <span className="w-5 h-5 rounded-full bg-brand text-white text-xs flex items-center justify-center">
            ✓
          </span>
        )}
      </div>
      {outOfStock && <span className="text-xs text-warning">Out of stock</span>}
      {multiSelect && !outOfStock && !selected && (
        <span className="text-xs text-muted">Tap to add</span>
      )}
    </button>
  );
}

export default IngredientOption;