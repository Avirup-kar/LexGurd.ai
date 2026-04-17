import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  { quote: "ClauseGuard found an unlimited liability clause in my first freelance contract. Saved me from a potential nightmare.", name: "Alex M.", role: "Freelance Developer", initials: "AM" },
  { quote: "I had no idea my contract was transferring full IP rights to the client. The suggested fix was exactly what I needed.", name: "Priya S.", role: "UI Designer", initials: "PS" },
  { quote: "As a small agency owner I review contracts weekly. ClauseGuard cut my review time from hours to minutes.", name: "James T.", role: "Agency Founder", initials: "JT" },
];

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 border-t border-subtle relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            People who stopped <span className="gradient-text-blue">signing blind</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-2xl border border-subtle bg-card-dark p-6 flex flex-col"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-[#E4E4E7] leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-foreground" style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-secondary-custom">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
