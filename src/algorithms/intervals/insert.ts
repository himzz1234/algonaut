import type { Interval, IntervalStep } from "../types";

export function* insertInterval(
  intervals: Interval[],
  newInterval: Interval
): Generator<IntervalStep> {
  if (intervals.length === 0) return;

  const existing = [...intervals];
  const current = { ...newInterval };
  const merged: Interval[] = [];

  yield {
    type: "init",
    intervals: [...existing, current],
    explanation: `Insert the new interval [${current.start}, ${current.end}] into the existing list of intervals.`,
    lines: [0],
    pointers: {
      "new interval": current.id,
    },
  };

  const sorted = [...existing].sort((a, b) => a.start - b.start);

  yield {
    type: "sort",
    intervals: [...sorted, current],
    explanation: `Existing intervals are now sorted by start time.`,
    lines: [1, 2],
    pointers: {
      "new interval": current.id,
    },
  };

  yield {
    type: "highlight",
    ids: [current.id],
    explanation: `Start comparing intervals to decide where to insert [${current.start}, ${current.end}].`,
    lines: [3],
    pointers: {
      "new interval": current.id,
    },
  };

  let temp = { ...current };

  for (let i = 0; i < sorted.length; i++) {
    const curr = sorted[i];

    yield {
      type: "compare",
      ids: [curr.id, temp.id],
      pointers: { "new interval": temp.id },
      explanation: `Compare [${curr.start}, ${curr.end}] with the new interval [${temp.start}, ${temp.end}].`,
      lines: [3],
    };

    if (curr.end < temp.start) {
      merged.push(curr);

      yield {
        type: "append",
        interval: { ...curr },
        explanation: `[${curr.start}, ${curr.end}] ends before the new interval starts, so keep it as is.`,
        lines: [4, 5],
        pointers: { "new interval": temp.id },
      };
    } else if (temp.end < curr.start) {
      merged.push(temp);

      yield {
        type: "append",
        interval: { ...temp },
        explanation: `The new interval [${temp.start}, ${temp.end}] ends before [${curr.start}, ${curr.end}], so insert it here.`,
        lines: [6, 7, 8],
      };

      temp = { id: -1, start: Infinity, end: Infinity };
      merged.push(curr);
    } else {
      const oldStart = temp.start;
      const oldEnd = temp.end;

      temp = {
        ...temp,
        start: Math.min(temp.start, curr.start),
        end: Math.max(temp.end, curr.end),
      };

      yield {
        type: "merge",
        ids: [curr.id, current.id],
        newInterval: { ...temp },
        mergeAtAxis: false,
        pointers: { "new interval": temp.id },
        explanation: `These intervals overlap — merge [${oldStart}, ${oldEnd}] and [${curr.start}, ${curr.end}] into [${temp.start}, ${temp.end}].`,
        lines: [9, 10, 11],
      };
    }
  }

  if (temp.start !== Infinity) {
    merged.push(temp);

    yield {
      type: "append",
      interval: { ...temp },
      explanation: `Add the final interval [${temp.start}, ${temp.end}] to the result.`,
      lines: [12],
    };
  }

  yield {
    type: "done",
    explanation: `All intervals processed. Final merged list: ${merged
      .map((iv) => `[${iv.start}, ${iv.end}]`)
      .join(", ")}.`,
    lines: [13],
  };
}
