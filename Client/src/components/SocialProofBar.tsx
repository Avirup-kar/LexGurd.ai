import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const categories = ["Freelancers", "Design Agencies", "SaaS Founders", "Consultants", "Landlords", "Law Students"];

const AnimatedCounter = ({ target }: { target: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
};

const SocialProofBar = () => (
  <section className="border-t border-b border-subtle py-10" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
      <p className="text-sm text-secondary-custom text-center">
        Joined by <span className="font-semibold text-foreground"><AnimatedCounter target={10000} /></span> freelancers, agencies, and small businesses worldwide
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <span key={c} className="text-xs px-3.5 py-1.5 rounded-full border border-subtle text-secondary-custom bg-card-dark">{c}</span>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProofBar;
