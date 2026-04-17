import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import ContractCard from "./ContractCard";
import { useNavigate } from "react-router-dom";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
  <section id="hero" className="relative min-h-screen pt-32 pb-24 overflow-hidden">
    <div className="absolute inset-0 bg-dot-pattern" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px]" style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-primary/25 bg-primary/5 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Legal Analysis
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-[68px] font-bold tracking-tight leading-[1.05] mb-6">
            Stop Signing Contracts
            <br />
            You Don't{" "}
            <span className="gradient-text-blue">Understand</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-secondary-custom text-lg leading-relaxed max-w-xl mb-10">
            ClauseGuard reads your contracts, finds the dangerous clauses hidden in legal language, and tells you exactly what you're agreeing to — in plain English.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg btn-blue text-foreground font-medium glow-blue-sm transition-all text-sm">
              Analyze My Contract Free <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-subtle text-foreground hover:bg-secondary transition-colors text-sm">
              <Play className="h-4 w-4" /> Watch Demo
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 text-xs text-secondary-custom">
            <span>No credit card</span>
            <span className="opacity-40">·</span>
            <span>Instant results</span>
            <span className="opacity-40">·</span>
            <span>100% private</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="relative lg:pl-4">
          <ContractCard />
        </motion.div>
      </div>
    </div>
  </section>
)};

export default HeroSection;
