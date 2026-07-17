function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-muted/10 p-5 ${className}`}>
      {children}
    </div>
  );
}

export default Card;