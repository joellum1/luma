import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";

import Landing from './pages/Landing';
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
