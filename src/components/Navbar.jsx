import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trash2, User } from 'lucide-react';

const Navbar = ({ session }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return null; // Dashboard has its own sidebar

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <Trash2 className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">EcoSmart</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Platform</Link>
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Technology</Link>
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Campus</Link>
          
          {session ? (
            <Link 
              to="/dashboard" 
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 text-sm font-semibold transition-all"
            >
              Go to Dashboard
            </Link>
          ) : (
            !isAuthPage && (
              <Link 
                to="/login" 
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
