import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Trash2, ShieldAlert, BarChart3, Map } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-zinc-500/30 font-mono">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-500 uppercase tracking-widest mb-6 inline-block">
              Problem Statement 9 // RNSIT Hactastic
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              CAMPUS WASTE, <br /> VISUALIZED.
            </h1>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg mb-10 leading-relaxed">
              An AI-driven decision support system that transforms real-time occupancy and 
              sensor data into a predictive heat-map for smarter campus management.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <button className="px-8 py-3 bg-white text-black font-bold rounded-sm hover:bg-zinc-200 transition-all flex items-center gap-2 group">
                  LAUNCH COMMAND CENTER
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/docs">
                <button className="px-8 py-3 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 transition-all rounded-sm">
                  VIEW DOCUMENTATION
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 border-t border-zinc-900 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Map className="w-6 h-6" />}
            title="Live Hotspots"
            desc="Real-time heatmap showing bin levels across Mess, Hostels, and Academic blocks."
          />
          <FeatureCard 
            icon={<ShieldAlert className="w-6 h-6" />}
            title="Predictive Risk"
            desc="Algorithms that predict overflows 30 minutes in advance using crowd density data."
          />
          <FeatureCard 
            icon={<BarChart3 className="w-6 h-6" />}
            title="Evidence Insights"
            desc="Data-backed reports to optimize collection schedules and resource allocation."
          />
        </div>
      </section>

      {/* Footer Minimalist */}
      <footer className="py-10 text-center border-t border-zinc-900">
        <p className="text-zinc-600 text-xs tracking-[0.2em] uppercase">
          Built for Sustainability // Team T2
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 border border-zinc-900 bg-black hover:border-zinc-700 transition-colors"
    >
      <div className="mb-4 text-white p-3 bg-zinc-900 w-fit rounded-sm italic">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-zinc-100">{title}</h3>
      <p className="text-zinc-500 leading-relaxed text-sm">{desc}</p>
    </motion.div>
  );
}