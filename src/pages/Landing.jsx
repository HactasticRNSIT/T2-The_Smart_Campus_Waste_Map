import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, MapPin, Zap, Shield, Recycle } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Recycle className="w-4 h-4" />
          <span>Next-Gen Waste Intelligence</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          The Smart Campus <br /> Waste Map
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          Real-time IoT monitoring, AI-driven predictive analytics, and smart route optimization 
          for a cleaner, more sustainable campus ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            Launch Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold transition-all">
            Explore Digital Twin
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <MapPin className="w-8 h-8 text-blue-400" />,
              title: "Digital Twin Map",
              desc: "Live 3D-mapped visualization of every waste bin on campus with real-time status updates."
            },
            {
              icon: <BarChart3 className="w-8 h-8 text-emerald-400" />,
              title: "AI Analytics",
              desc: "Predictive algorithms that forecast waste generation trends and optimize collection schedules."
            },
            {
              icon: <Zap className="w-8 h-8 text-amber-400" />,
              title: "Smart Routing",
              desc: "Dynamic pathfinding for collection vehicles based on real-time bin occupancy levels."
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
              <div className="mb-6 p-3 rounded-2xl bg-white/[0.03] w-fit group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer-like status */}
      <div className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        © 2026 RNSIT Smart Campus Initiative • Powered by Supabase & IoT
      </div>
    </div>
  );
};

export default Landing;
