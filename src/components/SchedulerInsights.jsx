import React from "react";

function SchedulerInsights({
  insights,
}) {
  return (
    <div className="glass-card">
      <h2 className="section-title">
        Scheduler Insights
      </h2>

      <div className="insights-grid">

        <div className="insight-box">
          <h4>First Executed</h4>
          <p>{insights.firstProcess}</p>
        </div>

        <div className="insight-box">
          <h4>Last Executed</h4>
          <p>{insights.lastProcess}</p>
        </div>

        <div className="insight-box">
          <h4>Highest WT</h4>
          <p>{insights.maxWT}</p>
        </div>

        <div className="insight-box">
          <h4>Lowest WT</h4>
          <p>{insights.minWT}</p>
        </div>

        <div className="insight-box">
          <h4>Total Processes</h4>
          <p>{insights.totalProcesses}</p>
        </div>

        <div className="insight-box">
          <h4>Context Switches</h4>
          <p>{insights.contextSwitches}</p>
        </div>

        <div className="insight-box">
          <h4>CPU Idle Time</h4>
          <p>{insights.idleTime}</p>
        </div>

        <div className="insight-box">
          <h4>CPU Utilization</h4>
          <p>{insights.cpuUtilization}%</p>
        </div>

      </div>
    </div>
  );
}

export default SchedulerInsights;