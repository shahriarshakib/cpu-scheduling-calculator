export function roundRobin(
  processes,
  quantum
) {
  const queue = [];

  const remaining = {};

  processes.forEach((p) => {
    remaining[p.pid] = p.burst;
  });

  const sorted = [...processes].sort(
    (a, b) => a.arrival - b.arrival
  );

  let currentTime = 0;
  let completed = 0;
  let index = 0;

  const completionTimes = {};
  const gantt = [];

  while (completed < processes.length) {
    while (
      index < sorted.length &&
      sorted[index].arrival <= currentTime
    ) {
      queue.push(sorted[index]);
      index++;
    }

    if (queue.length === 0) {
      currentTime++;
      continue;
    }

    const current = queue.shift();

    const executeTime = Math.min(
      quantum,
      remaining[current.pid]
    );

    gantt.push({
      pid: current.pid,
      start: currentTime,
      end: currentTime + executeTime,
    });

    remaining[current.pid] -= executeTime;

    currentTime += executeTime;

    while (
      index < sorted.length &&
      sorted[index].arrival <= currentTime
    ) {
      queue.push(sorted[index]);
      index++;
    }

    if (remaining[current.pid] > 0) {
      queue.push(current);
    } else {
      completionTimes[current.pid] =
        currentTime;

      completed++;
    }
  }

  const results = processes.map(
    (p) => {
      const ct = completionTimes[p.pid];
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