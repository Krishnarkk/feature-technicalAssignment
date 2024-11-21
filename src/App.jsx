import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { login } from "./services/authService";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/auth/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the token exists in sessionStorage to maintain the login state across page refreshes
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Function to handle login
  const handleLogin = async (email, password) => {
    try {
      const { userDetails, token } = await login(email, password);
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // If app is still loading (i.e. checking authentication status), show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Retrieve the token from sessionStorage
  const token = sessionStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard token={token} /> // Pass token to Dashboard as a prop
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
