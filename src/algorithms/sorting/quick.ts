import type { Block, SortingStep } from "../types";

export function* quickSort(
  arr: Block[],
  lo = 0,
  hi = arr.length - 1,
  depth = 0,
  isRoot = true
): Generator<SortingStep> {
  if (isRoot) yield { type: "init", array: [...arr] };
  if (lo >= hi) return;

  const pivot = arr[hi];
  yield {
    type: "highlight",
    ids: [pivot.id],
    role: "pivot",
    drag: true,
    pointers: { pivot: hi, lo, hi },
  };

  let i = lo;
  for (let j = lo; j < hi; j++) {
    const relation =
      arr[j].value < pivot.value ? "<" : arr[j].value > pivot.value ? ">" : "=";

    yield {
      type: "compare",
      ids: [arr[j].id, pivot.id],
      relation,
      pointers: { i, j, pivot: hi, lo, hi },
    };

    if (arr[j].value < pivot.value) {
      if (i !== j) {
        yield {
          type: "swap",
          ids: [arr[i].id, arr[j].id],
          pointers: { i, j, pivot: hi, lo, hi },
        };

        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      i++;
    }
  }

  if (i !== hi) {
    const relation =
      arr[i].value === arr[hi].value
        ? "="
        : arr[i].value < arr[hi].value
        ? "<"
        : ">";

    yield {
      type: "compare",
      ids: [arr[i].id, arr[hi].id],
      relation,
      pointers: { i, pivot: hi, lo, hi },
    };

    yield {
      type: "swap",
      ids: [arr[i].id, arr[hi].id],
      pointers: { i, pivot: hi, lo, hi },
    };

    [arr[i], arr[hi]] = [arr[hi], arr[i]];
  }

  yield { type: "mark_sorted", ids: [arr[i].id] };

  if (lo < i) {
    const leftIds = arr.slice(lo, i).map((x) => x.id);

    yield {
      type: "highlight",
      ids: leftIds,
      drag: true,
      role: "subarray",
      depth: depth + 1,
      pointers: { lo, hi: i - 1 },
    };

    yield* quickSort(arr, lo, i - 1, depth + 1, false);

    yield { type: "mark_sorted", ids: leftIds };

    yield {
      type: "highlight",
      ids: leftIds,
      drag: true,
      role: "subarray",
      depth,
      pointers: { lo, hi: i - 1 },
    };
  }

  if (i + 1 <= hi) {
    const rightIds = arr.slice(i + 1, hi + 1).map((x) => x.id);

    yield {
      type: "highlight",
      ids: rightIds,
      drag: true,
      role: "subarray",
      depth: depth + 1,
      pointers: { lo: i + 1, hi },
    };

    yield* quickSort(arr, i + 1, hi, depth + 1, false);

    yield { type: "mark_sorted", ids: rightIds };

    yield {
      type: "highlight",
      ids: rightIds,
      drag: true,
      role: "subarray",
      depth,
      pointers: { lo: i + 1, hi },
    };
  }

  if (isRoot) {
    yield { type: "mark_sorted", ids: arr.map((x) => x.id) };
    yield { type: "done" };
  }
}
