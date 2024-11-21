import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Retrieve fullName from sessionStorage
  const userDetails = sessionStorage.getItem("userDetails");
  const fName = userDetails ? JSON.parse(userDetails).fullName : "User";
  const userInitial = fName.charAt(0).toUpperCase();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        left: "80px",
        top: 0,
        right: 0,
        height: "50px",
        backgroundColor: "white",
        zIndex: 1201,
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </Typography>
        <IconButton onClick={handleMenuClick} size="large">
          <AccountCircleIcon sx={{ color: "black" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#3f51b5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              {userInitial}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <MenuItem>{fName}</MenuItem>
              <Typography
                variant="body2"
                sx={{ color: "green", fontSize: "12px" }}
              >
                Online
              </Typography>
            </Box>
          </Box>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
