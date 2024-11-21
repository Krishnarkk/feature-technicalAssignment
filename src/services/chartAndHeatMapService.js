import apiClient from "./apiClient"; // Assuming apiClient is already set up for the base URL

// The X-USER-IDENTITY header value (you can make this dynamic if needed)
const X_USER_IDENTITY =
  "U2FsdGVkX1/s3KYiwn1BdNtI1nNitQYbPVGs5G6NloO7PVGlCBTzYpJzAOD/8GaIp30IcvyKuBArXvm5xNN+gOhrSx51l49Ejxan4p7mt1vAUIE6/O277AUuMZVIMsmOtF5YGyaGkyDk9bMjArr3ekLdCKAZu9xXN/b92jqFqXb2jy4tbQbp8UUQxgywAWk1gR4dSb/vaJt4oEIeh0EWuEc4xU2NVdGSedANzYRqUEatsdtRYbNbdkZMt9koQcKO55/Y6fGafYUCztvkASn6i8WyPIxXMq6vf+xo4IYXeOh2WP8WgH/cQgq6V74Fnl82KYtUvGzWVMXpm2rrhsHewJptgJvJY+NinV05HdRJGtXQ1SN3/IhqyJZJhTb/TcO5SkDa8dIGfwgcciGspOofrA==";

// Fetch the Metrics List Dropdown Data
export const getMetricsListDropdown = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Add Bearer token for authorization
      "X-USER-IDENTITY": X_USER_IDENTITY, // Add X-USER-IDENTITY header
    };
    const response = await apiClient.post(
      "/day-parting/DayPartingFilterList",
      { type: "customizeMetrics" },
      { headers }
    );
    return response.data; // Assuming the API returns the list of metrics
  } catch (error) {
    console.error("Failed to fetch metrics list dropdown:", error);
    throw new Error("Failed to load metrics list");
  }
};

// Fetch the Metrics Performance Line Chart Data
export const getMetricsPerformanceLineChart = async (
  token,
  startDate,
  endDate,
  metrics
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "X-USER-IDENTITY": X_USER_IDENTITY, // Add X-USER-IDENTITY header
    };
    const body = {
      startDate,
      endDate,
      metrics,
    };
    const response = await apiClient.post(
      "/day-parting/DayPartingPerformanceGraphList",
      body,
      { headers }
    );
    return response.data; // Assuming the API returns the graph data
  } catch (error) {
    console.error("Failed to fetch performance line chart data:", error);
    throw new Error("Failed to load performance chart");
  }
};

// Fetch the Metrics Heat Map Table Data
export const getMetricsHeatMapTable = async (
  token,
  startDate,
  endDate,
  metrics
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "X-USER-IDENTITY": X_USER_IDENTITY, // Add X-USER-IDENTITY header
    };
    const body = {
      startDate,
      endDate,
      metrics,
    };
    const response = await apiClient.post("/day-parting/heatmap-list", body, {
      headers,
    });
    return response.data; // Assuming the API returns the heatmap table data
  } catch (error) {
    console.error("Failed to fetch heat map table data:", error);
    throw new Error("Failed to load heat map table");
  }
};
