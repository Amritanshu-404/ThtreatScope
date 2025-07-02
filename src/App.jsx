import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Landing from './Pages/Landing';
import LoginSignup from './Pages/LoginSignup';
import Blog from './Pages/Blog';
import Dashboard from './Pages/Dashboard';
import ThreatAnalysis from './Pages/ThreatAnalysis';
import ReportsHistory from './Pages/ReportsHistory';
import Error from './ErrorPage';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const Layout = ({ children }) => (
  <div className="flex h-screen">
    <Navbar />
    <div className="flex-1">{children}</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/threat-analysis"
          element={
            <PrivateRoute>
              <Layout>
                <ThreatAnalysis />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/reports-history"
          element={
            <PrivateRoute>
              <Layout>
                <ReportsHistory />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
