import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AIMaps from './pages/AIMaps';
import HiddenGems from './pages/HiddenGems';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import PlanTrip from './pages/PlanTrip';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Wrapper to conditionally hide Navbar on Login page
function MainLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/aimaps" element={<ProtectedRoute><AIMaps /></ProtectedRoute>} />
          <Route path="/hidden-gems" element={<ProtectedRoute><HiddenGems /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/plan-trip" element={<ProtectedRoute><PlanTrip /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </>
  );
}

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans selection:bg-primary/30 transition-colors duration-300">
            <MainLayout />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
