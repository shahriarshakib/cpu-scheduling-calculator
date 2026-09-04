import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header-card">
  <p className="header-top">
    Operating Systems Project
  </p>
<p className="status-badge">
  ● SYSTEM ONLINE
</p>
  <h1>
    CPU Scheduling Simulator
  </h1>

  <p className="header-subtitle">
    FCFS • SJF • SRTF • Round Robin • Priority
  </p>
  
  <div className="algo-pills">
    
  <span>FCFS</span>
  <span>SJF</span>
  <span>SRTF</span>
  <span>RR</span>
  <span>Priority</span>
</div>


  <p className="header-desc">
    Interactive Scheduling Analytics Platform
  </p>
</div>
  );
}

export default Header;