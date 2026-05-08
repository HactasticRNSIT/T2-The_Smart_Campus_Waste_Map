import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Map, ShieldAlert, BarChart3 } from "lucide-react";

export default function Landing() {
  return (
    <div
      className="min-h-screen bg-black text-zinc-100 font-mono"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '8px 8px',
      }}
    >
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 text-xs border border-zinc-800 text-zinc-500 uppercase tracking-widest mb-6">
            PROBLEM STATEMENT 9 // RNSIT HACTASTIC
          </span>

          <div className="mt-6 p-8 bg-black/60 backdrop-blur-xl border border-zinc-800/50">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white uppercase tracking-tight leading-tight">
              CAMPUS WASTE, VISUALIZED.
            </h1>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg mb-10 uppercase tracking-widest">
              Real-time occupancy and sensor data transformed into predictive heat-maps.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <button className="px-8 py-3 bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 uppercase tracking-widest">
                  LAUNCH COMMAND CENTER <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-zinc-900 md:border-x md:border-zinc-900">
          <div className="relative p-8 bg-black hover:text-white transition-colors">
            <div className="absolute top-3 right-3 text-xs text-zinc-600">[01]</div>
            <Map className="mb-4 text-white" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">Live Hotspots</h3>
            <p className="text-zinc-500 text-sm">Real-time heatmap showing bin levels.</p>
          </div>
          <div className="relative p-8 bg-black hover:text-white transition-colors">
            <div className="absolute top-3 right-3 text-xs text-zinc-600">[02]</div>
            <ShieldAlert className="mb-4 text-white" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">Predictive Risk</h3>
            <p className="text-zinc-500 text-sm">Algorithms that predict overflows.</p>
          </div>
          <div className="relative p-8 bg-black hover:text-white transition-colors">
            <div className="absolute top-3 right-3 text-xs text-zinc-600">[03]</div>
            <BarChart3 className="mb-4 text-white" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">Insights</h3>
            <p className="text-zinc-500 text-sm">Data-backed reports for collection.</p>
          </div>
        </div>
      </section>
    </div>
  );
}