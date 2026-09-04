import "./LandingPage.css";

function LandingPage({ onStart }) {
  return (
<div className="landing">
  <div className="terminal">

<p className="university">
  Bangladesh University of Professionals
</p>

<h1>
  CPU Scheduling Simulator
</h1>

<p className="subtitle">
  Interactive Operating Systems Project
</p>

<div className="badges">
  <span>FCFS</span>
  <span>SJF</span>
  <span>SRTF</span>
  <span>Round Robin</span>
  <span>Priority</span>
</div>

<button
  className="start-btn"
  onClick={onStart}
>
  Launch Simulator
</button>

  </div>
</div>
  );
}

export default LandingPage;