import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const data = [
  { metric: "Metric 1", value: 5 },
  { metric: "Metric 2", value: 10 },
  { metric: "Metric 3", value: 15 },
  { metric: "Metric 4", value: 20 },
];

const HeatMapTable = () => {
  return (
    <Paper sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Metric</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: `rgba(255, 0, 0, ${row.value / 20})`, // Simulate heatmap with red color gradient
              }}
            >
              <TableCell>{row.metric}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default HeatMapTable;
