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
import ErrorBoundaryPage from "./components/ErrorBoundaryPage";
import ErrorBoundary from "./components/ErrorBoundary";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  const token = sessionStorage.getItem("token");

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<ErrorBoundaryPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
