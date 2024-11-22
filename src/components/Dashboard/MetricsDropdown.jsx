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
          renderValue={(selected) => selected.join(", ")} 
          MenuProps={{ PaperProps: { style: { maxHeight: 250, width: 'auto' } } }} 
          open={isOpen} 
          onClose={() => setIsOpen(false)} 
          onOpen={() => setIsOpen(true)} 
          fullWidth
        >
          {(metricsData || []).map((metric) => (
            <MenuItem key={metric.code} value={metric.code}>
              <Checkbox
                checked={tempSelectedMetrics.indexOf(metric.code) > -1}
              />
              <ListItemText primary={metric.code} />
            </MenuItem>
          ))}

          {/* Buttons with gap between them */}
          <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApply}
              size="small" 
              sx={{ width: "48%" }} 
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCancel}
              size="small" 
              sx={{ width: "48%" }} 
            >
              Cancel
            </Button>
          </Box>
        </Select>
      </Box>
    </FormControl>
  );
};

export default MetricsDropdown;
