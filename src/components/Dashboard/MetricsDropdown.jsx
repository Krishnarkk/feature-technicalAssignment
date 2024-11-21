import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";

const MetricsDropdown = () => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  const handleChange = (event) => {
    setSelectedMetrics(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Metrics</InputLabel>
      <Select
        multiple
        value={selectedMetrics}
        onChange={handleChange}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip key={value} label={value} sx={{ margin: 0.5 }} />
            ))}
          </div>
        )}
      >
        <MenuItem value="Metric 1">Metric 1</MenuItem>
        <MenuItem value="Metric 2">Metric 2</MenuItem>
        <MenuItem value="Metric 3">Metric 3</MenuItem>
        <MenuItem value="Metric 4">Metric 4</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MetricsDropdown;
