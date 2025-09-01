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
      pointers: { left: l, right: r },
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
      role: "subarray",
      depth: depth + 1,
      indices: leftSlice.map((_, idx) => l + idx),
      values: leftSlice.map((b) => b.value),
      lines: [1, 2],
      pointers: { left: l, mid, right: r },
    };
  }

  yield* mergeSort(arr, l, mid, depth + 1, false);

  if (mid + 1 !== r) {
    yield {
      type: "highlight",
      ids: rightSlice.map((b) => b.id),
      drag: true,
      role: "subarray",
      depth: depth + 1,
      indices: rightSlice.map((_, idx) => mid + 1 + idx),
      values: rightSlice.map((b) => b.value),
      lines: [1, 3],
      pointers: { left: l, mid, right: r },
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
      indices: [i, j],
      values: [leftBlock.value, rightBlock.value],
      lines: [4, 5],
      pointers: { i, j, k, left: l, right: r },
    };

    if (leftBlock.value <= rightBlock.value) {
      merged.push(leftBlock);
      yield {
        type: "stage_move",
        ids: [leftBlock.id],
        fromIndex: i,
        toIndex: k,
        depth: depth + 1,
        indices: [i, k],
        values: [leftBlock.value, leftBlock.value],
        lines: [6, 7],
        pointers: { i, j, k, left: l, right: r },
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
        indices: [j, k],
        values: [rightBlock.value, rightBlock.value],
        lines: [6, 7],
        pointers: { i, j, k, left: l, right: r },
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
      indices: [i, k],
      values: [arr[i].value, arr[i].value],
      lines: [8],
      pointers: { i, j, k, left: l, right: r },
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
      indices: [j, k],
      values: [arr[j].value, arr[j].value],
      lines: [8],
      pointers: { i, j, k, left: l, right: r },
    } as any;

    j++;
  }

  yield {
    type: "stage_commit",
    ids: merged.map((b) => b.id),
    depth: depth,
    indices: merged.map((_, idx) => l + idx),
    values: merged.map((b) => b.value),
    lines: [9],
    pointers: { left: l, right: r },
  } as any;

  if (!isRoot) {
    yield {
      type: "stage_commit",
      ids: merged.map((b) => b.id),
      depth: depth - 1,
      indices: merged.map((_, idx) => l + idx),
      values: merged.map((b) => b.value),
      lines: [9],
      pointers: { left: l, right: r },
    } as any;
  }

  for (let k = 0; k < merged.length; k++) {
    arr[l + k] = merged[k];
  }

  if (isRoot) {
    yield {
      type: "mark_sorted",
      ids: arr.map((b) => b.id),
      indices: arr.map((_, idx) => idx),
      values: arr.map((b) => b.value),
      lines: [10],
      pointers: {},
    };

    yield { type: "done", lines: [10], pointers: {} };
  }
}
