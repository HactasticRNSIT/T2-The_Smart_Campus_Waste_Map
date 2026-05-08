import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

function App() {
  // Check if we already logged in previously
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <Routes>
      {/* If NOT logged in, the ONLY valid path is /login */}
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Auth onLogin={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        /* If logged in, allow the rest of the app */
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;