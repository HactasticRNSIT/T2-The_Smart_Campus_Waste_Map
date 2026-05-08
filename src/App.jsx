import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

// Pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
// import Analytics from './pages/Analytics'; // Add this once Analytics page is created
import Navbar from './components/Navbar';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for sign-in / sign-out
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="bg-black h-screen" />; // Simple dark loader

  return (
    <Router>
      <Navbar session={session} />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Landing />} />

        {/* Auth Route: Redirect to dashboard if already logged in */}
        <Route 
          path="/login" 
          element={!session ? <Auth /> : <Navigate to="/dashboard" />} 
        />

        {/* Protected Routes: Redirect to landing page if not authenticated */}
        <Route 
          path="/dashboard" 
          element={session ? <Dashboard /> : <Navigate to="/" />} 
        />
        
        {/* Analytics Route: Redirect to landing page if not authenticated */}
        {/* <Route 
          path="/analytics" 
          element={session ? <Analytics /> : <Navigate to="/" />} 
        /> */}
      </Routes>
    </Router>
  );
}

export default App;