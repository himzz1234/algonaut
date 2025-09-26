import type { Interval, IntervalStep } from "../types";

export function* insertInterval(
  intervals: Interval[],
  newInterval: Interval
): Generator<IntervalStep> {
  const a = [...intervals].sort((iv1, iv2) => iv1.start - iv2.start);
  if (a.length === 0) return;

  const merged: Interval[] = [];

  let current = { ...newInterval };

  yield {
    type: "init",
    intervals: [...a, current],
    explanation: `We need to insert the new interval [${current.start}, ${current.end}] into the list of intervals.`,
    lines: [0],
    pointers: {
      "new interval": current.id,
    },
  };

  yield {
    type: "highlight",
    ids: a.map((iv) => iv.id),
    explanation: `Sort intervals by start time → ${a
      .map((iv) => `[${iv.start},${iv.end}]`)
      .join(", ")}.`,
    lines: [0, 1],
    pointers: {
      "new interval": current.id,
    },
  };

  for (let i = 0; i < a.length; i++) {
    const curr = a[i];

    yield {
      type: "compare",
      ids: [curr.id, current.id],
      pointers: {
        "new interval": current.id,
      },
      explanation: `Compare current interval [${curr.start}, ${curr.end}] with new interval [${current.start}, ${current.end}].`,
      lines: [2],
    };

    if (curr.end < current.start) {
      merged.push(curr);

      yield {
        type: "append",
        interval: { ...curr },
        explanation: `[${curr.start}, ${curr.end}] ends before new interval starts. Add it directly to result.`,
        lines: [4],
        pointers: {
          "new interval": current.id,
        },
      };
    } else if (current.end < curr.start) {
      merged.push(current);

      yield {
        type: "append",
        interval: { ...current },
        explanation: `New interval [${current.start}, ${current.end}] ends before [${curr.start}, ${curr.end}]. Insert it here.`,
        lines: [5, 6],
      };

      current = { id: -1, start: Infinity, end: Infinity };
      merged.push(curr);
    } else {
      const oldStart = current.start;
      const oldEnd = current.end;

      current = {
        ...current,
        start: Math.min(current.start, curr.start),
        end: Math.max(current.end, curr.end),
      };

      yield {
        type: "merge",
        ids: [curr.id, newInterval.id],
        newInterval: { ...current },
        mergeAtAxis: false,
        pointers: {
          "new interval": current.id,
        },
        explanation: `Overlapping! Merge [${oldStart}, ${oldEnd}] and [${curr.start}, ${curr.end}] → [${current.start}, ${current.end}].`,
        lines: [8, 9],
      };
    }
  }

  if (current.start !== Infinity) {
    merged.push(current);

    yield {
      type: "append",
      interval: { ...current },
      explanation: `Insert the final new interval [${current.start}, ${current.end}] at the end.`,
      lines: [9],
    };
  }

  yield {
    type: "done",
    explanation: `Insert Interval complete. Final merged intervals are ${merged
      .map((iv) => `[${iv.start}, ${iv.end}]`)
      .join(", ")}.`,
    lines: [10],
  };
}
