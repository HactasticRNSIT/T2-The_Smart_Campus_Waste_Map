import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

// CRITICAL: Make sure { onLogin } is inside the brackets here!
export default function Auth({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 1. DEMO BYPASS
    if (email === "admin@demo.com" && password === "hackathon2026") {
      onLogin(); // Tells App.jsx to unlock the routes
      navigate('/dashboard');
      return; 
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (data?.user) {
        onLogin(); 
        navigate('/dashboard');
      } else {
        alert(error?.message || "Invalid Credentials");
      }
    } catch (err) {
      alert("System Error. Use Demo Login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono p-6 text-white">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 p-8">
        <h2 className="text-xl font-bold tracking-widest mb-8 uppercase">System_Access</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" 
            placeholder="admin@demo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-zinc-800 p-3 outline-none focus:border-white"
          />
          <input 
            type="password" 
            placeholder="hackathon2026"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-800 p-3 outline-none focus:border-white"
          />
          <button type="submit" className="w-full bg-white text-black py-3 font-bold uppercase tracking-widest">
            {loading ? 'Verifying...' : 'Authorize'}
          </button>
        </form>
        
        <button 
          onClick={() => { setEmail("admin@demo.com"); setPassword("hackathon2026"); }}
          className="mt-6 text-[10px] text-zinc-600 w-full hover:text-zinc-400"
        >
          [ CLICK_TO_AUTOFILL_DEMO ]
        </button>
      </div>
    </div>
  );
}