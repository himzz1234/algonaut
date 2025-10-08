import type { Interval, IntervalStep } from "../types";

export function* employeeFreeTime(
  schedule: Interval[][]
): Generator<IntervalStep> {
  let all = schedule.flat();
  let merged: Interval[] = [];

  yield {
    type: "init",
    intervals: all,
    explanation: `We need to find the common free time across all employees' schedules.`,
    lines: [0],
  };

  const sorted = [...all].sort((a, b) => a.start - b.start);

  yield {
    type: "sort",
    intervals: sorted,
    explanation: `Flatten and sort all employee schedules by start time.`,
    lines: [1, 2],
  };

  let curr = { ...sorted[0] };

  yield {
    type: "highlight",
    ids: [curr.id],
    explanation: `Start with the first busy interval [${curr.start}, ${curr.end}].`,
    lines: [3, 4],
  };

  for (let i = 1; i < sorted.length; i++) {
    let iv = sorted[i];

    yield {
      type: "highlight",
      ids: [iv.id],
      explanation: `Now check the next interval [${iv.start}, ${iv.end}].`,
      lines: [5],
    };

    yield {
      type: "compare",
      ids: [curr.id, iv.id],
      explanation: `Compare [${curr.start}, ${curr.end}] with [${iv.start}, ${iv.end}] to see if they overlap.`,
      lines: [6, 7],
    };

    if (iv.start <= curr.end) {
      curr.end = Math.max(curr.end, iv.end);

      yield {
        type: "merge",
        ids: [curr.id, iv.id],
        newInterval: { ...curr },
        mergeAtAxis: false,
        explanation: `They overlap, so extend the current busy period to [${curr.start}, ${curr.end}].`,
        lines: [8],
      };
    } else {
      merged.push(curr);

      yield {
        type: "append",
        interval: { ...curr },
        explanation: `No overlap. Mark [${curr.start}, ${curr.end}] as a confirmed busy time.`,
        lines: [10],
      };

      const gapInterval: Interval = {
        id: Number(`${curr.id}${iv.id}99`),
        start: curr.end,
        end: iv.start,
        type: "gap",
      };

      yield {
        type: "gap",
        interval: gapInterval,
        explanation: `Free time found between [${gapInterval.start}, ${gapInterval.end}].`,
        lines: [11, 12],
      };

      curr = { ...iv };
    }
  }

  merged.push(curr);

  yield {
    type: "done",
    explanation: `All intervals checked. The free time is shown between the busy ones.`,
    lines: [14, 15],
  };
}
