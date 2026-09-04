import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function PerformanceCharts({ results }) {
  if (!results.length) {
    return (
      <div className="glass-card">
        <h2 className="section-title">
          Performance Analysis
        </h2>

        <p>
          Run an algorithm to view charts.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h2 className="section-title">
        Performance Analysis
      </h2>

      <div
        style={{
          width: "100%",
          height: 400,
        }}
      >
        <ResponsiveContainer>
          <BarChart data={results}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.2)"
            />

            <XAxis
              dataKey="pid"
              stroke="#ffffff"
            />

            <YAxis
              stroke="#ffffff"
            />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="wt"
              name="Waiting Time"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="tat"
              name="Turnaround Time"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="ct"
              name="Completion Time"
              fill="#f97316"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PerformanceCharts;