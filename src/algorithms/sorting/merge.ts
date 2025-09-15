import type { Block, SortingStep } from "../types";

export function* mergeSort(
  arr: Block[],
  l = 0,
  r = arr.length - 1,
  depth = 0,
  isRoot = true
): Generator<SortingStep> {
  if (isRoot)
    yield {
      type: "init",
      array: [...arr],
      lines: [0],
      explanation: `Start Merge Sort on [${arr
        .map((b) => b.value)
        .join(", ")}].`,
    };

  if (l >= r) return;

  const mid = Math.floor((l + r) / 2);

  const leftSlice = arr.slice(l, mid + 1);
  const rightSlice = arr.slice(mid + 1, r + 1);

  if (l !== mid) {
    yield {
      type: "highlight",
      ids: leftSlice.map((b) => b.id),
      drag: true,
      depth: depth + 1,
      lines: [1, 2],
      pointers: { left: arr[l].id, right: arr[mid].id },
      explanation: `Split left half: [${leftSlice
        .map((b) => b.value)
        .join(", ")}].`,
    };
  }

  yield* mergeSort(arr, l, mid, depth + 1, false);

  if (mid + 1 !== r) {
    yield {
      type: "highlight",
      ids: rightSlice.map((b) => b.id),
      drag: true,
      depth: depth + 1,
      lines: [1, 3],
      pointers: { left: arr[mid + 1].id, right: arr[r].id },
      explanation: `Split right half: [${rightSlice
        .map((b) => b.value)
        .join(", ")}].`,
    };
  }

  yield* mergeSort(arr, mid + 1, r, depth + 1, false);

  const merged: Block[] = [];
  let i = l;
  let j = mid + 1;

  while (i <= mid && j <= r) {
    const leftBlock = arr[i];
    const rightBlock = arr[j];
    const k = l + merged.length;

    const relation =
      leftBlock.value < rightBlock.value
        ? "<"
        : leftBlock.value > rightBlock.value
        ? ">"
        : "=";

    yield {
      type: "compare",
      ids: [leftBlock.id, rightBlock.id],
      relation,
      lines: [4, 5],
      pointers: {
        i: arr[i]?.id,
        j: arr[j]?.id,
      },
      explanation: `Compare ${leftBlock.value} and ${rightBlock.value}.`,
    };

    if (leftBlock.value <= rightBlock.value) {
      merged.push(leftBlock);
      yield {
        type: "stage_move",
        ids: [leftBlock.id],
        fromIndex: i,
        toIndex: k,
        depth: depth + 1,
        lines: [6, 7],
        pointers: { k: leftBlock.id },
        explanation: `Place ${leftBlock.value} into merged subarray since ${leftBlock.value} <= ${rightBlock.value}`,
      } as any;

      i++;
    } else {
      merged.push(rightBlock);
      yield {
        type: "stage_move",
        ids: [rightBlock.id],
        fromIndex: j,
        toIndex: k,
        depth: depth + 1,
        lines: [6, 7],
        pointers: { k: rightBlock.id },
        explanation: `Place ${rightBlock.value} into merged subarray since ${rightBlock.value} <= ${leftBlock.value}`,
      } as any;

      j++;
    }
  }

  while (i <= mid) {
    const k = l + merged.length;
    merged.push(arr[i]);
    yield {
      type: "stage_move",
      ids: [arr[i].id],
      fromIndex: i,
      toIndex: k,
      depth: depth + 1,
      lines: [8],
      pointers: { k: arr[i].id },
      explanation: `Add leftover ${arr[i].value} from left half.`,
    } as any;

    i++;
  }

  while (j <= r) {
    const k = l + merged.length;
    merged.push(arr[j]);
    yield {
      type: "stage_move",
      ids: [arr[j].id],
      fromIndex: j,
      toIndex: k,
      depth: depth + 1,
      lines: [8],
      pointers: { k: arr[j].id },
      explanation: `Add leftover ${arr[j].value} from right half.`,
    } as any;

    j++;
  }

  yield {
    type: "stage_commit",
    ids: merged.map((b) => b.id),
    depth: depth,
    lines: [9],
    pointers: { left: merged[0].id, right: merged[merged.length - 1].id },
    explanation: `Commit merged: [${merged.map((b) => b.value).join(", ")}].`,
  } as any;

  if (!isRoot) {
    yield {
      type: "stage_commit",
      ids: merged.map((b) => b.id),
      depth: depth - 1,
      lines: [9],
      pointers: { left: merged[0].id, right: merged[merged.length - 1].id },
      explanation: `Propagate merged subarray up one level.`,
    } as any;
  }

  for (let k = 0; k < merged.length; k++) {
    arr[l + k] = merged[k];
  }

  if (isRoot) {
    yield {
      type: "mark_sorted",
      ids: arr.map((b) => b.id),
      lines: [10],
      pointers: {},
      explanation: `Final merge complete. Entire array is sorted.`,
    };

    yield {
      type: "done",
      lines: [10],
      pointers: {},
      explanation: `Merge Sort finished.`,
    };
  }
}
