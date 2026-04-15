import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Brain, ShieldCheck } from "lucide-react";

const steps = [
  { num: "01", icon: Upload, title: "Upload Your Contract", desc: "PDF, image, or paste text. Any format works." },
  { num: "02", icon: Brain, title: "AI Reads Every Clause", desc: "Gemini scans for risks, missing terms, and unfair conditions." },
  { num: "03", icon: ShieldCheck, title: "Get Clear Insights", desc: "Plain English explanations, risk scores, and suggested fixes." },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 border-t border-subtle relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3">The Process</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            From upload to insights in <span className="gradient-text-blue">30 seconds</span>
          </h2>
          <p className="text-secondary-custom max-w-2xl mx-auto">Three simple steps to understand any contract before you sign.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-2xl border border-subtle bg-card-dark p-8 group hover:border-primary/20 transition-all duration-300 hover:glow-blue-subtle"
            >
              <span className="absolute top-6 right-6 text-6xl font-bold text-foreground/[0.04] select-none">{step.num}</span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-secondary-custom leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Connecting arrows on desktop */}
        <div className="hidden md:flex justify-center mt-[-180px] mb-[120px] pointer-events-none">
          <div className="flex items-center gap-0 w-full max-w-2xl px-16">
            <div className="flex-1 border-t-2 border-dashed border-subtle" />
            <div className="flex-1 border-t-2 border-dashed border-subtle" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
