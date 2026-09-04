import React from "react";

function StatsCards({ stats }) {
  return (
    <div className="stats-grid">

      <div className="glass-card stat-card">
        <h3>Average WT</h3>
        <h2>{stats.avgWT}</h2>
      </div>

      <div className="glass-card stat-card">
        <h3>Average TAT</h3>
        <h2>{stats.avgTAT}</h2>
      </div>

      <div className="glass-card stat-card">
        <h3>Throughput</h3>
        <h2>{stats.throughput}</h2>
      </div>

      <div className="glass-card stat-card">
        <h3>CPU Utilization</h3>
        <h2>{stats.cpuUtilization}%</h2>
      </div>

    </div>
  );
}

export default StatsCards;