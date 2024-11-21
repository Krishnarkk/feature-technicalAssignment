import React, { useState } from "react";
import { Box, Drawer, Divider, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import logo from "../../assets/logo.jpg";

const Sidebar = () => {
  const [hover, setHover] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
      <Drawer
        variant="permanent"
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: hover ? 250 : 80,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: hover ? 250 : 80,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
            zIndex: 1300,
            height: "100vh",
          },
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Sidebar Content */}
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "40px", height: "40px" }}
            />
            {hover && (
              <Typography
                variant="h6"
                sx={{
                  marginLeft: 1,
                  fontWeight: "bold",
                  zIndex: 1202,
                }}
              >
                TECHSAVVY
              </Typography>
            )}
          </Box>

          <Divider sx={{ marginY: 1, width: "100%" }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DashboardIcon sx={{ fontSize: 30, marginRight: hover ? 1 : 0 }} />
            {hover && <Typography variant="body1">Dashboard</Typography>}{" "}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
