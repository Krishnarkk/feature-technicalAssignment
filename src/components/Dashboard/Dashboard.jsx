import React, { useEffect, useState } from "react";
import {
  getMetricsListDropdown,
  getMetricsPerformanceLineChart,
  getMetricsHeatMapTable,
} from "../../services/chartAndHeatMapService"; // assuming services/api.js is where API functions are located
import PerformanceChart from "./PerformanceChart";
import HeatMapTable from "./HeatMapTable";
import TopBar from "../Topbar/Topbar";
import AppContainer from "./AppContainer";

const Dashboard = ({ token }) => {
  const [metricsList, setMetricsList] = useState([]); // For Metrics Dropdown
  const [performanceData, setPerformanceData] = useState(null); // For chart data
  const [heatmapData, setHeatmapData] = useState(null); // For heatmap data
  const [selectedMetrics, setSelectedMetrics] = useState([]); // For selected metrics

  useEffect(() => {
    if (token) {
      // Fetch the Metrics Dropdown
      getMetricsListDropdown(token)
        .then((data) => setMetricsList(data))
        .catch((error) => console.error(error));

      // Fetch Performance Line Chart Data
      getMetricsPerformanceLineChart(token, "2024-06-08", "2024-07-07", [
        "CPC",
        "CR_perc",
        "ROAS",
      ])
        .then((data) => setPerformanceData(data))
        .catch((error) => console.error(error));

      // Fetch Heatmap Table Data
      getMetricsHeatMapTable(token, "2024-06-08", "2024-07-07", [
        "CPC",
        "CR_perc",
        "ROAS",
      ])
        .then((data) => setHeatmapData(data))
        .catch((error) => console.error(error));
    }
  }, [token]); // Dependency on token ensures API calls are re-triggered if token changes

  // Handle Apply button from the MetricsDropdown
  const handleApply = (selectedMetrics) => {
    setSelectedMetrics(selectedMetrics);
  };

  // Handle Cancel button from the MetricsDropdown
  const handleCancel = () => {
    setSelectedMetrics([]); // Reset the selected metrics
  };

  return (
    <AppContainer>
      <div style={{ padding: "20px" }}>
        <TopBar />
        <div>
          {/* Pass the necessary props to PerformanceChart */}
          <PerformanceChart
            chartData={performanceData}
            metrics={metricsList} // Metrics data passed here
            selectedMetrics={selectedMetrics} // Pass the selected metrics here
          />
          <HeatMapTable data={heatmapData} />
        </div>
      </div>
    </AppContainer>
  );
};

export default Dashboard;
