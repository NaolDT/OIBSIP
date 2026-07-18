import HeroCarousel from "../components/landing/HeroCarousel";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/layout/Footer";

function Landing() {
  return (
    <div className="bg-cream">
      <HeroCarousel />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Landing;