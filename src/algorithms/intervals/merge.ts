import type { Interval, IntervalStep } from "../types";

export function* mergeIntervals(
  intervals: Interval[]
): Generator<IntervalStep> {
  const a = [...intervals].sort((iv1, iv2) => iv1.start - iv2.start);
  if (a.length === 0) return;

  const merged: Interval[] = [];

  yield {
    type: "init",
    intervals: [...a],
    explanation: `We need to merge overlapping intervals: ${a
      .map((iv) => `[${iv.start},${iv.end}]`)
      .join(", ")}.`,
    lines: [0],
  };

  yield {
    type: "highlight",
    ids: a.map((iv) => iv.id),
    explanation: `Sort intervals by start time → ${a
      .map((iv) => `[${iv.start},${iv.end}]`)
      .join(", ")}.`,
    lines: [0],
  };

  merged.push({ ...a[0] });

  yield {
    type: "highlight",
    ids: [a[0].id],
    explanation: `Start with the first interval [${a[0].start},${a[0].end}].`,
    lines: [2],
  };

  for (let i = 1; i < a.length; i++) {
    const current = a[i];
    const last = merged[merged.length - 1];

    yield {
      type: "compare",
      ids: [last.id, current.id],
      explanation: `Compare [${last.start},${last.end}] with [${current.start},${current.end}].`,
      lines: [3],
    };

    if (current.start <= last.end) {
      const newInterval: Interval = {
        id: current.id,
        start: last.start,
        end: Math.max(last.end, current.end),
      };

      merged[merged.length - 1] = newInterval;

      yield {
        type: "merge",
        ids: [last.id, current.id],
        newInterval,
        mergeAtAxis: true,
        explanation: `They overlap → merge into [${newInterval.start},${newInterval.end}].`,
        lines: [5, 6],
      };
    } else {
      merged.push({ ...current });

      yield {
        type: "append",
        interval: { ...current },
        explanation: `No overlap → add interval [${current.start},${current.end}] to result.`,
        lines: [4],
      };
    }
  }

  yield {
    type: "done",
    result: merged,
    explanation: `All intervals processed. Final merged intervals: ${merged
      .map((iv) => `[${iv.start},${iv.end}]`)
      .join(", ")}.`,
    lines: [7],
  };
}
