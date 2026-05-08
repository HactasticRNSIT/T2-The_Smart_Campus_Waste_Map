import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getLiveWasteData } from '../lib/api';
import AnalyticsChart from '../components/AnalyticsChart';

// Mock data for initial UI
const initialStats = [
  { id: 'bins', label: 'Total Bins', value: '42', icon: <Trash2 />, color: 'text-blue-400' },
  { id: 'alerts', label: 'Active Alerts', value: '5', icon: <AlertTriangle />, color: 'text-amber-400' },
  { id: 'rate', label: 'Collection Rate', value: '94%', icon: <TrendingUp />, color: 'text-emerald-400' },
  { id: 'health', label: 'System Health', value: '98.2%', icon: <Activity />, color: 'text-purple-400' },
];

const mockZones = [
  { id: 1, name: 'Admin Block', latest_waste_level: 45, latest_at: new Date().toISOString() },
  { id: 2, name: 'CSE Dept', latest_waste_level: 12, latest_at: new Date().toISOString() },
  { id: 3, name: 'Main Canteen', latest_waste_level: 85, latest_at: new Date().toISOString() },
  { id: 4, name: 'Library', latest_waste_level: 32, latest_at: new Date().toISOString() },
  { id: 5, name: 'Hostel A', latest_waste_level: 62, latest_at: new Date().toISOString() },
];

