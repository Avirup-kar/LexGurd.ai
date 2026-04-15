import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import HowItWorks from "@/components/HowItWorks";
import ProductShowcase from "@/components/ProductShowcase";
import RiskTypes from "@/components/RiskTypes";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

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
