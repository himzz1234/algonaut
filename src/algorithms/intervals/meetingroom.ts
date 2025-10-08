import type { Interval, IntervalStep } from "../types";

export function* meetingRoomsII(
  intervals: Interval[]
): Generator<IntervalStep> {
  if (intervals.length === 0) return;

  yield {
    type: "init",
    intervals: [...intervals],
    explanation: `Find the minimum number of meeting rooms needed to host all meetings without overlap.`,
    lines: [0],
  };

  const sorted = [...intervals].sort((a, b) => a.start - b.start);

  yield {
    type: "sort",
    intervals: sorted,
    explanation: `Meetings are now sorted by their start times: ${sorted
      .map((iv) => `[${iv.start}, ${iv.end}]`)
      .join(", ")}.`,
    lines: [1],
  };

  const events: { time: number; delta: number; id: number }[] = [];
  sorted.forEach((iv) => {
    events.push({ time: iv.start, delta: 1, id: iv.id });
    events.push({ time: iv.end, delta: -1, id: iv.id });
  });

  yield {
    type: "highlight",
    ids: sorted.map((iv) => iv.id),
    explanation: `Turn each meeting into two timeline events: one for its start and one for its end.`,
    lines: [2, 3, 4],
  };

  const sortedEvents = events.sort((e1, e2) =>
    e1.time === e2.time ? e1.delta - e2.delta : e1.time - e2.time
  );

  yield {
    type: "sort",
    intervals: sorted,
    explanation: `All meeting events have been sorted by time, so we can process them in order.`,
    lines: [5],
  };

  let active = 0;
  let maxRooms = 0;

  for (let e of sortedEvents) {
    active += e.delta;

    const isNewMax = active > maxRooms;
    if (isNewMax) maxRooms = active;

    yield {
      type: "sweep",
      position: e.time,
      activeCount: active,
      maxCount: maxRooms,
      explanation: `At time ${e.time}, ${
        e.delta > 0 ? "a meeting starts" : "a meeting ends"
      }. ${active} room${active === 1 ? "" : "s"} in use${
        isNewMax ? ` — new maximum of ${maxRooms}.` : "."
      }`,
      lines: isNewMax ? [7, 8, 9, 10] : [7, 8],
    };
  }

  yield {
    type: "done",
    explanation: `All meetings processed. The minimum number of rooms needed is ${maxRooms}.`,
    lines: [11],
  };
}