const Dashboard = () => {
  const [wasteData, setWasteData] = useState(mockZones);
  const [stats, setStats] = useState(initialStats);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([
    { id: 1, text: 'System initialized', time: '1m ago', type: 'info' },
    { id: 2, text: 'Truck #03 dispatched to Canteen', time: '5m ago', type: 'success' },
  ]);

  useEffect(() => {
    // Attempt real data fetch
    let unsubscribeFn = null;
    const initData = async () => {
      try {
        const result = await getLiveWasteData((data) => {
          if (data && data.length > 0) {
            setWasteData(data);
          }
        });
        unsubscribeFn = result.unsubscribe;
      } catch (e) {
        console.warn("Real-time data failed, using mock data.", e);
      }
    };
    
    initData();
    return () => {
      if (unsubscribeFn) unsubscribeFn();
    };
  }, []);

  useEffect(() => {
    // --- Simulation Engine ---
    const simulationInterval = setInterval(() => {
      // 1. Simulate Waste Fluctuations
      setWasteData(prev => prev.map(bin => ({
        ...bin,
        latest_waste_level: Math.max(0, Math.min(100, bin.latest_waste_level + (Math.random() > 0.5 ? 1 : -1))),
        latest_at: new Date().toISOString()
      })));

      // 2. Simulate Stat Jitter
      setStats(prev => prev.map(s => {
        if (s.id === 'health') return { ...s, value: (98 + Math.random()).toFixed(1) + '%' };
        if (s.id === 'rate') return { ...s, value: (93 + Math.random() * 2).toFixed(1) + '%' };
        return s;
      }));

      // 3. Random Activities
      if (Math.random() > 0.95) {
        const events = [
          'Bin #04 filled to 85%',
          'Recycling rate increased in Block C',
          'Collection Route #12 optimized',
          'Sensor Node #88 heartbeat detected',
          'Peak waste hour identified: 12:45 PM'
        ];
        setActivities(prev => [
          { id: Date.now(), text: events[Math.floor(Math.random() * events.length)], time: 'Just now', type: 'info' },
          ...prev.slice(0, 4)
        ]);
      }
    }, 3000);

    return () => clearInterval(simulationInterval);
  }, []);

  const getStatusColor = (level) => {
    if (level >= 80) return '#ef4444'; // Red
    if (level >= 50) return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  const getStatusText = (level) => {
    if (level >= 80) return 'Critical';
    if (level >= 50) return 'Warning';
    return 'Normal';
  };

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-gray-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 shrink-0 bg-[#0a0a0c]">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Trash2 className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">EcoSmart</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
            { id: 'map', label: 'Live Map', icon: <MapIcon className="w-5 h-5" /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
            { id: 'alerts', label: 'Alerts', icon: <Bell className="w-5 h-5" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-inner' 
                : 'hover:bg-white/5 text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-2 mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-gray-500 hover:text-gray-300">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all text-gray-500 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#0a0a0c]">
        {/* Header */}
        <header className="sticky top-0 z-10 px-8 py-6 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white capitalize">{activeTab}</h2>
            <p className="text-sm text-gray-500">Real-time campus data at a glance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-500">Live Connection</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 min-h-full">
          {activeTab === 'overview' && (
            <div className="animate-in fade-in duration-500 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-xl group hover:border-blue-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-lg bg-white/[0.03] ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-white tabular-nums">{stat.value}</h3>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Bins Status */}
                <div className="lg:col-span-1 p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Bin Occupancy</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest">Live</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {wasteData.map((bin) => (
                      <div key={bin.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-all group-hover:scale-110`} style={{ backgroundColor: `${getStatusColor(bin.latest_waste_level)}15`, color: getStatusColor(bin.latest_waste_level) }}>
                            {bin.latest_waste_level}%
                          </div>
                          <div>
                            <p className="font-semibold text-white">{bin.name}</p>
                            <p className="text-[10px] text-gray-500 tabular-nums">Sync: {new Date(bin.latest_at).toLocaleTimeString()}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider`} style={{ borderColor: `${getStatusColor(bin.latest_waste_level)}30`, color: getStatusColor(bin.latest_waste_level), backgroundColor: `${getStatusColor(bin.latest_waste_level)}10` }}>
                          {getStatusText(bin.latest_waste_level)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map & Activity */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 h-[400px] relative overflow-hidden group">
                     <div className="absolute top-6 left-6 z-10">
                        <h3 className="text-xl font-bold text-white">Digital Twin Map</h3>
                        <p className="text-xs text-gray-500">Tracking 42 IoT Nodes</p>
                     </div>
                     <div className="absolute inset-0 bg-gray-900/40" />
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-64 h-64 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]">
                           <div className="absolute -top-2 left-1/2 w-4 h-4 bg-blue-500 rounded-full blur-sm" />
                        </div>
                        <div className="absolute w-48 h-48 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute flex flex-col items-center">
                           <Activity className="w-8 h-8 text-blue-500 mb-2 animate-pulse" />
                           <span className="text-[10px] text-blue-400 font-bold tracking-[0.3em] uppercase">Scanning Campus</span>
                        </div>
                     </div>
                     {[...Array(6)].map((_, i) => (
                        <div 
                           key={i} 
                           className="absolute w-2 h-2 bg-emerald-500 rounded-full blur-[1px] animate-pulse"
                           style={{ 
                              top: `${20 + Math.random() * 60}%`, 
                              left: `${20 + Math.random() * 60}%`,
                              animationDelay: `${i * 0.5}s`
                           }}
                        />
                     ))}
                  </div>

                  <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      Live Intelligence Stream
                    </h3>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 animate-in fade-in slide-in-from-left-2 duration-500">
                          <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${activity.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                            <span className="text-sm text-gray-300">{activity.text}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 uppercase">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="space-y-8 animate-in fade-in duration-700">
               <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-1 space-y-6">
                     <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">IoT Fleet Status</h3>
                        <div className="space-y-4">
                           {[
                              { name: 'Truck #01', status: 'In Route', color: 'bg-emerald-500' },
                              { name: 'Truck #03', status: 'Collection', color: 'bg-blue-500' },
                              { name: 'Truck #05', status: 'Standby', color: 'bg-gray-500' },
                           ].map((t, i) => (
                              <div key={i} className="flex items-center justify-between">
                                 <span className="text-sm text-white">{t.name}</span>
                                 <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-gray-400">{t.status}</span>
                                    <div className={`w-2 h-2 rounded-full ${t.color}`} />
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="lg:col-span-3 h-[600px] rounded-3xl border border-white/10 overflow-hidden relative bg-[#0d0d12]">
                     <div className="absolute inset-0 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] [background-size:30px_30px]" />
                     {wasteData.map((bin, i) => (
                        <div 
                           key={bin.id} 
                           className="absolute cursor-pointer group"
                           style={{ 
                              top: `${20 + (i * 15) % 60}%`, 
                              left: `${15 + (i * 20) % 70}%`,
                           }}
                        >
                           <div className={`w-4 h-4 rounded-full animate-ping absolute inset-0 opacity-40`} style={{ backgroundColor: getStatusColor(bin.latest_waste_level) }} />
                           <div className={`w-4 h-4 rounded-full relative shadow-lg shadow-black`} style={{ backgroundColor: getStatusColor(bin.latest_waste_level) }} />
                        </div>
                     ))}
                     <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                        <p className="text-xs text-white">42 Nodes reporting live from RNSIT Campus</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'analytics' && (
             <div className="space-y-8 animate-in fade-in duration-500">
                <div className="p-8 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex items-center justify-between">
                   <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                         <Activity className="w-5 h-5 text-blue-500" />
                         AI Prediction Engine
                      </h3>
                      <p className="text-sm text-gray-500">Predictive waste surges powered by NeuralProphet</p>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-500">98.4%</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-6">Historical Tracking</h3>
                      <AnalyticsChart />
                   </div>
                   <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-6">Forecasted Surges</h3>
                      <div className="space-y-4">
                         {[
                           { label: 'Admin Block Peak', time: 'Today, 2:30 PM', probability: '85%', color: 'text-amber-500' },
                           { label: 'Canteen Overflow Risk', time: 'Today, 12:45 PM', probability: '94%', color: 'text-red-500' },
                         ].map((item, i) => (
                           <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                             <p className="text-sm font-bold text-white">{item.label}</p>
                             <span className={`text-sm font-bold ${item.color}`}>{item.probability}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-8">Active Alerts</h3>
                  <div className="space-y-4">
                     {[
                        { id: 1, title: 'Critical Overflow', location: 'Canteen', type: 'critical' },
                        { id: 2, title: 'Sensor Offline', location: 'Admin', type: 'warning' },
                     ].map((alert) => (
                        <div key={alert.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <AlertTriangle className={`w-6 h-6 ${alert.type === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />
                              <h4 className="font-bold text-white">{alert.title} - {alert.location}</h4>
                           </div>
                           <button className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold">Acknowledge</button>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
