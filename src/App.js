import SchedulerInsights from "./components/SchedulerInsights";
import { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";

import AlgorithmComparison from "./components/AlgorithmComparison";
import { fcfs } from "./algorithms/fcfs";
import { sjf } from "./algorithms/sjf";
import { srtf } from "./algorithms/srtf";
import { roundRobin } from "./algorithms/rr";
import { priorityScheduling } from "./algorithms/priority";

import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import AlgorithmSelector from "./components/AlgorithmSelector";
import ProcessForm from "./components/ProcessForm";
import GanttChart from "./components/GanttChart";
import ResultsTable from "./components/ResultsTable";
import PerformanceCharts from "./components/PerformanceCharts";

function App() {
  const [algorithm, setAlgorithm] = useState("FCFS");

  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);
  const [ganttData, setGanttData] = useState([]);

  const [timeQuantum, setTimeQuantum] = useState(2);
  const [started, setStarted] =
  useState(false);

  const [stats, setStats] = useState({
    avgWT: 0,
    avgTAT: 0,
    throughput: 0,
    cpuUtilization: 0,
  });

const [insights, setInsights] = useState({
  firstProcess: "-",
  lastProcess: "-",
  maxWT: "-",
  minWT: "-",
  totalProcesses: 0,
  contextSwitches: 0,
  idleTime: 0,
  cpuUtilization: 0,
});
const [comparisonData, setComparisonData] =
  useState([]);

const [bestAlgorithm, setBestAlgorithm] =
  useState("-");

  const addProcess = (process) => {
    setProcesses((prev) => [...prev, process]);
  };

  const deleteProcess = (index) => {
    const updated = processes.filter((_, i) => i !== index);
    setProcesses(updated);
  };

const clearAll = () => {
  setProcesses([]);
  setResults([]);
  setGanttData([]);
  setComparisonData([]);

  setBestAlgorithm("-");

  setStats({
    avgWT: 0,
    avgTAT: 0,
    throughput: 0,
    cpuUtilization: 0,
  });

  setInsights({
    firstProcess: "-",
    lastProcess: "-",
    maxWT: "-",
    minWT: "-",
    totalProcesses: 0,
    contextSwitches: 0,
    idleTime: 0,
    cpuUtilization: 0,
  });
};

const getMetrics = (data) => {
  const avgWT =
    data.reduce(
      (sum, p) => sum + p.wt,
      0
    ) / data.length;

  const avgTAT =
    data.reduce(
      (sum, p) => sum + p.tat,
      0
    ) / data.length;

  const maxCT =
    Math.max(
      ...data.map((p) => p.ct)
    );

  return {
    avgWT:
      avgWT.toFixed(2),

    avgTAT:
      avgTAT.toFixed(2),

    throughput:
      (
        data.length / maxCT
      ).toFixed(2),
  };
};

const loadSampleData = () => {
  
  setProcesses([
    {
      pid: "P1",
      arrival: 0,
      burst: 7,
      priority: 2,
    },
    {
      pid: "P2",
      arrival: 2,
      burst: 4,
      priority: 1,
    },
    {
      pid: "P3",
      arrival: 4,
      burst: 1,
      priority: 3,
    },
    {
      pid: "P4",
      arrival: 5,
      burst: 4,
      priority: 2,
    },
  ]);
};




  const calculate = () => {
    if (processes.length === 0) {
      alert("Add processes first");
      return;
    }

    let output = [];

    switch (algorithm) {
      case "FCFS":
        output = fcfs(processes);
        break;

      case "SJF":
        output = sjf(processes);
        break;

case "SRTF":
  const srtfOutput = srtf(processes);

  output = srtfOutput.results;

  setGanttData(
    srtfOutput.gantt
  );

  break;

case "RR":
  const rrOutput = roundRobin(
    processes,
    timeQuantum
  );

  output = rrOutput.results;

  setGanttData(
    rrOutput.gantt
  );

  break;

      case "PRIORITY":
        output = priorityScheduling(
          processes
        );
        break;

      default:
        output = [];
    }

setResults(output);

const fcfsData = fcfs(processes);

const sjfData = sjf(processes);

const priorityData =
  priorityScheduling(processes);

const srtfData =
  srtf(processes).results;

const rrData =
  roundRobin(
    processes,
    timeQuantum
  ).results;

const comparison = [
  {
    name: "FCFS",
    ...getMetrics(fcfsData),
  },
  {
    name: "SJF",
    ...getMetrics(sjfData),
  },
  {
    name: "SRTF",
    ...getMetrics(srtfData),
  },
  {
    name: "RR",
    ...getMetrics(rrData),
  },
  {
    name: "PRIORITY",
    ...getMetrics(priorityData),
  },
];

setComparisonData(comparison);

const best = comparison.reduce(
  (prev, current) => {
    if (
      parseFloat(current.avgWT) <
      parseFloat(prev.avgWT)
    ) {
      return current;
    }

    if (
      parseFloat(current.avgWT) ===
      parseFloat(prev.avgWT)
    ) {
      return parseFloat(current.avgTAT) <
        parseFloat(prev.avgTAT)
        ? current
        : prev;
    }

    return prev;
  }
);

setBestAlgorithm(best.name);

    const sortedWT = [...output].sort(
  (a, b) => a.wt - b.wt
);

const totalBurst =
  output.reduce(
    (sum, p) => sum + p.burst,
    0
  );

const finishTime =
  Math.max(
    ...output.map((p) => p.ct)
  );

const idleTime =
  finishTime - totalBurst;

const cpuUtilization =
  (
    (totalBurst / finishTime) *
    100
  ).toFixed(2);

let currentGantt = [];

if (algorithm === "SRTF") {
  currentGantt = srtf(processes).gantt;
}
else if (algorithm === "RR") {
  currentGantt =
    roundRobin(
      processes,
      timeQuantum
    ).gantt;
}
else {
  currentGantt = output.map((p) => ({
    pid: p.pid,
    start: p.ct - p.burst,
    end: p.ct,
  }));
}

const contextSwitches =
  currentGantt.length > 0
    ? currentGantt.length - 1
    : 0;
    
setInsights({
  firstProcess:
    output[0]?.pid || "-",

  lastProcess:
  currentGantt[
    currentGantt.length - 1
  ]?.pid || "-",

  maxWT: `${
    sortedWT[sortedWT.length - 1]?.pid
  } (${sortedWT[sortedWT.length - 1]?.wt})`,

  minWT: `${
    sortedWT[0]?.pid
  } (${sortedWT[0]?.wt})`,

  totalProcesses:
    output.length,

  contextSwitches,

  idleTime,

  cpuUtilization,
});

    const avgWT =
      output.reduce(
        (sum, p) => sum + p.wt,
        0
      ) / output.length;

    const avgTAT =
      output.reduce(
        (sum, p) => sum + p.tat,
        0
      ) / output.length;

    const maxCT = Math.max(
      ...output.map((p) => p.ct)
    );

setStats({
  avgWT: avgWT.toFixed(2),
  avgTAT: avgTAT.toFixed(2),
  throughput: (
    output.length / maxCT
  ).toFixed(2),
  cpuUtilization,
});

if (
  algorithm !== "SRTF" &&
  algorithm !== "RR"
) {
  setGanttData(
    output.map((p) => ({
      pid: p.pid,
      start: p.ct - p.burst,
      end: p.ct,
    }))
  );
}
  };

if (!started) {
  return (
    <LandingPage
      onStart={() =>
        setStarted(true)
      }
    />
  );
}

return (
  <div className="app">
      <div className="background"></div>

      <div className="container">
        <Header />
        <div className="page-actions">
  <button
 
  className="home-btn"
  onClick={() => setStarted(false)}
>
  🏠 Back To Home
</button>
</div>

        <StatsCards stats={stats} />

        <AlgorithmSelector
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          timeQuantum={timeQuantum}
          setTimeQuantum={setTimeQuantum}
        />

        <ProcessForm
          addProcess={addProcess}
          algorithm={algorithm}
        />

        <div className="action-buttons">
          <button
            className="btn primary"
            onClick={calculate}
          >
            Calculate
          </button>

          <button
            className="btn secondary"
            onClick={loadSampleData}
          >
            Load Sample
          </button>

          <button
            className="btn danger"
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>

<ResultsTable
  processes={processes}
  deleteProcess={deleteProcess}
  results={results}
/>

<SchedulerInsights
  insights={insights}
/>

<AlgorithmComparison
  comparisonData={comparisonData}
  bestAlgorithm={bestAlgorithm}
/>

<GanttChart
  ganttData={ganttData}
/>

<PerformanceCharts
  results={results}
/>
      </div>
    </div>
  );
}


export default App;
