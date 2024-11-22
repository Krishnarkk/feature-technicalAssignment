import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import logoImage from "../../assets/Group.png";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await onLogin(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials or server error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="loginpage_wrapper">
      <img src={logoImage} alt="TechSavvy Logo" />
      <Container maxWidth="xs">
        <Box className="form_container">
          <form onSubmit={handleLogin}>
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
                    <Link
                      to="/forgot-password"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="body2" color="error">
                        Forgot Password?
                      </Typography>
                    </Link>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography
                color="error"
                variant="body2"
                align="center"
                className="error_message"
              >
                {error}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  color="primary"
                />
              }
              label="Remember Me"
              className="rememberme_container"
            />

            {isLoading ? (
              <Box className="loader_overlay">
                <CircularProgress size={50} />
              </Box>
            ) : (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="submit_button"
              >
                SIGN IN
              </Button>
            )}
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
