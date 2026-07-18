const variantStyles = {
  primary: "bg-brand text-white shadow-md shadow-brand/25 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30",
  secondary: "bg-accent text-charcoal shadow-md shadow-accent/25 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30",
  outline: "border-2 border-brand text-brand bg-transparent hover:bg-brand hover:text-white",
  ghost: "text-charcoal hover:bg-charcoal/5",
  danger: "bg-warning text-white shadow-md shadow-warning/25 hover:bg-warning/90 hover:shadow-lg",
};

const sizeStyles = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        rounded-xl font-semibold tracking-tight
        transition-all duration-200 ease-out
        active:scale-[0.97]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed shadow-none active:scale-100" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;