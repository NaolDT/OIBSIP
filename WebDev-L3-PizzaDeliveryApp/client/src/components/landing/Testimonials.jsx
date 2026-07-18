const TESTIMONIALS = [
  {
    name: "Amara T.",
    quote: "The build-your-own flow is dangerously fun. I've made six different combos this month.",
  },
  {
    name: "Dawit K.",
    quote: "Being able to actually watch my order move to 'In Kitchen' made the wait feel shorter somehow.",
  },
  {
    name: "Selam G.",
    quote: "Checkout took less than a minute. No account confusion, no weird redirects.",
  },
];

function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal text-center mb-12">
        Loved by pizza people
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="bg-white rounded-2xl p-6 border border-muted/10">
            <div className="text-accent text-lg mb-3">★★★★★</div>
            <p className="text-charcoal text-sm mb-4">"{t.quote}"</p>
            <p className="text-muted text-sm font-semibold">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;