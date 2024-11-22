import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Divider } from "@mui/material";
import MetricsDropdown from "./MetricsDropdown";

// Custom tick component for X-Axis to format hours
const CustomXAxisTick = ({ x, y, payload }) => {
  const hour = parseInt(payload.value.split(":")[0], 10);
  return hour % 2 === 0 ? (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ marginTop: "2px" }}
    >
      {`${hour}Hr`}
    </text>
  ) : null;
};

const getColorForMetric = (metricName, value) => {
  const colorGradients = {
    currency: ["#C2185B", "#9C1A59", "#7D1548", "#5F0F36"],
    percentage: ["#FFB74D", "#FFA726", "#FF9800", "#FB8C00"],
  };

  const currencyMetrics = ["CPC", "CPM", "CPO", "ACOS", "CPA"];
  const percentageMetrics = ["CTR", "CR_perc", "ACOS"];

  if (currencyMetrics.includes(metricName)) {
    const colorIndex = Math.min(3, Math.floor((value / 10) * 3));
    return colorGradients.currency[colorIndex];
  }

  if (percentageMetrics.includes(metricName)) {
    const colorIndex = Math.min(3, Math.floor((value / 100) * 3));
    return colorGradients.percentage[colorIndex];
  }

  return "#8884d8";
};

const PerformanceChart = ({ chartData, metrics }) => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = chartData?.result?.categories || [];
  const series = chartData?.result?.series || [];

  const metricsToDisplay =
    selectedMetrics.length > 0
      ? selectedMetrics
      : series.map((metric) => metric.name);

  // Filter the series based on selected metrics
  const filteredSeries = series.filter((metric) =>
    metricsToDisplay.includes(metric.name)
  );

  const chartDataFormatted = categories.map((category, index) => {
    const dataPoint = { name: category };
    filteredSeries.forEach((metric) => {
      dataPoint[metric.name] = metric.data[index];
    });
    return dataPoint;
  });

  const formatYAxis = (value) => {
    return `₹ ${value.toFixed(1)}K`;
  };

  const handleApply = (newMetrics) => {
    // If no metrics are selected, show all metrics (default)
    if (newMetrics.length === 0) {
      setSelectedMetrics(series.map((metric) => metric.name));
    } else {
      setSelectedMetrics(newMetrics);
    }
    setIsDropdownOpen(false);
  };

  const handleCancel = () => {
    setIsDropdownOpen(false);
  };

  // Ensure selectedMetrics defaults to all metrics when it's empty
  useEffect(() => {
    if (selectedMetrics.length === 0 && series.length > 0) {
      setSelectedMetrics(series.map((metric) => metric.name));
    }
  }, [series, selectedMetrics.length]);
  console.log(selectedMetrics);
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      {/* Header Section for Chart */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>Performance Overview</h3>
          <p style={{ margin: 0, color: "#888" }}>
            Key Metrics For Dayparting schedule Performance Evaluation
          </p>
        </div>

        <div style={{ width: "20%" }}>
          <MetricsDropdown
            metricsData={metrics.result}
            selectedMetrics={selectedMetrics}
            onApply={handleApply}
            onCancel={handleCancel}
            isOpen={isDropdownOpen}
            setIsOpen={setIsDropdownOpen}
          />
        </div>
      </div>

      <Divider width="100%" />

      {/* Line Chart */}
      <ResponsiveContainer
        width="100%"
        height={300}
        style={{ marginTop: "20px" }}
      >
        <LineChart data={chartDataFormatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={<CustomXAxisTick />}
            tickLine={true}
            interval={0}
          />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip />
          <Legend />
          {filteredSeries.map((metric) => (
            <Line
              key={metric.name}
              type="monotone"
              dataKey={metric.name}
              stroke={getColorForMetric(metric.name, metric.data[0])}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
