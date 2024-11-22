import React from "react";
import "./HeatMapTable.css";
import { Box, Typography, CircularProgress } from "@mui/material";

// Define the time range for the table rows (12 AM to 11 PM)
const times = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

// Generate color classes based on min/max range for the heatmap
const generateColorClass = (value, min, max, metricType) => {
  const percentage = (value - min) / (max - min);

  if (metricType === "Impressions" || metricType === "Clicks") {
    if (metricType === "Impressions") {
      return percentage < 0.5 ? "light-color" : "dark-color";
    } else if (metricType === "Clicks") {
      if (percentage < 0.33) {
        return "light-clicks-color";
      } else if (percentage < 0.66) {
        return "medium-clicks-color";
      } else {
        return "dark-clicks-color";
      }
    }
  } else if (metricType === "CPM") {
    return percentage < 0.5 ? "light-cpm-color" : "dark-cpm-color";
  }

  return "";
};

const HeatMapTable = ({ data }) => {
  if (!data || !data.result) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress size={50} />
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          Loading HeatMap table Data...
        </Typography>
      </Box>
    );
  }

  const calculateMetrics = (hourData) => {
    const CPC = hourData.CPC || 0;
    const CR_perc = hourData.CR_perc || 0;
    const clicks = 1000; //assuming clicks for calculation
    const impressions = clicks / (CR_perc / 100) || 0;
    const cost = CPC * clicks;
    const cpm = (cost / impressions) * 1000;

    return { impressions, clicks, cpm };
  };

  const generateTableRows = () => {
    return times.map((time) => (
      <tr key={time}>
        <td>{time}</td>
        {data.result.map((dayData) => {
          return (
            <>
              {["Impressions", "Clicks", "CPM"].map((metricKey) => {
                const hourlyData = dayData.Hourly_Data.find(
                  (entry) => entry.time_part.slice(0, 5) === time
                );

                if (!hourlyData)
                  return <td key={`${metricKey}-${dayData.weekday}`}>N/A</td>;

                const { impressions, clicks, cpm } =
                  calculateMetrics(hourlyData);

                let value;
                if (metricKey === "Impressions") {
                  value = impressions;
                } else if (metricKey === "Clicks") {
                  value = clicks;
                } else if (metricKey === "CPM") {
                  value = cpm;
                }

                if (value === undefined || value === null)
                  return <td key={`${metricKey}-${dayData.weekday}`}>N/A</td>;

                const min =
                  (data.rangeDetails && data.rangeDetails[metricKey]?.min) || 0;
                const max =
                  (data.rangeDetails && data.rangeDetails[metricKey]?.max) ||
                  1000;

                let colorClass;
                if (metricKey === "Impressions" || metricKey === "Clicks") {
                  colorClass = generateColorClass(value, min, max, metricKey);
                } else if (metricKey === "CPM") {
                  colorClass = generateColorClass(value, min, max, "CPM");
                }

                return (
                  <td
                    key={`${metricKey}-${dayData.weekday}`}
                    className={colorClass}
                  >
                    {value.toFixed(2)}
                  </td>
                );
              })}
            </>
          );
        })}
      </tr>
    ));
  };

  return (
    <Box boxShadow={3} sx={{ padding: "15px" }}>
      <Typography variant="h5">Heat Map</Typography>
      <Typography variant="body2">
        Select hours to schedule Dayparting
      </Typography>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {data.result.map((dayData) => (
              <th colSpan={3} key={dayData.weekday}>
                {dayData.weekday}
              </th>
            ))}
          </tr>
          <tr>
            <th>Time</th>
            {data.result.map((dayData) => (
              <>
                <th key={`${dayData.weekday}-impressions`}>Impressions</th>
                <th key={`${dayData.weekday}-clicks`}>Clicks</th>
                <th key={`${dayData.weekday}-cpm`}>CPM</th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>{generateTableRows()}</tbody>
      </table>
    </Box>
  );
};

export default HeatMapTable;
