import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const SLIDES = [
  {
    emoji: "🍕",
    gradient: "from-brand to-brand-dark",
    title: "Crafted fresh, delivered fast",
    subtitle: "Real ingredients, real ovens, no shortcuts.",
  },
  {
    emoji: "🧀",
    gradient: "from-accent to-brand",
    title: "Build your own, your way",
    subtitle: "Pick your base, sauce, cheese, and toppings.",
  },
  {
    emoji: "🚴",
    gradient: "from-brand-dark to-charcoal",
    title: "Track it, live",
    subtitle: "Watch your order move from oven to doorstep.",
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goTo = (index) => setCurrent(index);
  const goNext = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative h-[420px] sm:h-[480px] md:h-[560px] overflow-hidden">
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex items-center justify-center
            transition-opacity duration-700 ease-in-out
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        >
          <div className="text-center px-4 max-w-2xl">
            <div className="text-7xl sm:text-8xl mb-4">{slide.emoji}</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
              {slide.title}
            </h1>
            <p className="text-white/90 text-base sm:text-lg mb-8">{slide.subtitle}</p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/register">
                <Button variant="secondary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="lg"
                  className="!text-white border-2 border-white/40 hover:!bg-white/10"
                >
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition"
      >
        ›
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;