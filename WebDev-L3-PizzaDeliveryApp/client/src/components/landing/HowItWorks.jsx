const STEPS = [
  { number: "1", title: "Build", description: "Pick your base, sauce, cheese, and toppings." },
  { number: "2", title: "Pay", description: "Secure checkout, done in seconds." },
  { number: "3", title: "Track", description: "Watch your order move in real time." },
  { number: "4", title: "Enjoy", description: "Hot, fresh, right at your door." },
];

function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal text-center mb-12">
          How it works
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand text-white font-extrabold text-xl flex items-center justify-center mb-4">
                {step.number}
              </div>
              <h3 className="font-bold text-charcoal mb-1">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>

              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-muted/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;