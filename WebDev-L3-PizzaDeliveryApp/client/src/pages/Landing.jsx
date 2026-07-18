import Hero from "../components/landing/Hero";
import CategoryStrip from "../components/landing/CategoryStrip";
import PopularPizzas from "../components/landing/PopularPizzas";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/layout/Footer";

function Landing() {
  return (
    <div className="bg-cream">
      <Hero />
      <CategoryStrip />
      <PopularPizzas />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Landing;