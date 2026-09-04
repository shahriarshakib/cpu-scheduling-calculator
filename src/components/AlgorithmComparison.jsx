import React from "react";

function AlgorithmComparison({
  comparisonData,
  bestAlgorithm,
}) {
  if (!comparisonData.length) {
    return null;
  }

  return (
    <div className="glass-card">
      <h2 className="section-title">
        Algorithm Comparison
      </h2>

      <table>
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Avg WT</th>
            <th>Avg TAT</th>
            <th>Throughput</th>
          </tr>
        </thead>

        <tbody>
          {comparisonData.map(
            (algo, index) => (
              <tr key={index}>
                <td>{algo.name}</td>
                <td>{algo.avgWT}</td>
                <td>{algo.avgTAT}</td>
                <td>{algo.throughput}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "1.1rem",
          fontWeight: "700",
          color: "#22c55e",
        }}
      >
        🏆 Best Algorithm: {bestAlgorithm}
      </div>
    </div>
  );
}

export default AlgorithmComparison;