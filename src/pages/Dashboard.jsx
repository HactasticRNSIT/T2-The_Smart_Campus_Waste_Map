"export default function Dashboard() { return <div>Dashboard Page</div> }" 
import React from 'react';
import { LayoutDashboard, Map as MapIcon, BarChart3, Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <div
      className="min-h-screen bg-black text-zinc-100 font-mono pt-20 px-6"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '8px 8px',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 p-6 bg-black/60 backdrop-blur-xl border border-zinc-800/50">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase text-white">Command_Center</h1>
            <p className="text-zinc-400 text-xs uppercase tracking-widest mt-2">Real-time campus waste analytics // PS9</p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 border border-zinc-800 text-xs bg-zinc-900 uppercase tracking-widest">
              STATUS: <span className="text-green-500 font-bold animate-pulse">LIVE</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatBox label="Total Hotspots" value="12" />
          <StatBox label="Avg Fill Level" value="64%" color="text-orange-500" />
          <StatBox label="Predicted Overflows" value="03" color="text-red-500" />
          <StatBox label="Active Crews" value="05" />
        </div>

        {/* Main Content Area (Where the map or cards will go) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-zinc-800/50 bg-black/60 backdrop-blur-xl p-8 min-h-[400px]">
            <div className="flex items-center gap-2 mb-6 text-zinc-300">
              <MapIcon className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-medium">Live_Heatmap_Visualizer</span>
            </div>
            <div className="w-full h-full border border-dashed border-zinc-800/50 flex items-center justify-center text-zinc-600">
              [ Interactive Map Loading... ]
            </div>
          </div>

          <div className="border border-zinc-800/50 bg-black/60 backdrop-blur-xl p-8">
            <div className="flex items-center gap-2 mb-6 text-zinc-300">
              <Bell className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-medium">Recent_Alerts</span>
            </div>
            <div className="space-y-3">
              <AlertItem zone="Mess Hall" time="2m ago" level="88%" />
              <AlertItem zone="Hostel Block A" time="15m ago" level="72%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color = "text-white" }) {
  return (
    <div className="border border-zinc-800/50 bg-black/60 backdrop-blur-xl p-6">
      <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-3 font-medium">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function AlertItem({ zone, time, level }) {
  return (
    <div className="border-l-2 border-red-600 bg-red-950/20 backdrop-blur-sm p-4 border border-zinc-800/30">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-zinc-100">{zone}</span>
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{time}</span>
      </div>
      <p className="text-xs text-zinc-400">Critical level: <span className="text-red-400 font-semibold">{level}</span></p>
    </div>
  );
}