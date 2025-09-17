import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
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
