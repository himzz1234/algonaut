import type { Block, SortingStep } from "../types";

export function* quickSort(
  arr: Block[],
  left = 0,
  right = arr.length - 1,
  depth = 0,
  isRoot = true
): Generator<SortingStep> {
  if (isRoot) yield { type: "init", array: [...arr], lines: [0] };
  if (left >= right) return;

  const pivot = arr[right];
  yield {
    type: "highlight",
    ids: [pivot.id],
    role: "pivot",
    drag: true,
    pointers: { pivot: right },
    indices: [right],
    values: [pivot.value],
    lines: [1],
  };

  let i = left;
  for (let j = left; j < right; j++) {
    const relation =
      arr[j].value < pivot.value ? "<" : arr[j].value > pivot.value ? ">" : "=";

    yield {
      type: "compare",
      ids: [arr[j].id, pivot.id],
      relation,
      pointers: { i, j, pivot: right },
      indices: [j, right],
      values: [arr[j].value, pivot.value],
      lines: [2, 3],
    };

    if (arr[j].value < pivot.value) {
      if (i !== j) {
        yield {
          type: "swap",
          ids: [arr[i].id, arr[j].id],
          pointers: { i, j, pivot: right },
          indices: [i, j],
          values: [arr[i].value, arr[j].value],
          lines: [2, 3],
        };

        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      i++;
    }
  }

  if (i !== right) {
    const relation =
      arr[i].value === arr[right].value
        ? "="
        : arr[i].value < arr[right].value
        ? "<"
        : ">";

    yield {
      type: "compare",
      ids: [arr[i].id, arr[right].id],
      relation,
      pointers: { i, pivot: right },
      indices: [i, right],
      values: [arr[i].value, arr[right].value],
      lines: [2, 3],
    };

    yield {
      type: "swap",
      ids: [arr[i].id, arr[right].id],
      pointers: { i, pivot: right },
      indices: [i, right],
      values: [arr[i].value, arr[right].value],
      lines: [2, 3],
    };

    [arr[i], arr[right]] = [arr[right], arr[i]];
  }

  yield {
    type: "mark_sorted",
    ids: [arr[i].id],
    indices: [i],
    values: [arr[i].value],
    lines: [4],
  };

  if (left < i) {
    const leftSlice = arr.slice(left, i);

    yield {
      type: "highlight",
      ids: leftSlice.map((x) => x.id),
      drag: true,
      role: "subarray",
      depth: depth + 1,
      action: "enter",
      pointers: { left, right: i - 1 },
      indices: leftSlice.map((_, idx) => left + idx),
      values: leftSlice.map((b) => b.value),
      lines: [5],
    };

    yield* quickSort(arr, left, i - 1, depth + 1, false);

    yield {
      type: "mark_sorted",
      ids: leftSlice.map((b) => b.id),
      indices: leftSlice.map((_, idx) => left + idx),
      values: leftSlice.map((b) => b.value),
    };

    yield {
      type: "highlight",
      ids: leftSlice.map((x) => x.id),
      drag: true,
      role: "subarray",
      depth,
      action: "exit",
      pointers: { left, right: i - 1 },
      indices: leftSlice.map((_, idx) => left + idx),
      values: leftSlice.map((b) => b.value),
    };
  }

  if (i + 1 <= right) {
    const rightSlice = arr.slice(i + 1, right + 1);

    yield {
      type: "highlight",
      ids: rightSlice.map((x) => x.id),
      drag: true,
      role: "subarray",
      depth: depth + 1,
      action: "enter",
      pointers: { left: i + 1, right },
      indices: rightSlice.map((_, idx) => i + 1 + idx),
      values: rightSlice.map((b) => b.value),
      lines: [6],
    };

    yield* quickSort(arr, i + 1, right, depth + 1, false);

    yield {
      type: "mark_sorted",
      ids: rightSlice.map((b) => b.id),
      indices: rightSlice.map((_, idx) => i + 1 + idx),
      values: rightSlice.map((b) => b.value),
    };

    yield {
      type: "highlight",
      ids: rightSlice.map((x) => x.id),
      drag: true,
      role: "subarray",
      depth,
      action: "exit",
      pointers: { left: i + 1, right },
      indices: rightSlice.map((_, idx) => i + 1 + idx),
      values: rightSlice.map((b) => b.value),
    };
  }

  if (isRoot) {
    yield {
      type: "mark_sorted",
      ids: arr.map((x) => x.id),
      indices: arr.map((_, idx) => idx),
      values: arr.map((b) => b.value),
    };
    yield { type: "done", lines: [7] };
  }
}
