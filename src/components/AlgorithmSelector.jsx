import React from "react";

function AlgorithmSelector({
  algorithm,
  setAlgorithm,
  timeQuantum,
  setTimeQuantum,
}) {
  const algorithms = [
    {
      id: "FCFS",
      title: "FCFS",
      subtitle: "First Come First Serve",
    },
    {
      id: "SJF",
      title: "SJF",
      subtitle: "Shortest Job First",
    },
    {
      id: "SRTF",
      title: "SRTF",
      subtitle: "Shortest Remaining Time",
    },
    {
      id: "RR",
      title: "RR",
      subtitle: "Round Robin",
    },
    {
      id: "PRIORITY",
      title: "PRIO",
      subtitle: "Priority Scheduling",
    },
  ];

  return (
    <div className="glass-card">
      <h2 className="section-title">
        01 — ALGORITHM
      </h2>

      <div className="algorithm-cards">

        {algorithms.map((algo) => (
          <div
            key={algo.id}
            className={
              algorithm === algo.id
                ? "algorithm-card active"
                : "algorithm-card"
            }
            onClick={() =>
              setAlgorithm(algo.id)
            }
          >
            <h3>{algo.title}</h3>

            <p>{algo.subtitle}</p>
          </div>
        ))}

      </div>

      {algorithm === "RR" && (
        <div className="rr-box">
          <label>
            Time Quantum
          </label>

          <input
            type="number"
            min="1"
            value={timeQuantum}
            onChange={(e) =>
              setTimeQuantum(
                Number(e.target.value)
              )
            }
          />
        </div>
      )}

      <div className="algorithm-info">

        {algorithm === "FCFS" &&
          "First Come First Serve (Non-Preemptive)"}

        {algorithm === "SJF" &&
          "Shortest Job First (Non-Preemptive)"}

        {algorithm === "SRTF" &&
          "Shortest Remaining Time First (Preemptive)"}

        {algorithm === "RR" &&
          `Round Robin (Quantum = ${timeQuantum})`}

        {algorithm === "PRIORITY" &&
          "Priority Scheduling (Non-Preemptive)"}

      </div>
    </div>
  );
}

export default AlgorithmSelector;