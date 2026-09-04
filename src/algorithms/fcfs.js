export function fcfs(processes) {
  const sorted = [...processes].sort(
    (a, b) => a.arrival - b.arrival
  );

  let currentTime = 0;

  const results = sorted.map((p) => {
    const start = Math.max(
      currentTime,
      p.arrival
    );

    const ct = start + p.burst;

    const tat = ct - p.arrival;

    const wt = tat - p.burst;

    currentTime = ct;

    return {
      ...p,
      ct,
      tat,
      wt,
    };
  });

  return results;
}