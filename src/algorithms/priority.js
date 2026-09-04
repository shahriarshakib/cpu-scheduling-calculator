export function priorityScheduling(processes) {
  const n = processes.length;

  let completed = 0;
  let currentTime = 0;

  const visited = new Array(n).fill(false);

  const result = [];

  while (completed < n) {
    let idx = -1;
    let bestPriority = Infinity;

    for (let i = 0; i < n; i++) {
      if (
        !visited[i] &&
        processes[i].arrival <= currentTime &&
        processes[i].priority < bestPriority
      ) {
        bestPriority = processes[i].priority;
        idx = i;
      }
    }

    if (idx === -1) {
      currentTime++;
      continue;
    }

    const p = processes[idx];

    currentTime += p.burst;

    const ct = currentTime;
    const tat = ct - p.arrival;
    const wt = tat - p.burst;

    result.push({
      ...p,
      ct,
      tat,
      wt,
    });

    visited[idx] = true;
    completed++;
  }

  return result;
}