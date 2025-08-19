import type { Block, SortingStep } from "../types";

export function* quickSort(
  arr: Block[],
  l = 0,
  r = arr.length - 1,
  depth = 0,
  isRoot = true
): Generator<SortingStep> {
  if (isRoot) yield { type: "init", array: [...arr] };
  if (l >= r) return;

  const pivot = arr[r];
  yield { type: "highlight", ids: [pivot.id], role: "pivot", drag: true };

  let i = l;
  for (let j = l; j < r; j++) {
    const relation =
      arr[j].value < pivot.value ? "<" : arr[j].value > pivot.value ? ">" : "=";

    yield { type: "compare", ids: [arr[j].id, pivot.id], relation };

    if (arr[j].value < pivot.value) {
      if (i !== j) {
        yield { type: "swap", ids: [arr[i].id, arr[j].id] };
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      i++;
    }
  }

  if (i !== r) {
    yield { type: "swap", ids: [arr[i].id, arr[r].id] };
    [arr[i], arr[r]] = [arr[r], arr[i]];
  }

  yield { type: "mark_sorted", ids: [arr[i].id] };

  if (l < i) {
    const leftIds = arr.slice(l, i).map((b) => b.id);

    yield {
      type: "highlight",
      ids: leftIds,
      drag: true,
      role: "subarray",
      depth: depth + 1,
    };

    yield* quickSort(arr, l, i - 1, depth + 1, false);

    yield { type: "mark_sorted", ids: leftIds };

    yield {
      type: "highlight",
      ids: leftIds,
      drag: true,
      role: "subarray",
      depth,
    };
  }

  if (i + 1 <= r) {
    const rightIds = arr.slice(i + 1, r + 1).map((b) => b.id);
    yield {
      type: "highlight",
      ids: rightIds,
      drag: true,
      role: "subarray",
      depth: depth + 1,
    };
    yield* quickSort(arr, i + 1, r, depth + 1, false);
    yield { type: "mark_sorted", ids: rightIds };
    yield {
      type: "highlight",
      ids: rightIds,
      drag: true,
      role: "subarray",
      depth,
    };
  }

  if (isRoot) {
    yield { type: "mark_sorted", ids: arr.map((b) => b.id) };
    yield { type: "done" };
  }
}
