import type { Block, TwoPointerStep } from "../types";

export function* trapWater(arr: Block[]): Generator<TwoPointerStep> {
  const a = [...arr];

  let left = 1;
  let right = a.length - 2;
  let leftMax = a[left - 1];
  let rightMax = a[right + 1];
  let water = 0;

  const trappedOverlays: {
    kind: "bar";
    id: number;
    value: number;
    label: string;
  }[] = [];

  yield {
    type: "init",
    array: [...a],
    showBars: "full",
    explanation:
      "We want to figure out how much rainwater gets trapped between the bars.",
    lines: [0, 1, 2, 3],
  };

  while (left <= right) {
    yield {
      type: "highlight",
      ids: [a[left].id, a[right].id],
      explanation: `Look at the bars at positions ${left} and ${right}.`,
      pointers: {
        left: a[left].id,
        right: a[right].id,
        ltMax: leftMax.id,
        rtMax: rightMax.id,
      },
      overlays: [...trappedOverlays],
      lines: [4],
    };

    yield {
      type: "compare",
      ids: [leftMax.id, rightMax.id],
      explanation: `Compare leftMax (${leftMax.value}) and rightMax (${rightMax.value}).`,
      lines: [5],
    };

    if (leftMax.value <= rightMax.value) {
      if (a[left].value >= leftMax.value) {
        leftMax = a[left];
        yield {
          type: "highlight",
          ids: [a[left].id],
          explanation: `Update leftMax to ${leftMax.value} because this bar is taller than previous leftMax.`,
          overlays: [...trappedOverlays],
          pointers: {
            left: a[left].id,
            right: a[right].id,
            ltMax: leftMax.id,
            rtMax: rightMax.id,
          },
          lines: [6, 7],
        };
      } else {
        const trapped = leftMax.value - a[left].value;
        water += trapped;

        trappedOverlays.push({
          kind: "bar",
          id: a[left].id,
          value: trapped,
          label: `+${trapped}`,
        });

        yield {
          type: "highlight",
          ids: [a[left].id],
          explanation: `This bar is ${trapped} units shorter than leftMax ${leftMax.value}, so it traps ${trapped} water.`,
          overlays: [...trappedOverlays],
          pointers: {
            left: a[left].id,
            right: a[right].id,
            ltMax: leftMax.id,
            rtMax: rightMax.id,
          },
          lines: [8, 9],
        };
      }

      left++;
    } else {
      if (a[right].value >= rightMax.value) {
        rightMax = a[right];
        yield {
          type: "highlight",
          ids: [a[right].id],
          explanation: `Update rightMax to ${rightMax.value} because this bar is taller than previous rightMax.`,
          overlays: [...trappedOverlays],
          pointers: {
            left: a[left].id,
            right: a[right].id,
            ltMax: leftMax.id,
            rtMax: rightMax.id,
          },
          lines: [12, 13],
        };
      } else {
        const trapped = rightMax.value - a[right].value;
        water += trapped;

        trappedOverlays.push({
          kind: "bar",
          id: a[right].id,
          value: trapped,
          label: `+${trapped}`,
        });

        yield {
          type: "highlight",
          ids: [a[right].id],
          explanation: `This bar is ${trapped} units shorter than rightMax ${rightMax.value}, so it traps ${trapped} water.`,
          overlays: [...trappedOverlays],
          pointers: {
            left: a[left].id,
            right: a[right].id,
            ltMax: leftMax.id,
            rtMax: rightMax.id,
          },
          lines: [14, 15],
        };
      }
      right--;
    }
  }

  yield {
    type: "done",
    explanation: `All bars checked. The total trapped water is ${water}.`,
    overlays: [
      ...trappedOverlays,
      {
        kind: "region",
        ids: a.map((b) => b.id),
        label: `total = ${water}`,
      },
    ],
    lines: [17],
  };
}
