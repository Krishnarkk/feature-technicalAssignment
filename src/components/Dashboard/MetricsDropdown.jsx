import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
  Select,
  Button,
  Box,
  Popper,
} from "@mui/material";

const MetricsDropdown = ({
  metricsData = [],
  selectedMetrics,
  onApply,
  onCancel,
  isOpen,
  setIsOpen,
}) => {
  const [tempSelectedMetrics, setTempSelectedMetrics] =
    useState(selectedMetrics);

  const handleChange = (event) => {
    setTempSelectedMetrics(event.target.value);
  };

  const handleApply = () => {
    onApply(tempSelectedMetrics);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedMetrics(selectedMetrics);
    onCancel();
    setIsOpen(false);
  };

  return (
    <FormControl fullWidth>
      <Box>
        <InputLabel>Select Metrics</InputLabel>
        <Select
          multiple
          value={tempSelectedMetrics}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")} // Display selected metrics as a comma-separated list
          MenuProps={{ PaperProps: { style: { maxHeight: 250 } } }} // To limit dropdown height
          open={isOpen} // Controlled open state
          onClose={() => setIsOpen(false)} // Close the dropdown when the user clicks outside
          onOpen={() => setIsOpen(true)} // Open dropdown when clicked
          fullWidth // This ensures the Select takes up 100% width of its parent container
        >
          {/* Use a fallback if metricsData is undefined */}
          {(metricsData || []).map((metric) => (
            <MenuItem key={metric.code} value={metric.code}>
              <Checkbox
                checked={tempSelectedMetrics.indexOf(metric.code) > -1}
              />
              <ListItemText primary={metric.label} />
            </MenuItem>
          ))}
          {/* Buttons to Apply or Cancel */}
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleApply}>
            Apply
          </Button>
        </Select>
      </Box>
    </FormControl>
  );
};

export default MetricsDropdown;
