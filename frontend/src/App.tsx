import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Transactions from "./pages/Transactions";

function App() {
  return (
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
        {/* <Route path="/transactions" element={<Transactions />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
