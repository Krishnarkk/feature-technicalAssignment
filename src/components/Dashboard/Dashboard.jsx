import React from "react";
import MetricsDropdown from "./MetricsDropdown";
import PerformanceChart from "./PerformanceChart";
import HeatMapTable from "./HeatMapTable";
import AppContainer from "./AppContainer";
import TopBar from "../Topbar/Topbar";

const Dashboard = () => {
  return (
    <AppContainer>
      <div style={{ padding: "20px" }}>
        <TopBar />

        {/* Performance Line Chart */}
        <PerformanceChart />

        {/* Heat Map Table */}
        <HeatMapTable />
      </div>
    </AppContainer>
  );
};

export default Dashboard;
