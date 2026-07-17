const variantStyles = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-accent text-charcoal hover:bg-accent/90",
  outline: "border-2 border-brand text-brand hover:bg-brand hover:text-white",
  ghost: "text-charcoal hover:bg-charcoal/5",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
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
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg font-semibold transition-colors duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;