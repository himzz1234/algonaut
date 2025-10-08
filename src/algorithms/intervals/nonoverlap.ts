import type { Interval, IntervalStep } from "../types";

export function* nonOverlappingIntervals(
  intervals: Interval[]
): Generator<IntervalStep> {
  if (intervals.length === 0) return;

  yield {
    type: "init",
    intervals: [...intervals],
    explanation: `Find the smallest number of intervals to remove so that no two overlap.`,
    lines: [0],
  };

  const sorted = [...intervals].sort((a, b) => a.end - b.end);

  yield {
    type: "sort",
    intervals: sorted,
    explanation: `Intervals are now sorted by end time: ${sorted
      .map((iv) => `[${iv.start}, ${iv.end}]`)
      .join(", ")}.`,
    lines: [1],
  };

  let countRemoved = 0;
  let prev = sorted[0];

  yield {
    type: "highlight",
    ids: [prev.id],
    explanation: `Start with the first interval [${prev.start}, ${prev.end}].`,
    lines: [2, 3],
  };

  for (let i = 1; i < sorted.length; i++) {
    const curr = sorted[i];

    yield {
      type: "highlight",
      ids: [curr.id],
      explanation: `Now look at the next interval [${curr.start}, ${curr.end}].`,
      lines: [4],
    };

    yield {
      type: "compare",
      ids: [prev.id, curr.id],
      explanation: `Compare it with the last kept interval [${prev.start}, ${prev.end}].`,
      lines: [5],
    };

    if (curr.start < prev.end) {
      countRemoved++;

      yield {
        type: "remove",
        id: curr.id,
        explanation: `They overlap, so remove [${curr.start}, ${curr.end}] and increase the removed count to ${countRemoved}.`,
        lines: [6, 7],
      };
    } else {
      prev = curr;

      yield {
        type: "append",
        interval: { ...curr },
        explanation: `No overlap. Keep [${curr.start}, ${curr.end}] as the new reference interval.`,
        lines: [8, 9],
      };
    }
  }

  yield {
    type: "done",
    explanation: `All intervals checked. ${countRemoved} interval${
      countRemoved === 1 ? " was" : "s were"
    } removed.`,
    lines: [10],
  };
}
