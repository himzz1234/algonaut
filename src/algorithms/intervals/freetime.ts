import type { Interval, IntervalStep } from "../types";

export function* employeeFreeTime(
  schedule: Interval[][]
): Generator<IntervalStep> {
  let all = schedule.flat().sort((a, b) => a.start - b.start);
  let merged: Interval[] = [];

  yield {
    type: "init",
    intervals: all,
    explanation: `First, put all intervals together from all employees.`,
    lines: [0],
  };

  let curr = { ...all[0] };

  yield {
    type: "highlight",
    ids: all.map((iv) => iv.id),
    explanation: `Now sort them by when they start so it's easier to check overlaps.`,
    lines: [1],
  };

  for (let i = 1; i < all.length; i++) {
    let iv = all[i];

    yield {
      type: "compare",
      ids: [curr.id, iv.id],
      explanation: `Look at ${curr.start}-${curr.end} and ${iv.start}-${iv.end} to see if they overlap.`,
      lines: [3, 4],
    };

    if (iv.start <= curr.end) {
      curr.end = Math.max(curr.end, iv.end);

      yield {
        type: "merge",
        ids: [curr.id, iv.id],
        newInterval: { ...curr },
        mergeAtAxis: false,
        explanation: `They overlap so extend the current interval to ${curr.start}-${curr.end}.`,
        lines: [5],
      };
    } else {
      merged.push(curr);

      yield {
        type: "highlight",
        ids: [curr.id],
        explanation: `These two don't overlap so lock in ${curr.start}-${curr.end} as busy time.`,
        lines: [7],
      };

      const gapInterval: Interval = {
        id: Number(`${curr.id}${iv.id}99`),
        start: curr.end,
        end: iv.start,
      };

      yield {
        type: "gap",
        interval: gapInterval,
        explanation: `That means there’s free time from ${gapInterval.start} to ${gapInterval.end}.`,
        lines: [8],
      };

      curr = { ...iv };
    }
  }

  merged.push(curr);

  yield {
    type: "done",
    explanation: `All intervals checked. These are the final busy times and free times we found.`,
    lines: [10, 11],
  };
}
