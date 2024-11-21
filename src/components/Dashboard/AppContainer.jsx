import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const AppContainer = ({ children }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      {/* Main content container */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: "80px",
          transition: "margin-left 0.3s ease",
          paddingTop: "50px",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AppContainer;
