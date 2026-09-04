export function srtf(processes) {
  const n = processes.length;

  const remaining = processes.map(
    (p) => p.burst
  );

  const completion = new Array(n).fill(0);

  let completed = 0;
  let currentTime = 0;

  const gantt = [];

  while (completed < n) {
    let idx = -1;
    let minRemaining = Infinity;

    for (let i = 0; i < n; i++) {
      if (
        processes[i].arrival <= currentTime &&
        remaining[i] > 0 &&
        remaining[i] < minRemaining
      ) {
        minRemaining = remaining[i];
        idx = i;
      }
    }

    if (idx === -1) {
      currentTime++;
      continue;
    }

    const pid = processes[idx].pid;

    if (
      gantt.length > 0 &&
      gantt[gantt.length - 1].pid === pid
    ) {
      gantt[gantt.length - 1].end++;
    } else {
      gantt.push({
        pid,
        start: currentTime,
        end: currentTime + 1,
      });
    }

    remaining[idx]--;

    currentTime++;

    if (remaining[idx] === 0) {
      completion[idx] = currentTime;
      completed++;
    }
  }

  const results = processes.map(
    (p, i) => {
      const ct = completion[i];
      const tat = ct - p.arrival;
      const wt = tat - p.burst;

      return {
        ...p,
        ct,
        tat,
        wt,
      };
    }
  );

  return {
    results,
    gantt,
  };
}