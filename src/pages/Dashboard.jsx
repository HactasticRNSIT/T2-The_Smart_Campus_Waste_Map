import React from 'react';
import { BarChart3, Map as MapIcon, AlertTriangle, Trash2, Zap, Radio } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white font-mono pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase">Command_Center.exe</h1>
            <p className="text-zinc-500 text-xs mt-1">NODE: RNSIT_BENGALURU // STATUS: OPERATIONAL</p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 border border-zinc-800 bg-zinc-950 text-[10px] flex items-center gap-2">
              <Radio className="w-3 h-3 text-red-500 animate-pulse" /> LIVE_FEED_ACTIVE
            </div>
          </div>
        </div>

        {/* TOP STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Bins" value="128" sub="Global Campus" icon={<Trash2 size={16}/>} />
          <StatCard label="Avg Fill Level" value="64%" sub="+12% from yesterday" icon={<BarChart3 size={16}/>} />
          <StatCard label="Critical Alerts" value="03" sub="Requires immediate dispatch" icon={<AlertTriangle size={16} className="text-red-500"/>} />
          <StatCard label="Efficiency Score" value="92.4" sub="Optimized routes" icon={<Zap size={16}/>} />
        </div>

        {/* MAIN VISUALIZATION AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* THE MOCK MAP */}
          <div className="lg:col-span-2 border border-zinc-800 bg-zinc-950/50 relative min-h-[400px] overflow-hidden group">
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black border border-zinc-800 text-[10px] tracking-widest">
              CAMPUS_HEATMAP_V1.0
            </div>
            {/* Visual background for the "Map" */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:30px_30px]" />
            
            {/* Mock Hotspots */}
            <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
            
            <div className="flex items-center justify-center h-full text-zinc-700">
               <MapIcon size={48} strokeWidth={1} />
               <span className="ml-4 uppercase text-xs tracking-[0.4em]">Rendering Live Geometry...</span>
            </div>
          </div>

          {/* ACTIVITY FEED */}
          <div className="border border-zinc-800 bg-black p-6">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 border-b border-zinc-900 pb-2 text-zinc-400">System_Logs</h3>
            <div className="space-y-6">
              <LogItem time="14:22" msg="Bin #42 (Canteen) reached 85%" status="warning" />
              <LogItem time="13:10" msg="Route Alpha optimized" status="info" />
              <LogItem time="11:45" msg="Sensor #09 re-calibrated" status="info" />
              <LogItem time="09:00" msg="Daily report generated" status="success" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon }) {
  return (
    <div className="p-6 border border-zinc-800 bg-zinc-950 hover:border-zinc-600 transition-colors">
      <div className="flex justify-between items-start mb-4 text-zinc-500">
        <span className="text-[10px] uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold tracking-tighter mb-1">{value}</div>
      <div className="text-[10px] text-zinc-600 uppercase italic">{sub}</div>
    </div>
  );
}

function LogItem({ time, msg, status }) {
  const color = status === 'warning' ? 'text-red-500' : 'text-zinc-500';
  return (
    <div className="flex gap-4 text-[10px]">
      <span className="text-zinc-700">{time}</span>
      <span className={`${color} uppercase`}>[{status}] {msg}</span>
    </div>
  );
}