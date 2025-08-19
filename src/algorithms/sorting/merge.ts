import type { Block, SortingStep } from "../types";

export function* mergeSort(
  arr: Block[],
  l = 0,
  r = arr.length - 1,
  depth = 0,
  isRoot = true
): Generator<SortingStep> {
  if (isRoot) yield { type: "init", array: [...arr] };
  if (l >= r) return;

  const mid = Math.floor((l + r) / 2);

  const leftIds = arr.slice(l, mid + 1).map((b) => b.id);
  const rightIds = arr.slice(mid + 1, r + 1).map((b) => b.id);

  if (l !== mid) {
    yield {
      type: "highlight",
      ids: leftIds,
      drag: true,
      role: "subarray",
      depth: depth + 1,
    };
  }

  yield* mergeSort(arr, l, mid, depth + 1, false);

  if (mid + 1 !== r) {
    yield {
      type: "highlight",
      ids: rightIds,
      drag: true,
      role: "subarray",
      depth: depth + 1,
    };
  }

  yield* mergeSort(arr, mid + 1, r, depth + 1, false);

  const merged: Block[] = [];
  let i = l,
    j = mid + 1;

  while (i <= mid && j <= r) {
    const leftBlock = arr[i];
    const rightBlock = arr[j];

    const relation =
      leftBlock.value < rightBlock.value
        ? "<"
        : leftBlock.value > rightBlock.value
        ? ">"
        : "=";

    yield { type: "compare", ids: [leftBlock.id, rightBlock.id], relation };

    yield {
      type: "highlight",
      ids: [leftBlock.id],
      drag: true,
      depth: depth + 1,
      role: "subarray",
    };
    yield {
      type: "highlight",
      ids: [rightBlock.id],
      drag: true,
      depth: depth + 1,
      role: "subarray",
    };

    if (leftBlock.value <= rightBlock.value) {
      merged.push(leftBlock);
      i++;
    } else {
      merged.push(rightBlock);
      j++;
    }
  }

  while (i <= mid) {
    merged.push(arr[i]);
    yield {
      type: "highlight",
      ids: [arr[i].id],
      drag: true,
      role: "subarray",
      depth: depth + 1,
    };
    i++;
  }
  while (j <= r) {
    merged.push(arr[j]);
    yield {
      type: "highlight",
      ids: [arr[j].id],
      drag: true,
      role: "subarray",
      depth: depth + 1,
    };
    j++;
  }

  for (let k = 0; k < merged.length; k++) {
    arr[l + k] = merged[k];
    yield {
      type: "highlight",
      ids: [merged[k].id],
      drag: true,
      depth: depth,
      role: "subarray",
    };
  }

  if (isRoot) {
    yield { type: "mark_sorted", ids: arr.map((b) => b.id) };
    yield { type: "done" };
  }
}
