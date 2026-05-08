"export default function Dashboard() { return <div>Dashboard Page</div> }" 
import React from 'react';
import { LayoutDashboard, Map as MapIcon, BarChart3, Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-mono pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase">Command_Center</h1>
            <p className="text-zinc-500 text-sm">Real-time campus waste analytics // PS9</p>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 border border-zinc-800 rounded-sm text-xs bg-zinc-950">
              STATUS: <span className="text-green-500 font-bold">LIVE</span>
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
          <div className="lg:col-span-2 border border-zinc-900 bg-zinc-950/50 p-6 rounded-sm min-h-[400px]">
            <div className="flex items-center gap-2 mb-4 text-zinc-400">
              <MapIcon className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest">Live_Heatmap_Visualizer</span>
            </div>
            <div className="w-full h-full border border-dashed border-zinc-800 flex items-center justify-center text-zinc-700 italic">
              [ Interactive Map Loading... ]
            </div>
          </div>

          <div className="border border-zinc-900 bg-zinc-950/50 p-6 rounded-sm">
            <div className="flex items-center gap-2 mb-4 text-zinc-400">
              <Bell className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest">Recent_Alerts</span>
            </div>
            <div className="space-y-4">
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
    <div className="border border-zinc-900 bg-black p-4 rounded-sm">
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function AlertItem({ zone, time, level }) {
  return (
    <div className="border-l-2 border-red-900 bg-red-950/5 p-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold text-zinc-200">{zone}</span>
        <span className="text-[10px] text-zinc-600">{time}</span>
      </div>
      <p className="text-xs text-zinc-500">Critical level detected: {level}</p>
    </div>
  );
}