const FEATURES = [
  {
    icon: "🎨",
    title: "Build Your Own",
    description: "Choose from 5 bases, 5 sauces, multiple cheeses and toppings — your pizza, your rules.",
  },
  {
    icon: "⚡",
    title: "Live Order Tracking",
    description: "Watch your order move from the kitchen to your door in real time.",
  },
  {
    icon: "🔒",
    title: "Secure Checkout",
    description: "Payments processed securely — no card details ever touch our servers.",
  },
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    description: "We track our inventory closely so you always get the freshest toppings.",
  },
];

function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mb-2">
          Why order from PizzaHub?
        </h2>
        <p className="text-muted max-w-xl mx-auto">
          We built the ordering experience we always wanted — fast, transparent, and genuinely customizable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl p-6 border border-muted/10 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="font-bold text-charcoal mb-2">{feature.title}</h3>
            <p className="text-sm text-muted">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;