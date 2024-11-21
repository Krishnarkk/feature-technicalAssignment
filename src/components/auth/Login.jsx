import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, Checkbox, FormControlLabel, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import "./Login.css"; // Importing the CSS file

const Login = ({ onLogin }) => {  // onLogin function passed as a prop from App.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onLogin(email, password);  // Pass the credentials to onLogin passed from App.js
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials or server error");
    }
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="login-page-wrapper">
      <Typography className="login-logo" variant="h3">TECHSAVVY</Typography>

      <Container maxWidth="xs">
        <Box className="form-container" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome Back!
            </Typography>

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                      <Typography variant="body2" color="error">
                        Forgot Password?
                      </Typography>
                    </Link>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" variant="body2" align="center" className="error-message">
                {error}
              </Typography>
            )}

            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={handleRememberMe} color="primary" />}
              label="Remember Me"
              sx={{ marginTop: 1 }}
              className="remember-me-container"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              className="submit-button"
            >
              SIGN IN
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
