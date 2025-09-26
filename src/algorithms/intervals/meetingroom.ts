import type { Interval, IntervalStep } from "../types";

export function* meetingRoomsII(
  intervals: Interval[]
): Generator<IntervalStep> {
  let a = [...intervals].sort((iv1, iv2) => iv1.start - iv2.start);

  yield {
    type: "init",
    intervals: a,
    explanation: `We need to find the minimum number of meeting rooms required.`,
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

  let events: { time: number; delta: number; id: number }[] = [];
  a.forEach((iv) => {
    events.push({ time: iv.start, delta: 1, id: iv.id });
    events.push({ time: iv.end, delta: -1, id: iv.id });
  });

  events.sort((e1, e2) =>
    e1.time === e2.time ? e1.delta - e2.delta : e1.time - e2.time
  );

  let active = 0;
  let maxRooms = 0;

  for (let e of events) {
    active += e.delta;

    yield {
      type: "sweep",
      position: e.time,
      activeCount: active,
      explanation: `At time ${e.time}, ${
        e.delta > 0 ? "meeting starts" : "meeting ends"
      }. Active rooms = ${active}.`,
      lines: [1, 2],
    };

    if (active > maxRooms) {
      maxRooms = active;
      yield {
        type: "highlight",
        ids: [e.id],
        explanation: `Update max rooms to ${maxRooms}.`,
        lines: [3],
      };
    }
  }

  yield {
    type: "done",
    explanation: `Finished! Minimum number of meeting rooms required = ${maxRooms}.`,
    lines: [4],
  };
}
