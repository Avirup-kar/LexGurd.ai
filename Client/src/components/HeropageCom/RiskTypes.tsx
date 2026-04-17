import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const risks = [
  { dot: "#EF4444", title: "Unlimited Liability", desc: "You could be sued for any amount with no cap" },
  { dot: "#EF4444", title: "IP Ownership Loss", desc: "Your work, ideas, and code may belong to them" },
  { dot: "#F59E0B", title: "Delayed Payments", desc: "Vague payment terms that favor the client" },
  { dot: "#F59E0B", title: "Unfair Termination", desc: "They can end the contract anytime, you cannot" },
  { dot: "#F59E0B", title: "Confidentiality Traps", desc: "You can't mention the work in your portfolio" },
  { dot: "#71717A", title: "Missing Clauses", desc: "No revision limit, no kill fee, no dispute process" },
];

const RiskTypes = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 border-t border-subtle relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3">What We Catch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            The hidden dangers <span className="gradient-text-blue">in every contract</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {risks.map((risk, i) => (
            <motion.div
              key={risk.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-subtle bg-card-dark p-6 group hover:border-opacity-20 transition-all duration-300"
              style={{ ["--glow-color" as string]: risk.dot }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${risk.dot}30`; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${risk.dot}08`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >
              <div className="w-3 h-3 rounded-full mb-4" style={{ backgroundColor: risk.dot }} />
              <h3 className="text-base font-semibold text-foreground mb-2">{risk.title}</h3>
              <p className="text-sm text-secondary-custom leading-relaxed">{risk.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RiskTypes;
