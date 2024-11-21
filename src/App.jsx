import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { login } from "./services/authService";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/auth/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the token exists in sessionStorage to maintain the login state across page refreshes
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
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

  // Define routes with createBrowserRouter
  const router = createBrowserRouter([
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />,
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    },
    {
      path: "*", // Catch-all for unmatched routes (optional)
      element: <Navigate to="/login" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
