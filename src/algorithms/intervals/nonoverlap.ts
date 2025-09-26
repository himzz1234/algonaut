import type { Interval, IntervalStep } from "../types";

export function* nonOverlappingIntervals(
  intervals: Interval[]
): Generator<IntervalStep> {
  let a = [...intervals].sort((iv1, iv2) => iv1.end - iv2.end);
  if (a.length === 0) return;

  yield {
    type: "init",
    intervals: [...a],
    explanation: `We want to remove the minimum number of intervals so that none overlap.`,
    lines: [0],
  };

  yield {
    type: "highlight",
    ids: a.map((iv) => iv.id),
    explanation: `Sort intervals by end time → ${a
      .map((iv) => `[${iv.start},${iv.end}]`)
      .join(", ")}.`,
    lines: [0, 1],
  };

  let countRemoved = 0;
  let prev = a[0];

  for (let i = 1; i < a.length; i++) {
    const curr = a[i];

    yield {
      type: "compare",
      ids: [prev.id, curr.id],
      explanation: `Compare [${curr.start}, ${curr.end}] with the last kept interval [${prev.start}, ${prev.end}].`,
      lines: [2],
    };

    if (curr.start < prev.end) {
      countRemoved++;
      yield {
        type: "remove",
        id: curr.id,
        explanation: `Overlap detected! Remove [${curr.start}, ${curr.end}].`,
        lines: [5, 6],
      };
    } else {
      prev = curr;
      yield {
        type: "highlight",
        ids: [curr.id],
        explanation: `No overlap. Keep [${curr.start}, ${curr.end}] and update last interval.`,
        lines: [3, 4],
      };
    }
  }

  yield {
    type: "done",
    explanation: `All intervals processed. Removed ${countRemoved} intervals to eliminate overlaps.`,
    lines: [7],
  };
}
