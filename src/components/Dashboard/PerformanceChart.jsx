import React from "react";
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
  // Only show even hours (0Hr, 2Hr, 4Hr, etc.)
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
  // Defining the color gradients
  const colorGradients = {
    currency: ["#C2185B", "#9C1A59", "#7D1548", "#5F0F36"],
    percentage: ["#FFB74D", "#FFA726", "#FF9800", "#FB8C00"],
  };

  // Defining metrics for each category
  const currencyMetrics = ["CPC", "CPM", "CPO", "ACOS", "CPA"];
  const percentageMetrics = ["CTR", "CR_perc", "ACOS"];

  // If the metric is one of the currency metrics
  if (currencyMetrics.includes(metricName)) {
    const colorIndex = Math.min(3, Math.floor((value / 10) * 3));
    return colorGradients.currency[colorIndex];
  }

  if (percentageMetrics.includes(metricName)) {
    const colorIndex = Math.min(3, Math.floor((value / 100) * 3));
    return colorGradients.percentage[colorIndex];
  }

  // Default color (for other metrics)
  return "#8884d8";
};

const PerformanceChart = ({ chartData, metrics, selectedMetrics }) => {
  const categories = chartData?.result?.categories || [];
  const series = chartData?.result?.series || [];

  // If selectedMetrics is empty, show all metrics (default behavior)
  const metricsToDisplay =
    selectedMetrics.length > 0
      ? selectedMetrics
      : series.map((metric) => metric.name);

  // Filter the series to include only the selected metrics
  const filteredSeries = series.filter((metric) =>
    metricsToDisplay.includes(metric.name)
  );

  // Prepare the data for the chart
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
            Track key metrics over time
          </p>
        </div>

        <div style={{ width: "20%" }}>
          <MetricsDropdown
            metricsData={metrics}
            selectedMetrics={selectedMetrics}
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
          {/* X-Axis with custom ticks */}
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
