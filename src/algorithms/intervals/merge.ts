import type { Interval, IntervalStep } from "../types";

export function* mergeIntervals(
  intervals: Interval[]
): Generator<IntervalStep> {
  if (intervals.length === 0) return;

  yield {
    type: "init",
    intervals: [...intervals],
    explanation: `Start with the given intervals: ${intervals
      .map((iv) => `[${iv.start}, ${iv.end}]`)
      .join(", ")}.`,
    lines: [0],
  };

  const sorted = [...intervals].sort((a, b) => a.start - b.start);

  yield {
    type: "sort",
    intervals: sorted,
    explanation: `Intervals are now sorted by start time: ${sorted
      .map((iv) => `[${iv.start}, ${iv.end}]`)
      .join(", ")}.`,
    lines: [1],
  };

  const merged: Interval[] = [];
  merged.push({ ...sorted[0] });

  yield {
    type: "highlight",
    ids: [sorted[0].id],
    explanation: `Begin with the first interval [${sorted[0].start}, ${sorted[0].end}].`,
    lines: [2],
  };

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    yield {
      type: "highlight",
      ids: [current.id],
      explanation: `Now look at the next interval [${current.start}, ${current.end}].`,
      lines: [3],
    };

    yield {
      type: "compare",
      ids: [last.id, current.id],
      explanation: `Compare the current interval [${current.start}, ${current.end}] with the previous one [${last.start}, ${last.end}].`,
      lines: [4, 5],
    };

    if (current.start <= last.end) {
      const newInterval: Interval = {
        id: last.id,
        start: last.start,
        end: Math.max(last.end, current.end),
      };

      merged[merged.length - 1] = newInterval;

      yield {
        type: "merge",
        ids: [last.id, current.id],
        newInterval,
        mergeAtAxis: true,
        explanation: `These intervals overlap, so merge them into [${newInterval.start}, ${newInterval.end}].`,
        lines: [6, 7],
      };
    } else {
      merged.push({ ...current });

      yield {
        type: "append",
        interval: { ...current },
        explanation: `No overlap. Add [${current.start}, ${current.end}] to the merged list.`,
        lines: [8, 9],
      };
    }
  }

  yield {
    type: "done",
    result: merged,
    explanation: `All intervals checked. The merged result is ${merged
      .map((iv) => `[${iv.start}, ${iv.end}]`)
      .join(", ")}.`,
    lines: [10],
  };
}
