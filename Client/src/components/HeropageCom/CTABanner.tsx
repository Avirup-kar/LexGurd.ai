import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTABanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();


  return (
    <section className="py-28 border-t border-subtle relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
      </div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          Your next contract could <span className="gradient-text-red">cost you everything</span>
        </h2>
        <p className="text-secondary-custom text-lg mb-10 max-w-xl mx-auto">
          Or you could know exactly what you're signing. Try ClauseGuard free — no credit card required.
        </p>
        <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg btn-blue text-foreground font-medium glow-blue text-base transition-all">
          Analyze My First Contract Free <ArrowRight className="h-5 w-5" />
        </button>
        <p className="text-xs text-secondary-custom mt-6">Join 10,000+ people who sign with confidence</p>
      </motion.div>
    </section>
  );
};

export default CTABanner;
