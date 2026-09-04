import React from "react";

function GanttChart({ ganttData }) {
  if (!ganttData.length) {
    return (
      <div className="glass-card">
        <h2 className="section-title">
          Execution Timeline
        </h2>

        <p>No Gantt Data Yet</p>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h2 className="section-title">
        Execution Timeline
      </h2>

      <div className="real-gantt">

{ganttData.map((item, index) => (
  <div
    key={index}
    className="gantt-segment"
    style={{
      flex: item.end - item.start
    }}
  >
    <div className="segment-process">
      {item.pid}
    </div>

   <div className="segment-times">
  <span>{item.start}</span>
  <span>{item.end}</span>
</div>

  </div>
))}
      

      </div>
    </div>
  );
}

export default GanttChart;