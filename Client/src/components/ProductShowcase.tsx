import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LayoutDashboard, History, Settings, ChevronUp, AlertTriangle, Shield, FileWarning, FileX } from "lucide-react";

const summaryCards = [
  { label: "Overall Risk", value: "HIGH", color: "#EF4444", bg: "rgba(239,68,68,0.08)" },
  { label: "Dangerous Clauses", value: "3", color: "#EF4444", bg: "rgba(239,68,68,0.08)" },
  { label: "Medium Risk", value: "2", color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
  { label: "Missing Clauses", value: "2", color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
];

const clauseList = [
  { title: "Unlimited Liability", risk: "Danger", color: "#EF4444" },
  { title: "IP Ownership", risk: "Danger", color: "#EF4444" },
  { title: "Payment Terms", risk: "Danger", color: "#EF4444" },
  { title: "Non-Compete", risk: "Medium", color: "#F59E0B" },
  { title: "Confidentiality", risk: "Medium", color: "#F59E0B" },
];

const ProductShowcase = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 border-t border-subtle relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3">The Platform</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Everything you need to <span className="gradient-text-blue">understand any contract</span>
          </h2>
          <p className="text-secondary-custom">A complete contract intelligence dashboard at your fingertips.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Glow behind */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />

          {/* Browser frame */}
          <div className="relative rounded-xl border border-subtle overflow-hidden bg-card-dark">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-subtle" style={{ backgroundColor: "#080808" }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EF4444" }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22C55E" }} />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md text-xs text-secondary-custom border border-subtle" style={{ backgroundColor: "#0a0a0a" }}>
                  app.clauseguard.com
                </div>
              </div>
            </div>

            {/* App content */}
            <div className="flex min-h-[420px]">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-56 border-r border-subtle p-4" style={{ backgroundColor: "#080808" }}>
                <div className="flex items-center gap-2 mb-8">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">ClauseGuard</span>
                </div>
                <nav className="space-y-1 flex-1">
                  {[{ icon: LayoutDashboard, label: "Dashboard", active: true }, { icon: History, label: "History" }, { icon: Settings, label: "Settings" }].map((item) => (
                    <div key={item.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${item.active ? "bg-primary/10 text-primary" : "text-secondary-custom hover:text-foreground"}`}>
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                  ))}
                </nav>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <ChevronUp className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">Upgrade</span>
                  </div>
                  <p className="text-[10px] text-secondary-custom">Unlock unlimited scans</p>
                </div>
              </div>

              {/* Main */}
              <div className="flex-1 p-6">
                {/* Summary cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {summaryCards.map((card) => (
                    <div key={card.label} className="rounded-lg border border-subtle p-4" style={{ backgroundColor: card.bg }}>
                      <p className="text-[10px] text-secondary-custom mb-1 uppercase tracking-wider">{card.label}</p>
                      <p className="text-xl font-bold" style={{ color: card.color }}>{card.value}</p>
                    </div>
                  ))}
                </div>

                {/* Two columns */}
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-subtle bg-card-dark p-4">
                    <p className="text-xs font-medium text-foreground mb-3">Flagged Clauses</p>
                    <div className="space-y-2">
                      {clauseList.map((clause) => (
                        <div key={clause.title} className="flex items-center justify-between py-2 border-b border-subtle last:border-0">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: clause.color }} />
                            <span className="text-xs text-foreground">{clause.title}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${clause.color}15`, color: clause.color }}>{clause.risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-subtle bg-card-dark p-4">
                    <p className="text-xs font-medium text-foreground mb-3">Clause Detail</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="h-3.5 w-3.5 text-[#EF4444]" />
                          <span className="text-sm font-medium text-foreground">Unlimited Liability</span>
                        </div>
                        <p className="text-xs text-secondary-custom leading-relaxed">This clause removes all caps on your financial liability. You could be held responsible for damages far exceeding the contract value.</p>
                      </div>
                      <div className="rounded-lg p-3 border-l-2 border-l-primary" style={{ backgroundColor: "rgba(59,130,246,0.06)" }}>
                        <p className="text-[10px] font-semibold text-primary mb-1">Suggested Fix</p>
                        <p className="text-[11px] text-secondary-custom">Add a liability cap equal to the total contract value. Example: "Total liability shall not exceed the fees paid under this agreement."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
