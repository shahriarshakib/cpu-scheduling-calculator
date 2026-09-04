import React, { useState } from "react";

function ProcessForm({
  addProcess,
  algorithm,
}) {
  const [pid, setPid] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [priority, setPriority] = useState("");

  const handleAdd = () => {
    if (!pid || !arrival || !burst) {
      alert("Please fill all fields");
      return;
    }

    addProcess({
      pid,
      arrival: Number(arrival),
      burst: Number(burst),
      priority: Number(priority || 1),
    });

    setPid("");
    setArrival("");
    setBurst("");
    setPriority("");
  };

  return (
    <div className="glass-card">
      <h2 className="section-title">
        Add Process
      </h2>

      <div className="process-grid">
        <input
          placeholder="Process ID"
          value={pid}
          onChange={(e) =>
            setPid(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Arrival Time"
          value={arrival}
          onChange={(e) =>
            setArrival(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Burst Time"
          value={burst}
          onChange={(e) =>
            setBurst(e.target.value)
          }
        />

        {algorithm === "PRIORITY" && (
          <input
            type="number"
            placeholder="Priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          />
        )}
      </div>

      <button
        className="btn primary"
        onClick={handleAdd}
        style={{ marginTop: "15px" }}
      >
        Add Process
      </button>
    </div>
  );
}

export default ProcessForm;