import React from "react";

function ResultsTable({
  processes,
  deleteProcess,
  results,
}) {
  return (
    <div className="glass-card">
      <h2 className="section-title">
        Process Results
      </h2>

      <table>
        <thead>
      <tr>
  <th>Process ID</th>
  <th>Arrival Time</th>
  <th>Burst Time</th>
  <th>Priority</th>
  <th>Completion Time</th>
  <th>Turnaround Time</th>
  <th>Waiting Time</th>
  <th>Action</th>
</tr>
        </thead>

        <tbody>
          {processes.map((process, index) => {
            const result =
              results.find(
                (r) =>
                  r.pid === process.pid
              ) || {};

            return (
              <tr key={index}>
                <td>{process.pid}</td>

                <td>
                  {process.arrival}
                </td>

                <td>
                  {process.burst}
                </td>

                <td>
                  {process.priority}
                </td>

                <td>
                  {result.ct ?? "-"}
                </td>

                <td>
                  {result.tat ?? "-"}
                </td>

                <td>
                  {result.wt ?? "-"}
                </td>

                <td>
                  <button
                    className="btn danger"
                    onClick={() =>
                      deleteProcess(index)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;