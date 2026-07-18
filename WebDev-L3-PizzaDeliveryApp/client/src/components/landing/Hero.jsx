import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const SLIDES = [
  {
    image: "/images/hero-1.jpg",
    eyebrow: "Fresh out of the oven",
    headlineTop: "HOT. FRESH.",
    headlineAccent: "DELIVERED.",
    subtitle: "Real ingredients, built your way, tracked live to your door.",
  },
  {
    image: "/images/hero-2.jpg",
    eyebrow: "Made your way",
    headlineTop: "YOUR BASE.",
    headlineAccent: "YOUR RULES.",
    subtitle: "5 bases, 5 sauces, endless topping combinations.",
  },
  {
    image: "/images/hero-3.jpg",
    eyebrow: "No guessing games",
    headlineTop: "WATCH IT",
    headlineAccent: "COOK LIVE.",
    subtitle: "Track your order from the kitchen to your doorstep.",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative h-[480px] sm:h-[560px] md:h-[640px] overflow-hidden bg-charcoal">
      {SLIDES.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === current ? "opacity-100 z-0" : "opacity-0 z-0"}
          `}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <div
            className="w-full h-full bg-accent/20"
            style={{ display: "none" }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent z-10" />

      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-lg">
            <span className="inline-block text-accent font-semibold text-sm tracking-wide uppercase mb-3">
              {slide.eyebrow}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              <span className="text-white block">{slide.headlineTop}</span>
              <span className="text-accent block">{slide.headlineAccent}</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-8">{slide.subtitle}</p>
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Order Now <span aria-hidden="true">→</span>
              </Button>
            </Link>

            <div className="flex gap-2 mt-8">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === current ? "w-6 bg-brand" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;