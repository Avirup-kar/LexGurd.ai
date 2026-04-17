import Navbar from "@/components/HeropageCom/Navbar";
import HeroSection from "@/components/HeropageCom/HeroSection";
import SocialProofBar from "@/components/HeropageCom/SocialProofBar";
import HowItWorks from "@/components/HeropageCom/HowItWorks";
import ProductShowcase from "@/components/HeropageCom/ProductShowcase";
import RiskTypes from "@/components/HeropageCom/RiskTypes";
import Testimonials from "@/components/HeropageCom/Testimonials";
import CTABanner from "@/components/HeropageCom/CTABanner";
import Footer from "@/components/HeropageCom/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <SocialProofBar />
    <HowItWorks />
    <ProductShowcase />
    <RiskTypes />
    <Testimonials />
    <CTABanner />
    <Footer />
  </div>
);

export default Index;
