function Input({ label, error, id, ...rest }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-charcoal mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full px-4 py-2.5 rounded-lg border
          text-charcoal placeholder:text-muted/60
          focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent
          transition
          ${error ? "border-warning" : "border-muted/30"}
        `}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-warning">{error}</p>}
    </div>
  );
}

export default Input;