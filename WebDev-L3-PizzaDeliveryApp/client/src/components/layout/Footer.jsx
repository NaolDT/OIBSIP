function Footer() {
  return (
    <footer className="bg-charcoal text-white/60 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-white font-bold">🍕 PizzaHub</span>
       
        <span className="text-sm">&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export default Footer;